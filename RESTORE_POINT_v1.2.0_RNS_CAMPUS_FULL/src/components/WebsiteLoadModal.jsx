import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function WebsiteLoadModal() {
  const { popupModal } = useCampus();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Show modal automatically ONCE when visitor lands on Home Page ('/') if enabled
  useEffect(() => {
    const isClosed = sessionStorage.getItem('rns_popup_closed');
    if (location.pathname === '/' && popupModal?.enabled && !isClosed) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname, popupModal?.enabled]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('rns_popup_closed', 'true');
  };

  if (!isOpen || !popupModal || !popupModal.enabled) return null;

  const showImage = (popupModal.contentType === 'image' || popupModal.contentType === 'both') && popupModal.imageUrl;
  const showText = (popupModal.contentType === 'text' || popupModal.contentType === 'both');

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(5, 12, 26, 0.82)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={handleClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: showImage ? 'min(92vw, 850px)' : 'min(92vw, 580px)',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: 'rnsModalZoom 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Floating Top-Right Close X Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#091b36',
            color: '#ffffff',
            border: '2px solid #eab308',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
          }}
          title="Close Announcement"
        >
          <X size={18} />
        </button>

        {/* 1. IMAGE BANNER */}
        {showImage && (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            backgroundColor: '#091b36', 
            borderTopLeftRadius: '24px', 
            borderTopRightRadius: '24px', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: showText ? '16px 16px 0 16px' : '16px'
          }}>
            <img 
              src={popupModal.imageUrl} 
              alt={popupModal.title || 'Announcement Popup'} 
              style={{ 
                width: '100%', 
                height: 'auto',
                maxHeight: '75vh', 
                objectFit: 'contain', 
                borderRadius: '16px',
                display: 'block' 
              }}
            />
          </div>
        )}

        {/* 2. TEXT BODY */}
        {showText && (
          <div style={{ padding: showImage ? '28px 32px 32px 32px' : '36px 36px 36px 36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', width: 'fit-content' }}>
              <Sparkles size={13} /> OFFICIAL ANNOUNCEMENT
            </div>

            {popupModal.title && (
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#091b36', lineHeight: 1.35, margin: 0 }}>
                {popupModal.title}
              </h2>
            )}

            {popupModal.subtitle && (
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-line' }}>
                {popupModal.subtitle}
              </p>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
