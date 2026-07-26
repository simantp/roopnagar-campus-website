import React, { useState } from 'react';
import { Landmark, Eye, Monitor, Code, Target, Award, FileText, Heart } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function About() {
  const { about } = useCampus();
  const [activeTab, setActiveTab] = useState('vision');

  // Split story into readable paragraphs if double newlines exist
  const storyParagraphs = about.story ? about.story.split('\n\n') : [about.p1, about.p2, about.p3].filter(Boolean);

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', paddingBottom: '90px' }}>
      
      {/* 1. DARK NAVY BANNER HEADER */}
      <div className="rns-banner">
        <h1 className="rns-banner-title">{about.bannerTitle || 'About Our Institution'}</h1>
        <div className="rns-banner-breadcrumb">
          Home / <span>About</span>
        </div>
      </div>

      <div className="rns-container" style={{ paddingTop: '50px' }}>
        
        {/* 2. TOP SPLIT SECTION WITH LEFT CARD IMAGE BELOW */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '50px',
          alignItems: 'start',
          marginBottom: '80px'
        }}>
          
          {/* Left Column: Brand Card + Image Below */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '380px' }}>
            <div className="rns-card" style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '36px 30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Landmark size={20} style={{ color: '#d97706' }} />
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#091b36' }}>
                  {about.cardName || 'RNS Campus'}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.7 }}>
                {about.cardDesc}
              </p>
            </div>

            {/* Display Image Below Left Card */}
            {about.cardPhoto && (
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                height: '240px',
                border: '1px solid #e2e8f0'
              }}>
                <img 
                  src={about.cardPhoto} 
                  alt="RNS Campus Profile" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            )}
          </div>

          {/* Right Text Block (Single Content Writing Narrative) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#091b36', lineHeight: 1.3 }}>
              {about.headline}
            </h2>
            
            {storyParagraphs.map((para, idx) => (
              <p key={idx} style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {para}
              </p>
            ))}
          </div>

        </div>

        {/* 3. LEARNING ENVIRONMENT - OUR INFRASTRUCTURE */}
        <section style={{ marginBottom: '80px' }}>
          <div className="rns-section-head">
            <div className="rns-sub-tag">{about.infraSubtag || 'LEARNING ENVIRONMENT'}</div>
            <h2 className="rns-sec-title">{about.infraTitle || 'Our Infrastructure'}</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '10px', maxWidth: '650px', margin: '10px auto 0 auto' }}>
              {about.infraDesc}
            </p>
          </div>

          <div className="rns-grid-2" style={{ gap: '30px' }}>
            
            {/* Card 1: Smart Classrooms */}
            <div className="rns-card" style={{ padding: 0, overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <div style={{ height: '230px', overflow: 'hidden' }}>
                <img 
                  src={about.smartClassPhoto || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"} 
                  alt="Smart Classrooms"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '24px 28px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#091b36', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Monitor size={18} style={{ color: '#d97706' }} /> {about.smartClassTitle || 'Smart Classrooms'}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>
                  {about.smartClassDesc}
                </p>
              </div>
            </div>

            {/* Card 2: Computer Laboratory */}
            <div className="rns-card" style={{ padding: 0, overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <div style={{ height: '230px', overflow: 'hidden' }}>
                <img 
                  src={about.computerLabPhoto || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"} 
                  alt="Computer Laboratory"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '24px 28px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#091b36', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Code size={18} style={{ color: '#d97706' }} /> {about.computerLabTitle || 'Computer Laboratory'}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>
                  {about.computerLabDesc}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 4. TABS SECTION: VISION / MISSION / GOALS */}
        <section>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '4px',
            marginBottom: '30px'
          }}>
            <button
              onClick={() => setActiveTab('vision')}
              style={{
                fontSize: '13px',
                fontWeight: 800,
                paddingBottom: '12px',
                color: activeTab === 'vision' ? '#091b36' : '#64748b',
                borderBottom: activeTab === 'vision' ? '3px solid #d97706' : '3px solid transparent',
                transition: 'all 0.2s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Our Vision
            </button>

            <button
              onClick={() => setActiveTab('mission')}
              style={{
                fontSize: '13px',
                fontWeight: 800,
                paddingBottom: '12px',
                color: activeTab === 'mission' ? '#091b36' : '#64748b',
                borderBottom: activeTab === 'mission' ? '3px solid #d97706' : '3px solid transparent',
                transition: 'all 0.2s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Our Mission
            </button>

            <button
              onClick={() => setActiveTab('goals')}
              style={{
                fontSize: '13px',
                fontWeight: 800,
                paddingBottom: '12px',
                color: activeTab === 'goals' ? '#091b36' : '#64748b',
                borderBottom: activeTab === 'goals' ? '3px solid #d97706' : '3px solid transparent',
                transition: 'all 0.2s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Our Goals
            </button>
          </div>

          <div className="rns-card" style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#e0e7ff',
              color: '#091b36',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {activeTab === 'vision' && <Eye size={26} />}
              {activeTab === 'mission' && <Target size={26} />}
              {activeTab === 'goals' && <Award size={26} />}
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#091b36', marginBottom: '8px', textTransform: 'capitalize' }}>
                Institutional {activeTab}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7 }}>
                {activeTab === 'vision' && about.vision}
                {activeTab === 'mission' && about.mission}
                {activeTab === 'goals' && about.goals}
              </p>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
