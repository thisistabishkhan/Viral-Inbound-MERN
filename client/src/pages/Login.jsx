import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ParticleBackground from '../components/ParticleBackground';
import { Lock, User, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const { login, isAuthenticated, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const { username, password } = formData;

    if (authLoading) {
        return <div className="login-container text-white">Loading...</div>;
    }

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;

        setError('');
        setLoading(true);

        if (username === '' || password === '') {
            setError('Please fill in all fields');
            setLoading(false);
        } else {
            const res = await login(formData);
            setLoading(false);
            if (res.success) {
                navigate('/admin');
            } else {
                setError(res.msg);
            }
        }
    };

    return (
        <div className="login-container">
            <ParticleBackground />

            {/* Background Gradients */}
            <div className="login-gradient-1" />
            <div className="login-gradient-2" />

            <div className="login-card-wrapper">
                {/* Glass Card */}
                <div className="login-glass-card" />

                <div className="login-content">
                    <div className="login-header">
                        <div className="login-icon-wrapper">
                            <Lock size={32} color="#000000" />
                        </div>
                        <h2 className="login-title">Welcome Back</h2>
                        <p className="login-subtitle">Enter your credentials to access the admin panel</p>
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="login-form">
                        <div className="login-form-group">
                            <label className="login-label" htmlFor="username">
                                Username
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <User size={20} />
                                </span>
                                <input
                                    className="login-input"
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={onChange}
                                    placeholder="Enter your username"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="login-form-group">
                            <label className="login-label" htmlFor="password">
                                Password
                            </label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <Lock size={20} />
                                </span>
                                <input
                                    className="login-input"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <button
                            className="login-button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="spinner" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <div className="login-footer">
                &copy; {new Date().getFullYear()} Viral Inbound. All rights reserved.
            </div>
        </div>
    );
};

export default Login;
