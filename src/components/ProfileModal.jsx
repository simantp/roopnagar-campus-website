import React, { useEffect } from 'react';
import { X, Download, Printer, Shield, BookOpen, Heart, Award, CheckCircle } from 'lucide-react';
import { campusData } from '../data/campusData';

export default function ProfileModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handlePrintDownload = () => {
    window.print();
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
        backgroundColor: 'rgba(5, 12, 26, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2500,
        padding: '20px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking inside modal */
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '880px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '40px',
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
            width: '38px',
            height: '38px',
            backgroundColor: '#f1f5f9',
            color: '#334155',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1px solid #cbd5e1'
          }}
          title="Close Modal"
        >
          <X size={18} />
        </button>

        {/* Document Action Header Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: '20px',
          borderBottom: '2px solid #f1f5f9',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/rns_logo.png" alt="RNS Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36' }}>Official Campus Document</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Roopnagar Nandaraj Sangraula Campus</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handlePrintDownload}
              className="rns-btn-donate"
              style={{ fontSize: '12px', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={14} /> Download / Save PDF
            </button>
            <button 
              onClick={() => window.print()}
              className="rns-btn-outline"
              style={{ fontSize: '12px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Printer size={14} /> Print
            </button>
          </div>
        </div>

        {/* OFFICIAL CAMPUS PROFILE & APPEAL CONTENT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#1e293b', lineHeight: 1.8 }}>
          
          {/* Header Title Banner */}
          <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              Together We Can Make A Difference...
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', fontWeight: 900, color: '#091b36', marginBottom: '8px' }}>
              An Appeal for the Cause of Destitute...
            </h1>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>
              Roopnagar Nandaraj Sangraula Campus (RNS Campus)
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Roopnagar, Kanchanrup Municipality-12, Saptari, Nepal • Est. 2070 BS (2013 AD)
            </div>
          </div>

          {/* Section 1: Background & Introduction */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '10px' }}>
              1. Background and Introduction
            </h2>
            <p style={{ fontSize: '14px', color: '#334155', marginBottom: '12px' }}>
              Roopnagar Nandaraj Sangraula Campus (RNS Campus) is a community owned public college nestled in the heart of Roopnagar, Saptari district, in the Terai region of Nepal. Established in 2013, as a not-for-profit institution, RNS Campus is committed to providing quality education and empowering students from diverse backgrounds, especially the poor and disadvantaged sections of the society.
            </p>
            <p style={{ fontSize: '14px', color: '#334155', marginBottom: '12px' }}>
              Affiliated with Tribhuvan University, Nepal's oldest and largest university, RNS Campus offers a Bachelor of Business Studies program. The college strives to deliver an excellent academic experience while fostering personal growth and professional development among its students.
            </p>
            <p style={{ fontSize: '14px', color: '#334155' }}>
              RNS Campus plays a crucial role in the local community, particularly for students hailing from poor family backgrounds in the rural Terai region of Nepal. Given financial constraints and limited opportunities, thousands of students from poor and disadvantaged communities are compelled to pursue higher education in local colleges.
            </p>
          </div>

          {/* Section 2: Dismal Educational Landscape in Nepal */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '10px' }}>
              2. Dismal Educational Landscape in Nepal
            </h2>
            <p style={{ fontSize: '14px', color: '#334155', marginBottom: '12px' }}>
              Nepal's educational landscape typically caters to the affluent elite or those with the means to send their children to urban centers or abroad. Students can be broadly categorized into three distinct groups:
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Elite offspring of affluence:</strong> Poised to splurge millions in pursuit of academic excellence in the US, Australia, Canada, or Europe.</li>
              <li><strong>Aspirants of the affluent:</strong> Parents who allocate hundreds of thousands of Nepalese rupees annually for education in urban hubs like Kathmandu or India.</li>
              <li><strong>The struggling underclass:</strong> Families shackled by financial constraints for whom cosmopolitan or international education is an unimaginable luxury.</li>
            </ul>
            <p style={{ fontSize: '14px', color: '#334155', marginTop: '12px' }}>
              For these struggling families, the establishment of RNS Campus represents a lifeline, bringing higher education to their doorsteps and breaking the cycle of generational poverty.
            </p>
          </div>

          {/* Section 3: We Are Public Goods Not A Lucrative Enterprise */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '24px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '10px' }}>
              3. We Are Public Goods Not A Lucrative Enterprise
            </h2>
            <p style={{ fontSize: '14px', color: '#334155', marginBottom: '12px' }}>
              One of the most commendable aspects of Roopnagar Nandaraj Sangraula Campus' foundation is its not-for-profit status. Affiliated with Tribhuvan University, the campus operates under the governance of a dedicated Campus Management Committee formed by the local community.
            </p>
            <p style={{ fontSize: '14px', color: '#334155', fontWeight: 700 }}>
              RNS Campus stands out as the sole community-owned, not-for-profit college within a 30-kilometer radius. The yearly fee—a mere fraction under 125 US Dollars per student—encompasses tuition, exam fees, registration costs, and essential skill modules.
            </p>
          </div>

          {/* Section 4: Our Vision, Mission and Goals */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '10px' }}>
              4. Our Vision, Mission and Goals
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#334155' }}>
              <div><strong>Vision:</strong> To develop RNS Campus as a center of educational excellence, committed to providing high-quality education to its students.</div>
              <div><strong>Mission:</strong> To render quality education and prepare students who are efficient, competent, and equipped with ample life skills for personal and professional growth.</div>
              <div><strong>Goals:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Fostering values, moral character, and ethical conduct.</li>
                  <li>Academic and professional excellence in modern business environments.</li>
                  <li>Responsible contribution towards society's welfare.</li>
                  <li>Holistic development through basic computer literacy, writing & editing, and social research.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5: Academic & Skills Programs */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '10px' }}>
              5. Academic and Extra-Curricular Skill Programs
            </h2>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Bachelor of Business Studies (BBS):</strong> 4-Year TU affiliated management course.</li>
              <li><strong>Year 1 - Computer Training:</strong> Basic IT, MS Office, and digital literacy.</li>
              <li><strong>Year 2 - Writing & Editing:</strong> Article drafting, newspaper formatting, and essay editing.</li>
              <li><strong>Year 3 - Social Research:</strong> Fieldwork, data collection, and socio-economic inquiry.</li>
              <li><strong>Year 4 - Research Methodology:</strong> Technical reporting methods and thesis construction.</li>
              <li><strong>Expert Panels & Wall Newspaper:</strong> Regular interaction with specialists and student billboard publishing.</li>
            </ul>
          </div>

          {/* Section 6 & 7: The Appeal */}
          <div style={{ backgroundColor: '#091b36', color: '#ffffff', padding: '30px', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#eab308', marginBottom: '12px' }}>
              6. The Huge Challenge We Are Facing & Our Appeal
            </h2>
            <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.7, marginBottom: '16px' }}>
              Offering a full 4-year BBS degree under $125 USD per year places our community college in a perpetual financial challenge, consistently operating in an 'always at deficit' mode. Student fees cover less than half of teacher salaries.
            </p>
            <p style={{ fontSize: '14px', color: '#ffffff', fontWeight: 700, fontStyle: 'italic', marginBottom: '20px' }}>
              "Let's join hands for the cause of poorest of the poor... Together we can make a difference!"
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>Prof. Deepak Kumar Gajurel</div>
              <div style={{ fontSize: '12px', color: '#eab308' }}>Campus Chief, Roopnagar Nandaraj Sangraula Campus</div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>
                Contact: roopnagarcampus@gmail.com | Cell: +977-9841-738002
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Close Bar */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="rns-btn-donate" style={{ fontSize: '12px', padding: '8px 24px' }}>
            Close Campus Profile
          </button>
        </div>

      </div>
    </div>
  );
}
