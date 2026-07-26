import React, { useEffect } from 'react';
import { X, Image as ImageIcon, ExternalLink, Calendar } from 'lucide-react';

export default function NoticeModal({ notice, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!notice) return null;

  // Notice Attachment / Scan Images (Supports up to 5 images, text-only if empty)
  const noticeImages = (notice.images && Array.isArray(notice.images))
    ? notice.images.filter(Boolean).slice(0, 5)
    : [];

  const handleOpenFullImage = (imgUrl) => {
    if (!imgUrl) return;
    if (imgUrl.startsWith('data:')) {
      const imageWin = window.open();
      if (imageWin) {
        const safeTitle = (notice.title || 'Notice Attachment').replace(/"/g, '&quot;');
        imageWin.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${safeTitle}</title>
              <style>
                body {
                  margin: 0;
                  background-color: #091b36;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  font-family: system-ui, -apple-system, sans-serif;
                  color: #ffffff;
                  padding: 20px;
                  box-sizing: border-box;
                }
                img {
                  max-width: 100%;
                  max-height: 90vh;
                  object-fit: contain;
                  border-radius: 12px;
                  box-shadow: 0 25px 50px rgba(0,0,0,0.6);
                  cursor: pointer;
                }
                .caption {
                  margin-top: 16px;
                  font-size: 14px;
                  color: #fbbf24;
                  font-weight: 700;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <img src="${imgUrl}" alt="Notice Full Size" title="Click to close viewer" onclick="window.close()" />
              <div class="caption">Roopnagar Nandaraj Sangraula Campus — Notice Document</div>
            </body>
          </html>
        `);
        imageWin.document.close();
      }
    } else {
      window.open(imgUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Determine dynamic grid columns based on image count
  const getImageGridColumns = (count) => {
    if (count === 1) return '1fr';
    if (count === 2) return 'repeat(auto-fit, minmax(280px, 1fr))';
    if (count === 3) return 'repeat(auto-fit, minmax(220px, 1fr))';
    return 'repeat(auto-fit, minmax(200px, 1fr))';
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
        backgroundColor: 'rgba(5, 12, 26, 0.84)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking inside modal */
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: noticeImages.length === 1 ? '680px' : '820px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '36px',
          position: 'relative',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          animation: 'rnsModalZoom 0.25s ease-out'
        }}
      >
        {/* Close Button */}
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
            cursor: 'pointer',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s ease'
          }}
          title="Close Modal"
        >
          <X size={18} />
        </button>

        {/* Category & Date Header Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: '#fef3c7', color: '#b45309', fontSize: '11px', fontWeight: 800, padding: '4px 14px', borderRadius: '9999px', textTransform: 'uppercase' }}>
            {notice.category || 'General Notice'}
          </span>
          {notice.date && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
              <Calendar size={13} /> {notice.date}
            </span>
          )}
        </div>

        {/* Notice Title */}
        <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#091b36', marginBottom: '16px', lineHeight: 1.4 }}>
          {notice.title}
        </h2>

        {/* Text Content Paragraphs (Supports fullNotice, content, or summary) */}
        {(notice.content || notice.fullNotice || notice.summary) && (
          <div style={{
            fontSize: '14px',
            color: '#334155',
            lineHeight: 1.8,
            marginBottom: noticeImages.length > 0 ? '28px' : '20px',
            whiteSpace: 'pre-line',
            backgroundColor: noticeImages.length === 0 ? '#f8fafc' : 'transparent',
            padding: noticeImages.length === 0 ? '20px' : '0',
            borderRadius: noticeImages.length === 0 ? '16px' : '0',
            border: noticeImages.length === 0 ? '1px solid #e2e8f0' : 'none'
          }}>
            {notice.content || notice.fullNotice || notice.summary}
          </div>
        )}

        {/* Dynamic Image Gallery (Only renders if notice has 1 to 5 images) */}
        {noticeImages.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#091b36', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <ImageIcon size={16} style={{ color: '#d97706' }} /> Official Attachment Scans ({noticeImages.length})
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: getImageGridColumns(noticeImages.length),
              gap: '16px'
            }}>
              {noticeImages.map((imgUrl, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleOpenFullImage(imgUrl)}
                  style={{
                    position: 'relative',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    backgroundColor: '#091b36',
                    height: noticeImages.length === 1 ? '380px' : '230px',
                    cursor: 'pointer',
                    border: '2px solid #e2e8f0',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                    transition: 'transform 0.2s ease, boxShadow 0.2s ease'
                  }}
                  title="Click to view image in full size in a new tab"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Notice Attachment Scan ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#091b36' }}
                  />

                  {/* Open in New Tab Hint Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(9, 27, 54, 0.78)',
                    color: '#ffffff',
                    padding: '8px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    backdropFilter: 'blur(4px)'
                  }}>
                    <ExternalLink size={13} style={{ color: '#fbbf24' }} /> Click to View Full Size (New Tab)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="rns-btn-donate" style={{ fontSize: '12px', padding: '10px 28px', borderRadius: '10px' }}>
            Close Notice Preview
          </button>
        </div>

      </div>
    </div>
  );
}
