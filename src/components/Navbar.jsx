import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronDown, Menu, X, Heart } from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const location = useLocation();
  const { info, topQuote } = useCampus();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="rns-navbar-wrapper">
      
      {/* 1. TOP UTILITY HEADER BAR */}
      <div className="rns-topbar">
        <div className="rns-container rns-topbar-flex">
          
          {/* Left Side Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={12} style={{ color: '#eab308' }} />
              <span>{info.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={12} style={{ color: '#eab308' }} />
              <span>{info.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={12} style={{ color: '#eab308' }} />
              <span>{info.email}</span>
            </div>
          </div>

          {/* Right Side Quote */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              color: '#eab308',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.3px',
              fontStyle: 'italic'
            }}>
              {topQuote}
            </span>
          </div>

        </div>
      </div>

      {/* 2. MAIN BRANDING & NAVIGATION HEADER WITH OFFICIAL LOGO */}
      <nav className="rns-navbar">
        <div className="rns-container rns-nav-flex">
          
          {/* Brand Logo & Campus Title */}
          <Link to="/" className="rns-brand" style={{ gap: '14px' }}>
            <img 
              src="/rns_logo.png" 
              alt="Roopnagar Nandaraj Sangraula Campus Logo" 
              style={{ width: '75px', height: '75px', objectFit: 'contain' }}
            />
            <div>
              <div className="rns-brand-title">{info.name}</div>
              <div className="rns-brand-sub">{info.fullName}</div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <ul className="rns-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '18px', listStyle: 'none' }}>
              <li>
                <Link to="/" className={`rns-nav-link ${isActive('/') ? 'active' : ''}`}>
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className={`rns-nav-link ${isActive('/about') ? 'active' : ''}`}>
                  About
                </Link>
              </li>

              {/* Academics Dropdown Menu */}
              <li 
                style={{ position: 'relative' }}
                onMouseEnter={() => setAcademicsOpen(true)}
                onMouseLeave={() => setAcademicsOpen(false)}
              >
                <Link 
                  to="/academics" 
                  className={`rns-nav-link ${isActive('/academics') ? 'active' : ''}`}
                >
                  Academics <ChevronDown size={13} style={{ marginTop: '1px' }} />
                </Link>

                {academicsOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: '#ffffff',
                    minWidth: '220px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                    borderRadius: '8px',
                    padding: '8px 0',
                    zIndex: 200,
                    border: '1px solid #e2e8f0'
                  }}>
                    <Link 
                      to="/academics" 
                      className="rns-dropdown-item"
                      style={{ display: 'block', padding: '8px 18px', fontSize: '12px', fontWeight: 600, color: '#1e293b' }}
                    >
                      Faculty & Staff
                    </Link>
                    <Link 
                      to="/message-from-chairman" 
                      className="rns-dropdown-item"
                      style={{ display: 'block', padding: '8px 18px', fontSize: '12px', fontWeight: 600, color: '#1e293b' }}
                    >
                      Message from Chairman
                    </Link>
                    <Link 
                      to="/message-from-campus-chief" 
                      className="rns-dropdown-item"
                      style={{ display: 'block', padding: '8px 18px', fontSize: '12px', fontWeight: 600, color: '#1e293b' }}
                    >
                      Message from Campus Chief
                    </Link>
                    <Link 
                      to="/board-of-directors" 
                      className="rns-dropdown-item"
                      style={{ display: 'block', padding: '8px 18px', fontSize: '12px', fontWeight: 600, color: '#1e293b' }}
                    >
                      Board of Directors
                    </Link>
                  </div>
                )}
              </li>

              <li>
                <Link to="/events" className={`rns-nav-link ${isActive('/events') ? 'active' : ''}`}>
                  Events
                </Link>
              </li>

              <li>
                <Link to="/notices" className={`rns-nav-link ${isActive('/notices') ? 'active' : ''}`}>
                  Notices
                </Link>
              </li>

              <li>
                <Link to="/chronicles" className={`rns-nav-link ${isActive('/chronicles') ? 'active' : ''}`}>
                  Chronicles
                </Link>
              </li>

              <li>
                <Link to="/contact" className={`rns-nav-link ${isActive('/contact') ? 'active' : ''}`}>
                  Contact
                </Link>
              </li>
            </ul>

            {/* Donate Button */}
            <Link 
              to="/donate" 
              className="rns-btn-donate"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginLeft: '6px' }}
            >
              <Heart size={14} /> Donate
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', color: '#091b36' }}
              className="rns-mobile-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </nav>

    </header>
  );
}
