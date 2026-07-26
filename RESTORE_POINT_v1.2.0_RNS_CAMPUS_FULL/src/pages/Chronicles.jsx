import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ArrowRight } from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { generateSlug } from '../utils/textUtils';

export default function Chronicles() {
  const { chronicles } = useCampus();
  const chroniclesList = chronicles || [];
  const [searchTerm, setSearchTerm] = useState('');

  const getExcerpt = (item) => {
    const rawText = item.excerpt || item.content || (item.fullContent ? item.fullContent.join(' ') : '');
    const clean = (rawText || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) return 'Read full chronicle article for complete details.';
    return clean.length > 160 ? clean.slice(0, 157).trim() + '...' : clean;
  };

  const filteredArticles = chroniclesList.filter(item => {
    const cardExcerpt = getExcerpt(item);
    return (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
           cardExcerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (item.author || '').toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px', backgroundColor: '#f8fafc' }}>
      
      {/* Dark Banner Header */}
      <div className="rns-banner">
        <h1 className="rns-banner-title">Campus Chronicles & Publications</h1>
        <div className="rns-banner-breadcrumb">
          <Link to="/">Home</Link> / <span>Chronicles</span>
        </div>
      </div>

      <div className="rns-container" style={{ paddingTop: '40px' }}>
        
        {/* Search Bar */}
        <div className="rns-filter-bar" style={{ justifyContent: 'center' }}>
          <div className="rns-search-box" style={{ maxWidth: '500px' }}>
            <Search size={14} style={{ position: 'absolute', left: '14px', top: '10px', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search articles, research papers, authors..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="rns-search-input"
              style={{ paddingLeft: '38px' }}
            />
          </div>
        </div>

        {/* Chronicles Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          {filteredArticles.map((item) => {
            const articleSlug = (item.slug && isNaN(Number(item.slug))) ? item.slug : generateSlug(item.title);

            return (
              <Link 
                key={item.id}
                to={`/chronicles/${articleSlug}`}
                className="rns-card" 
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyBetween: 'space-between',
                  height: '100%',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Main Content (Title & Excerpt) */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px', gap: '8px' }}>
                    <h3 style={{
                      fontSize: '17px',
                      fontWeight: 800,
                      color: '#091b36',
                      margin: 0,
                      lineHeight: 1.4
                    }}>
                      {item.title}
                    </h3>

                    {item.pdfUrl && (
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#16a34a', backgroundColor: '#dcfce7', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '10px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        📄 PDF
                      </span>
                    )}
                  </div>

                  <p style={{
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: 1.7,
                    marginTop: 'auto'
                  }}>
                    {getExcerpt(item)}
                  </p>
                </div>

                {/* Card Footer - SHOWS AUTHOR AVATAR & NAME */}
                <div style={{
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: '#64748b',
                  fontWeight: 600,
                  marginTop: 'auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', fontWeight: 700 }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#091b36', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #eab308' }}>
                      {item.authorImage ? (
                        <img src={item.authorImage} alt={item.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <User size={14} style={{ color: '#eab308' }} />
                      )}
                    </div>
                    <span>{item.author}</span>
                  </div>

                  <span style={{ color: '#d97706', fontWeight: 700, fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read Article <ArrowRight size={12} />
                  </span>
                </div>

              </Link>
            );
          })}
        </div>

      </div>

    </div>
  );
}
