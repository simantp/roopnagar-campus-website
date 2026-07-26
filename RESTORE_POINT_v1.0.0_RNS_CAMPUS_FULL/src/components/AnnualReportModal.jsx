import React, { useEffect } from 'react';
import { X, Download, Printer, BarChart3, CheckCircle, Shield } from 'lucide-react';
import { campusData } from '../data/campusData';

export default function AnnualReportModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

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
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '850px',
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

        {/* Toolbar */}
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
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36' }}>Annual Progress & Financial Report</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Roopnagar Nandaraj Sangraula Campus (2080/81)</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => window.print()}
              className="rns-btn-donate"
              style={{ fontSize: '12px', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={14} /> Download Report PDF
            </button>
            <button 
              onClick={() => window.print()}
              className="rns-btn-outline"
              style={{ fontSize: '12px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Printer size={14} /> Print Report
            </button>
          </div>
        </div>

        {/* ANNUAL REPORT DOCUMENT CONTENT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#1e293b', lineHeight: 1.8 }}>
          
          <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '1px' }}>
              FISCAL YEAR 2080/2081 REPORT
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 900, color: '#091b36', marginTop: '4px' }}>
              RNS Campus Annual Performance & Financial Audit
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
              Approved by the Campus Management Committee & Presented to Tribhuvan University Office of the Controller of Examinations
            </p>
          </div>

          {/* Highlights Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#091b36' }}>78%</div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>TU BBS Pass Rate</div>
              <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Highest pass rate in Saptari district for undergraduate management.</p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#091b36' }}>55%+</div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>Female Enrollment</div>
              <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Empowering female scholars under Chhori Chhatrabritti initiative.</p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#091b36' }}>150+</div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>Scholarships Awarded</div>
              <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Full & partial tuition waivers for marginalized & Dalit students.</p>
            </div>
          </div>

          {/* Section 1: Executive Overview */}
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#091b36', marginBottom: '8px' }}>
              1. Executive Overview & Institutional Progress
            </h2>
            <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.8 }}>
              During the fiscal year 2080/81, Roopnagar Nandaraj Sangraula Campus expanded its community outreach, upgraded its computer laboratory facilities, and conducted intensive skill-development workshops in academic writing, social inquiry, and basic computing for 450+ enrolled undergraduate students.
            </p>
          </div>

          {/* Section 2: Financial Audit & Operating Budget */}
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#091b36', marginBottom: '8px' }}>
              2. Financial Statement & Community Subsidy
            </h2>
            <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.8, marginBottom: '12px' }}>
              As a public not-for-profit college operating on a nominal annual fee under $125 USD per student, campus revenue relies heavily on community donations, local government grants, and philanthropist partnerships:
            </p>
            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '20px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, padding: '6px 0', borderBottom: '1px solid #dbeafe' }}>
                <span>Annual Student Fee Revenue</span>
                <span>NPR 28,50,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, padding: '6px 0', borderBottom: '1px solid #dbeafe' }}>
                <span>Local Government & UGC Grants</span>
                <span>NPR 14,20,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, padding: '6px 0', borderBottom: '1px solid #dbeafe' }}>
                <span>Philanthropic Donations & Memorial Funds</span>
                <span>NPR 18,30,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 900, color: '#091b36', paddingTop: '10px' }}>
                <span>Total Operational & Academic Expenditure</span>
                <span>NPR 61,00,000</span>
              </div>
            </div>
          </div>

          {/* Section 3: Future Outlook */}
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#091b36', marginBottom: '8px' }}>
              3. Strategic Development Goals for 2082 BS
            </h2>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Establish a 30-desktop fiber-connected computer research laboratory.</li>
              <li>Expand the central public library with 2,000+ new reference books and e-journal access.</li>
              <li>Provide 100% scholarship coverage for all female students from Kanchanrup Municipality Ward 12.</li>
            </ul>
          </div>

        </div>

        {/* Modal Bottom Close Bar */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="rns-btn-donate" style={{ fontSize: '12px', padding: '8px 24px' }}>
            Close Annual Report
          </button>
        </div>

      </div>
    </div>
  );
}
