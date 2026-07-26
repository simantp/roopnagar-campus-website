import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Notices from './pages/Notices';
import Chronicles from './pages/Chronicles';
import ChronicleDetail from './pages/ChronicleDetail';
import ChairmanMessage from './pages/ChairmanMessage';
import CampusChiefMessage from './pages/CampusChiefMessage';
import BoardOfDirectors from './pages/BoardOfDirectors';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import AdminDashboard from './pages/admin/AdminDashboard';
import NoticeModal from './components/NoticeModal';
import WebsiteLoadModal from './components/WebsiteLoadModal';
import { FileText, BarChart3, Heart } from 'lucide-react';
import { useCampus } from './context/CampusContext';
import { getPdfFile } from './utils/pdfStorage';

export default function App() {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    campusProfilePdf, campusProfileFileName, 
    annualReportPdf, annualReportFileName 
  } = useCampus();

  const isAdminRoute = location.pathname.startsWith('/admin');

  // Unified Uncorrupted PDF Downloader for Campus Profile and Annual Report
  const handleDirectDownload = async (fileUrl, defaultFileName, pdfKey) => {
    let targetUrl = null;

    // 1. Check IndexedDB for uploaded PDF file first
    if (pdfKey) {
      try {
        const storedPdf = await getPdfFile(pdfKey);
        if (storedPdf && storedPdf.startsWith('data:')) {
          targetUrl = storedPdf;
        }
      } catch (e) {
        console.error('Error fetching PDF from IndexedDB:', e);
      }
    }

    // 2. Fall back to passed fileUrl if no custom uploaded PDF found in IndexedDB
    if (!targetUrl && fileUrl && fileUrl !== 'INDEXED_DB') {
      targetUrl = fileUrl;
    }

    if (!targetUrl) return;

    // Case 1: Base64 Data URL (Custom Uploaded PDF)
    if (targetUrl.startsWith('data:')) {
      try {
        const base64Data = targetUrl.split(',')[1];
        const cleanedBase64 = base64Data.replace(/[\r\n\s]/g, '');
        const binaryStr = window.atob(cleanedBase64);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = defaultFileName || 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        return;
      } catch (err) {
        console.error('Error converting Data URL to Blob:', err);
      }
    }

    // Case 2: Static Server Path -> Fetch as binary Blob to guarantee uncorrupted download
    try {
      const response = await fetch(targetUrl);
      const rawBlob = await response.blob();
      const pdfBlob = new Blob([rawBlob], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = defaultFileName || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (e) {
      console.error('Fetch fallback download error:', e);
      const link = document.createElement('a');
      link.href = targetUrl;
      link.download = defaultFileName || 'document.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Global Public Navigation (Hidden on Admin CMS) */}
      {!isAdminRoute && <Navbar />}

      {/* Main Page Routes */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onSelectNotice={(notice) => setSelectedNotice(notice)}
                onOpenProfile={() => handleDirectDownload(campusProfilePdf, campusProfileFileName || 'rns_campus_profile.pdf', 'campusProfilePdf')}
              />
            } 
          />
          <Route 
            path="/about" 
            element={<About onOpenProfile={() => handleDirectDownload(campusProfilePdf, campusProfileFileName || 'rns_campus_profile.pdf', 'campusProfilePdf')} />} 
          />
          <Route path="/academics" element={<Academics />} />
          <Route path="/message-from-chairman" element={<ChairmanMessage />} />
          <Route path="/message-from-campus-chief" element={<CampusChiefMessage />} />
          <Route 
            path="/board-of-directors" 
            element={<BoardOfDirectors onOpenProfile={() => handleDirectDownload(campusProfilePdf, campusProfileFileName || 'rns_campus_profile.pdf', 'campusProfilePdf')} />} 
          />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route 
            path="/notices" 
            element={<Notices onSelectNotice={(notice) => setSelectedNotice(notice)} />} 
          />
          <Route 
            path="/chronicles" 
            element={<Chronicles onOpenProfile={() => handleDirectDownload(campusProfilePdf, campusProfileFileName || 'rns_campus_profile.pdf', 'campusProfilePdf')} />} 
          />
          <Route path="/chronicles/:slug" element={<ChronicleDetail />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin CMS Backend Hub */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Global Public Footer (Hidden on Admin CMS) */}
      {!isAdminRoute && <Footer />}

      {/* 3 CONSISTENT FLOATING SIDE ACTION BUTTONS (Hidden on Admin CMS) */}
      {!isAdminRoute && (
        <div className="rns-floating-actions">
          
          {/* 1. Campus Profile Floating Icon -> UNCORRUPTED DOWNLOAD */}
          <button 
            onClick={() => handleDirectDownload(campusProfilePdf, campusProfileFileName || 'rns_campus_profile.pdf', 'campusProfilePdf')}
            className="rns-float-btn rns-float-navy"
            title="Download Official Campus Profile PDF"
          >
            <FileText size={20} />
          </button>

          {/* 2. Annual Report Floating Icon -> UNCORRUPTED DOWNLOAD */}
          <button 
            onClick={() => handleDirectDownload(annualReportPdf, annualReportFileName || 'rns_annual_report.pdf', 'annualReportPdf')}
            className="rns-float-btn rns-float-navy"
            style={{ backgroundColor: '#091b36', borderColor: '#334155' }}
            title="Download Annual Progress & Financial Report PDF"
          >
            <BarChart3 size={20} style={{ color: '#eab308' }} />
          </button>

          {/* 3. Donate Floating Icon -> NAVIGATE TO DONATE PAGE */}
          <button 
            onClick={() => navigate('/donate')}
            className="rns-float-btn rns-float-gold"
            title="Donate & Support RNS Campus"
          >
            <Heart size={20} />
          </button>
        </div>
      )}

      {/* Pop-up Modals */}
      <NoticeModal 
        notice={selectedNotice} 
        onClose={() => {
          setSelectedNotice(null);
          if (location.search.includes('notice=')) {
            navigate(location.pathname, { replace: true });
          }
        }} 
      />

      {/* Website Initial Load Announcement Modal */}
      <WebsiteLoadModal />

    </div>
  );
}
