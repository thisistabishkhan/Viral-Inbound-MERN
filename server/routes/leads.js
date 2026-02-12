const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Configuration
const CONFIG = {
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    accounts_url: process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in/oauth/v2/token',
    api_url: process.env.ZOHO_API_URL || 'https://www.zohoapis.in/bigin/v2/Contacts',
};

// Helper function to get Access Token
const getAccessToken = async () => {
    try {
        const response = await axios.post(CONFIG.accounts_url, null, {
            params: {
                grant_type: 'refresh_token',
                client_id: CONFIG.client_id,
                client_secret: CONFIG.client_secret,
                refresh_token: CONFIG.refresh_token
            }
        });

        if (response.data && response.data.access_token) {
            return response.data.access_token;
        } else {
            console.error('Zoho Token Error:', response.data);
            throw new Error('Failed to refresh Zoho token');
        }
    } catch (error) {
        console.error('Zoho Token Network Error:', error.message);
        throw error;
    }
};

// Handle Lead Submission
router.post('/', async (req, res) => {
    try {
        const userData = req.body;
        console.log('Received Lead Data:', userData);

        // 1. Get Access Token
        const accessToken = await getAccessToken();

        // 2. Map Fields
        const formName = userData.formName || 'Unknown Form';
        let tagName = 'Inquiry';

        if (formName === 'contactForm') {
            tagName = 'Inquiry'; // PHP equivalent: 'SEO Audit Request', assuming standardizing on Inquiry unless specific
            if (formName === 'contactForm') tagName = 'SEO Audit Request'; // Keeping PHP logic exact
        } else if (formName === 'leadMagnetForm') {
            tagName = 'Lead Magnet - Ebook';
        }

        let description = userData.message || '';
        if (userData.website) {
            description = `Website: ${userData.website}\n\n${description}`;
        }

        const zohoData = {
            data: [{
                First_Name: userData.firstName || '',
                Last_Name: userData.lastName || 'Not Provided',
                Email: userData.email || '',
                Phone: userData.fullPhone || userData.phone || '', // Check both just in case
                Account_Name: userData.company || '', // Bigin maps Company to Account_Name often
                Description: description,
                Tag: [{ name: tagName }]
            }]
        };

        // 3. Send to Zoho
        const zohoResponse = await axios.post(CONFIG.api_url, zohoData, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        // 4. Respond to Client
        if (zohoResponse.status === 200 || zohoResponse.status === 201) {
            // Zoho response structure usually contains "data": [{ "code": "SUCCESS", ... }]
            const responseBody = zohoResponse.data;

            // Check for specific Zoho success codes if needed, or just trust the HTTP status
            res.status(200).json({ success: true, data: responseBody });
        } else {
            res.status(zohoResponse.status).json({ success: false, data: zohoResponse.data });
        }

    } catch (error) {
        console.error('Zoho Submission Error:', error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to submit lead to Zoho',
            details: error.response ? error.response.data : error.message
        });
    }
});

module.exports = router;
