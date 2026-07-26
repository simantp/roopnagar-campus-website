import React, { useEffect } from 'react';
import { X, Image as ImageIcon, ExternalLink, Calendar } from 'lucide-react';
import FormattedHtml from './FormattedHtml';

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
    const safeTitle = (notice.title || 'Notice Document Attachment').replace(/"/g, '&quot;');

    const imageWin = window.open('', '_blank');
    if (imageWin) {
      imageWin.document.write(`
        <!DOCTYPE html>
        <html lang="ne">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${safeTitle} — Full Size Document Scan</title>
            <style>
              * { box-sizing: border-box; margin: 0; padding: 0; }
              body {
                background-color: #050c1a;
                color: #ffffff;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
              }
              .toolbar {
                position: sticky;
                top: 0;
                z-index: 100;
                background-color: #091b36;
                border-bottom: 1px solid rgba(255,255,255,0.15);
                padding: 12px 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.4);
              }
              .title-box {
                font-size: 14px;
                font-weight: 700;
                color: #fbbf24;
                max-width: 600px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .btn-group {
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .btn {
                background-color: #1e293b;
                color: #ffffff;
                border: 1px solid rgba(255,255,255,0.25);
                padding: 8px 16px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s ease;
              }
              .btn:hover {
                background-color: #eab308;
                color: #050c1a;
              }
              .image-container {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                overflow: auto;
                background-color: #050c1a;
              }
              .img-view {
                max-width: 100%;
                height: auto;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.7);
                border: 1px solid rgba(255,255,255,0.1);
                transition: transform 0.2s ease;
                cursor: zoom-in;
              }
              .img-view.full-zoom {
                max-width: none !important;
                width: auto !important;
                cursor: zoom-out;
              }
            </style>
          </head>
          <body>
            <div class="toolbar">
              <div class="title-box">📄 ${safeTitle}</div>
              <div class="btn-group">
                <button class="btn" onclick="toggleZoom()">🔍 Toggle 100% Full Resolution</button>
                <a class="btn" href="${imgUrl}" download="Notice_Document_Scan.png">💾 Download Image Scan</a>
                <button class="btn" onclick="window.close()" style="background-color: #ef4444; border: none;">✕ Close Tab</button>
              </div>
            </div>
            <div class="image-container">
              <img id="scannedImg" class="img-view" src="${imgUrl}" alt="${safeTitle}" onclick="toggleZoom()" title="Click image to toggle between Fit Screen and 100% Full Resolution" />
            </div>
            <script>
              function toggleZoom() {
                var img = document.getElementById('scannedImg');
                img.classList.toggle('full-zoom');
              }
            </script>
          </body>
        </html>
      `);
      imageWin.document.close();
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
            marginBottom: noticeImages.length > 0 ? '28px' : '20px',
            backgroundColor: noticeImages.length === 0 ? '#f8fafc' : 'transparent',
            padding: noticeImages.length === 0 ? '20px' : '0',
            borderRadius: noticeImages.length === 0 ? '16px' : '0',
            border: noticeImages.length === 0 ? '1px solid #e2e8f0' : 'none'
          }}>
            <FormattedHtml content={notice.content || notice.fullNotice || notice.summary} />
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
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#091b36',
                    width: '100%',
                    cursor: 'pointer',
                    border: '2px solid #e2e8f0',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s ease, boxShadow 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
                  }}
                  title="Click to view full-size image scan in a new tab"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Notice Attachment Scan ${idx + 1}`}
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      maxHeight: '650px', 
                      objectFit: 'contain', 
                      display: 'block' 
                    }}
                  />

                  {/* Open in New Tab Hint Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(9, 27, 54, 0.85)',
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
                    <ExternalLink size={13} style={{ color: '#fbbf24' }} /> Click to View Full Size in New Tab
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
