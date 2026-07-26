import React, { useEffect } from 'react';
import { X, User, Download, Share2, Facebook, Copy, Check, Printer } from 'lucide-react';
import FormattedHtml from './FormattedHtml';

export default function ChronicleModal({ chronicle, onClose }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!chronicle) return null;

  const handleDownloadPDF = () => {
    if (chronicle.pdfUrl) {
      const link = document.createElement('a');
      link.href = chronicle.pdfUrl;
      link.download = chronicle.pdfFileName || `${chronicle.slug || 'chronicle'}_document.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.print();
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/chronicles/${chronicle.slug || chronicle.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFacebookShare = () => {
    const shareUrl = encodeURIComponent(`${window.location.origin}/chronicles/${chronicle.slug || chronicle.id}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(9, 27, 54, 0.8)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          border: '1px solid rgba(234, 179, 8, 0.3)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div style={{
          backgroundColor: '#091b36',
          color: '#ffffff',
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #eab308'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#eab308', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: 'rgba(234, 179, 8, 0.15)', padding: '4px 10px', borderRadius: '6px' }}>
              Campus Chronicle Article
            </span>
          </div>

          <button 
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Close Modal (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '32px 36px', overflowY: 'auto', flex: 1 }}>
          
          {/* Author Badge & Photo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '1px solid #f1f5f9'
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden',
              backgroundColor: '#091b36', border: '2px solid #eab308', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              {chronicle.authorImage ? (
                <img src={chronicle.authorImage} alt={chronicle.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={22} style={{ color: '#eab308' }} />
              )}
            </div>

            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#091b36' }}>
                ✍️ {chronicle.author || 'Campus Editorial Board'}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>
                Roopnagar Nandaraj Sangraula Campus Publications
              </div>
            </div>
          </div>

          {/* Article Title */}
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '28px',
            fontWeight: 900,
            color: '#091b36',
            lineHeight: 1.35,
            marginBottom: '24px'
          }}>
            {chronicle.title}
          </h2>

          {/* PDF Download Bar (If PDF Attached) */}
          {chronicle.pdfUrl && (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1.5px solid #86efac',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>📄</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#14532d' }}>
                    Official PDF Document Attached
                  </div>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>
                    {chronicle.pdfFileName || 'Chronicle_Article.pdf'}
                  </div>
                </div>
              </div>

              <button 
                type="button"
                onClick={handleDownloadPDF}
                style={{
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 800,
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
                }}
              >
                <Download size={16} /> Download Article PDF
              </button>
            </div>
          )}

          {/* Full Rich Text Article Content */}
          <div style={{ paddingBottom: '20px' }}>
            <FormattedHtml content={chronicle.content || (chronicle.fullContent ? chronicle.fullContent.map(p => `<p>${p}</p>`).join('') : chronicle.excerpt)} />
          </div>

        </div>

        {/* Modal Bottom Footer Actions */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Facebook Share */}
            <button 
              type="button"
              onClick={handleFacebookShare}
              style={{
                backgroundColor: '#1877f2',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: '9999px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Facebook size={14} /> Share
            </button>

            {/* Copy Link */}
            <button 
              type="button"
              onClick={handleCopyLink}
              style={{
                backgroundColor: copied ? '#10b981' : '#ffffff',
                color: copied ? '#ffffff' : '#334155',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Link Copied!' : 'Copy Link'}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rns-btn-outline"
            style={{ fontSize: '12px', padding: '8px 20px', borderRadius: '8px' }}
          >
            Close Article
          </button>
        </div>

      </div>
    </div>
  );
}
