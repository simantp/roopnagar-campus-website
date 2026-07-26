import React from 'react';
import { FileText, Heart } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function CampusChiefMessage() {
  const { chiefMessage } = useCampus();
  const msg = chiefMessage || {};
  const paragraphs = msg.body ? msg.body.split('\n\n') : [];

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', paddingBottom: '90px' }}>
      
      {/* 1. DARK NAVY BANNER HEADER */}
      <div className="rns-banner">
        <h1 className="rns-banner-title">Campus Chief's Message</h1>
        <div className="rns-banner-breadcrumb">
          Home / Academics / <span>Campus Chief</span>
        </div>
      </div>

      {/* 2. MAIN CARD CONTAINER */}
      <div className="rns-container" style={{ paddingTop: '50px' }}>
        <div className="rns-card" style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '50px 45px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
        }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '50px',
            alignItems: 'start'
          }}>
            
            {/* LEFT PROFILE COLUMN */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              paddingRight: '20px',
              borderRight: '1px solid #f1f5f9'
            }}>
              <div style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #a16207 0%, #1e293b 100%)',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                border: '3px solid #eab308'
              }}>
                {msg.image ? (
                  <img src={msg.image} alt={msg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span>DG</span>
                )}
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#091b36', marginBottom: '4px' }}>
                {msg.name || 'Prof. Deepak Gajurel'}
              </h2>

              <div style={{ fontSize: '11px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                {msg.role || 'CAMPUS CHIEF'}
              </div>

              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Roopnagar Nandaraj Sangraula Campus
              </div>
            </div>

            {/* RIGHT MESSAGE COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Quote Highlight */}
              {msg.quote && (
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ width: '4px', height: '28px', backgroundColor: '#d97706', borderRadius: '2px', flexShrink: 0, marginTop: '2px' }} />
                  <blockquote style={{ fontSize: '16px', fontWeight: 700, fontStyle: 'italic', color: '#091b36', leading: 1.4 }}>
                    {msg.quote}
                  </blockquote>
                </div>
              )}

              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {paragraphs.map((para, idx) => (
                  <p key={idx} style={{ whiteSpace: 'pre-line' }}>{para}</p>
                ))}
              </div>

              {/* Sign-off */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', marginTop: '10px', textAlign: 'right' }}>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#091b36' }}>
                  {msg.name || 'Prof. Deepak Gajurel'}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                  {msg.role || 'Campus Chief'}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
