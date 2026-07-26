import React, { createContext, useContext, useState, useEffect } from 'react';
import { campusData as defaultData } from '../data/campusData';
import { savePdfFile, getPdfFile, saveCampusDataToIndexedDB, getCampusDataFromIndexedDB } from '../utils/pdfStorage';
import { generateSlug } from '../utils/textUtils';

const CampusContext = createContext();

function ensureSlugs(items) {
  if (!Array.isArray(items)) return [];
  return items.map(item => {
    const titleHasNepali = /[\u0900-\u097F]/.test(item.title || '');
    const slugHasNepali = /[\u0900-\u097F]/.test(item.slug || '');
    
    if (!item.slug || typeof item.slug !== 'string' || !isNaN(Number(item.slug)) || (titleHasNepali && !slugHasNepali)) {
      return {
        ...item,
        slug: generateSlug(item.title)
      };
    }
    return item;
  });
}

export function CampusProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('rns_campus_data_v6');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) {
          parsed.chronicles = ensureSlugs(parsed.chronicles && parsed.chronicles.length > 0 ? parsed.chronicles : defaultData.chronicles);
          parsed.events = ensureSlugs(parsed.events && parsed.events.length > 0 ? parsed.events : defaultData.events);
          if (!parsed.notices || !Array.isArray(parsed.notices) || parsed.notices.length === 0) {
            parsed.notices = defaultData.notices;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load saved campus data from localStorage:', e);
    }
    
    const defaultStory = `${defaultData.about.p1}\n\n${defaultData.about.p2}\n\n${defaultData.about.p3}`;

    const initialTeachingMembers = [
      { id: 1, name: 'Prof. Deepak Kumar Gajurel', role: 'Campus Chief / Economics & Research', initials: 'DG', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
      { id: 2, name: 'Suman Kumar Gajurel', role: 'Vice Principal / English & Mass Comm', initials: 'SG', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
      { id: 3, name: 'Subash Chandra Shah', role: 'Lecturer / Accountancy & Finance', initials: 'SS', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
      { id: 4, name: 'Ram Kumar Yadav', role: 'Lecturer / Business Mathematics & Stats', initials: 'RY', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { id: 5, name: 'Anita Kumari Sah', role: 'Lecturer / Management & Organization', initials: 'AS', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
      { id: 6, name: 'Birendra Kumar Mandal', role: 'Lecturer / Marketing & Economics', initials: 'BM', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' }
    ];

    const initialAdministrativeStaff = [
      { id: 1, name: 'Ramesh Kumar Shah', role: 'Accountant & Administrative Officer', initials: 'RS', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
      { id: 2, name: 'Saraswati Kumari Yadav', role: 'Office Assistant & Library Coordinator', initials: 'SY', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' }
    ];

    const defaultChairmanBody = `Dear Members of the RNS Campus Community,\n\nI extend to you a warm and heartfelt welcome to Roopnagar Nandaraj Sangraula Campus (RNS Campus), a place where knowledge flourishes and dreams find their wings. It is an honor to lead this institution, which stands as a beacon of learning and opportunity in the heart of Roopnagar, Saptari district.\n\nSince our inception in 2013, RNS Campus has been steadfast in its dedication to offering not only quality education but also a transformative experience to students from all walks of life. Affiliated to the esteemed Tribhuvan University, we proudly offer the Bachelor of Business Studies program.\n\nOur vision is clear and our resolve unshaken: we are dedicated to transforming RNS Campus into a hub of educational excellence. Join us as we build a brighter future for Saptari and beyond.`;

    const defaultChiefBody = `Warm greetings to all visitors, academic seekers, and well-wishers,\n\nAt Roopnagar Nandaraj Sangraula Campus, we take immense pride in delivering the 4-Year Bachelor of Business Studies (BBS) program under Tribhuvan University, enriched with modern skill-enhancement modules tailored to regional requirements.\n\nRecognizing that theoretical knowledge alone is insufficient in today's competitive landscape, our curriculum is paired with intensive hands-on workshops in basic computing, academic writing, data editing, research methodology, and financial literacy.\n\nOur dedicated faculty members work tirelessly to maintain rigorous academic standards, personalized mentorship, and inclusive learning environments. Whether you aspire to be an entrepreneur, financial analyst, public administrator, or social researcher, RNS Campus is your springboard to success.`;

    return {
      info: defaultData.info,
      topQuote: '"Together We can Make a Difference"',
      campusProfilePdf: '/rns_campus_profile.pdf',
      campusProfileFileName: 'rns_campus_profile.pdf',
      annualReportPdf: '/rns_annual_report.pdf',
      annualReportFileName: 'rns_annual_report.pdf',
      popupModal: {
        enabled: true,
        contentType: 'both', // 'text', 'image', 'both'
        title: '🎓 Admissions Open for BBS 2081/82',
        subtitle: 'Join Saptari premier public community college under Tribhuvan University. Quality education with practical skill modules.',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        buttonText: 'View Program Details',
        buttonLink: '/academics'
      },
      home: {
        heroBadge: 'TRIBHUVAN UNIVERSITY AFFILIATED',
        heroTitlePrefix: 'Learning Begins ',
        heroTitleHighlight: 'With Us',
        heroSubtitle: "Welcome to Roopnagar Nandaraj Sangraula Campus (RNS Campus), Saptari's premier public college. We empower students from rural and marginalized backgrounds with premium, life-skill oriented education.",
        heroBtn1Text: 'Know More About Us',
        heroBtn2Text: 'Support Our Students',
        heroBgImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80',

        featuredNoticeBadge: '📢 LATEST',
        featuredNoticeId: 1,

        programSubtag: 'ACADEMIC PATH',
        programTitle: 'Our Regular Programs',
        programCardTag: 'BBS Program',
        programCardTitle: 'Bachelor in Business Studies (BBS)',
        programCardDesc: 'A rigorous four-year undergraduate program designed to provide students with foundational management, economic, and accounting concepts. Our graduates are equipped to navigate global business environments or start local ventures.',
        programCheckmark1: 'TU Curriculum',
        programCheckmark2: 'Expert Professors',
        programCheckmark3: 'Social Science Integration',
        programCheckmark4: 'Modern Research Methods',
        programPhotoUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
        programPhotoTag: '🏛 BBS CAMPUS HALL',
        programPhotoTitle: 'Faculty of Management',

        skillSubtag: 'HOLISTIC SKILL DEVELOPMENT',
        skillTitle: 'Beyond The Curriculum',
        skillsList: [
          {
            id: 1,
            title: 'Computer & Literacy Training',
            desc: 'First-year students receive basic computer literacy training to prepare them for digital workflows, data analysis, and documentation.',
            yearModule: 'FIRST YEAR MODULE',
            photo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 2,
            title: 'Writing & Editing Training',
            desc: 'Second-year students are trained in formatting newspaper articles, essays, and academic reviews based on local statistics and research.',
            yearModule: 'SECOND YEAR MODULE',
            photo: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 3,
            title: 'Research Methodology',
            desc: 'Fourth-year students undergo research trainings prescribed by TU to learn reporting methodologies and construct final year theses.',
            yearModule: 'FOURTH YEAR MODULE',
            photo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 4,
            title: 'Social Research Methods',
            desc: 'Third-year students perform fieldwork, questionnaires, and publish reports addressing social and financial indicators in Saptari.',
            yearModule: 'THIRD YEAR MODULE',
            photo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 5,
            title: 'Interactions with Experts',
            desc: "We invite specialists from agriculture, engineering, technology, and health fields to give workshops and build students' lifeskills.",
            yearModule: 'OCCASIONAL PANELS',
            photo: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 6,
            title: 'Wall Newspaper Publication',
            desc: 'An interactive billboard publication authored entirely by students, featuring poetry, paintings, and essays on culture and society.',
            yearModule: 'STUDENT BOARD',
            photo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'
          }
        ],

        leadersSubtag: 'OUR LEADERS',
        leadersTitle: 'Messages of Encouragement',
        chairmanQuote: '"I extend to you a warm welcome to RNS Campus, a place where knowledge flourishes and dreams find their wings. It is an honor to lead this community-owned, not-for-profit institution that stands as a beacon of learning in Saptari."',
        chairmanName: 'Giriraj Sangraula',
        chairmanRole: 'Chairman, Board of Directors',
        chiefQuote: '"Since our establishment in 2013, RNS Campus has held its commitment to providing exceptional education. We cater to students from rural backgrounds, and strive to bridge the gap separating aspiration from achievement."',
        chiefName: 'Prof. Deepak Gajurel',
        chiefRole: 'Campus Chief',

        milestoneBadge: 'ACADEMIC MILESTONE',
        milestoneTitle: 'Celebrating 78% Pass Rate in BBS Final Year Exams!',
        milestoneDesc: "This is the highest passing percentage in our campus's 11-year history. We congratulate our teachers, hardworking students, and the community of Kanchanrup Municipality for their support.",

        statYears: '13+',
        statYearsLabel: 'YEARS OF EXCELLENCE',
        statPassRate: '78%',
        statPassRateLabel: 'BBS PASS RATE (TU HIGH)',
        statModules: '5+',
        statModulesLabel: 'PRACTICAL SKILL MODULES',
        statVisitors: '110k+',
        statVisitorsLabel: 'COMMUNITY VISITORS'
      },
      about: {
        bannerTitle: 'About Our Institution',
        cardName: 'RNS Campus',
        cardDesc: 'A public, community-owned, not-for-profit educational institution registered in Kanchanrup, Saptari, Nepal. Built in 2013 to bridge educational disparities.',
        cardPhoto: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
        headline: defaultData.about.headline,
        story: defaultStory,
        infraSubtag: 'LEARNING ENVIRONMENT',
        infraTitle: 'Our Infrastructure',
        infraDesc: 'We believe that a conducive environment is key to learning. We continually invest in our physical facilities to support our curriculum.',
        smartClassTitle: 'Smart Classrooms',
        smartClassDesc: 'Our classrooms are spacious, well-ventilated, and equipped with smart boards and audio-visual setups. This supports dynamic discussions and interactive TU curriculum delivery.',
        smartClassPhoto: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
        computerLabTitle: 'Computer Laboratory',
        computerLabDesc: 'Our computer lab provides desktop systems, internet access, and data analysis software. It serves first-year literacy modules and research data entries.',
        computerLabPhoto: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
        vision: defaultData.about.vision,
        mission: defaultData.about.mission,
        goals: defaultData.about.goals
      },
      academics: {
        bannerTitle: 'Academics & Faculty',
        bbsTitle: defaultData.bbsProgram.title,
        bbsDesc: defaultData.bbsProgram.description,
        bbsYears: defaultData.bbsProgram.years,
        teachingMembers: initialTeachingMembers,
        administrativeStaff: initialAdministrativeStaff
      },
      chairmanMessage: {
        name: 'Giriraj Sangraula',
        role: 'CHAIRMAN',
        quote: '"A place where knowledge flourishes and dreams find their wings."',
        body: defaultChairmanBody,
        image: ''
      },
      chiefMessage: {
        name: 'Prof. Deepak Gajurel',
        role: 'CAMPUS CHIEF',
        quote: '"Since our establishment in 2013, RNS Campus has held its commitment to providing exceptional education."',
        body: defaultChiefBody,
        image: ''
      },
      boardOfDirectors: {
        chairman: defaultData.boardOfDirectors.chairman,
        members: defaultData.boardOfDirectors.members
      },
      notices: defaultData.notices,
      events: ensureSlugs(defaultData.events),
      chronicles: ensureSlugs(defaultData.chronicles)
    };
  });

  // Helper to strip heavy base64 strings before writing to localStorage so quota is never exceeded
  function createLightweightCopy(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(createLightweightCopy);
    const copy = {};
    for (const key in obj) {
      const val = obj[key];
      if (typeof val === 'string' && val.startsWith('data:') && val.length > 500) {
        copy[key] = 'INDEXED_DB_STORED';
      } else if (typeof val === 'object' && val !== null) {
        copy[key] = createLightweightCopy(val);
      } else {
        copy[key] = val;
      }
    }
    return copy;
  }

  // Sync dataset from permanent File Database (db.json via /api/campus-data) or IndexedDB on initial mount
  useEffect(() => {
    async function syncFromDatabase() {
      try {
        const res = await fetch('/api/campus-data').catch(() => null);
        if (res && res.ok) {
          const fileDbData = await res.json().catch(() => null);
          if (fileDbData && typeof fileDbData === 'object' && Object.keys(fileDbData).length > 0) {
            if (fileDbData.chronicles) fileDbData.chronicles = ensureSlugs(fileDbData.chronicles);
            if (fileDbData.events) fileDbData.events = ensureSlugs(fileDbData.events);
            setData(prev => ({
              ...prev,
              ...fileDbData
            }));
            return;
          }
        }
      } catch (e) {
        console.info('File DB fetch notice:', e);
      }

      try {
        const storedData = await getCampusDataFromIndexedDB('rns_full_campus_data');
        const storedProfile = await getPdfFile('campusProfilePdf');
        const storedReport = await getPdfFile('annualReportPdf');

        if (storedData) {
          setData(prev => ({
            ...prev,
            ...storedData,
            info: storedData.info ? { ...prev.info, ...storedData.info } : prev.info,
            home: storedData.home ? { ...prev.home, ...storedData.home } : prev.home,
            about: storedData.about ? { ...prev.about, ...storedData.about } : prev.about,
            academics: storedData.academics ? { ...prev.academics, ...storedData.academics } : prev.academics,
            chairmanMessage: storedData.chairmanMessage ? { ...prev.chairmanMessage, ...storedData.chairmanMessage } : prev.chairmanMessage,
            chiefMessage: storedData.chiefMessage ? { ...prev.chiefMessage, ...storedData.chiefMessage } : prev.chiefMessage,
            boardOfDirectors: storedData.boardOfDirectors ? { ...prev.boardOfDirectors, ...storedData.boardOfDirectors } : prev.boardOfDirectors,
            events: (storedData.events && Array.isArray(storedData.events) && storedData.events.length > 0) ? storedData.events : (prev.events && prev.events.length > 0 ? prev.events : defaultData.events),
            notices: (storedData.notices && Array.isArray(storedData.notices) && storedData.notices.length > 0) ? storedData.notices : (prev.notices && prev.notices.length > 0 ? prev.notices : defaultData.notices),
            chronicles: (storedData.chronicles && Array.isArray(storedData.chronicles) && storedData.chronicles.length > 0) ? storedData.chronicles : (prev.chronicles && prev.chronicles.length > 0 ? prev.chronicles : defaultData.chronicles),
            campusProfilePdf: storedProfile || storedData.campusProfilePdf || prev.campusProfilePdf,
            annualReportPdf: storedReport || storedData.annualReportPdf || prev.annualReportPdf,
            popupModal: storedData.popupModal || prev.popupModal
          }));
        } else if (storedProfile || storedReport) {
          setData(prev => ({
            ...prev,
            campusProfilePdf: storedProfile || prev.campusProfilePdf,
            annualReportPdf: storedReport || prev.annualReportPdf
          }));
        }
      } catch (e) {
        console.error('Error syncing campus data from IndexedDB:', e);
      }
    }
    syncFromDatabase();
  }, []);

  // Save metadata to localStorage without large PDF Base64 payload (stored in IndexedDB)
  useEffect(() => {
    try {
      const lightCopy = createLightweightCopy(data);
      localStorage.setItem('rns_campus_data_v6', JSON.stringify(lightCopy));
    } catch (e) {
      console.warn('localStorage quota warning:', e);
    }
  }, [data]);

  // UNIFIED ATOMIC SAVE FUNCTION: Updates entire campus database atomically & persists to IndexedDB + localStorage
  const saveAllCampusData = async (payload) => {
    const {
      generalSettings,
      homeContents,
      aboutContents,
      academicsContents,
      chairmanMsgContents,
      chiefMsgContents,
      boardContents,
      popupModalContents,
      eventsList,
      noticesList,
      chroniclesList
    } = payload;

    // Save PDFs to IndexedDB if present
    if (generalSettings?.campusProfilePdf && generalSettings.campusProfilePdf.startsWith('data:')) {
      await savePdfFile('campusProfilePdf', generalSettings.campusProfilePdf);
    }
    if (generalSettings?.annualReportPdf && generalSettings.annualReportPdf.startsWith('data:')) {
      await savePdfFile('annualReportPdf', generalSettings.annualReportPdf);
    }

    setData(prev => {
      const updatedData = {
        ...prev,
        info: generalSettings ? { ...prev.info, ...generalSettings } : prev.info,
        topQuote: generalSettings?.topQuote ?? prev.topQuote,
        campusProfilePdf: generalSettings?.campusProfilePdf || prev.campusProfilePdf,
        campusProfileFileName: generalSettings?.campusProfileFileName || prev.campusProfileFileName,
        annualReportPdf: generalSettings?.annualReportPdf || prev.annualReportPdf,
        annualReportFileName: generalSettings?.annualReportFileName || prev.annualReportFileName,
        popupModal: popupModalContents ? { ...prev.popupModal, ...popupModalContents } : prev.popupModal,
        home: homeContents ? { ...prev.home, ...homeContents } : prev.home,
        about: aboutContents ? { ...prev.about, ...aboutContents } : prev.about,
        academics: academicsContents ? { ...prev.academics, ...academicsContents } : prev.academics,
        chairmanMessage: chairmanMsgContents ? { ...prev.chairmanMessage, ...chairmanMsgContents } : prev.chairmanMessage,
        chiefMessage: chiefMsgContents ? { ...prev.chiefMessage, ...chiefMsgContents } : prev.chiefMessage,
        boardOfDirectors: boardContents ? { ...prev.boardOfDirectors, ...boardContents } : prev.boardOfDirectors,
        events: (eventsList && eventsList.length > 0) ? eventsList : (prev.events && prev.events.length > 0 ? prev.events : defaultData.events),
        notices: (noticesList && noticesList.length > 0) ? noticesList : (prev.notices && prev.notices.length > 0 ? prev.notices : defaultData.notices),
        chronicles: (chroniclesList && chroniclesList.length > 0) ? chroniclesList : (prev.chronicles && prev.chronicles.length > 0 ? prev.chronicles : defaultData.chronicles)
      };

      saveCampusDataToIndexedDB('rns_full_campus_data', updatedData);

      try {
        const lightCopy = createLightweightCopy(updatedData);
        localStorage.setItem('rns_campus_data_v6', JSON.stringify(lightCopy));
      } catch (e) {
        console.warn('localStorage quota exceeded, stored in IndexedDB:', e);
      }

      // Persist permanently to File Database (src/data/db.json on disk)
      try {
        fetch('/api/campus-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        }).catch(err => console.warn('File Database POST warning:', err));
      } catch (e) {
        console.warn('File DB POST failed:', e);
      }

      return updatedData;
    });
  };

  const updateGeneralSettings = async (newInfo) => {
    await saveAllCampusData({ generalSettings: newInfo });
  };

  const updateHomeContents = (newHome) => {
    saveAllCampusData({ homeContents: newHome });
  };

  const updateAboutContents = (newAbout) => {
    saveAllCampusData({ aboutContents: newAbout });
  };

  const updateAcademicsContents = (newAcademics) => {
    saveAllCampusData({ academicsContents: newAcademics });
  };

  const updateChairmanMessage = (newChairman) => {
    saveAllCampusData({ chairmanMsgContents: newChairman });
  };

  const updateChiefMessage = (newChief) => {
    saveAllCampusData({ chiefMsgContents: newChief });
  };

  const updateBoardOfDirectors = (newBoard) => {
    saveAllCampusData({ boardContents: newBoard });
  };

  const updatePopupModal = (newPopup) => {
    saveAllCampusData({ popupModalContents: newPopup });
  };

  const updateEvents = (newEvents) => {
    saveAllCampusData({ eventsList: ensureSlugs(newEvents) });
  };

  const updateNotices = (newNotices) => {
    saveAllCampusData({ noticesList: newNotices });
  };

  const updateChronicles = (newChronicles) => {
    saveAllCampusData({ chroniclesList: ensureSlugs(newChronicles) });
  };

  return (
    <CampusContext.Provider value={{
      info: data.info,
      topQuote: data.topQuote,
      campusProfilePdf: data.campusProfilePdf || '/rns_campus_profile.pdf',
      campusProfileFileName: data.campusProfileFileName || 'rns_campus_profile.pdf',
      annualReportPdf: data.annualReportPdf || '/rns_annual_report.pdf',
      annualReportFileName: data.annualReportFileName || 'rns_annual_report.pdf',
      popupModal: data.popupModal || {
        enabled: true,
        contentType: 'both',
        title: '🎓 Admissions Open for BBS 2081/82',
        subtitle: 'Join Saptari premier public community college under Tribhuvan University.',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        buttonText: 'View Program Details',
        buttonLink: '/academics'
      },
      home: data.home,
      about: data.about,
      academics: data.academics,
      chairmanMessage: data.chairmanMessage,
      chiefMessage: data.chiefMessage,
      boardOfDirectors: data.boardOfDirectors,
      notices: data.notices,
      events: data.events,
      chronicles: data.chronicles,
      saveAllCampusData,
      updateGeneralSettings,
      updateHomeContents,
      updateAboutContents,
      updateAcademicsContents,
      updateChairmanMessage,
      updateChiefMessage,
      updateBoardOfDirectors,
      updatePopupModal,
      updateEvents,
      updateNotices,
      updateChronicles
    }}>
      {children}
    </CampusContext.Provider>
  );
}

export function useCampus() {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
}
