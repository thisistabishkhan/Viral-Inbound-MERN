const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/services', require('./routes/services'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/testimonials', require('./routes/testimonials'));

app.get('/', (req, res) => {
    res.send('Viral Inbound API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
