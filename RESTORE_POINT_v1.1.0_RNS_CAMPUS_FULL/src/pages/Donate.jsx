import React, { useState } from 'react';
import { QrCode, Copy, Check, Download, X } from 'lucide-react';

export default function Donate() {
  const [donationAmount, setDonationAmount] = useState(5000);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("26901017500108");
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 3000);
  };

  // Dynamic Impact Estimator Descriptions based on donation amount
  const getImpactDescription = (amount) => {
    if (amount < 3000) {
      return "Provides modern textbooks, reference guides, and examination study materials for 1 student for an entire academic semester.";
    } else if (amount < 10000) {
      return "Sponsors basic computer literacy training (3 months) including hands-on laboratory practice for 2 marginalized students.";
    } else if (amount < 30000) {
      return "Covers 1 full year tuition scholarship for a deserving female student under the 'Chhori Chhatrabritti' empowerment initiative.";
    } else if (amount < 60000) {
      return "Funds 1 year of high-speed optical fiber internet, digital library subscriptions, and computer lab software upgrades.";
    } else {
      return "Establishes a permanent Memorial Scholarship Fund in your name, providing annual tuition support to underprivileged students in Saptari indefinitely.";
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px', backgroundColor: '#f8fafc' }}>
      
      {/* Dark Navy Header Banner */}
      <div className="rns-banner">
        <h1 className="rns-banner-title">Donate & Support</h1>
        <div className="rns-banner-breadcrumb">
          Home / <span>Donate</span>
        </div>
      </div>

      <div className="rns-container" style={{ paddingTop: '50px' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          
          {/* LEFT COLUMN: Narrative & Bank Details Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <h2 style={{
              fontSize: '32px',
              fontWeight: 900,
              color: '#091b36',
              lineHeight: 1.2
            }}>
              Together We Can Make A Difference
            </h2>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
              Unlocking the potential of tomorrow's leaders begins with a single act of kindness. Your donation can transform the lives of underprivileged students, empowering them to break free from financial limitations through management and business education.
            </p>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
              Your contribution directly supports classroom labs, modern textbooks, internet connectivity, and scholarships for marginalized groups in Saptari. Donate now via direct bank transfer:
            </p>

            {/* NABIL BANK TRANSFER DETAILS CARD */}
            <div style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '20px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 4px 15px rgba(9, 27, 54, 0.04)'
            }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#091b36', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  NABIL BANK
                </h3>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', tracking: '1px' }}>
                  KANCHANPUR, SAPTARI BRANCH
                </div>
              </div>

              <div style={{ borderTop: '1px solid #dbeafe', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Account Name</span>
                  <span style={{ fontWeight: 800, color: '#091b36', textAlign: 'right' }}>ROOPNAGAR NANDARAJ SANGRAULA CAMPUS</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Account Number</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 900, color: '#091b36', letterSpacing: '0.5px' }}>26901017500108</span>
                    <button 
                      onClick={handleCopyAccount}
                      style={{ color: copiedAcc ? '#10b981' : '#2563eb', padding: '2px', cursor: 'pointer' }}
                      title="Copy Account Number"
                    >
                      {copiedAcc ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Swift Code</span>
                  <span style={{ fontWeight: 800, color: '#091b36' }}>NARBNPKA</span>
                </div>
              </div>
            </div>

            {/* SCAN DOMESTIC QR CODE BUTTON */}
            <button 
              onClick={() => setShowQRModal(true)}
              className="rns-btn-donate"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 800,
                width: 'fit-content',
                borderRadius: '9999px',
                boxShadow: '0 4px 14px rgba(234, 179, 8, 0.4)'
              }}
            >
              <QrCode size={18} /> Scan domestic QR Code
            </button>

          </div>

          {/* RIGHT COLUMN: Interactive Impact Estimator Card */}
          <div className="rns-card" style={{
            padding: '40px',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px'
          }}>
            
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#091b36', marginBottom: '6px' }}>
                Interactive Impact Estimator
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Slide the gauge below to see the community impact of your donation.
              </p>
            </div>

            {/* Range Slider */}
            <div style={{ width: '100%', padding: '10px 0' }}>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="1000"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  accentColor: '#eab308',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Big Amount Display */}
            <div>
              <span style={{ fontSize: '42px', fontWeight: 900, color: '#091b36', letterSpacing: '-1px' }}>
                Rs. {donationAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Dynamic Impact Description */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px',
              width: '100%'
            }}>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.7, fontWeight: 600 }}>
                {getImpactDescription(donationAmount)}
              </p>
            </div>

            <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.5 }}>
              Every contribution, big or small, supports student equity and academic potential.
            </p>

          </div>

        </div>

      </div>

      {/* OFFICIAL FONEPAY QR CODE MODAL WITH USER UPLOADED IMAGE */}
      {showQRModal && (
        <div 
          onClick={() => setShowQRModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 12, 26, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '480px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              animation: 'rnsModalZoom 0.25s ease-out'
            }}
          >
            <button 
              onClick={() => setShowQRModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                backgroundColor: '#f1f5f9',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '1px solid #cbd5e1'
              }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#091b36', marginBottom: '4px' }}>
              Official Domestic Fonepay QR Code
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
              Scan using Fonepay, eSewa, Khalti, or any Nepalese Bank Mobile App.
            </p>

            {/* Official User Uploaded QR Image */}
            <div style={{
              margin: '0 auto 20px auto',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              boxShadow: '0 8px 20px rgba(0,0,0,0.06)'
            }}>
              <img 
                src="/fonepay_qr.png" 
                alt="Official Roopnagar Campus Fonepay QR Code"
                style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a 
                href="/fonepay_qr.png" 
                download="roopnagar_campus_fonepay_qr.png"
                target="_blank"
                rel="noreferrer"
                className="rns-btn-outline"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  padding: '10px 0'
                }}
              >
                <Download size={14} style={{ color: '#d97706' }} /> Download QR Image
              </a>

              <button 
                onClick={() => setShowQRModal(false)}
                className="rns-btn-donate" 
                style={{ flex: 1, padding: '10px 0', fontSize: '12px' }}
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
