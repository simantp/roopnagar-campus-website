import React from 'react';
import { useCampus } from '../context/CampusContext';

export default function Academics() {
  const { academics } = useCampus();
  const bbsProgram = academics ? { title: academics.bbsTitle, description: academics.bbsDesc, years: academics.bbsYears } : { title: '', description: '', years: [] };
  const teachingMembers = academics ? academics.teachingMembers : [];
  const administrativeStaff = academics ? academics.administrativeStaff : [];

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      
      <div className="rns-banner">
        <h1 className="rns-banner-title">{academics?.bannerTitle || 'Academics & Faculty'}</h1>
        <div className="rns-banner-breadcrumb">
          Home / Academics / <span>Faculty Directory</span>
        </div>
      </div>

      <div className="rns-container" style={{ paddingTop: '40px' }}>
        
        {/* BBS Section */}
        <section style={{ marginBottom: '60px' }}>
          <div className="rns-section-head">
            <h2 className="rns-sec-title">{bbsProgram.title}</h2>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
              {bbsProgram.description}
            </p>
          </div>

          <div className="rns-grid-4">
            {bbsProgram.years && bbsProgram.years.map((y, idx) => (
              <div key={idx} className="rns-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {y.year}
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                  {y.title}
                </h3>
                <p style={{ fontSize: '11px', color: '#64748b', leading: 1.5 }}>
                  {y.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Faculty Directory Section (Teaching Members with Images & NO social icons) */}
        <section style={{ marginBottom: '60px' }}>
          <div className="rns-section-head">
            <div className="rns-sub-tag">FACULTY DIRECTORY</div>
            <h2 className="rns-sec-title">Faculty Members</h2>
          </div>

          <div className="rns-grid-4">
            {teachingMembers.map((member, idx) => (
              <div key={idx} className="rns-card" style={{ textAlign: 'center', padding: '24px 16px' }}>
                
                {/* CIRCULAR MEMBER PROFILE IMAGE OR INITIALS FALLBACK */}
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 14px auto',
                  border: '3px solid #eab308',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backgroundColor: '#091b36',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <span>{member.initials || member.name?.slice(0,2)?.toUpperCase()}</span>
                  )}
                </div>

                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#091b36', marginBottom: '4px' }}>
                  {member.name}
                </h3>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', lineHeight: 1.4 }}>
                  {member.role}
                </div>
                {/* Social media icons completely removed as requested */}
              </div>
            ))}
          </div>
        </section>

        {/* Administrative Staff Section */}
        <section>
          <div className="rns-section-head">
            <div className="rns-sub-tag">SUPPORT TEAM</div>
            <h2 className="rns-sec-title">Administrative Staff</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxWidth: '650px', margin: '0 auto' }}>
            {administrativeStaff.map((staff, idx) => (
              <div key={idx} className="rns-card" style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 14px auto',
                  border: '3px solid #cbd5e1',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  backgroundColor: '#091b36',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {staff.image ? (
                    <img 
                      src={staff.image} 
                      alt={staff.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <span>{staff.initials || staff.name?.slice(0,2)?.toUpperCase()}</span>
                  )}
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#091b36', marginBottom: '4px' }}>
                  {staff.name}
                </h3>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#d97706', textTransform: 'uppercase' }}>
                  {staff.role}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
