import React, { useState } from 'react';
import { Shield, Lock, User, Eye, EyeOff, LogIn, AlertCircle, KeyRound, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    login(email, password);
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleDirectAccess = () => {
    login('admin', 'admin123');
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050c1a',
      backgroundImage: `radial-gradient(circle at 50% 30%, rgba(234, 179, 8, 0.12) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(9, 27, 54, 0.6) 0%, transparent 50%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'var(--font-sans)'
    }}>
      
      <div style={{
        backgroundColor: '#091b36',
        borderRadius: '24px',
        border: '1px solid rgba(234, 179, 8, 0.3)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        maxWidth: '450px',
        width: '100%',
        padding: '40px',
        color: '#ffffff'
      }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
          }}>
            <img src="/rns_logo.png" alt="RNS Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', marginBottom: '4px' }}>
            RNS Admin Portal Access
          </h1>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>
            Management CMS for Roopnagar Nandaraj Sangraula Campus.
          </p>
        </div>

        {/* 1-CLICK INSTANT DIRECT ACCESS BUTTON (PROMINENT TOP CARD) */}
        <div style={{
          backgroundColor: 'rgba(234, 179, 8, 0.1)',
          border: '1px solid #eab308',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Sparkles size={16} /> INSTANT ONE-CLICK ACCESS
          </div>
          <button 
            type="button"
            onClick={handleDirectAccess}
            className="rns-btn-donate"
            style={{
              width: '100%',
              padding: '13px 0',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <KeyRound size={18} /> Open Admin Dashboard Directly
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '20px 0',
          color: '#64748b',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#1e293b' }} />
          <span>Or Login Manually Below</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#1e293b' }} />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
              Username or Email
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <User size={16} />
              </div>
              <input 
                type="text" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  backgroundColor: '#0c1a3b',
                  border: '1px solid #1e293b',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
              Admin Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <Lock size={16} />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="admin123"
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  backgroundColor: '#0c1a3b',
                  border: '1px solid #1e293b',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '12px 0',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 800,
              backgroundColor: '#1b2a54',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              marginTop: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <LogIn size={16} /> Login to Admin CMS
          </button>

        </form>

      </div>
    </div>
  );
}
