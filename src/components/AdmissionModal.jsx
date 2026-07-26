import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function AdmissionModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div 
      onClick={onClose} /* Backdrop click closes modal */
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 12, 26, 0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking inside dialog */
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '550px',
          width: '100%',
          padding: '36px',
          position: 'relative',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          animation: 'rnsModalZoom 0.25s ease-out'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            backgroundColor: '#f1f5f9',
            color: '#334155',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#d1fae5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Check size={28} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#091b36', marginBottom: '8px' }}>Application Submitted!</h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Our campus administration office will contact you shortly regarding registration details.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ marginBottom: '10px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#091b36' }}>Admission & Support Inquiry</h2>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Fill out your details to receive BBS program details or scholarship information.</p>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Full Name *</label>
              <input type="text" required placeholder="Enter student or donor name" className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Phone Number *</label>
              <input type="tel" required placeholder="+977 98XXXXXXXX" className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Email Address</label>
              <input type="email" placeholder="example@gmail.com" className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Inquiry Type</label>
              <select className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }}>
                <option>BBS 4-Year Admission 2082</option>
                <option>Scholarship / Financial Support Application</option>
                <option>Campus Donation & Philanthropy</option>
                <option>General Information</option>
              </select>
            </div>

            <button type="submit" className="rns-btn-donate" style={{ width: '100%', borderRadius: '8px', padding: '12px 0', marginTop: '10px', fontSize: '13px' }}>
              Submit Inquiry
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
