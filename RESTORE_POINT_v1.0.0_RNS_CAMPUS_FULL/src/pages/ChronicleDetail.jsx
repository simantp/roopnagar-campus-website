import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Share2, Facebook, Copy, Check, Download, Printer } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function ChronicleDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { chronicles } = useCampus();
  const chroniclesList = chronicles || [];

  // Find chronicle by slug or fallback by ID
  const chronicle = chroniclesList.find(
    c => c.slug === slug || String(c.id) === slug
  ) || chroniclesList[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleDownloadPDF = () => {
    if (chronicle.pdfUrl) {
      const link = document.createElement('a');
      link.href = chronicle.pdfUrl;
      link.download = chronicle.pdfFileName || `${chronicle.slug || 'chronicle'}_document.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.print();
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px', backgroundColor: '#f8fafc' }}>
      
      {/* Dark Navy Header Banner */}
      <div className="rns-banner">
        <h1 className="rns-banner-title">Campus Chronicle Article</h1>
        <div className="rns-banner-breadcrumb">
          <Link to="/">Home</Link> / <Link to="/chronicles">Chronicles</Link> / <span>Article</span>
        </div>
      </div>

      <div className="rns-container" style={{ paddingTop: '50px', maxWidth: '850px' }}>
        
        {/* Back Button */}
        <Link 
          to="/chronicles"
          className="rns-btn-outline"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '30px',
            backgroundColor: '#ffffff'
          }}
        >
          <ArrowLeft size={16} /> Back to Chronicles Page
        </Link>

        {/* Article Container Card */}
        <article className="rns-card" style={{ padding: '48px', backgroundColor: '#ffffff' }}>
          
          {/* Author Profile Badge & Photo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden',
              backgroundColor: '#091b36', border: '2px solid #eab308', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              {chronicle.authorImage ? (
                <img src={chronicle.authorImage} alt={chronicle.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={22} style={{ color: '#eab308' }} />
              )}
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#091b36' }}>
                ✍️ {chronicle.author || 'Campus Editorial Board'}
              </div>
            </div>
          </div>

          {/* Article Title */}
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '32px',
            fontWeight: 900,
            color: '#091b36',
            lineHeight: 1.3,
            marginBottom: '24px'
          }}>
            {chronicle.title}
          </h1>

          {/* Action Toolbar (Download PDF, Facebook Share, Copy Link) */}
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
              
              {/* Download PDF Button */}
              <button 
                onClick={handleDownloadPDF}
                style={{
                  backgroundColor: chronicle.pdfUrl ? '#16a34a' : '#091b36',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Download size={14} style={{ color: '#eab308' }} /> 
                {chronicle.pdfUrl ? `Download Article PDF (${chronicle.pdfFileName || 'Document'})` : 'Download Article'}
              </button>

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
                {copied ? 'Link Copied!' : 'Copy Article Link'}
              </button>

            </div>

          </div>

          {/* Full Article Content */}
          <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.85 }}>
            {chronicle.content ? (
              <div dangerouslySetInnerHTML={{ __html: chronicle.content }} />
            ) : chronicle.fullContent ? (
              chronicle.fullContent.map((paragraph, pidx) => (
                <p key={pidx} style={{ marginBottom: '18px', textAlign: 'justify' }}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.8 }}>
                {chronicle.excerpt}
              </p>
            )}
          </div>

          {/* Bottom Back Button */}
          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '40px', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/chronicles" className="rns-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={14} /> Return to All Chronicles
            </Link>

            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
              Roopnagar Nandaraj Sangraula Campus Publications
            </span>
          </div>

        </article>

      </div>

    </div>
  );
}
