import React, { useState, useEffect } from 'react';
import { X, Share2, Facebook, Copy, Check, Image as ImageIcon } from 'lucide-react';

export default function EventModal({ event, onClose }) {
  const [copied, setCopied] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  const getEventShareUrl = () => {
    const origin = window.location.origin;
    const identifier = event.slug || event.id;
    return `${origin}/events?event=${encodeURIComponent(identifier)}`;
  };

  const handleCopyLink = () => {
    const shareUrl = getEventShareUrl();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFacebookShare = () => {
    const shareUrl = getEventShareUrl();
    const encodedUrl = encodeURIComponent(shareUrl);
    const facebookSharerUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(facebookSharerUrl, '_blank', 'width=620,height=580,toolbar=no,menubar=no,scrollbars=yes');
  };

  // Dynamic gallery photos or fallback to event cover image
  const galleryPhotos = (event.gallery && event.gallery.length > 0) 
    ? event.gallery 
    : [event.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80'];

  const currentHeroImage = selectedGalleryImage || event.image || galleryPhotos[0];

  return (
    <div 
      onClick={onClose} /* Close when backdrop is clicked */
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
      
      {/* Modal Dialog Container */}
      <div 
        onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking inside modal content */
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '850px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          animation: 'rnsModalZoom 0.25s ease-out'
        }}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(5, 12, 26, 0.75)',
            color: '#ffffff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
          title="Close Modal"
        >
          <X size={20} />
        </button>

        {/* 1. CLEAN FEATURED HERO IMAGE */}
        <div style={{ position: 'relative', height: '320px', backgroundColor: '#091b36' }}>
          <img 
            src={currentHeroImage} 
            alt={event.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ padding: '24px 32px 36px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 2. EVENT PHOTO GALLERY MOVED DIRECTLY BELOW FEATURED IMAGE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={18} style={{ color: '#d97706' }} />
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#091b36', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Event Photo Gallery
              </h4>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px'
            }}>
              {galleryPhotos.map((photo, pidx) => (
                <div 
                  key={pidx}
                  onClick={() => setSelectedGalleryImage(photo)}
                  style={{
                    height: '80px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: currentHeroImage === photo ? '3px solid #eab308' : '2px solid #e2e8f0',
                    transition: 'transform 0.2s ease, border-color 0.2s ease'
                  }}
                >
                  <img 
                    src={photo} 
                    alt={`Gallery preview ${pidx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 3. EVENT TITLE & MAIN CONTENT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#091b36', lineHeight: 1.3 }}>
              {event.title}
            </h2>

            {event.excerpt && (
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#334155', lineHeight: 1.7 }}>
                {event.excerpt}
              </p>
            )}

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {event.content || 'Roopnagar Nandaraj Sangraula Campus regularly organizes community outreach initiatives, academic seminars, and practical workshops to foster student empowerment, civic leadership, and holistic skill development. All faculty members, students, guardians, and local citizens are warmly invited to participate.'}
            </p>
          </div>

          {/* 4. SOCIAL SHARE BAR */}
          <div style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Share2 size={14} /> Share Event:
              </span>

              {/* Facebook Share */}
              <button 
                onClick={handleFacebookShare}
                style={{
                  backgroundColor: '#1877f2',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Facebook size={14} /> Share on Facebook
              </button>

              {/* Copy Link */}
              <button 
                onClick={handleCopyLink}
                style={{
                  backgroundColor: copied ? '#10b981' : '#091b36',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Link Copied!' : 'Copy Link'}
              </button>
            </div>

            <button 
              onClick={onClose}
              className="rns-btn-donate" 
              style={{ fontSize: '12px', padding: '8px 24px' }}
            >
              Close Preview
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
