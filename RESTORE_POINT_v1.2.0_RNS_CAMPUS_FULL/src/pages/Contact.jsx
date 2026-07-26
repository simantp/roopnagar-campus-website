import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function Contact() {
  const { info } = useCampus();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px', backgroundColor: '#f8fafc' }}>
      
      {/* Dark Navy Banner */}
      <div className="rns-banner">
        <h1 className="rns-banner-title">Contact Us</h1>
        <div className="rns-banner-breadcrumb">
          Home / <span>Contact Us</span>
        </div>
      </div>

      <div className="rns-container" style={{ paddingTop: '50px' }}>
        
        {/* Main Grid: Info Card & Form Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '36px',
          alignItems: 'start',
          marginBottom: '50px'
        }}>
          
          {/* LEFT COLUMN: Contact Details Card */}
          <div className="rns-card" style={{
            padding: '36px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px'
          }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '1px' }}>
                REACH OUT TO US
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#091b36', marginTop: '4px' }}>
                Campus Office
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                We are here to assist prospective students, guardians, research partners, and alumni.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '42px', height: '42px', backgroundColor: '#fef3c7', color: '#b45309',
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#091b36' }}>Location Address</h4>
                  <p style={{ fontSize: '13px', color: '#475569', marginTop: '2px', lineHeight: 1.5 }}>
                    {info?.location}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '42px', height: '42px', backgroundColor: '#fef3c7', color: '#b45309',
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#091b36' }}>Phone Number</h4>
                  <a href={`tel:${info?.phone}`} style={{ fontSize: '13px', color: '#d97706', fontWeight: 700, marginTop: '2px', display: 'block' }}>
                    {info?.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '42px', height: '42px', backgroundColor: '#fef3c7', color: '#b45309',
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#091b36' }}>Email Address</h4>
                  <a href={`mailto:${info?.email}`} style={{ fontSize: '13px', color: '#d97706', fontWeight: 700, marginTop: '2px', display: 'block' }}>
                    {info?.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div style={{
                  width: '42px', height: '42px', backgroundColor: '#fef3c7', color: '#b45309',
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Clock size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#091b36' }}>Working Hours</h4>
                  <p style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
                    {info?.workingHours}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Inquiry Form Card */}
          <div className="rns-card" style={{
            padding: '36px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#091b36', marginBottom: '4px' }}>
              Send Us an Inquiry or Feedback
            </h2>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '24px' }}>
              Fill out the form below and our administrative team will respond promptly.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div style={{
                  width: '60px', height: '60px', backgroundColor: '#d1fae5', color: '#059669',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#091b36', marginBottom: '8px' }}>
                  Message Delivered Successfully!
                </h3>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                  Thank you <strong>{formData.name}</strong>. Your inquiry has been submitted to the campus administration office.
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="rns-btn-outline"
                  style={{ fontSize: '12px', padding: '8px 24px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                      Your Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ramesh Kumar Sah"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="rns-search-input"
                      style={{ borderRadius: '10px', paddingLeft: '14px', width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+977 98XXXXXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="rns-search-input"
                      style={{ borderRadius: '10px', paddingLeft: '14px', width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="ramesh@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="rns-search-input"
                      style={{ borderRadius: '10px', paddingLeft: '14px', width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                      Subject
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. BBS Admission / Scholarship Inquiry"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="rns-search-input"
                      style={{ borderRadius: '10px', paddingLeft: '14px', width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                    Message *
                  </label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Write your inquiry, feedback, or request details here..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="rns-search-input"
                    style={{ borderRadius: '10px', padding: '12px 14px', width: '100%', height: 'auto', resize: 'vertical' }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="rns-btn-donate"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    borderRadius: '10px',
                    padding: '12px 0',
                    fontSize: '13px',
                    marginTop: '8px'
                  }}
                >
                  <Send size={16} /> Submit Message
                </button>

              </form>
            )}

          </div>

        </div>

        {/* MAP / LOCATION CARD EMBED */}
        <div className="rns-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px' }}>
          <div style={{ padding: '24px 32px', backgroundColor: '#091b36', color: '#ffffff', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Find Us On Google Maps</h3>
              <p style={{ fontSize: '12px', color: '#cbd5e1' }}>Roopnagar Nandaraj Sangraula Campus, Kanchanrup-12, Saptari</p>
            </div>
          </div>
          <iframe 
            title="Roopnagar Campus Location"
            src="https://maps.google.com/maps?q=Roopnagar+Nandaraj+Sangraula+Campus,+Kanchanrup+Saptari&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="320" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>

      </div>

    </div>
  );
}
