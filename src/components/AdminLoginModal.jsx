import React, { useState } from 'react';
import { Shield, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminLoginModal({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Valid Credentials: admin / rnsadmin2081 (or admin@rnscampus.edu.np)
      const cleanUser = username.trim().toLowerCase();
      if ((cleanUser === 'admin' || cleanUser === 'admin@rnscampus.edu.np') && password === 'rnsadmin2081') {
        sessionStorage.setItem('rns_admin_auth', 'true');
        setIsLoading(false);
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg('Invalid username or password. Please try again.');
      }
    }, 400);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050c1a',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Subtle Gradient Glow */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '20%',
        width: '500px',
        height: '500px',
        backgroundColor: 'rgba(234, 179, 8, 0.08)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-15%',
        right: '20%',
        width: '500px',
        height: '500px',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      {/* Main Login Card */}
      <div style={{
        backgroundColor: '#091b36',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '460px',
        padding: '40px 36px',
        position: 'relative',
        zIndex: 10,
        animation: 'rnsModalZoom 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Top Header Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '10px',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src="/rns_logo.png" alt="RNS Campus Logo" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
          </div>

          <span style={{
            fontSize: '10px',
            fontWeight: 900,
            color: '#eab308',
            backgroundColor: 'rgba(234, 179, 8, 0.12)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            padding: '4px 12px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px'
          }}>
            <Shield size={12} /> RESTRICTED ADMIN PORTAL
          </span>

          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', margin: '4px 0 6px 0' }}>
            Roopnagar Campus CMS
          </h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            Enter your administrator credentials to access database management
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0, color: '#ef4444' }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Username Field */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
              Username or Email
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <User size={16} style={{ position: 'absolute', left: '14px', color: '#64748b' }} />
              <input 
                type="text"
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  backgroundColor: '#050c1a',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '12px',
                  padding: '12px 14px 12px 42px',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease'
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
              Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', color: '#64748b' }} />
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#050c1a',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '12px',
                  padding: '12px 42px 12px 42px',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: '#eab308',
              color: '#050c1a',
              fontWeight: 900,
              fontSize: '14px',
              padding: '13px 20px',
              borderRadius: '12px',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px',
              boxShadow: '0 8px 20px rgba(234, 179, 8, 0.25)',
              transition: 'all 0.2s ease',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Authenticating...' : 'Log In to Admin Dashboard'}
            {!isLoading && <ArrowRight size={16} />}
          </button>

        </form>

        {/* Demo Credentials Info Box */}
        <div style={{
          marginTop: '24px',
          padding: '14px',
          borderRadius: '12px',
          backgroundColor: '#050c1a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '11px',
          color: '#94a3b8',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div style={{ fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }}>
            🔑 Default Administrator Credentials:
          </div>
          <div>Username: <code style={{ color: '#ffffff', backgroundColor: '#1e293b', padding: '1px 6px', borderRadius: '4px' }}>admin</code></div>
          <div>Password: <code style={{ color: '#ffffff', backgroundColor: '#1e293b', padding: '1px 6px', borderRadius: '4px' }}>rnsadmin2081</code></div>
        </div>

        {/* Return to Public Website Link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link 
            to="/" 
            style={{
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >
            ← Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}
