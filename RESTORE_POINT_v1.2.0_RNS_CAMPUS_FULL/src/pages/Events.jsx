import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { getCleanExcerpt, generateSlug } from '../utils/textUtils';

export default function Events() {
  const { events } = useCampus();
  const eventsList = events || [];
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8; // 8 events per page
  const totalPages = Math.ceil(eventsList.length / ITEMS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEvents = eventsList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 280, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px', backgroundColor: '#f8fafc' }}>
      
      {/* Dark Banner */}
      <div className="rns-banner">
        <h1 className="rns-banner-title">Campus Events</h1>
        <div className="rns-banner-breadcrumb">
          <Link to="/">Home</Link> / <span>Events</span>
        </div>
      </div>

      <div className="rns-container" style={{ paddingTop: '40px' }}>
        
        {/* Events Grid (8 Items per Page, 4-Col Grid) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          {currentEvents.map((evt) => {
            const eventSlug = (evt.slug && isNaN(Number(evt.slug))) ? evt.slug : generateSlug(evt.title);

            return (
              <Link 
                key={evt.id} 
                to={`/events/${eventSlug}`}
                className="rns-card" 
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Top Image and Text Wrapper */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  
                  {/* Image Box */}
                  <div style={{ position: 'relative', height: '170px', backgroundColor: '#091b36', overflow: 'hidden', flexShrink: 0 }}>
                    <img 
                      src={evt.image} 
                      alt={evt.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    
                    {/* Click Overlay Indicator */}
                    <div style={{
                      position: 'absolute', inset: 0, backgroundColor: 'rgba(9,27,54,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0,
                      transition: 'opacity 0.2s ease', color: '#ffffff'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                    >
                      <span style={{ backgroundColor: 'rgba(5,12,26,0.85)', padding: '6px 14px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Eye size={14} /> View Details & Gallery
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.4, color: '#091b36' }}>
                      {evt.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginTop: 'auto' }}>
                      {getCleanExcerpt(evt.excerpt || evt.content, 120) || 'No description available.'}
                    </p>
                  </div>

                </div>

                {/* Bottom Card Bar - PINNED TO THE EXACT BOTTOM */}
                <div style={{
                  padding: '12px 18px',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  fontSize: '11px',
                  color: '#d97706',
                  fontWeight: 700,
                  marginTop: 'auto'
                }}>
                  <span>View Details →</span>
                </div>

              </Link>
            );
          })}
        </div>

        {/* Functional Interactive Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '50px' }}>
          
          {/* Prev Button */}
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rns-btn-outline" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              opacity: currentPage === 1 ? 0.4 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronLeft size={14} /> Prev
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: currentPage === pageNum ? '#1b2a54' : '#f1f5f9',
                color: currentPage === pageNum ? '#ffffff' : '#334155',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: currentPage === pageNum ? '0 4px 10px rgba(27, 42, 84, 0.3)' : 'none'
              }}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Button */}
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rns-btn-outline" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              opacity: currentPage === totalPages ? 0.4 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Next <ChevronRight size={14} />
          </button>

        </div>

      </div>

    </div>
  );
}
