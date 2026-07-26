import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Facebook, Copy, Check, Image as ImageIcon, Calendar } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  
  const { events } = useCampus();
  const eventsList = events || [];

  // Find event by slug or fallback by ID
  const event = eventsList.find(
    e => (e.slug && e.slug.toLowerCase() === slug?.toLowerCase()) || String(e.id) === String(slug)
  ) || eventsList[0];

  if (!event) {
    return (
      <div style={{ minHeight: '80vh', padding: '100px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#091b36', marginBottom: '16px' }}>Event Not Found</h2>
        <Link to="/events" className="rns-btn-donate">
          ← Return to All Events
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  // Gallery photos or fallback to cover image
  const galleryPhotos = (event.gallery && event.gallery.length > 0) 
    ? event.gallery 
    : [event.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80'];

  const currentHeroImage = selectedGalleryImage || event.image || galleryPhotos[0];

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px', backgroundColor: '#f8fafc' }}>
      
      {/* Dark Navy Header Banner */}
      <div className="rns-banner">
        <h1 className="rns-banner-title">Campus Event Details</h1>
        <div className="rns-banner-breadcrumb">
          <Link to="/">Home</Link> / <Link to="/events">Events</Link> / <span>Event</span>
        </div>
      </div>

      <div className="rns-container" style={{ paddingTop: '50px', maxWidth: '880px' }}>
        
        {/* Back Button */}
        <Link 
          to="/events"
          className="rns-btn-outline"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '30px',
            backgroundColor: '#ffffff'
          }}
        >
          <ArrowLeft size={16} /> Back to Events Page
        </Link>

        {/* Main Event Article Card */}
        <article className="rns-card" style={{ padding: '40px', backgroundColor: '#ffffff', borderRadius: '24px' }}>
          
          {/* Category / Event Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: '#fef3c7', padding: '4px 12px', borderRadius: '8px', border: '1px solid #fde68a' }}>
              🎯 Campus Event
            </span>
          </div>

          {/* Event Title */}
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '32px',
            fontWeight: 900,
            color: '#091b36',
            lineHeight: 1.3,
            marginBottom: '28px'
          }}>
            {event.title}
          </h1>

          {/* Featured Hero Cover Image */}
          {currentHeroImage && (
            <div style={{
              width: '100%',
              maxHeight: '480px',
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: '#091b36',
              marginBottom: '28px',
              boxShadow: '0 12px 30px rgba(9, 27, 54, 0.15)',
              border: '1px solid #e2e8f0'
            }}>
              <img 
                src={currentHeroImage} 
                alt={event.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
            </div>
          )}

          {/* Multi-Image Gallery Grid */}
          {galleryPhotos.length > 1 && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ImageIcon size={16} style={{ color: '#d97706' }} /> Event Photo Gallery ({galleryPhotos.length} Photos)
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
                gap: '12px'
              }}>
                {galleryPhotos.map((photoUrl, pIdx) => {
                  const isSelected = currentHeroImage === photoUrl;

                  return (
                    <div 
                      key={pIdx}
                      onClick={() => setSelectedGalleryImage(photoUrl)}
                      style={{
                        height: '75px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: isSelected ? '3px solid #eab308' : '1px solid #cbd5e1',
                        opacity: isSelected ? 1 : 0.75,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <img src={photoUrl} alt={`Gallery ${pIdx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Toolbar (Share / Copy Link) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '16px 20px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            marginBottom: '36px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              
              {/* Facebook Share */}
              <button 
                onClick={handleFacebookShare}
                style={{
                  backgroundColor: '#1877f2',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  border: 'none',
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
                  backgroundColor: copied ? '#10b981' : '#f1f5f9',
                  color: copied ? '#ffffff' : '#334155',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Link Copied!' : 'Copy Event Link'}
              </button>

            </div>
          </div>

          {/* Event Narrative Content Body */}
          <div style={{ fontSize: '16px', color: '#334155', lineHeight: 1.85 }}>
            {event.content ? (
              <div style={{ whiteSpace: 'pre-line' }}>{event.content}</div>
            ) : (
              <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.8 }}>
                {event.excerpt || 'No description available for this campus event.'}
              </p>
            )}
          </div>

          {/* Bottom Back Button */}
          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '40px', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/events" className="rns-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={14} /> Return to All Events
            </Link>

            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
              Roopnagar Nandaraj Sangraula Campus Events
            </span>
          </div>

        </article>

      </div>

    </div>
  );
}
