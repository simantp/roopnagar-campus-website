import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Users, Award, Monitor, Edit3, 
  BarChart2, User, Newspaper, CheckCircle, Bell, ArrowUpRight
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function Home({ onSelectNotice, onOpenProfile }) {
  const { info, home, notices, chairmanMessage, chiefMessage } = useCampus();
  
  const noticesList = notices || [];
  const latestNotice = noticesList[0];

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', paddingBottom: '90px' }}>
      
      {/* 1. HERO BANNER WITH BACKGROUND IMAGE */}
      <section style={{
        position: 'relative',
        backgroundColor: '#091b36',
        color: '#ffffff',
        padding: '95px 20px 105px 20px',
        overflow: 'hidden'
      }}>
        {/* Background Campus Photo - Dynamic from Admin */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url("${home.heroBgImage || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.45,
          pointerEvents: 'none'
        }} />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(9, 27, 54, 0.82) 0%, rgba(15, 23, 42, 0.70) 60%, rgba(9, 27, 54, 0.85) 100%)',
          pointerEvents: 'none'
        }} />

        <div className="rns-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px' }}>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '6px 16px',
              borderRadius: '30px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#eab308',
              letterSpacing: '1px',
              marginBottom: '24px'
            }}>
              <Award size={14} />
              <span>{home.heroBadge}</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(34px, 5vw, 54px)',
              fontWeight: 900,
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '20px'
            }}>
              {home.heroTitlePrefix}
              <span style={{ color: '#eab308', display: 'inline-block', position: 'relative' }}>
                {home.heroTitleHighlight}
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(14px, 2vw, 17px)',
              color: '#cbd5e1',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '720px'
            }}>
              {home.heroSubtitle}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/about" className="rns-btn-donate" style={{ padding: '14px 32px', fontSize: '14px' }}>
                {(!home.heroBtn1Text || home.heroBtn1Text === 'Explore Our History') ? 'Know More About Us' : home.heroBtn1Text} <ArrowRight size={16} />
              </Link>
              
              <Link to="/donate" className="rns-btn-outline" style={{ padding: '14px 32px', fontSize: '14px', borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}>
                {home.heroBtn2Text || 'Support Our Students'}
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* NOTICES MARQUEE TICKER BAR */}
      {noticesList && noticesList.length > 0 && (
        <div style={{
          backgroundColor: '#050c1a',
          color: '#ffffff',
          padding: '10px 0',
          borderBottom: '2px solid #eab308',
          fontSize: '13px',
          fontWeight: 700
        }}>
          <div className="rns-container" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              backgroundColor: '#eab308',
              color: '#091b36',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Bell size={13} /> NOTICES
            </div>
            <marquee behavior="scroll" direction="left" scrollamount="6" style={{ flex: 1, color: '#f1f5f9' }}>
              {noticesList.map((n) => (
                <span 
                  key={n.id} 
                  onClick={() => onSelectNotice(n)}
                  style={{ cursor: 'pointer', marginRight: '45px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span style={{ color: '#eab308' }}>★</span> <strong style={{ color: '#fbbf24' }}>[{n.category}]</strong> {n.title} ({n.date})
                </span>
              ))}
            </marquee>
          </div>
        </div>
      )}

      {/* 2. LATEST NOTICE HIGHLIGHT BAR (Theme Navy Background & Clickable Modal) */}
      {latestNotice && (
        <section className="rns-container" style={{ marginTop: '30px', position: 'relative', zIndex: 10 }}>
          <div 
            onClick={() => onSelectNotice(latestNotice)}
            style={{
              backgroundColor: '#091b36',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '22px 28px',
              boxShadow: '0 15px 35px rgba(9,27,54,0.18)',
              border: '1px solid #1e293b',
              borderLeft: '5px solid #eab308',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, boxShadow 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '44px', height: '44px', backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#eab308',
                borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                border: '1px solid rgba(234, 179, 8, 0.3)'
              }}>
                <Bell size={22} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#eab308', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📢 LATEST ANNOUNCEMENT</span>
                  {latestNotice.category && (
                    <span style={{ backgroundColor: 'rgba(234, 179, 8, 0.2)', padding: '2px 8px', borderRadius: '4px', color: '#fbbf24' }}>
                      [{latestNotice.category}]
                    </span>
                  )}
                  {latestNotice.date && <span>• {latestNotice.date}</span>}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginTop: '4px', lineHeight: 1.3 }}>
                  {latestNotice.title}
                </div>
              </div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); onSelectNotice(latestNotice); }}
              className="rns-btn-donate" 
              style={{ fontSize: '12px', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}
            >
              View Notice Details <ArrowRight size={14} />
            </button>
          </div>
        </section>
      )}

      {/* 3. OUR REGULAR PROGRAMS */}
      <section className="rns-container" style={{ marginTop: '70px' }}>
        <div className="rns-section-head">
          <div className="rns-sub-tag">{home.programSubtag || 'ACADEMIC PATH'}</div>
          <h2 className="rns-sec-title">{home.programTitle || 'Our Regular Programs'}</h2>
        </div>

        <div className="rns-card" style={{ padding: '40px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{
                backgroundColor: '#091b36', color: '#ffffff', fontSize: '11px', fontWeight: 800,
                padding: '4px 12px', borderRadius: '4px', width: 'fit-content'
              }}>
                {home.programCardTag || 'BBS Program'}
              </span>

              <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#091b36' }}>
                {home.programCardTitle || 'Bachelor in Business Studies (BBS)'}
              </h3>

              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>
                {home.programCardDesc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  <CheckCircle size={16} style={{ color: '#16a34a' }} />
                  <span>{home.programCheckmark1 || 'TU Curriculum'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  <CheckCircle size={16} style={{ color: '#16a34a' }} />
                  <span>{home.programCheckmark2 || 'Expert Professors'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  <CheckCircle size={16} style={{ color: '#16a34a' }} />
                  <span>{home.programCheckmark3 || 'Social Science Integration'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  <CheckCircle size={16} style={{ color: '#16a34a' }} />
                  <span>{home.programCheckmark4 || 'Modern Research Methods'}</span>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <Link to="/academics" className="rns-btn-donate" style={{ fontSize: '13px', padding: '10px 24px' }}>
                  View Full Curriculum & Faculty <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Photo */}
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '320px' }}>
              <img 
                src={home.programPhotoUrl || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'} 
                alt="RNS BBS Campus Hall" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(9, 27, 54, 0.95), transparent)',
                padding: '24px', color: '#ffffff'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#eab308' }}>
                  {home.programPhotoTag || '🏛 BBS CAMPUS HALL'}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800 }}>
                  {home.programPhotoTitle || 'Faculty of Management'}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOLISTIC SKILL DEVELOPMENT (6 GRID CARDS) */}
      <section className="rns-container" style={{ marginTop: '80px' }}>
        <div className="rns-section-head">
          <div className="rns-sub-tag">{home.skillSubtag || 'HOLISTIC SKILL DEVELOPMENT'}</div>
          <h2 className="rns-sec-title">{home.skillTitle || 'Beyond The Curriculum'}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {home.skillsList.map((sk) => (
            <div key={sk.id} className="rns-card" style={{ padding: '0', overflow: 'hidden', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={sk.photo} 
                  alt={sk.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  backgroundColor: '#091b36', color: '#eab308',
                  fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '4px'
                }}>
                  {sk.yearModule}
                </div>
              </div>
              
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#091b36', marginBottom: '10px' }}>
                    {sk.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                    {sk.desc}
                  </p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#091b36' }}>INCLUDED IN TU BBS</span>
                  <ArrowRight size={14} style={{ color: '#eab308' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MESSAGES OF ENCOURAGEMENT (CHAIRMAN & CAMPUS CHIEF) */}
      <section className="rns-container" style={{ marginTop: '80px' }}>
        <div className="rns-section-head">
          <div className="rns-sub-tag">{home.leadersSubtag || 'OUR LEADERS'}</div>
          <h2 className="rns-sec-title">{home.leadersTitle || 'Messages of Encouragement'}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
          
          {/* Chairman Card */}
          <div className="rns-card" style={{ padding: '36px', backgroundColor: '#ffffff', borderTop: '4px solid #091b36', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <img 
                  src={chairmanMessage?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"} 
                  alt={home.chairmanName || "Giriraj Sangraula"} 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #eab308' }}
                />
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#091b36', margin: 0 }}>
                    {home.chairmanName || "Giriraj Sangraula"}
                  </h4>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#d97706', marginTop: '2px' }}>
                    {home.chairmanRole || "Chairman, Board of Directors"}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, fontStyle: 'italic' }}>
                {home.chairmanQuote}
              </p>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <Link to="/message-from-chairman" style={{ fontSize: '12px', fontWeight: 800, color: '#091b36', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Read Full Chairman Message <ArrowRight size={14} style={{ color: '#eab308' }} />
              </Link>
            </div>
          </div>

          {/* Campus Chief Card */}
          <div className="rns-card" style={{ padding: '36px', backgroundColor: '#ffffff', borderTop: '4px solid #eab308', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <img 
                  src={chiefMessage?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"} 
                  alt={home.chiefName || "Prof. Deepak Gajurel"} 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #091b36' }}
                />
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#091b36', margin: 0 }}>
                    {home.chiefName || "Prof. Deepak Gajurel"}
                  </h4>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#091b36', marginTop: '2px' }}>
                    {home.chiefRole || "Campus Chief"}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, fontStyle: 'italic' }}>
                {home.chiefQuote}
              </p>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <Link to="/message-from-campus-chief" style={{ fontSize: '12px', fontWeight: 800, color: '#091b36', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Read Full Campus Chief Message <ArrowRight size={14} style={{ color: '#eab308' }} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. ACADEMIC MILESTONE BANNER */}
      <section className="rns-container" style={{ marginTop: '80px' }}>
        <div style={{
          backgroundColor: '#091b36',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '50px 40px',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(234, 179, 8, 0.15) 0%, transparent 50%)'
        }}>
          <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#eab308', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              {home.milestoneBadge || 'ACADEMIC MILESTONE'}
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '16px', lineHeight: 1.3 }}>
              {home.milestoneTitle}
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
              {home.milestoneDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER STATS COUNTERS */}
      <section className="rns-container" style={{ marginTop: '70px' }}>
        <div className="rns-card" style={{ padding: '40px 20px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '30px', textAlign: 'center' }}>
            
            <div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#091b36' }}>{home.statYears}</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginTop: '4px' }}>
                {home.statYearsLabel || 'YEARS OF EXCELLENCE'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#091b36' }}>{home.statPassRate}</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginTop: '4px' }}>
                {home.statPassRateLabel || 'BBS PASS RATE (TU HIGH)'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#091b36' }}>{home.statModules}</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginTop: '4px' }}>
                {home.statModulesLabel || 'PRACTICAL SKILL MODULES'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#091b36' }}>{home.statVisitors}</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginTop: '4px' }}>
                {home.statVisitorsLabel || 'COMMUNITY VISITORS'}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
