import React from 'react';
import { Link } from 'react-router-dom';
import { useCampus } from '../context/CampusContext';

export default function BoardOfDirectors() {
  const { boardOfDirectors } = useCampus();
  const chairman = boardOfDirectors ? boardOfDirectors.chairman : { name: '', role: '', image: '' };
  const members = boardOfDirectors ? boardOfDirectors.members : [];

  return (
    <div style={{ backgroundColor: '#f4f6fa', color: '#0f172a', paddingBottom: '100px', minHeight: '100vh' }}>
      
      {/* 1. DARK NAVY HEADER BANNER */}
      <div className="rns-banner">
        <h1 className="rns-banner-title">Board of Directors</h1>
        <div className="rns-banner-breadcrumb">
          <Link to="/">Home</Link> / <span>Board of Directors</span>
        </div>
      </div>

      <div className="rns-container" style={{ paddingTop: '60px' }}>
        
        {/* 2. TOP CHAIRMAN PORTRAIT BLOCK */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '70px'
        }}>
          <div style={{
            width: '210px',
            height: '240px',
            backgroundColor: '#091b36',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            border: '4px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '36px'
          }}>
            {chairman.image ? (
              <img 
                src={chairman.image} 
                alt={chairman.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span>{chairman.name?.slice(0, 2)?.toUpperCase() || 'GS'}</span>
            )}
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '22px',
            fontWeight: 800,
            color: '#1e293b',
            marginBottom: '4px'
          }}>
            {chairman.name}
          </h2>

          <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
            {chairman.role}
          </div>
        </div>

        {/* 3. MEMBERS HIERARCHICAL GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '50px 30px',
          alignItems: 'start',
          textAlign: 'center'
        }}>
          {members.map((member, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <div style={{
                width: '150px',
                height: '170px',
                backgroundColor: '#091b36',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '14px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                border: '3px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '22px'
              }}>
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span>{member.initials || member.name?.slice(0, 2)?.toUpperCase()}</span>
                )}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '17px',
                fontWeight: 800,
                color: '#1e293b',
                marginBottom: '4px',
                lineHeight: 1.3
              }}>
                {member.name}
              </h3>

              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                {member.role}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
