import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, FileText, User, Bell, ArrowRight } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function Notices({ onSelectNotice }) {
  const { notices } = useCampus();
  const noticesList = notices || [];
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Notices');

  const categories = ['All Notices', 'Exams', 'Admissions', 'Holidays', 'Scholarships'];

  // Automatically detect ?notice=slug-or-id parameter in URL on initial mount and open notice modal
  useEffect(() => {
    const noticeQuery = searchParams.get('notice');
    if (noticeQuery && noticesList.length > 0 && onSelectNotice) {
      const targetNotice = noticesList.find(n =>
        (n.slug && n.slug.toLowerCase() === noticeQuery.toLowerCase()) ||
        String(n.id) === String(noticeQuery)
      );
      if (targetNotice) {
        onSelectNotice(targetNotice);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNoticeClick = (notice) => {
    if (onSelectNotice) {
      onSelectNotice(notice);
      const identifier = notice.slug || notice.id;
      setSearchParams({ notice: identifier });
    }
  };

  // Latest notice at top in a distinct featured section
  const latestNotice = noticesList[0];

  // Rest of the notices for the list below
  const remainingNotices = noticesList.slice(1);

  const filteredNotices = remainingNotices.filter(notice => {
    const titleMatch = (notice.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const summaryMatch = (notice.summary || '').toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = (notice.content || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || summaryMatch || contentMatch;
    
    const catMap = {
      'Scholarships': 'Scholarship',
      'Exams': 'Exams',
      'Admissions': 'Admission',
      'Holidays': 'Holidays'
    };
    const targetCat = catMap[selectedCategory] || selectedCategory;
    const matchesCategory = selectedCategory === 'All Notices' || (notice.category || '').includes(targetCat);
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px', backgroundColor: '#f8fafc' }}>
      
      {/* Dark Banner Header */}
      <div className="rns-banner">
        <h1 className="rns-banner-title">Official Notices</h1>
        <div className="rns-banner-breadcrumb">
          Home / <span>Notices</span>
        </div>
      </div>

      <div className="rns-container" style={{ paddingTop: '40px' }}>
        
        {/* 1. DISTINCT FEATURED LATEST NOTICE SECTION AT THE TOP (SHOWS "LATEST" ONLY) */}
        {latestNotice && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 14px',
              borderRadius: '9999px',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              <Bell size={13} /> LATEST
            </div>

            <div 
              onClick={() => handleNoticeClick(latestNotice)}
              className="rns-card" 
              style={{
                backgroundColor: '#091b36',
                color: '#ffffff',
                borderColor: '#1e293b',
                padding: '32px',
                borderRadius: '20px',
                boxShadow: '0 12px 30px rgba(9,27,54,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px',
                cursor: 'pointer'
              }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ backgroundColor: '#eab308', color: '#050c1a', fontSize: '11px', fontWeight: 800, padding: '3px 12px', borderRadius: '4px' }}>
                    {latestNotice.category}
                  </span>
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '8px', lineHeight: 1.3 }}>
                  {latestNotice.title}
                </h2>
                <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {latestNotice.summary}
                </p>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); handleNoticeClick(latestNotice); }}
                className="rns-btn-donate" 
                style={{ fontSize: '12px', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '6px', shrink: 0 }}
              >
                View Latest Notice Details <ArrowRight size={14} />
              </button>
            </div>
          </section>
        )}

        {/* 2. SEARCH & CATEGORY FILTER BAR */}
        <div className="rns-filter-bar">
          <div className="rns-search-box">
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search notices..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="rns-search-input"
            />
          </div>

          <div className="rns-pill-group">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`rns-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. REMAINING NOTICES CARDS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredNotices.map((notice) => (
            <div 
              key={notice.id} 
              onClick={() => handleNoticeClick(notice)}
              className="rns-card" 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
                cursor: 'pointer'
              }}
            >
              
              {/* Category Pill Badge */}
              <div style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  border: '1px solid #cbd5e1'
                }}>
                  {notice.category}
                </span>
              </div>

              {/* Title & Snippet */}
              <div style={{ flex: 1, minWidth: '260px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#091b36', marginBottom: '4px' }}>
                  {notice.title}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                  {notice.summary}
                </p>
              </div>

              {/* Right Action Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); handleNoticeClick(notice); }}
                className="rns-btn-outline"
              >
                View Details
              </button>

            </div>
          ))}
        </div>

      </div>

      {/* Floating Side Action Icons */}
      <div className="rns-floating-actions">
        <button 
          onClick={() => alert('Opening Campus Documentation Portal')}
          className="rns-float-btn rns-float-navy"
          title="Campus Portal"
        >
          <FileText size={20} />
        </button>
        <button 
          onClick={() => alert('Student / Admin Portal Login')}
          className="rns-float-btn rns-float-gold"
          title="Student Profile Login"
        >
          <User size={20} />
        </button>
      </div>

    </div>
  );
}
