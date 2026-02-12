import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user,
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        // Only try to load user if we have a token
        if (!localStorage.getItem('token')) {
            dispatch({ type: 'AUTH_ERROR' });
            return;
        }

        try {
            const res = await axios.get('http://localhost:5000/api/auth/me');
            dispatch({
                type: 'USER_LOADED',
                payload: res.data,
            });
            console.log('AuthContext: User loaded', res.data);
        } catch (err) {
            console.error('AuthContext: loadUser error', err);
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    // Login User
    const login = async (formData) => {
        console.log('AuthContext: login called', formData);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            console.log('AuthContext: login response', res.data);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data,
            });

            return { success: true };
        } catch (err) {
            console.error('AuthContext: login error', err);
            return {
                success: false,
                msg: err.response?.data?.message || 'Login failed'
            };
        }
    };

    // Logout
    const logout = () => dispatch({ type: 'LOGOUT' });

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Helper to set auth token
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default AuthContext;
