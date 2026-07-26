import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';
import { campusData } from '../data/campusData';

export default function Footer() {
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleFeedback = (e) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => setFeedbackSent(false), 4000);
  };

  return (
    <footer className="rns-footer">
      <div className="rns-container">
        
        <div className="rns-footer-grid">
          
          {/* Col 1: Official Logo & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                backgroundColor: '#ffffff',
                padding: '4px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/rns_logo.png" 
                  alt="Roopnagar Nandaraj Sangraula Campus Logo" 
                  style={{ width: '44px', height: '44px', objectFit: 'contain' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', leading: 1 }}>
                  RNS Campus
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                  Established 2070 BS
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#94a3b8', leading: 1.6 }}>
              Roopnagar Nandaraj Sangraula Campus is Saptari's primary not-for-profit educational institution, promoting academic equity and holistic development.
            </p>

            {/* Social Links (Facebook only) */}
            <div style={{ display: 'flex', gap: '10px', paddingTop: '6px' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{
                width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1'
              }} title="Facebook">
                <Facebook size={14} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="rns-footer-title">QUICK LINKS</h3>
            <ul className="rns-footer-links">
              <li><Link to="/">Home Page</Link></li>
              <li><Link to="/about">About Campus</Link></li>
              <li><Link to="/academics#faculty">Faculty & Staff</Link></li>
              <li><Link to="/board-of-directors">Board of Directors</Link></li>
              <li><Link to="/notices">Official Notices</Link></li>
              <li><Link to="/chronicles">Campus Chronicles</Link></li>
              <li><Link to="/donate">Donate & Support</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="rns-footer-title">QUICK FEEDBACK</h3>

            {feedbackSent ? (
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#6ee7b7',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '12px',
                textAlign: 'center'
              }}>
                Thank you! Your feedback has been submitted.
              </div>
            ) : (
              <form onSubmit={handleFeedback}>
                <input type="text" required placeholder="Your Name" className="rns-form-input" />
                <input type="email" required placeholder="Your Email" className="rns-form-input" />
                <input type="text" placeholder="Subject" className="rns-form-input" />
                <textarea rows={2} required placeholder="Message or comments..." className="rns-form-input" style={{ resize: 'none' }}></textarea>
                <button type="submit" className="rns-btn-donate" style={{ width: '100%', borderRadius: '8px', padding: '9px 0' }}>
                  Send Feedback
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="rns-footer-bottom">
          <p>Copyright © {new Date().getFullYear()} Roopnagar Nandaraj Sangraula Campus. All Rights Reserved.</p>
          <p>Affiliated to Tribhuvan University, Nepal</p>
        </div>

      </div>
    </footer>
  );
}
