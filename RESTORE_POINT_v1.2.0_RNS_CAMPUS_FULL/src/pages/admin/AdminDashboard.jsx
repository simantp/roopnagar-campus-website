import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home as HomeIcon, Settings, Bell, Calendar, 
  FileText, Heart, Save, CheckCircle2, Sliders, Globe, 
  Eye, Sparkles, LogOut, BookOpen, Award, Users, Upload, Image as ImageIcon,
  Info, GraduationCap, User, UserPlus, Database, MessageSquare, Shield, BarChart3, Download, FileCheck, Plus, Trash2, Edit, Star
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { resizeImage } from '../../utils/imageResizer';
import { getPdfFile } from '../../utils/pdfStorage';
import CKEditorField from '../../components/CKEditorField';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';

export default function AdminDashboard() {
  const { 
    info, topQuote, campusProfilePdf, campusProfileFileName, annualReportPdf, annualReportFileName, 
    popupModal, home, about, academics, chairmanMessage, chiefMessage, boardOfDirectors,
    notices, events, chronicles, saveAllCampusData, updateGeneralSettings, updateHomeContents, updateAboutContents, 
    updateAcademicsContents, updateChairmanMessage, updateChiefMessage, updateBoardOfDirectors, updatePopupModal, updateEvents, updateNotices, updateChronicles 
  } = useCampus();
  
  const [activeTab, setActiveTab] = useState('notices');
  const [academicsSubTab, setAcademicsSubTab] = useState('teaching');
  const [savedSuccess, setSavedSuccess] = useState('');
  const [uploadingStatus, setUploadingStatus] = useState('');

  // Delete Confirmation Modal State
  const [deleteModalConfig, setDeleteModalConfig] = useState({
    isOpen: false,
    title: '',
    itemName: '',
    message: '',
    onConfirm: null
  });

  const confirmDelete = ({ title, itemName, message, onConfirm }) => {
    setDeleteModalConfig({
      isOpen: true,
      title: title || 'Confirm Permanent Deletion',
      itemName: itemName || '',
      message: message || 'Are you sure you want to delete this item? This action cannot be undone and will permanently remove it from the database.',
      onConfirm
    });
  };

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    name: info?.name || 'Roopnagar Campus',
    fullName: info?.fullName || 'Roopnagar Nandaraj Sangraula Campus',
    establishedBS: info?.establishedBS || '2070 BS',
    establishedAD: info?.establishedAD || '2013 AD',
    affiliation: info?.affiliation || 'Tribhuvan University (TU)',
    location: info?.location || 'Roopnagar, Kanchanrup-12, Saptari, Nepal',
    phone: info?.phone || '+977 985-2821240 / +977 984-2824555',
    email: info?.email || 'info@rnscampus.edu.np',
    workingHours: info?.workingHours || 'Sun - Fri: 6:00 AM - 11:30 AM',
    topQuote: topQuote || '"Together We can Make a Difference"',
    logoPath: '/rns_logo.png',
    campusProfilePdf: campusProfilePdf || '/rns_campus_profile.pdf',
    campusProfileFileName: campusProfileFileName || 'rns_campus_profile.pdf',
    annualReportPdf: annualReportPdf || '/rns_annual_report.pdf',
    annualReportFileName: annualReportFileName || 'rns_annual_report.pdf'
  });

  // Homepage Contents State
  const [homeContents, setHomeContents] = useState({
    heroBadge: home?.heroBadge || 'TRIBHUVAN UNIVERSITY AFFILIATED',
    heroTitlePrefix: home?.heroTitlePrefix || 'Learning Begins ',
    heroTitleHighlight: home?.heroTitleHighlight || 'With Us',
    heroSubtitle: home?.heroSubtitle || "Welcome to Roopnagar Nandaraj Sangraula Campus (RNS Campus), Saptari's premier public college.",
    heroBtn1Text: home?.heroBtn1Text || 'Know More About Us',
    heroBtn2Text: home?.heroBtn2Text || 'Support Our Students',
    heroBgImage: home?.heroBgImage || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80',

    featuredNoticeBadge: home?.featuredNoticeBadge || '📢 LATEST',
    featuredNoticeId: home?.featuredNoticeId || 1,

    programSubtag: home?.programSubtag || 'ACADEMIC PATH',
    programTitle: home?.programTitle || 'Our Regular Programs',
    programCardTag: home?.programCardTag || 'BBS Program',
    programCardTitle: home?.programCardTitle || 'Bachelor in Business Studies (BBS)',
    programCardDesc: home?.programCardDesc || '',
    programCheckmark1: home?.programCheckmark1 || 'TU Curriculum',
    programCheckmark2: home?.programCheckmark2 || 'Expert Professors',
    programCheckmark3: home?.programCheckmark3 || 'Social Science Integration',
    programCheckmark4: home?.programCheckmark4 || 'Modern Research Methods',
    programPhotoUrl: home?.programPhotoUrl || '',
    programPhotoTag: home?.programPhotoTag || '🏛 BBS CAMPUS HALL',
    programPhotoTitle: home?.programPhotoTitle || 'Faculty of Management',

    skillSubtag: home?.skillSubtag || 'HOLISTIC SKILL DEVELOPMENT',
    skillTitle: home?.skillTitle || 'Beyond The Curriculum',
    skillsList: home?.skillsList || [],

    leadersSubtag: home?.leadersSubtag || 'OUR LEADERS',
    leadersTitle: home?.leadersTitle || 'Messages of Encouragement',
    chairmanQuote: home?.chairmanQuote || '',
    chairmanName: home?.chairmanName || 'Giriraj Sangraula',
    chairmanRole: home?.chairmanRole || 'Chairman, Board of Directors',
    chiefQuote: home?.chiefQuote || '',
    chiefName: home?.chiefName || 'Prof. Deepak Gajurel',
    chiefRole: home?.chiefRole || 'Campus Chief',

    milestoneBadge: home?.milestoneBadge || 'ACADEMIC MILESTONE',
    milestoneTitle: home?.milestoneTitle || '',
    milestoneDesc: home?.milestoneDesc || '',

    statYears: home?.statYears || '10+',
    statYearsLabel: home?.statYearsLabel || 'YEARS OF EXCELLENCE',
    statPassRate: home?.statPassRate || '92%',
    statPassRateLabel: home?.statPassRateLabel || 'BBS PASS RATE (TU HIGH)',
    statModules: home?.statModules || '6+',
    statModulesLabel: home?.statModulesLabel || 'PRACTICAL SKILL MODULES',
    statVisitors: home?.statVisitors || '1500+',
    statVisitorsLabel: home?.statVisitorsLabel || 'COMMUNITY VISITORS'
  });

  // About Page State
  const [aboutContents, setAboutContents] = useState({
    bannerTitle: about?.bannerTitle || 'About Our Institution',
    cardName: about?.cardName || 'RNS Campus',
    cardDesc: about?.cardDesc || '',
    cardPhoto: about?.cardPhoto || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    headline: about?.headline || '',
    story: about?.story || `${about?.p1 || ''}\n\n${about?.p2 || ''}\n\n${about?.p3 || ''}`,

    infraSubtag: about?.infraSubtag || 'LEARNING ENVIRONMENT',
    infraTitle: about?.infraTitle || 'Our Infrastructure',
    infraDesc: about?.infraDesc || '',

    smartClassTitle: about?.smartClassTitle || 'Smart Classrooms',
    smartClassDesc: about?.smartClassDesc || '',
    smartClassPhoto: about?.smartClassPhoto || '',

    computerLabTitle: about?.computerLabTitle || 'Computer Laboratory',
    computerLabDesc: about?.computerLabDesc || '',
    computerLabPhoto: about?.computerLabPhoto || '',

    vision: about?.vision || '',
    mission: about?.mission || '',
    goals: about?.goals || ''
  });

  // Academics & Faculty State
  const [academicsContents, setAcademicsContents] = useState({
    bannerTitle: academics?.bannerTitle || 'Academics & Faculty',
    bbsTitle: academics?.bbsTitle || 'Bachelor in Business Studies (BBS)',
    bbsDesc: academics?.bbsDesc || '',
    bbsYears: academics?.bbsYears || [],
    teachingMembers: academics?.teachingMembers || [],
    administrativeStaff: academics?.administrativeStaff || []
  });

  // Chairman Message State
  const [chairmanMsgContents, setChairmanMsgContents] = useState({
    name: chairmanMessage?.name || 'Giriraj Sangraula',
    role: chairmanMessage?.role || 'CHAIRMAN',
    quote: chairmanMessage?.quote || '"A place where knowledge flourishes and dreams find their wings."',
    body: chairmanMessage?.body || '',
    image: chairmanMessage?.image || ''
  });

  // Campus Chief Message State
  const [chiefMsgContents, setChiefMsgContents] = useState({
    name: chiefMessage?.name || 'Prof. Deepak Gajurel',
    role: chiefMessage?.role || 'CAMPUS CHIEF',
    quote: chiefMessage?.quote || '"Since our establishment in 2013, RNS Campus has held its commitment to providing exceptional education."',
    body: chiefMessage?.body || '',
    image: chiefMessage?.image || ''
  });

  // Board of Directors State
  const [boardContents, setBoardContents] = useState({
    chairman: boardOfDirectors?.chairman || { name: 'Giriraj Sangraula', role: 'Chairman, Board of Directors', image: '' },
    members: boardOfDirectors?.members || []
  });

  // Website Popup Modal State
  const [popupContents, setPopupContents] = useState({
    enabled: popupModal?.enabled ?? true,
    contentType: popupModal?.contentType || 'both',
    title: popupModal?.title || '🎓 Admissions Open for BBS 2081/82',
    subtitle: popupModal?.subtitle || 'Join Saptari premier public community college under Tribhuvan University.',
    imageUrl: popupModal?.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    buttonText: popupModal?.buttonText || 'View Program Details',
    buttonLink: popupModal?.buttonLink || '/academics'
  });

  // Campus Events State
  const [eventsListState, setEventsListState] = useState(events || []);

  // Keep local events state in sync with global context (e.g. after IndexedDB loads)
  React.useEffect(() => {
    if (events && events.length > 0) {
      setEventsListState(events);
    }
  }, [events]);

  // Event Edit/Add Modal State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState(null); // null = add new, number = edit index
  const [eventFormData, setEventFormData] = useState({
    id: Date.now(),
    title: '',
    slug: '',
    content: '',
    image: '',
    gallery: []
  });

  // Campus Notices State
  const [noticesListState, setNoticesListState] = useState(notices || []);

  // Keep local notices state in sync with global context
  React.useEffect(() => {
    if (notices && notices.length > 0) {
      setNoticesListState(notices);
    }
  }, [notices]);

  // Notice Edit/Add Modal State
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [editingNoticeIndex, setEditingNoticeIndex] = useState(null); // null = add new, number = edit index
  const [categoriesListState, setCategoriesListState] = useState([
    'Exams', 'Admissions', 'Holidays', 'Scholarships', 'Results', 'Events', 'General'
  ]);
  const [isCustomCategoryMode, setIsCustomCategoryMode] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [noticeFormData, setNoticeFormData] = useState({
    id: Date.now(),
    title: '',
    slug: '',
    category: 'Exams',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    summary: '',
    content: '',
    images: []
  });

  // Campus Chronicles State
  const [chroniclesListState, setChroniclesListState] = useState(chronicles || []);

  React.useEffect(() => {
    if (chronicles && chronicles.length > 0) {
      setChroniclesListState(chronicles);
    }
  }, [chronicles]);

  // Chronicle Edit/Add Modal State
  const [isChronicleModalOpen, setIsChronicleModalOpen] = useState(false);
  const [editingChronicleIndex, setEditingChronicleIndex] = useState(null); // null = add, number = edit
  const [chronicleFormData, setChronicleFormData] = useState({
    id: Date.now(),
    title: '',
    slug: '',
    author: 'RNS Student Editorial Board',
    authorImage: '',
    pdfUrl: '',
    pdfFileName: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    excerpt: '',
    content: ''
  });

  const chronicleEditorRef = React.useRef(null);

  React.useEffect(() => {
    if (isChronicleModalOpen && chronicleEditorRef.current) {
      chronicleEditorRef.current.innerHTML = chronicleFormData.content || '';
    }
  }, [isChronicleModalOpen]);

  // Sync all local form states when context data finishes loading from IndexedDB
  React.useEffect(() => {
    if (info) setGeneralSettings(prev => ({ ...prev, ...info }));
    if (home) setHomeContents(prev => ({ ...prev, ...home }));
    if (about) setAboutContents(prev => ({ ...prev, ...about }));
    if (academics) setAcademicsContents(prev => ({ ...prev, ...academics }));
    if (chairmanMessage) setChairmanMsgContents(prev => ({ ...prev, ...chairmanMessage }));
    if (chiefMessage) setChiefMsgContents(prev => ({ ...prev, ...chiefMessage }));
    if (boardOfDirectors) setBoardContents(prev => ({ ...prev, ...boardOfDirectors }));
    if (popupModal) setPopupContents(prev => ({ ...prev, ...popupModal }));
    if (events && events.length > 0) setEventsListState(events);
    if (notices && notices.length > 0) setNoticesListState(notices);
    if (chronicles && chronicles.length > 0) setChroniclesListState(chronicles);
  }, [info, home, about, academics, chairmanMessage, chiefMessage, boardOfDirectors, popupModal, events, notices, chronicles]);

  // Helper function for uncorrupted binary PDF download
  const triggerPdfDownload = async (fileUrl, fileName, pdfKey) => {
    let targetUrl = null;

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

    if (!targetUrl && fileUrl && fileUrl !== 'INDEXED_DB') {
      targetUrl = fileUrl;
    }

    if (!targetUrl) return;

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
        link.download = fileName || 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        return;
      } catch (err) {
        console.error('Error converting Data URL to Blob:', err);
      }
    }

    try {
      const response = await fetch(targetUrl);
      const rawBlob = await response.blob();
      const pdfBlob = new Blob([rawBlob], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (e) {
      console.error('Fetch fallback download error:', e);
      const link = document.createElement('a');
      link.href = targetUrl;
      link.download = fileName || 'document.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // UNIFIED GLOBAL SAVE FUNCTION: Saves EVERY tab, field, text, image, and popup into persistent database
  const saveAllContentsToDatabase = async (e) => {
    if (e) e.preventDefault();
    await saveAllCampusData({
      generalSettings,
      homeContents,
      aboutContents,
      academicsContents,
      chairmanMsgContents,
      chiefMsgContents,
      boardContents,
      popupModalContents: popupContents,
      eventsList: eventsListState,
      noticesList: noticesListState,
      chroniclesList: chroniclesListState
    });

    setSavedSuccess('✨ ALL CONTENTS, IMAGES, POPUP, EVENTS, NOTICES & CHRONICLES successfully saved to Database!');
    setTimeout(() => setSavedSuccess(''), 5000);
  };

  // PDF File Upload Handlers
  const handleCampusProfilePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF file (.pdf)');
      return;
    }
    const reader = new FileReader();
    setUploadingStatus(`Encoding & uploading "${file.name}"...`);
    reader.onload = (evt) => {
      const pdfDataUrl = evt.target.result;
      const updatedSettings = { 
        ...generalSettings, 
        campusProfilePdf: pdfDataUrl,
        campusProfileFileName: file.name
      };
      setGeneralSettings(updatedSettings);
      updateGeneralSettings(updatedSettings);
      setUploadingStatus('');
      setSavedSuccess(`Campus Profile PDF "${file.name}" uploaded & saved! Click Save Contents to persist.`);
      setTimeout(() => setSavedSuccess(''), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleAnnualReportPdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF file (.pdf)');
      return;
    }
    const reader = new FileReader();
    setUploadingStatus(`Encoding & uploading "${file.name}"...`);
    reader.onload = (evt) => {
      const pdfDataUrl = evt.target.result;
      const updatedSettings = { 
        ...generalSettings, 
        annualReportPdf: pdfDataUrl,
        annualReportFileName: file.name
      };
      setGeneralSettings(updatedSettings);
      updateGeneralSettings(updatedSettings);
      setUploadingStatus('');
      setSavedSuccess(`Annual Report PDF "${file.name}" uploaded & saved! Click Save Contents to persist.`);
      setTimeout(() => setSavedSuccess(''), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleSkillChange = (idx, field, value) => {
    const updatedSkills = [...homeContents.skillsList];
    updatedSkills[idx] = { ...updatedSkills[idx], [field]: value };
    setHomeContents({ ...homeContents, skillsList: updatedSkills });
  };

  const handleTeachingMemberChange = (idx, field, value) => {
    const updated = [...academicsContents.teachingMembers];
    updated[idx] = { ...updated[idx], [field]: value };
    setAcademicsContents({ ...academicsContents, teachingMembers: updated });
  };

  const handleStaffMemberChange = (idx, field, value) => {
    const updated = [...academicsContents.administrativeStaff];
    updated[idx] = { ...updated[idx], [field]: value };
    setAcademicsContents({ ...academicsContents, administrativeStaff: updated });
  };

  const handleBbsYearChange = (idx, field, value) => {
    const updated = [...academicsContents.bbsYears];
    updated[idx] = { ...updated[idx], [field]: value };
    setAcademicsContents({ ...academicsContents, bbsYears: updated });
  };

  // Faculty Members Add & Delete
  const handleAddFacultyMember = () => {
    const newMember = {
      id: Date.now(),
      name: 'New Faculty Member',
      role: 'Lecturer / Subject Specialist',
      initials: 'FM',
      image: ''
    };
    const updated = {
      ...academicsContents,
      teachingMembers: [...academicsContents.teachingMembers, newMember]
    };
    setAcademicsContents(updated);
    updateAcademicsContents(updated);
  };

  const handleDeleteFacultyMember = (idx) => {
    const target = academicsContents.teachingMembers[idx];
    confirmDelete({
      title: 'Remove Faculty Member',
      itemName: target?.name || 'Faculty Member',
      message: 'Are you sure you want to remove this faculty member from the directory?',
      onConfirm: () => {
        const updatedList = academicsContents.teachingMembers.filter((_, i) => i !== idx);
        const updated = { ...academicsContents, teachingMembers: updatedList };
        setAcademicsContents(updated);
        updateAcademicsContents(updated);
      }
    });
  };

  // Administrative Staff Add & Delete
  const handleAddStaffMember = () => {
    const newStaff = {
      id: Date.now(),
      name: 'New Staff Member',
      role: 'Administrative Officer',
      initials: 'ST',
      image: ''
    };
    const updated = {
      ...academicsContents,
      administrativeStaff: [...academicsContents.administrativeStaff, newStaff]
    };
    setAcademicsContents(updated);
    updateAcademicsContents(updated);
  };

  const handleDeleteStaffMember = (idx) => {
    const target = academicsContents.administrativeStaff[idx];
    confirmDelete({
      title: 'Remove Staff Member',
      itemName: target?.name || 'Staff Member',
      message: 'Are you sure you want to remove this administrative staff member?',
      onConfirm: () => {
        const updatedList = academicsContents.administrativeStaff.filter((_, i) => i !== idx);
        const updated = { ...academicsContents, administrativeStaff: updatedList };
        setAcademicsContents(updated);
        updateAcademicsContents(updated);
      }
    });
  };

  // BBS Curriculum Module Add & Delete
  const handleAddBbsYear = () => {
    const newYear = {
      id: Date.now(),
      year: 'NEW MODULE / YEAR',
      title: 'Course Module Title',
      desc: 'Detailed course description and subjects covered...'
    };
    const updated = {
      ...academicsContents,
      bbsYears: [...academicsContents.bbsYears, newYear]
    };
    setAcademicsContents(updated);
    updateAcademicsContents(updated);
  };

  const handleDeleteBbsYear = (idx) => {
    const target = academicsContents.bbsYears[idx];
    confirmDelete({
      title: 'Remove Curriculum Module',
      itemName: target?.title || target?.year || 'Curriculum Module',
      message: 'Are you sure you want to remove this course curriculum module?',
      onConfirm: () => {
        const updatedList = academicsContents.bbsYears.filter((_, i) => i !== idx);
        const updated = { ...academicsContents, bbsYears: updatedList };
        setAcademicsContents(updated);
        updateAcademicsContents(updated);
      }
    });
  };

  const handleBoardMemberChange = (idx, field, value) => {
    const updated = [...boardContents.members];
    updated[idx] = { ...updated[idx], [field]: value };
    setBoardContents({ ...boardContents, members: updated });
  };

  // Board of Directors Add & Delete
  const handleAddBoardMember = () => {
    const newMember = {
      id: Date.now(),
      name: 'New Board Member',
      role: 'Board Member',
      initials: 'BM',
      image: ''
    };
    const updated = {
      ...boardContents,
      members: [...boardContents.members, newMember]
    };
    setBoardContents(updated);
    updateBoardOfDirectors(updated);
  };

  const handleDeleteBoardMember = (idx) => {
    const target = boardContents.members[idx];
    confirmDelete({
      title: 'Remove Board Member',
      itemName: target?.name || 'Board Member',
      message: 'Are you sure you want to remove this board of directors member?',
      onConfirm: () => {
        const updatedList = boardContents.members.filter((_, i) => i !== idx);
        const updated = { ...boardContents, members: updatedList };
        setBoardContents(updated);
        updateBoardOfDirectors(updated);
      }
    });
  };

  // Helper for auto slug generation & excerpt derivation (Supports Nepali Devanagari & 2-4 words shortening)
  const generateSlug = (title) => {
    if (!title) return '';
    const words = title
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 4);

    const shortTitle = words.join(' ');

    const slugified = shortTitle
      .toLowerCase()
      .replace(/[^\u0900-\u097Fa-zA-Z0-9\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return slugified || 'item-slug';
  };

  const getDerivedExcerpt = (content) => {
    if (!content) return '';
    const plainText = content.replace(/<[^>]+>/g, '').trim();
    if (plainText.length <= 120) return plainText;
    return plainText.substring(0, 120).trim() + '...';
  };

  // Events Modal & Multi-Image Gallery Handlers
  const handleOpenAddEventModal = () => {
    setEditingEventIndex(null);
    setEventFormData({
      id: Date.now(),
      title: '',
      slug: '',
      content: '',
      image: '',
      gallery: []
    });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEventModal = (idx) => {
    const targetEvt = eventsListState[idx];
    setEditingEventIndex(idx);
    const galleryArr = targetEvt.gallery && targetEvt.gallery.length > 0
      ? [...targetEvt.gallery]
      : (targetEvt.image ? [targetEvt.image] : []);

    const calculatedSlug = targetEvt.slug || generateSlug(targetEvt.title);

    setEventFormData({
      id: targetEvt.id || Date.now(),
      title: targetEvt.title || '',
      slug: calculatedSlug,
      content: targetEvt.content || '',
      image: targetEvt.image || (galleryArr.length > 0 ? galleryArr[0] : ''),
      gallery: galleryArr
    });
    setIsEventModalOpen(true);
  };

  const handleSaveEventFromModal = async (e) => {
    if (e) e.preventDefault();
    if (!eventFormData.title) {
      alert('Please enter an event title');
      return;
    }

    const autoSlug = generateSlug(eventFormData.title);
    const autoExcerpt = getDerivedExcerpt(eventFormData.content);
    const featuredImg = eventFormData.image || (eventFormData.gallery.length > 0 ? eventFormData.gallery[0] : '');

    const finalEvt = {
      ...eventFormData,
      slug: autoSlug,
      excerpt: autoExcerpt,
      image: featuredImg,
      gallery: eventFormData.gallery.length > 0 ? eventFormData.gallery : (featuredImg ? [featuredImg] : [])
    };

    let updatedList = [];
    if (editingEventIndex === null) {
      updatedList = [finalEvt, ...eventsListState];
    } else {
      updatedList = [...eventsListState];
      updatedList[editingEventIndex] = finalEvt;
    }

    setEventsListState(updatedList);
    await updateEvents(updatedList);

    setIsEventModalOpen(false);
    setSavedSuccess(editingEventIndex === null ? '✨ New Event added & saved to Database!' : '✨ Event details updated & saved to Database!');
    setTimeout(() => setSavedSuccess(''), 4000);
  };

  const handleDeleteEvent = async (idx) => {
    const target = eventsListState[idx];
    confirmDelete({
      title: 'Delete Campus Event',
      itemName: target?.title || 'Selected Event',
      message: 'Are you sure you want to delete this event? It will be permanently removed from the website.',
      onConfirm: async () => {
        const updatedList = eventsListState.filter((_, i) => i !== idx);
        setEventsListState(updatedList);
        await updateEvents(updatedList);
        setSavedSuccess('✨ Event deleted & saved to Database!');
        setTimeout(() => setSavedSuccess(''), 4000);
      }
    });
  };

  const handleAddGalleryImages = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    try {
      setUploadingStatus(`Resizing ${files.length} event gallery photo(s)...`);
      const resizedImages = await Promise.all(
        files.map(file => resizeImage(file, 800, 500, 0.88))
      );
      setEventFormData(prev => {
        const newGallery = [...prev.gallery, ...resizedImages];
        const newFeatured = prev.image ? prev.image : newGallery[0];
        return {
          ...prev,
          gallery: newGallery,
          image: newFeatured
        };
      });
      setUploadingStatus('');
      setSavedSuccess(`${files.length} photo(s) added to event gallery!`);
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleSetFeaturedImage = (imgUrl) => {
    setEventFormData(prev => ({ ...prev, image: imgUrl }));
  };

  const handleRemoveGalleryImage = (imgIdx) => {
    setEventFormData(prev => {
      const targetImg = prev.gallery[imgIdx];
      const updatedGallery = prev.gallery.filter((_, i) => i !== imgIdx);
      const isRemovingFeatured = prev.image === targetImg;
      const newFeatured = isRemovingFeatured 
        ? (updatedGallery.length > 0 ? updatedGallery[0] : '') 
        : prev.image;

      return {
        ...prev,
        gallery: updatedGallery,
        image: newFeatured
      };
    });
  };

  // Notices Modal & Attachments Handlers
  const handleOpenAddNoticeModal = () => {
    setEditingNoticeIndex(null);
    setIsCustomCategoryMode(false);
    setCustomCategoryInput('');
    setNoticeFormData({
      id: Date.now(),
      title: '',
      slug: '',
      category: categoriesListState[0] || 'Exams',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary: '',
      content: '',
      images: []
    });
    setIsNoticeModalOpen(true);
  };

  const handleOpenEditNoticeModal = (idx) => {
    const target = noticesListState[idx];
    setEditingNoticeIndex(idx);
    setIsCustomCategoryMode(false);
    setCustomCategoryInput('');
    const calculatedSlug = target.slug || generateSlug(target.title);

    if (target.category && !categoriesListState.includes(target.category)) {
      setCategoriesListState(prev => [...prev, target.category]);
    }

    setNoticeFormData({
      id: target.id || Date.now(),
      title: target.title || '',
      slug: calculatedSlug,
      category: target.category || 'Exams',
      date: target.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary: target.summary || '',
      content: target.content || '',
      images: target.images ? [...target.images] : []
    });
    setIsNoticeModalOpen(true);
  };

  const handleSaveNoticeFromModal = async (e) => {
    if (e) e.preventDefault();
    if (!noticeFormData.title) {
      alert('Please enter a notice title');
      return;
    }

    const autoSlug = generateSlug(noticeFormData.title);
    const autoSummary = getDerivedExcerpt(noticeFormData.content || noticeFormData.summary);

    const finalNotice = {
      ...noticeFormData,
      slug: autoSlug,
      summary: autoSummary
    };

    let updatedList = [];
    if (editingNoticeIndex === null) {
      updatedList = [finalNotice, ...noticesListState];
    } else {
      updatedList = [...noticesListState];
      updatedList[editingNoticeIndex] = finalNotice;
    }

    setNoticesListState(updatedList);
    await updateNotices(updatedList);

    setIsNoticeModalOpen(false);
    setSavedSuccess(editingNoticeIndex === null ? '✨ New Notice published & saved to Database!' : '✨ Notice details updated & saved to Database!');
    setTimeout(() => setSavedSuccess(''), 4000);
  };

  const handleDeleteNotice = async (idx) => {
    const target = noticesListState[idx];
    confirmDelete({
      title: 'Delete Campus Notice',
      itemName: target?.title || 'Selected Notice',
      message: 'Are you sure you want to delete this notice? It will be permanently removed from the notice board.',
      onConfirm: async () => {
        const updatedList = noticesListState.filter((_, i) => i !== idx);
        setNoticesListState(updatedList);
        await updateNotices(updatedList);
        setSavedSuccess('✨ Notice deleted & saved to Database!');
        setTimeout(() => setSavedSuccess(''), 4000);
      }
    });
  };

  const handleAddNoticeImages = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    if (noticeFormData.images.length + files.length > 5) {
      alert('A notice can have a maximum of 5 attached images.');
    }
    try {
      setUploadingStatus(`Resizing ${files.length} notice attachment scan(s)...`);
      const resizedImages = await Promise.all(
        files.map(file => resizeImage(file, 1600, 1600, 0.9, false))
      );
      setNoticeFormData(prev => ({
        ...prev,
        images: [...prev.images, ...resizedImages].slice(0, 5)
      }));
      setUploadingStatus('');
      setSavedSuccess(`Photo attachment(s) added to notice (max 5)!`);
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleRemoveNoticeImage = (imgIdx) => {
    setNoticeFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== imgIdx)
    }));
  };

  // Chronicles Modal, Author Image & PDF Attachment Handlers
  const handleOpenAddChronicleModal = () => {
    setEditingChronicleIndex(null);
    setChronicleFormData({
      id: Date.now(),
      title: '',
      slug: '',
      author: 'RNS Student Editorial Board',
      authorImage: '',
      pdfUrl: '',
      pdfFileName: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      excerpt: '',
      content: ''
    });
    setIsChronicleModalOpen(true);
  };

  const handleOpenEditChronicleModal = (idx) => {
    const target = chroniclesListState[idx];
    setEditingChronicleIndex(idx);
    const calculatedSlug = target.slug || generateSlug(target.title);

    let cleanContent = target.content || '';
    if (!cleanContent && target.fullContent && Array.isArray(target.fullContent)) {
      cleanContent = target.fullContent.map(p => `<p>${p}</p>`).join('');
    }

    setChronicleFormData({
      id: target.id || Date.now(),
      title: target.title || '',
      slug: calculatedSlug,
      author: target.author || 'RNS Editorial Board',
      authorImage: target.authorImage || '',
      pdfUrl: target.pdfUrl || '',
      pdfFileName: target.pdfFileName || '',
      date: target.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      excerpt: target.excerpt || '',
      content: cleanContent
    });
    setIsChronicleModalOpen(true);
  };

  const handleSaveChronicleFromModal = async (e) => {
    if (e) e.preventDefault();
    if (!chronicleFormData.title) {
      alert('Please enter a chronicle article title');
      return;
    }

    const autoSlug = generateSlug(chronicleFormData.title);
    const textOnly = (chronicleFormData.content || '').replace(/<[^>]*>/g, ' ');
    const autoExcerpt = chronicleFormData.excerpt || getDerivedExcerpt(textOnly);

    const finalChronicle = {
      ...chronicleFormData,
      slug: autoSlug,
      excerpt: autoExcerpt
    };

    let updatedList = [];
    if (editingChronicleIndex === null) {
      updatedList = [finalChronicle, ...chroniclesListState];
    } else {
      updatedList = [...chroniclesListState];
      updatedList[editingChronicleIndex] = finalChronicle;
    }

    setChroniclesListState(updatedList);
    await updateChronicles(updatedList);

    setIsChronicleModalOpen(false);
    setSavedSuccess(editingChronicleIndex === null ? '✨ New Campus Chronicle published & saved to Database!' : '✨ Chronicle article updated & saved to Database!');
    setTimeout(() => setSavedSuccess(''), 4000);
  };

  const handleDeleteChronicle = async (idx) => {
    const target = chroniclesListState[idx];
    confirmDelete({
      title: 'Delete Campus Chronicle',
      itemName: target?.title || 'Selected Chronicle Article',
      message: 'Are you sure you want to delete this chronicle article? It will be permanently removed.',
      onConfirm: async () => {
        const updatedList = chroniclesListState.filter((_, i) => i !== idx);
        setChroniclesListState(updatedList);
        await updateChronicles(updatedList);
        setSavedSuccess('✨ Chronicle deleted & saved to Database!');
        setTimeout(() => setSavedSuccess(''), 4000);
      }
    });
  };

  const handleAuthorImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus('Resizing author photo...');
      const resizedDataUrl = await resizeImage(file, 400, 400, 0.88);
      setChronicleFormData(prev => ({ ...prev, authorImage: resizedDataUrl }));
      setUploadingStatus('');
      setSavedSuccess('✨ Author photo uploaded & attached!');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleChroniclePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Please select a valid PDF file.');
      return;
    }

    setUploadingStatus('Attaching article PDF document...');
    const reader = new FileReader();
    reader.onload = () => {
      setChronicleFormData(prev => ({
        ...prev,
        pdfUrl: reader.result,
        pdfFileName: file.name
      }));
      setUploadingStatus('');
      setSavedSuccess(`✨ PDF "${file.name}" attached to article!`);
      setTimeout(() => setSavedSuccess(''), 4000);
    };
    reader.onerror = () => {
      setUploadingStatus('');
      alert('Failed to read PDF document');
    };
    reader.readAsDataURL(file);
  };

  const insertFormattingTag = (startTag, endTag = '') => {
    const textarea = document.getElementById('chronicle-content-body-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = chronicleFormData.content || '';
    const selectedText = currentText.substring(start, end);
    const replacement = `${startTag}${selectedText || 'your text here'}${endTag}`;

    const newContent = currentText.substring(0, start) + replacement + currentText.substring(end);
    setChronicleFormData(prev => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + startTag.length, start + startTag.length + (selectedText.length || 14));
    }, 50);
  };

  // Image Upload Handlers
  const handleChairmanImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus('Resizing Chairman photo...');
      const resizedDataUrl = await resizeImage(file, 400, 400, 0.9);
      const updated = { ...chairmanMsgContents, image: resizedDataUrl };
      setChairmanMsgContents(updated);
      updateChairmanMessage(updated);
      setUploadingStatus('');
      setSavedSuccess('✨ Chairman profile photo uploaded & saved to database!');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleChiefImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus('Resizing Campus Chief photo...');
      const resizedDataUrl = await resizeImage(file, 400, 400, 0.9);
      const updated = { ...chiefMsgContents, image: resizedDataUrl };
      setChiefMsgContents(updated);
      updateChiefMessage(updated);
      setUploadingStatus('');
      setSavedSuccess('✨ Campus Chief profile photo uploaded & saved to database!');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleBoardChairmanImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus('Resizing Board Chairman photo...');
      const resizedDataUrl = await resizeImage(file, 400, 480, 0.9);
      const updated = { ...boardContents, chairman: { ...boardContents.chairman, image: resizedDataUrl } };
      setBoardContents(updated);
      updateBoardOfDirectors(updated);
      setUploadingStatus('');
      setSavedSuccess('✨ Board Chairman portrait photo uploaded & saved!');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleBoardMemberImageUpload = async (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus(`Resizing Board Member #${idx + 1} photo...`);
      const resizedDataUrl = await resizeImage(file, 300, 340, 0.9);
      const updatedMembers = [...boardContents.members];
      updatedMembers[idx] = { ...updatedMembers[idx], image: resizedDataUrl };
      const updatedBoard = { ...boardContents, members: updatedMembers };
      setBoardContents(updatedBoard);
      updateBoardOfDirectors(updatedBoard);
      setUploadingStatus('');
      setSavedSuccess(`✨ Board Member #${idx + 1} photo uploaded & saved!`);
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleTeachingMemberImageUpload = async (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus(`Resizing profile picture for member #${idx + 1}...`);
      const resizedDataUrl = await resizeImage(file, 400, 400, 0.9);
      const updatedList = [...academicsContents.teachingMembers];
      updatedList[idx] = { ...updatedList[idx], image: resizedDataUrl };
      const updatedAcademics = { ...academicsContents, teachingMembers: updatedList };
      setAcademicsContents(updatedAcademics);
      updateAcademicsContents(updatedAcademics);
      setUploadingStatus('');
      setSavedSuccess(`✨ Member #${idx + 1} profile image uploaded & saved!`);
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleStaffMemberImageUpload = async (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus(`Resizing profile picture for staff #${idx + 1}...`);
      const resizedDataUrl = await resizeImage(file, 400, 400, 0.9);
      const updatedList = [...academicsContents.administrativeStaff];
      updatedList[idx] = { ...updatedList[idx], image: resizedDataUrl };
      const updatedAcademics = { ...academicsContents, administrativeStaff: updatedList };
      setAcademicsContents(updatedAcademics);
      updateAcademicsContents(updatedAcademics);
      setUploadingStatus('');
      setSavedSuccess(`✨ Staff member #${idx + 1} profile image uploaded & saved!`);
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleProgramImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus('Resizing program photo...');
      const resizedDataUrl = await resizeImage(file, 800, 450, 0.88);
      const updatedHome = { ...homeContents, programPhotoUrl: resizedDataUrl };
      setHomeContents(updatedHome);
      updateHomeContents(updatedHome);
      setUploadingStatus('');
      setSavedSuccess('✨ Program photo uploaded & saved!');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleHeroBgImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus('Resizing Hero background image...');
      const resizedDataUrl = await resizeImage(file, 1600, 900, 0.85);
      const updatedHome = { ...homeContents, heroBgImage: resizedDataUrl };
      setHomeContents(updatedHome);
      updateHomeContents(updatedHome);
      setUploadingStatus('');
      setSavedSuccess('✨ Hero background photo uploaded & saved!');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handlePopupImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus('Resizing Popup announcement image...');
      const resizedDataUrl = await resizeImage(file, 800, 500, 0.88);
      const updatedPopup = { ...popupContents, imageUrl: resizedDataUrl };
      setPopupContents(updatedPopup);
      updatePopupModal(updatedPopup);
      setUploadingStatus('');
      setSavedSuccess('✨ Popup modal image uploaded & saved!');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleSkillImageUpload = async (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus(`Resizing skill card #${idx + 1}...`);
      const resizedDataUrl = await resizeImage(file, 640, 360, 0.88);
      const updatedSkills = [...homeContents.skillsList];
      updatedSkills[idx] = { ...updatedSkills[idx], photo: resizedDataUrl };
      const updatedHome = { ...homeContents, skillsList: updatedSkills };
      setHomeContents(updatedHome);
      updateHomeContents(updatedHome);
      setUploadingStatus('');
      setSavedSuccess(`✨ Skill card #${idx + 1} photo uploaded & saved!`);
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleLeftCardImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus('Resizing Left Card photo...');
      const resizedDataUrl = await resizeImage(file, 800, 500, 0.88);
      const updatedAbout = { ...aboutContents, cardPhoto: resizedDataUrl };
      setAboutContents(updatedAbout);
      updateAboutContents(updatedAbout);
      setUploadingStatus('');
      setSavedSuccess('✨ Left Card photo uploaded & saved!');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleSmartClassImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus('Resizing Smart Classrooms photo...');
      const resizedDataUrl = await resizeImage(file, 800, 450, 0.88);
      const updatedAbout = { ...aboutContents, smartClassPhoto: resizedDataUrl };
      setAboutContents(updatedAbout);
      updateAboutContents(updatedAbout);
      setUploadingStatus('');
      setSavedSuccess('✨ Smart Classrooms photo uploaded & saved!');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const handleComputerLabImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingStatus('Resizing Computer Lab photo...');
      const resizedDataUrl = await resizeImage(file, 800, 450, 0.88);
      const updatedAbout = { ...aboutContents, computerLabPhoto: resizedDataUrl };
      setAboutContents(updatedAbout);
      updateAboutContents(updatedAbout);
      setUploadingStatus('');
      setSavedSuccess('✨ Computer Lab photo uploaded & saved!');
      setTimeout(() => setSavedSuccess(''), 4000);
    } catch (err) {
      setUploadingStatus('');
      alert(err.message || 'Image processing failed');
    }
  };

  const safeChroniclesList = Array.isArray(chroniclesListState) ? chroniclesListState : [];
  const safeNoticesList = Array.isArray(noticesListState) ? noticesListState : [];
  const safeEventsList = Array.isArray(eventsListState) ? eventsListState : [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'var(--font-sans)' }}>
      
      {/* 1. ADMIN SIDEBAR NAVIGATION WITH ALL ROUTE TABS */}
      <aside style={{
        width: '270px',
        backgroundColor: '#091b36',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        boxShadow: '4px 0 15px rgba(0,0,0,0.1)'
      }}>
        
        {/* Top Brand Header */}
        <div style={{
          padding: '24px 20px 20px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '6px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              flexShrink: 0
            }}>
              <img src="/rns_logo.png" alt="RNS Logo" style={{ width: '52px', height: '52px', objectFit: 'contain', display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff', leading: 1 }}>RNS Admin CMS</div>
              <div style={{ fontSize: '10px', color: '#eab308', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <Database size={12} /> Direct Database Access
              </div>
            </div>
          </div>

          <Link 
            to="/" 
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: '#1b2a54',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              padding: '8px 0',
              borderRadius: '8px',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            <Eye size={14} /> View Website
          </Link>
        </div>

        {/* Sidebar Menu Tabs */}
        <nav style={{ padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          
          {/* Top Priority Management Tabs */}
          <div style={{ fontSize: '10px', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '1px', padding: '0 12px 4px 12px' }}>
            Updates & Announcements
          </div>

          <button 
            onClick={() => setActiveTab('notices')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'notices' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'notices' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Bell size={16} /> Notice
          </button>

          <button 
            onClick={() => setActiveTab('events')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'events' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'events' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Calendar size={16} /> Event
          </button>

          {/* Spacing & Section Divider */}
          <div style={{
            margin: '14px 0 6px 0',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '14px'
          }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', padding: '0 12px 4px 12px' }}>
              Pages & Sections
            </div>
          </div>

          <button 
            onClick={() => setActiveTab('homepage')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'homepage' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'homepage' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <HomeIcon size={16} /> Homepage
          </button>

          <button 
            onClick={() => setActiveTab('about')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'about' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'about' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Info size={16} /> About
          </button>

          <button 
            onClick={() => setActiveTab('academics')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'academics' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'academics' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <GraduationCap size={16} /> Academics
          </button>

          <button 
            onClick={() => setActiveTab('chronicles')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'chronicles' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'chronicles' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <BookOpen size={16} /> Chronicles
          </button>

          <button 
            onClick={() => setActiveTab('chairman')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'chairman' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'chairman' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <MessageSquare size={16} /> Chairman Message
          </button>

          <button 
            onClick={() => setActiveTab('chief')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'chief' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'chief' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <MessageSquare size={16} /> Campus Chief Message
          </button>

          <button 
            onClick={() => setActiveTab('board')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'board' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'board' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Shield size={16} /> Board of Directors
          </button>

          <button 
            onClick={() => setActiveTab('popup')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'popup' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'popup' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={16} /> Website Load Modal
          </button>

          <button 
            onClick={() => setActiveTab('general')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeTab === 'general' ? '#050c1a' : '#cbd5e1',
              backgroundColor: activeTab === 'general' ? '#eab308' : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Settings size={16} /> General Settings
          </button>

        </nav>

      </aside>

      {/* 2. MAIN CMS CONTENT AREA */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        
        {/* Notification Alert */}
        {savedSuccess && (
          <div style={{
            backgroundColor: '#d1fae5',
            border: '1px solid #6ee7b7',
            color: '#065f46',
            padding: '14px 20px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
          }}>
            <CheckCircle2 size={18} />
            <span>{savedSuccess}</span>
          </div>
        )}

        {/* Uploading Spinner Notice */}
        {uploadingStatus && (
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #fde68a',
            color: '#b45309',
            padding: '14px 20px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px'
          }}>
            <Upload size={18} className="animate-spin" />
            <span>{uploadingStatus}</span>
          </div>
        )}

        {/* TOP HEADER BAR WITH GLOBAL SAVE CONTENTS BUTTON */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#091b36' }}>
              {activeTab === 'homepage' && 'Homepage Contents Manager'}
              {activeTab === 'about' && 'About Page Contents Manager'}
              {activeTab === 'academics' && 'Academics & Faculty Directory Manager'}
              {activeTab === 'chairman' && "Chairman's Welcome Message Manager"}
              {activeTab === 'chief' && "Campus Chief's Message Manager"}
              {activeTab === 'board' && 'Board of Directors Directory Manager'}
              {activeTab === 'events' && 'Campus Events Manager'}
              {activeTab === 'notices' && 'Campus Official Notices Manager'}
              {activeTab === 'popup' && 'Website Load Popup Announcement Manager'}
              {activeTab === 'general' && 'General Campus Settings & PDF Documents'}
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              {activeTab === 'homepage' && 'Edit every single section, headline, paragraph, card, photo, and badge displayed on the homepage.'}
              {activeTab === 'about' && 'Edit all institution history narratives, infrastructure photos, vision, mission, and goals.'}
              {activeTab === 'academics' && 'Manage teaching members with profile photos, administrative staff, and BBS curriculum modules.'}
              {activeTab === 'chairman' && 'Edit Chairman name, designation, quote highlight, welcome address body, and profile photo.'}
              {activeTab === 'chief' && 'Edit Campus Chief name, designation, quote highlight, message narrative, and profile photo.'}
              {activeTab === 'board' && 'Manage Board Chairman and all 9 Board Members with photos and roles.'}
              {activeTab === 'events' && 'Add, edit, remove, and manage all events, photos, dates, summaries, and modal popup details.'}
              {activeTab === 'notices' && 'Publish, edit, remove official notices, exam routines, admission updates, and scan attachments.'}
              {activeTab === 'popup' && 'Configure automatic announcement pop-up displayed to visitors when website loads (Image, Text, or Both).'}
              {activeTab === 'general' && 'Configure campus contact info, working hours, and upload Campus Profile PDF & Annual Report PDF.'}
            </p>
          </div>

          {/* GLOBAL SAVE CONTENTS BUTTON ON TOP RIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              type="button" 
              onClick={saveAllContentsToDatabase}
              className="rns-btn-donate"
              style={{
                fontSize: '13px',
                padding: '10px 24px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              <Save size={16} /> Save Contents
            </button>
          </div>

        </div>

        {/* TAB 1: HOMEPAGE FULL CONTENTS */}
        {activeTab === 'homepage' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* 1. Hero Section Content */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: '#d97706' }} /> 1. Hero Banner Content
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Top Badge Tagline</label>
                  <input type="text" value={homeContents.heroBadge} onChange={e => setHomeContents({...homeContents, heroBadge: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Title Prefix</label>
                    <input type="text" value={homeContents.heroTitlePrefix} onChange={e => setHomeContents({...homeContents, heroTitlePrefix: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Title Highlight (Gold)</label>
                    <input type="text" value={homeContents.heroTitleHighlight} onChange={e => setHomeContents({...homeContents, heroTitleHighlight: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Hero Subtitle Narrative</label>
                  <textarea rows={3} value={homeContents.heroSubtitle} onChange={e => setHomeContents({...homeContents, heroSubtitle: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', padding: '10px 14px', width: '100%', height: 'auto' }}></textarea>
                </div>

                {/* Hero Background Photo Uploader */}
                <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Hero Banner Background Photo</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ width: '160px', height: '90px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #cbd5e1', backgroundColor: '#091b36', position: 'relative' }}>
                      <img 
                        src={homeContents.heroBgImage || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80'} 
                        alt="Hero Background Preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', padding: '10px 18px' }}>
                        <Upload size={15} /> Upload Hero Background Image
                        <input type="file" accept="image/*" onChange={handleHeroBgImageUpload} style={{ display: 'none' }} />
                      </label>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        Recommended resolution: 1600 x 900 px (Landscape Campus Photo)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Featured Notice Picker */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={18} style={{ color: '#d97706' }} /> 2. Featured LATEST Notice Section
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Badge Label</label>
                  <input type="text" value={homeContents.featuredNoticeBadge} onChange={e => setHomeContents({...homeContents, featuredNoticeBadge: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Select Notice to Highlight</label>
                  <select value={homeContents.featuredNoticeId} onChange={e => setHomeContents({...homeContents, featuredNoticeId: Number(e.target.value)})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }}>
                    {notices.map(n => (
                      <option key={n.id} value={n.id}>[{n.category}] {n.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Our Regular Programs Section */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} style={{ color: '#d97706' }} /> 3. Our Regular Programs Section
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Subtag</label>
                    <input type="text" value={homeContents.programSubtag} onChange={e => setHomeContents({...homeContents, programSubtag: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Section Title</label>
                    <input type="text" value={homeContents.programTitle} onChange={e => setHomeContents({...homeContents, programTitle: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Program Tag</label>
                    <input type="text" value={homeContents.programCardTag} onChange={e => setHomeContents({...homeContents, programCardTag: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Degree Name</label>
                    <input type="text" value={homeContents.programCardTitle} onChange={e => setHomeContents({...homeContents, programCardTitle: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Program Description</label>
                  <textarea rows={2} value={homeContents.programCardDesc} onChange={e => setHomeContents({...homeContents, programCardDesc: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', padding: '10px 14px', width: '100%', height: 'auto' }}></textarea>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '10px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '2px', display: 'block' }}>Checkmark 1</label>
                    <input type="text" value={homeContents.programCheckmark1} onChange={e => setHomeContents({...homeContents, programCheckmark1: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '2px', display: 'block' }}>Checkmark 2</label>
                    <input type="text" value={homeContents.programCheckmark2} onChange={e => setHomeContents({...homeContents, programCheckmark2: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '2px', display: 'block' }}>Checkmark 3</label>
                    <input type="text" value={homeContents.programCheckmark3} onChange={e => setHomeContents({...homeContents, programCheckmark3: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '2px', display: 'block' }}>Checkmark 4</label>
                    <input type="text" value={homeContents.programCheckmark4} onChange={e => setHomeContents({...homeContents, programCheckmark4: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  </div>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#091b36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ImageIcon size={16} style={{ color: '#d97706' }} /> Regular Program Cover Photo (800x450 Auto-Crop)
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {homeContents.programPhotoUrl && (
                      <div style={{ width: '160px', height: '90px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #cbd5e1', flexShrink: 0 }}>
                        <img src={homeContents.programPhotoUrl} alt="Program Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', padding: '8px 18px', width: 'fit-content' }}>
                        <Upload size={14} /> Upload & Auto-Resize Cover Image
                        <input type="file" accept="image/*" onChange={handleProgramImageUpload} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Beyond The Curriculum Skill Cards */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} style={{ color: '#d97706' }} /> 4. Beyond The Curriculum (6 Skill Modules)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {homeContents.skillsList.map((skill, idx) => (
                  <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36', display: 'flex', justifyBetween: 'space-between', alignItems: 'center' }}>
                      <span>Skill Card #{idx + 1}</span>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>640x360 Auto-Crop</span>
                    </div>

                    {skill.photo && (
                      <div style={{ width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                        <img src={skill.photo} alt={skill.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}

                    <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '6px 12px' }}>
                      <Upload size={13} /> Upload & Auto-Resize Cover Image
                      <input type="file" accept="image/*" onChange={(e) => handleSkillImageUpload(idx, e)} style={{ display: 'none' }} />
                    </label>

                    <input type="text" placeholder="Skill Title" value={skill.title} onChange={e => handleSkillChange(idx, 'title', e.target.value)} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                    <textarea rows={2} placeholder="Description" value={skill.desc} onChange={e => handleSkillChange(idx, 'desc', e.target.value)} className="rns-search-input" style={{ borderRadius: '6px', padding: '8px', fontSize: '12px' }}></textarea>
                    <input type="text" placeholder="Module Tag (e.g. FIRST YEAR MODULE)" value={skill.yearModule} onChange={e => handleSkillChange(idx, 'yearModule', e.target.value)} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Messages of Encouragement (Leaders) */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} style={{ color: '#d97706' }} /> 5. Messages of Encouragement (Chairman & Campus Chief)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36' }}>Chairman Quote Card</div>
                  <input type="text" value={homeContents.chairmanName} onChange={e => setHomeContents({...homeContents, chairmanName: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  <input type="text" value={homeContents.chairmanRole} onChange={e => setHomeContents({...homeContents, chairmanRole: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  <textarea rows={3} value={homeContents.chairmanQuote} onChange={e => setHomeContents({...homeContents, chairmanQuote: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', padding: '8px' }}></textarea>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36' }}>Campus Chief Quote Card</div>
                  <input type="text" value={homeContents.chiefName} onChange={e => setHomeContents({...homeContents, chiefName: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  <input type="text" value={homeContents.chiefRole} onChange={e => setHomeContents({...homeContents, chiefRole: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  <textarea rows={3} value={homeContents.chiefQuote} onChange={e => setHomeContents({...homeContents, chiefQuote: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', padding: '8px' }}></textarea>
                </div>
              </div>
            </div>

            {/* 6. Academic Milestone Banner Card */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} style={{ color: '#d97706' }} /> 6. Academic Milestone Banner Card
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input type="text" value={homeContents.milestoneBadge} onChange={e => setHomeContents({...homeContents, milestoneBadge: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                <input type="text" value={homeContents.milestoneTitle} onChange={e => setHomeContents({...homeContents, milestoneTitle: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                <textarea rows={2} value={homeContents.milestoneDesc} onChange={e => setHomeContents({...homeContents, milestoneDesc: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', padding: '10px 14px' }}></textarea>
              </div>
            </div>

            {/* 7. Stats Counter Values */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={18} style={{ color: '#d97706' }} /> 7. Pre-Footer Stats Counter Bar
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Years Value</label>
                  <input type="text" value={homeContents.statYears} onChange={e => setHomeContents({...homeContents, statYears: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Pass Rate Value</label>
                  <input type="text" value={homeContents.statPassRate} onChange={e => setHomeContents({...homeContents, statPassRate: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Skill Modules Value</label>
                  <input type="text" value={homeContents.statModules} onChange={e => setHomeContents({...homeContents, statModules: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Visitors Value</label>
                  <input type="text" value={homeContents.statVisitors} onChange={e => setHomeContents({...homeContents, statVisitors: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                </div>
              </div>
            </div>
            
            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>

          </form>
        )}

        {/* TAB 2: ABOUT PAGE CONTENTS MANAGER */}
        {activeTab === 'about' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* 1. Left Card Information & Display Photo */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ImageIcon size={18} style={{ color: '#d97706' }} /> 1. Left Card Information & Display Photo
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Left Card Title</label>
                    <input type="text" value={aboutContents.cardName} onChange={e => setAboutContents({...aboutContents, cardName: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Left Card Description Narrative</label>
                    <textarea rows={2} value={aboutContents.cardDesc} onChange={e => setAboutContents({...aboutContents, cardDesc: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', padding: '8px', fontSize: '12px', height: 'auto' }}></textarea>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#091b36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ImageIcon size={16} style={{ color: '#d97706' }} /> Left Card Display Photo
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {aboutContents.cardPhoto && (
                      <div style={{ width: '160px', height: '100px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #cbd5e1', flexShrink: 0 }}>
                        <img src={aboutContents.cardPhoto} alt="Left Card Display Photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', padding: '8px 18px', width: 'fit-content' }}>
                        <Upload size={14} /> Upload & Auto-Resize Left Card Photo
                        <input type="file" accept="image/*" onChange={handleLeftCardImageUpload} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Single Content Writing Space */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={18} style={{ color: '#d97706' }} /> 2. Main Story Content (Single Unified Writing Space)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Main Headline</label>
                  <input type="text" value={aboutContents.headline} onChange={e => setAboutContents({...aboutContents, headline: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
                    About Story Narrative (Single Content Writing Space)
                  </label>
                  <textarea 
                    rows={8} 
                    value={aboutContents.story} 
                    onChange={e => setAboutContents({...aboutContents, story: e.target.value})} 
                    className="rns-search-input" 
                    style={{ borderRadius: '10px', padding: '14px', width: '100%', height: 'auto', fontSize: '13px', lineHeight: 1.6 }}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 3. Infrastructure Cards */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} style={{ color: '#d97706' }} /> 3. Infrastructure Cards (Smart Classrooms & Computer Lab)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36' }}>Smart Classrooms Card</div>
                  {aboutContents.smartClassPhoto && (
                    <div style={{ width: '100%', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                      <img src={aboutContents.smartClassPhoto} alt="Smart Classrooms" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '6px 12px' }}>
                    <Upload size={13} /> Upload & Auto-Resize Photo (800x450)
                    <input type="file" accept="image/*" onChange={handleSmartClassImageUpload} style={{ display: 'none' }} />
                  </label>
                  <input type="text" value={aboutContents.smartClassTitle} onChange={e => setAboutContents({...aboutContents, smartClassTitle: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  <textarea rows={3} value={aboutContents.smartClassDesc} onChange={e => setAboutContents({...aboutContents, smartClassDesc: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', padding: '8px', fontSize: '12px' }}></textarea>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36' }}>Computer Laboratory Card</div>
                  {aboutContents.computerLabPhoto && (
                    <div style={{ width: '100%', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                      <img src={aboutContents.computerLabPhoto} alt="Computer Lab" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '6px 12px' }}>
                    <Upload size={13} /> Upload & Auto-Resize Photo (800x450)
                    <input type="file" accept="image/*" onChange={handleComputerLabImageUpload} style={{ display: 'none' }} />
                  </label>
                  <input type="text" value={aboutContents.computerLabTitle} onChange={e => setAboutContents({...aboutContents, computerLabTitle: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  <textarea rows={3} value={aboutContents.computerLabDesc} onChange={e => setAboutContents({...aboutContents, computerLabDesc: e.target.value})} className="rns-search-input" style={{ borderRadius: '6px', padding: '8px', fontSize: '12px' }}></textarea>
                </div>
              </div>
            </div>

            {/* 4. Institutional Vision, Mission & Goals */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} style={{ color: '#d97706' }} /> 4. Institutional Vision, Mission & Goals
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Institutional Vision</label>
                  <CKEditorField 
                    value={aboutContents.vision} 
                    onChange={val => setAboutContents({...aboutContents, vision: val})} 
                    placeholder="Describe Institutional Vision..."
                    minHeight="140px"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Institutional Mission</label>
                  <CKEditorField 
                    value={aboutContents.mission} 
                    onChange={val => setAboutContents({...aboutContents, mission: val})} 
                    placeholder="Describe Institutional Mission..."
                    minHeight="140px"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Institutional Goals</label>
                  <CKEditorField 
                    value={aboutContents.goals} 
                    onChange={val => setAboutContents({...aboutContents, goals: val})} 
                    placeholder="Describe Institutional Goals..."
                    minHeight="140px"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>

          </form>
        )}

        {/* TAB 3: ACADEMICS & FACULTY DIRECTORY MANAGER */}
        {activeTab === 'academics' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* SUB TAB NAV BAR */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#ffffff',
              padding: '8px',
              borderRadius: '14px',
              border: '1px solid #e2e8f0'
            }}>
              <button
                type="button"
                onClick={() => setAcademicsSubTab('teaching')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: academicsSubTab === 'teaching' ? '#091b36' : 'transparent',
                  color: academicsSubTab === 'teaching' ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Users size={16} /> Faculty Members ({academicsContents.teachingMembers.length})
              </button>

              <button
                type="button"
                onClick={() => setAcademicsSubTab('staff')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: academicsSubTab === 'staff' ? '#091b36' : 'transparent',
                  color: academicsSubTab === 'staff' ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <UserPlus size={16} /> Administrative Staff ({academicsContents.administrativeStaff.length})
              </button>

              <button
                type="button"
                onClick={() => setAcademicsSubTab('curriculum')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: academicsSubTab === 'curriculum' ? '#091b36' : 'transparent',
                  color: academicsSubTab === 'curriculum' ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <BookOpen size={16} /> BBS Curriculum Modules ({academicsContents.bbsYears.length})
              </button>
            </div>

            {/* SUBTAB 1: FACULTY MEMBERS (ADD, EDIT, DELETE, IMAGE) */}
            {academicsSubTab === 'teaching' && (
              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={18} style={{ color: '#d97706' }} /> Faculty Members Directory
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddFacultyMember}
                    className="rns-btn-donate"
                    style={{ fontSize: '12px', padding: '8px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }}
                  >
                    <Plus size={14} /> Add Faculty Member
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  {academicsContents.teachingMembers.map((member, idx) => (
                    <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #eab308', flexShrink: 0, backgroundColor: '#091b36', color: '#ffffff', fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {member.image ? (
                            <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span>{member.initials || member.name?.slice(0, 2)?.toUpperCase() || 'FM'}</span>
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#091b36' }}>Faculty Member #{idx + 1}</div>
                          <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '10px', padding: '4px 10px', marginTop: '4px' }}>
                            <Upload size={12} /> Upload Photo
                            <input type="file" accept="image/*" onChange={(e) => handleTeachingMemberImageUpload(idx, e)} style={{ display: 'none' }} />
                          </label>
                        </div>
                      </div>

                      <input 
                        type="text" 
                        placeholder="Faculty Name" 
                        value={member.name} 
                        onChange={e => handleTeachingMemberChange(idx, 'name', e.target.value)} 
                        className="rns-search-input" 
                        style={{ borderRadius: '6px', paddingLeft: '10px' }} 
                      />
                      <input 
                        type="text" 
                        placeholder="Role / Department / Subject" 
                        value={member.role} 
                        onChange={e => handleTeachingMemberChange(idx, 'role', e.target.value)} 
                        className="rns-search-input" 
                        style={{ borderRadius: '6px', paddingLeft: '10px' }} 
                      />

                      <button
                        type="button"
                        onClick={() => handleDeleteFacultyMember(idx)}
                        style={{
                          color: '#ef4444',
                          backgroundColor: '#fef2f2',
                          border: '1px solid #fecaca',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginTop: '4px',
                          width: 'fit-content'
                        }}
                      >
                        <Trash2 size={13} /> Remove Faculty Member
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBTAB 2: ADMINISTRATIVE STAFF (ADD, EDIT, DELETE, IMAGE) */}
            {academicsSubTab === 'staff' && (
              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserPlus size={18} style={{ color: '#d97706' }} /> Administrative Staff Directory
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddStaffMember}
                    className="rns-btn-donate"
                    style={{ fontSize: '12px', padding: '8px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }}
                  >
                    <Plus size={14} /> Add Staff Member
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  {academicsContents.administrativeStaff.map((staff, idx) => (
                    <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #cbd5e1', flexShrink: 0, backgroundColor: '#091b36', color: '#ffffff', fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {staff.image ? (
                            <img src={staff.image} alt={staff.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span>{staff.initials || staff.name?.slice(0, 2)?.toUpperCase() || 'ST'}</span>
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#091b36' }}>Staff Member #{idx + 1}</div>
                          <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '10px', padding: '4px 10px', marginTop: '4px' }}>
                            <Upload size={12} /> Upload Photo
                            <input type="file" accept="image/*" onChange={(e) => handleStaffMemberImageUpload(idx, e)} style={{ display: 'none' }} />
                          </label>
                        </div>
                      </div>

                      <input 
                        type="text" 
                        placeholder="Staff Name" 
                        value={staff.name} 
                        onChange={e => handleStaffMemberChange(idx, 'name', e.target.value)} 
                        className="rns-search-input" 
                        style={{ borderRadius: '6px', paddingLeft: '10px' }} 
                      />
                      <input 
                        type="text" 
                        placeholder="Official Designation / Role" 
                        value={staff.role} 
                        onChange={e => handleStaffMemberChange(idx, 'role', e.target.value)} 
                        className="rns-search-input" 
                        style={{ borderRadius: '6px', paddingLeft: '10px' }} 
                      />

                      <button
                        type="button"
                        onClick={() => handleDeleteStaffMember(idx)}
                        style={{
                          color: '#ef4444',
                          backgroundColor: '#fef2f2',
                          border: '1px solid #fecaca',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginTop: '4px',
                          width: 'fit-content'
                        }}
                      >
                        <Trash2 size={13} /> Remove Staff Member
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBTAB 3: BBS CURRICULUM MODULES (ADD, EDIT, DELETE, CONTENTS) */}
            {academicsSubTab === 'curriculum' && (
              <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* BBS PROGRAM HEADLINE & OVERVIEW */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36' }}>BBS Program Headline & General Overview</div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Program Title</label>
                    <input 
                      type="text" 
                      value={academicsContents.bbsTitle} 
                      onChange={e => setAcademicsContents(prev => ({ ...prev, bbsTitle: e.target.value }))} 
                      className="rns-search-input" 
                      style={{ borderRadius: '6px', paddingLeft: '10px', width: '100%' }} 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Program Description Overview</label>
                    <textarea 
                      rows={3} 
                      value={academicsContents.bbsDesc} 
                      onChange={e => setAcademicsContents(prev => ({ ...prev, bbsDesc: e.target.value }))} 
                      className="rns-search-input" 
                      style={{ borderRadius: '6px', padding: '8px', fontSize: '12px', width: '100%', height: 'auto' }}
                    ></textarea>
                  </div>
                </div>

                {/* CURRICULUM MODULES CARDS LIST */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BookOpen size={18} style={{ color: '#d97706' }} /> BBS Academic Years & Curriculum Modules
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddBbsYear}
                      className="rns-btn-donate"
                      style={{ fontSize: '12px', padding: '8px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }}
                    >
                      <Plus size={14} /> Add Curriculum Module
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                    {academicsContents.bbsYears.map((y, idx) => (
                      <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#091b36' }}>Module / Year Card #{idx + 1}</div>

                        <input 
                          type="text" 
                          placeholder="Year / Level (e.g. FIRST YEAR)" 
                          value={y.year} 
                          onChange={e => handleBbsYearChange(idx, 'year', e.target.value)} 
                          className="rns-search-input" 
                          style={{ borderRadius: '6px', paddingLeft: '10px' }} 
                        />
                        <input 
                          type="text" 
                          placeholder="Module Title (e.g. Foundation in Business & Economics)" 
                          value={y.title} 
                          onChange={e => handleBbsYearChange(idx, 'title', e.target.value)} 
                          className="rns-search-input" 
                          style={{ borderRadius: '6px', paddingLeft: '10px' }} 
                        />
                        <textarea 
                          rows={3} 
                          placeholder="Description & Course Subjects..." 
                          value={y.desc} 
                          onChange={e => handleBbsYearChange(idx, 'desc', e.target.value)} 
                          className="rns-search-input" 
                          style={{ borderRadius: '6px', padding: '8px', fontSize: '12px', height: 'auto' }}
                        ></textarea>

                        <button
                          type="button"
                          onClick={() => handleDeleteBbsYear(idx)}
                          style={{
                            color: '#ef4444',
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            marginTop: '4px',
                            width: 'fit-content'
                          }}
                        >
                          <Trash2 size={13} /> Remove Module
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>
          </form>
        )}

        {/* TAB 4: CHAIRMAN'S MESSAGE MANAGER */}
        {activeTab === 'chairman' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} style={{ color: '#d97706' }} /> Chairman's Welcome Address Manager
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Chairman Full Name</label>
                    <input type="text" value={chairmanMsgContents.name} onChange={e => setChairmanMsgContents({...chairmanMsgContents, name: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Official Title / Role</label>
                    <input type="text" value={chairmanMsgContents.role} onChange={e => setChairmanMsgContents({...chairmanMsgContents, role: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #eab308', backgroundColor: '#091b36', color: '#ffffff', fontWeight: 800, fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {chairmanMsgContents.image ? (
                      <img src={chairmanMsgContents.image} alt={chairmanMsgContents.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span>GS</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36' }}>Chairman Profile Photo</div>
                    <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '6px 14px', marginTop: '6px' }}>
                      <Upload size={13} /> Upload & Auto-Resize Profile Photo
                      <input type="file" accept="image/*" onChange={handleChairmanImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Highlight Quote</label>
                  <input type="text" value={chairmanMsgContents.quote} onChange={e => setChairmanMsgContents({...chairmanMsgContents, quote: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Full Welcome Address Body</label>
                  <textarea rows={10} value={chairmanMsgContents.body} onChange={e => setChairmanMsgContents({...chairmanMsgContents, body: e.target.value})} className="rns-search-input" style={{ borderRadius: '10px', padding: '14px', width: '100%', height: 'auto', fontSize: '13px', lineHeight: 1.6 }}></textarea>
                </div>
              </div>
            </div>

            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>
          </form>
        )}

        {/* TAB 5: CAMPUS CHIEF'S MESSAGE MANAGER */}
        {activeTab === 'chief' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} style={{ color: '#d97706' }} /> Campus Chief's Message Manager
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Campus Chief Name</label>
                    <input type="text" value={chiefMsgContents.name} onChange={e => setChiefMsgContents({...chiefMsgContents, name: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Official Title / Role</label>
                    <input type="text" value={chiefMsgContents.role} onChange={e => setChiefMsgContents({...chiefMsgContents, role: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #eab308', backgroundColor: '#091b36', color: '#ffffff', fontWeight: 800, fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {chiefMsgContents.image ? (
                      <img src={chiefMsgContents.image} alt={chiefMsgContents.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span>DG</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36' }}>Campus Chief Profile Photo</div>
                    <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '6px 14px', marginTop: '6px' }}>
                      <Upload size={13} /> Upload & Auto-Resize Profile Photo
                      <input type="file" accept="image/*" onChange={handleChiefImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Highlight Quote</label>
                  <input type="text" value={chiefMsgContents.quote} onChange={e => setChiefMsgContents({...chiefMsgContents, quote: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Full Message Narrative Body</label>
                  <textarea rows={10} value={chiefMsgContents.body} onChange={e => setChiefMsgContents({...chiefMsgContents, body: e.target.value})} className="rns-search-input" style={{ borderRadius: '10px', padding: '14px', width: '100%', height: 'auto', fontSize: '13px', lineHeight: 1.6 }}></textarea>
                </div>
              </div>
            </div>

            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>
          </form>
        )}

        {/* TAB 6: BOARD OF DIRECTORS MANAGER */}
        {activeTab === 'board' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={18} style={{ color: '#d97706' }} /> Board of Directors Directory Manager
                </h3>
                <button
                  type="button"
                  onClick={handleAddBoardMember}
                  className="rns-btn-donate"
                  style={{ fontSize: '12px', padding: '8px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }}
                >
                  <Plus size={14} /> Add Board Member
                </button>
              </div>

              {/* Board Chairman Card */}
              <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36' }}>Board Chairman Portrait & Details</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  {boardContents.chairman.image && (
                    <div style={{ width: '100px', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #cbd5e1', flexShrink: 0 }}>
                      <img src={boardContents.chairman.image} alt={boardContents.chairman.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '6px 14px', width: 'fit-content' }}>
                      <Upload size={13} /> Upload Board Chairman Portrait
                      <input type="file" accept="image/*" onChange={handleBoardChairmanImageUpload} style={{ display: 'none' }} />
                    </label>
                    <input type="text" placeholder="Chairman Name" value={boardContents.chairman.name} onChange={e => setBoardContents({...boardContents, chairman: {...boardContents.chairman, name: e.target.value}})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                    <input type="text" placeholder="Official Role / Designation" value={boardContents.chairman.role} onChange={e => setBoardContents({...boardContents, chairman: {...boardContents.chairman, role: e.target.value}})} className="rns-search-input" style={{ borderRadius: '6px', paddingLeft: '10px' }} />
                  </div>
                </div>
              </div>

              {/* Board Members Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {boardContents.members.map((member, idx) => (
                  <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#091b36' }}>Board Member #{idx + 1}</div>
                    
                    {member.image && (
                      <div style={{ width: '100px', height: '120px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}

                    <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', fontSize: '10px', padding: '4px 10px' }}>
                      <Upload size={12} /> Upload Photo
                      <input type="file" accept="image/*" onChange={(e) => handleBoardMemberImageUpload(idx, e)} style={{ display: 'none' }} />
                    </label>

                    <input 
                      type="text" 
                      placeholder="Name" 
                      value={member.name} 
                      onChange={e => handleBoardMemberChange(idx, 'name', e.target.value)} 
                      className="rns-search-input" 
                      style={{ borderRadius: '6px', paddingLeft: '10px' }} 
                    />
                    <input 
                      type="text" 
                      placeholder="Role / Designation" 
                      value={member.role} 
                      onChange={e => handleBoardMemberChange(idx, 'role', e.target.value)} 
                      className="rns-search-input" 
                      style={{ borderRadius: '6px', paddingLeft: '10px' }} 
                    />

                    <button
                      type="button"
                      onClick={() => handleDeleteBoardMember(idx)}
                      style={{
                        color: '#ef4444',
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '4px',
                        width: 'fit-content'
                      }}
                    >
                      <Trash2 size={13} /> Remove Board Member
                    </button>
                  </div>
                ))}
              </div>

            </div>

            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>
          </form>
        )}

        {/* TAB 7: CAMPUS EVENTS MANAGER */}
        {activeTab === 'events' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={18} style={{ color: '#d97706' }} /> Campus Events Directory ({eventsListState.length} Events)
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Manage events shown on the front-end Events page (`/events`). Click "Edit" to modify images, gallery photos, featured image, dates, and narrative.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddEventModal}
                  className="rns-btn-donate"
                  style={{ fontSize: '12px', padding: '10px 22px', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }}
                >
                  <Plus size={15} /> Add New Event
                </button>
              </div>

              {/* EVENTS TABLE LIST VIEW */}
              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '14px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#091b36', fontWeight: 800 }}>
                      <th style={{ padding: '14px 16px', width: '90px' }}>Cover Photo</th>
                      <th style={{ padding: '14px 16px' }}>Event Title & Date</th>
                      <th style={{ padding: '14px 16px' }}>Summary Preview</th>
                      <th style={{ padding: '14px 16px', width: '130px' }}>Gallery Photos</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', width: '180px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventsListState.map((evt, idx) => {
                      const galleryCount = evt.gallery ? evt.gallery.length : (evt.image ? 1 : 0);
                      const featuredImg = evt.image || (evt.gallery && evt.gallery.length > 0 ? evt.gallery[0] : '');

                      return (
                        <tr key={evt.id || idx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fcfcfd' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ width: '70px', height: '48px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#091b36', border: '1px solid #cbd5e1', position: 'relative' }}>
                              {featuredImg ? (
                                <img src={featuredImg} alt={evt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <div style={{ color: '#94a3b8', fontSize: '10px', textAlign: 'center', paddingTop: '14px' }}>No Image</div>
                              )}
                            </div>
                          </td>

                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ fontWeight: 800, color: '#091b36', fontSize: '14px', lineHeight: 1.3 }}>{evt.title || 'Untitled Event'}</div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#d97706', marginTop: '3px' }}>📅 {evt.date || 'No Date'}</div>
                          </td>

                          <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px', maxWidth: '300px' }}>
                            <div style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                              {evt.excerpt || 'No summary provided.'}
                            </div>
                          </td>

                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>
                              🖼️ {galleryCount} Photo{galleryCount === 1 ? '' : 's'}
                            </span>
                          </td>

                          <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                              <button
                                type="button"
                                onClick={() => handleOpenEditEventModal(idx)}
                                className="rns-btn-outline"
                                style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Edit size={13} /> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteEvent(idx)}
                                style={{
                                  backgroundColor: '#fef2f2',
                                  color: '#dc2626',
                                  border: '1px solid #fecaca',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  padding: '6px 12px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontWeight: 700
                                }}
                              >
                                <Trash2 size={13} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>

            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>
          </form>
        )}

        {/* TAB 8: WEBSITE LOAD POPUP ANNOUNCEMENT MANAGER */}
        {activeTab === 'popup' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: '#d97706' }} /> Website Auto-Popup Configuration
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* 1. ENABLE / DISABLE TOGGLE */}
                <div style={{
                  backgroundColor: popupContents.enabled ? '#f0fdf4' : '#fef2f2',
                  border: popupContents.enabled ? '1px solid #bbf7d0' : '1px solid #fecaca',
                  padding: '20px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: popupContents.enabled ? '#166534' : '#991b1b' }}>
                      Website Auto-Popup Status: <strong>{popupContents.enabled ? '🟢 ENABLED (Visible on Site Load)' : '🔴 DISABLED'}</strong>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                      When enabled, this popup opens automatically in front of visitors when they load the website.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPopupContents(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className="rns-btn-donate"
                    style={{
                      backgroundColor: popupContents.enabled ? '#dc2626' : '#16a34a',
                      fontSize: '12px',
                      padding: '10px 24px',
                      borderRadius: '8px'
                    }}
                  >
                    {popupContents.enabled ? 'Disable Auto-Popup' : 'Enable Auto-Popup'}
                  </button>
                </div>

                {/* 2. POPUP TYPE SELECTOR */}
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Popup Content Type</label>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    
                    <label style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', borderRadius: '10px',
                      border: popupContents.contentType === 'both' ? '2px solid #091b36' : '1px solid #cbd5e1',
                      backgroundColor: popupContents.contentType === 'both' ? '#f8fafc' : '#ffffff',
                      cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: '#091b36'
                    }}>
                      <input 
                        type="radio" 
                        name="contentType" 
                        value="both" 
                        checked={popupContents.contentType === 'both'} 
                        onChange={() => setPopupContents(prev => ({ ...prev, contentType: 'both' }))} 
                      />
                      🖼️ + 📝 Image & Text Combo
                    </label>

                    <label style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', borderRadius: '10px',
                      border: popupContents.contentType === 'image' ? '2px solid #091b36' : '1px solid #cbd5e1',
                      backgroundColor: popupContents.contentType === 'image' ? '#f8fafc' : '#ffffff',
                      cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: '#091b36'
                    }}>
                      <input 
                        type="radio" 
                        name="contentType" 
                        value="image" 
                        checked={popupContents.contentType === 'image'} 
                        onChange={() => setPopupContents(prev => ({ ...prev, contentType: 'image' }))} 
                      />
                      🖼️ Image Only Popup
                    </label>

                    <label style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', borderRadius: '10px',
                      border: popupContents.contentType === 'text' ? '2px solid #091b36' : '1px solid #cbd5e1',
                      backgroundColor: popupContents.contentType === 'text' ? '#f8fafc' : '#ffffff',
                      cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: '#091b36'
                    }}>
                      <input 
                        type="radio" 
                        name="contentType" 
                        value="text" 
                        checked={popupContents.contentType === 'text'} 
                        onChange={() => setPopupContents(prev => ({ ...prev, contentType: 'text' }))} 
                      />
                      📝 Text Only Popup
                    </label>

                  </div>
                </div>

                {/* 3. POPUP IMAGE UPLOADER */}
                {(popupContents.contentType === 'both' || popupContents.contentType === 'image') && (
                  <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Popup Announcement Image</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                      {popupContents.imageUrl && (
                        <div style={{ width: '160px', height: '100px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #cbd5e1', backgroundColor: '#091b36', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={popupContents.imageUrl} alt="Popup Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', padding: '10px 18px' }}>
                          <Upload size={15} /> Upload Popup Banner Image
                          <input type="file" accept="image/*" onChange={handlePopupImageUpload} style={{ display: 'none' }} />
                        </label>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          Recommended resolution: 800 x 500 px
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. POPUP TEXT CONTENT */}
                {(popupContents.contentType === 'both' || popupContents.contentType === 'text') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Popup Headline / Title</label>
                      <input 
                        type="text" 
                        value={popupContents.title} 
                        onChange={e => setPopupContents(prev => ({ ...prev, title: e.target.value }))} 
                        placeholder="e.g. 🎓 Admissions Open for BBS 2081/82" 
                        className="rns-search-input" 
                        style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Popup Announcement Narrative / Subtitle</label>
                      <textarea 
                        rows={3} 
                        value={popupContents.subtitle} 
                        onChange={e => setPopupContents(prev => ({ ...prev, subtitle: e.target.value }))} 
                        placeholder="Describe the announcement or event..." 
                        className="rns-search-input" 
                        style={{ borderRadius: '8px', padding: '10px 14px', width: '100%', height: 'auto' }} 
                      ></textarea>
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* LIVE PREVIEW BOX */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#091b36', marginBottom: '16px' }}>
                👁️ Live Real-Time Popup Preview
              </h4>
              
              <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '650px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                  
                  {(popupContents.contentType === 'both' || popupContents.contentType === 'image') && popupContents.imageUrl && (
                    <div style={{ maxHeight: '380px', overflow: 'hidden', backgroundColor: '#091b36', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
                      <img src={popupContents.imageUrl} alt="Preview" style={{ width: '100%', height: 'auto', maxHeight: '360px', objectFit: 'contain', borderRadius: '10px', display: 'block' }} />
                    </div>
                  )}

                  {(popupContents.contentType === 'both' || popupContents.contentType === 'text') && (
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>
                        OFFICIAL ANNOUNCEMENT PREVIEW
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: '#091b36' }}>
                        {popupContents.title || 'Untitled Popup'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
                        {popupContents.subtitle || 'No subtitle narrative provided.'}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>

          </form>
        )}

        {/* TAB 8: GENERAL SETTINGS & PDF DOCUMENTS MANAGER */}
        {activeTab === 'general' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} style={{ color: '#d97706' }} /> Official Campus Information & Contact Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Short Brand Name</label>
                    <input type="text" value={generalSettings.name} onChange={e => setGeneralSettings({...generalSettings, name: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Full Campus Name</label>
                    <input type="text" value={generalSettings.fullName} onChange={e => setGeneralSettings({...generalSettings, fullName: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Established (BS)</label>
                    <input type="text" value={generalSettings.establishedBS} onChange={e => setGeneralSettings({...generalSettings, establishedBS: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Established (AD)</label>
                    <input type="text" value={generalSettings.establishedAD} onChange={e => setGeneralSettings({...generalSettings, establishedAD: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>University Affiliation</label>
                    <input type="text" value={generalSettings.affiliation} onChange={e => setGeneralSettings({...generalSettings, affiliation: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Campus Location Address</label>
                  <input type="text" value={generalSettings.location} onChange={e => setGeneralSettings({...generalSettings, location: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Contact Phone Numbers</label>
                    <input type="text" value={generalSettings.phone} onChange={e => setGeneralSettings({...generalSettings, phone: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Contact Email Address</label>
                    <input type="email" value={generalSettings.email} onChange={e => setGeneralSettings({...generalSettings, email: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Working Hours</label>
                  <input type="text" value={generalSettings.workingHours} onChange={e => setGeneralSettings({...generalSettings, workingHours: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Top Navbar Right Side Quote Text</label>
                  <input type="text" value={generalSettings.topQuote} onChange={e => setGeneralSettings({...generalSettings, topQuote: e.target.value})} className="rns-search-input" style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} />
                </div>

                {/* Official PDF Document Uploaders for Floating Action Buttons */}
                <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#091b36', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={18} style={{ color: '#d97706' }} /> Official Campus PDF Documents (Downloaded from Floating Side Icons)
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {/* Campus Profile PDF */}
                    <div style={{ backgroundColor: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FileText size={16} style={{ color: '#091b36' }} /> 1. Campus Profile PDF Document
                      </div>

                      {/* Display Uploaded File Name */}
                      <div style={{
                        backgroundColor: '#f1f5f9',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#091b36',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: '1px solid #cbd5e1'
                      }}>
                        <FileCheck size={16} style={{ color: '#16a34a' }} />
                        <span style={{ wordBreak: 'break-all' }}>
                          Uploaded File: <strong>{generalSettings.campusProfileFileName || 'rns_campus_profile.pdf'}</strong>
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
                        <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '8px 14px' }}>
                          <Upload size={14} /> Upload Campus Profile PDF
                          <input type="file" accept="application/pdf" onChange={handleCampusProfilePdfUpload} style={{ display: 'none' }} />
                        </label>

                        {generalSettings.campusProfilePdf && (
                          <button
                            type="button"
                            onClick={() => triggerPdfDownload(generalSettings.campusProfilePdf, generalSettings.campusProfileFileName || 'rns_campus_profile.pdf', 'campusProfilePdf')}
                            className="rns-btn-donate"
                            style={{ fontSize: '11px', padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Download size={13} /> Test Download
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Annual Report PDF */}
                    <div style={{ backgroundColor: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BarChart3 size={16} style={{ color: '#d97706' }} /> 2. Annual Progress & Financial Report PDF
                      </div>

                      {/* Display Uploaded File Name */}
                      <div style={{
                        backgroundColor: '#f1f5f9',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#091b36',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: '1px solid #cbd5e1'
                      }}>
                        <FileCheck size={16} style={{ color: '#16a34a' }} />
                        <span style={{ wordBreak: 'break-all' }}>
                          Uploaded File: <strong>{generalSettings.annualReportFileName || 'rns_annual_report.pdf'}</strong>
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
                        <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '8px 14px' }}>
                          <Upload size={14} /> Upload Annual Report PDF
                          <input type="file" accept="application/pdf" onChange={handleAnnualReportPdfUpload} style={{ display: 'none' }} />
                        </label>

                        {generalSettings.annualReportPdf && (
                          <button
                            type="button"
                            onClick={() => triggerPdfDownload(generalSettings.annualReportPdf, generalSettings.annualReportFileName || 'rns_annual_report.pdf', 'annualReportPdf')}
                            className="rns-btn-donate"
                            style={{ fontSize: '11px', padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                                <Download size={13} /> Test Download
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>
          </form>
        )}

        {/* TAB 8: CAMPUS NOTICES MANAGER */}
        {activeTab === 'notices' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bell size={18} style={{ color: '#d97706' }} /> Official Notices Directory ({noticesListState.length} Notices)
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Publish, edit, and manage official notices displayed on the front-end Notices page (`/notices`). Click "Edit" to modify title, category, date, content, and scan photo attachments.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddNoticeModal}
                  className="rns-btn-donate"
                  style={{ fontSize: '12px', padding: '10px 22px', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }}
                >
                  <Plus size={15} /> Publish New Notice
                </button>
              </div>

              {/* NOTICES TABLE LIST VIEW */}
              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '14px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#091b36', fontWeight: 800 }}>
                      <th style={{ padding: '14px 16px', width: '90px' }}>Attachment</th>
                      <th style={{ padding: '14px 16px' }}>Notice Title & Auto Slug</th>
                      <th style={{ padding: '14px 16px', width: '140px' }}>Category & Date</th>
                      <th style={{ padding: '14px 16px' }}>Summary Preview</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', width: '180px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noticesListState.map((notice, idx) => {
                      const noticeSlug = notice.slug || generateSlug(notice.title);
                      const autoSummary = getDerivedExcerpt(notice.content || notice.summary);

                      return (
                        <tr key={notice.id || idx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fcfcfd' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ width: '60px', height: '44px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#091b36', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                              {notice.images && notice.images.length > 0 ? (
                                <img src={notice.images[0]} alt={notice.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <FileText size={18} style={{ color: '#eab308' }} />
                              )}
                            </div>
                          </td>

                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ fontWeight: 800, color: '#091b36', fontSize: '14px', lineHeight: 1.3 }}>{notice.title || 'Untitled Notice'}</div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span>🔗</span> /notices?notice={noticeSlug || 'notice-slug'}
                            </div>
                          </td>

                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ backgroundColor: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', display: 'inline-block', marginBottom: '4px' }}>
                              {notice.category || 'General'}
                            </span>
                            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>📅 {notice.date || '2081 Baisakh 10'}</div>
                          </td>

                          <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px', maxWidth: '280px' }}>
                            <div style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                              {autoSummary || 'No summary text.'}
                            </div>
                          </td>

                          <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                              <button
                                type="button"
                                onClick={() => handleOpenEditNoticeModal(idx)}
                                className="rns-btn-outline"
                                style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Edit size={13} /> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteNotice(idx)}
                                style={{
                                  backgroundColor: '#fef2f2',
                                  color: '#dc2626',
                                  border: '1px solid #fecaca',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  padding: '6px 12px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontWeight: 700
                                }}
                              >
                                <Trash2 size={13} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>

            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>
          </form>
        )}

        {/* TAB: CAMPUS CHRONICLES MANAGER */}
        {activeTab === 'chronicles' && (
          <form onSubmit={saveAllContentsToDatabase} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#091b36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={18} style={{ color: '#d97706' }} /> Campus Chronicles & Publications Directory ({safeChroniclesList.length} Articles)
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Publish, edit, and manage articles, research papers, and student essays on the front-end Chronicles page (`/chronicles`). Click "Edit" to modify title, author, cover photo, narrative content, and auto-generated slug.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddChronicleModal}
                  className="rns-btn-donate"
                  style={{ fontSize: '12px', padding: '10px 22px', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }}
                >
                  <Plus size={15} /> Publish New Chronicle Article
                </button>
              </div>

              {/* CHRONICLES TABLE LIST VIEW */}
              <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '14px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#091b36', fontWeight: 800 }}>
                      <th style={{ padding: '14px 16px', width: '70px' }}>Author Photo</th>
                      <th style={{ padding: '14px 16px' }}>Article Title & Author</th>
                      <th style={{ padding: '14px 16px' }}>PDF Attachment</th>
                      <th style={{ padding: '14px 16px' }}>Auto Excerpt Preview</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', width: '180px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeChroniclesList.map((chr, idx) => {
                      const chrSlug = chr.slug || generateSlug(chr.title);
                      const textOnly = (chr.content || '').replace(/<[^>]*>/g, ' ');
                      const autoExcerpt = chr.excerpt || getDerivedExcerpt(textOnly);

                      return (
                        <tr key={chr.id || idx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fcfcfd' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#091b36', border: '2px solid #eab308', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {chr.authorImage ? (
                                <img src={chr.authorImage} alt={chr.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <User size={20} style={{ color: '#eab308' }} />
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ fontWeight: 800, color: '#091b36', fontSize: '14px' }}>{chr.title || 'Untitled Article'}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span>✍️ {chr.author || 'Editorial Board'}</span>
                              <code style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '1px 6px', borderRadius: '4px', fontSize: '10px' }}>
                                /chronicles/{chrSlug}
                              </code>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            {chr.pdfUrl ? (
                              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', backgroundColor: '#dcfce7', border: '1px solid #bbf7d0', padding: '3px 10px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                📄 PDF Attached
                              </span>
                            ) : (
                              <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>
                                None
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '12px 16px', color: '#475569', fontSize: '12px', maxWidth: '240px' }}>
                            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {autoExcerpt || 'No excerpt summary available.'}
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                              <button
                                type="button"
                                onClick={() => handleOpenEditChronicleModal(idx)}
                                className="rns-btn-outline"
                                style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Edit size={13} /> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteChronicle(idx)}
                                style={{
                                  backgroundColor: '#fef2f2',
                                  color: '#dc2626',
                                  border: '1px solid #fecaca',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  padding: '6px 12px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontWeight: 700
                                }}
                              >
                                <Trash2 size={13} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>

            <button type="submit" className="rns-btn-donate" style={{ width: 'fit-content', fontSize: '14px', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
              <Save size={16} /> Save All Contents To Database
            </button>
          </form>
        )}

      </main>

      {/* ADMIN EVENT ADD / EDIT POPUP MODAL */}
      {isEventModalOpen && (
        <div 
          onClick={() => setIsEventModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(5, 12, 26, 0.82)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '32px'
            }}
          >
            {/* Top Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#091b36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={20} style={{ color: '#d97706' }} />
                  {editingEventIndex === null ? 'Add New Campus Event' : `Edit Event: "${eventFormData.title || 'Untitled'}"`}
                </h3>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>
                  Type event title to auto-generate URL slug. Write content body and upload gallery photos.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#091b36', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Form Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Event Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Annual Sports & Cultural Meet 2080" 
                  value={eventFormData.title} 
                  onChange={e => {
                    const newTitle = e.target.value;
                    setEventFormData(prev => ({
                      ...prev,
                      title: newTitle,
                      slug: generateSlug(newTitle)
                    }));
                  }} 
                  className="rns-search-input" 
                  style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} 
                />

                {/* Auto-Generated Slug Badge */}
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d4ed8', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '8px 14px', borderRadius: '8px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🔗 Auto-Generated URL Slug:</span>
                  <code style={{ backgroundColor: '#ffffff', padding: '2px 8px', borderRadius: '4px', color: '#091b36', fontFamily: 'monospace' }}>
                    /events/{eventFormData.slug || generateSlug(eventFormData.title) || 'event-slug'}
                  </code>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Full Event Body Narrative & Content</label>
                <CKEditorField 
                  value={eventFormData.content} 
                  onChange={val => setEventFormData(prev => ({ ...prev, content: val }))} 
                  placeholder="Detailed event narrative body..."
                  minHeight="200px"
                />
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', fontStyle: 'italic' }}>
                  ℹ️ Card excerpt summary on the events grid is derived automatically from the first 120 characters of this narrative.
                </div>
              </div>

              {/* MULTI-IMAGE GALLERY & FEATURED COVER SELECTION */}
              <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ImageIcon size={16} style={{ color: '#d97706' }} /> Multi-Image Gallery & Cover Photo ({eventFormData.gallery.length} Images)
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                      Upload multiple photos for this event. Click <strong>"Mark as Featured Cover"</strong> to choose the main cover photo!
                    </div>
                  </div>

                  <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '8px 16px' }}>
                    <Upload size={14} /> Add Gallery Photos
                    <input type="file" accept="image/*" multiple onChange={handleAddGalleryImages} style={{ display: 'none' }} />
                  </label>
                </div>

                {/* Gallery Images Grid */}
                {eventFormData.gallery.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginTop: '8px' }}>
                    {eventFormData.gallery.map((imgUrl, imgIdx) => {
                      const isFeatured = eventFormData.image === imgUrl;

                      return (
                        <div 
                          key={imgIdx} 
                          style={{ 
                            backgroundColor: '#ffffff', 
                            borderRadius: '12px', 
                            overflow: 'hidden', 
                            border: isFeatured ? '3px solid #eab308' : '1px solid #cbd5e1',
                            boxShadow: isFeatured ? '0 4px 12px rgba(234, 179, 8, 0.25)' : 'none',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <div style={{ height: '110px', overflow: 'hidden', backgroundColor: '#091b36', position: 'relative' }}>
                            <img src={imgUrl} alt={`Gallery ${imgIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            
                            {isFeatured && (
                              <div style={{ position: 'absolute', top: '6px', left: '6px', backgroundColor: '#eab308', color: '#050c1a', fontSize: '9px', fontWeight: 900, padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase' }}>
                                <Star size={11} /> Featured Cover
                              </div>
                            )}
                          </div>

                          <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: '#ffffff' }}>
                            {!isFeatured && (
                              <button
                                type="button"
                                onClick={() => handleSetFeaturedImage(imgUrl)}
                                className="rns-btn-outline"
                                style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '6px', width: '100%', justifyContent: 'center' }}
                              >
                                Mark as Featured
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(imgIdx)}
                              style={{ color: '#ef4444', backgroundColor: '#fef2f2', border: 'none', borderRadius: '6px', fontSize: '10px', padding: '4px 8px', fontWeight: 700, cursor: 'pointer', textAlign: 'center', width: '100%' }}
                            >
                              Remove Photo
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', padding: '20px', border: '1px dashed #cbd5e1', borderRadius: '10px' }}>
                    No gallery images added yet. Click "Add Gallery Photos" above to upload photos!
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="rns-btn-outline"
                  style={{ fontSize: '13px', padding: '10px 24px', borderRadius: '10px' }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveEventFromModal}
                  className="rns-btn-donate"
                  style={{ fontSize: '13px', padding: '10px 28px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={15} /> Save Event Details
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ADMIN NOTICE ADD / EDIT POPUP MODAL */}
      {isNoticeModalOpen && (
        <div 
          onClick={() => setIsNoticeModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(5, 12, 26, 0.82)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '32px'
            }}
          >
            {/* Top Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#091b36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={20} style={{ color: '#d97706' }} />
                  {editingNoticeIndex === null ? 'Publish New Campus Notice' : `Edit Notice: "${noticeFormData.title || 'Untitled'}"`}
                </h3>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>
                  Configure title, category, date, narrative content, and upload document scan photo attachments.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsNoticeModalOpen(false)}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#091b36', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Form Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Notice Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. BBS First Year Examination Center Notice 2080" 
                  value={noticeFormData.title} 
                  onChange={e => {
                    const newTitle = e.target.value;
                    setNoticeFormData(prev => ({
                      ...prev,
                      title: newTitle,
                      slug: generateSlug(newTitle)
                    }));
                  }} 
                  className="rns-search-input" 
                  style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} 
                />

                {/* Auto-Generated Slug Badge */}
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d4ed8', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '8px 14px', borderRadius: '8px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🔗 Auto-Generated URL Slug:</span>
                  <code style={{ backgroundColor: '#ffffff', padding: '2px 8px', borderRadius: '4px', color: '#091b36', fontFamily: 'monospace' }}>
                    /notices?notice={noticeFormData.slug || generateSlug(noticeFormData.title) || 'notice-slug'}
                  </code>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Notice Category / Tag
                </label>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {!isCustomCategoryMode ? (
                    <select 
                      value={noticeFormData.category} 
                      onChange={e => {
                        if (e.target.value === '__ADD_NEW__') {
                          setIsCustomCategoryMode(true);
                        } else {
                          setNoticeFormData(prev => ({ ...prev, category: e.target.value }));
                        }
                      }}
                      className="rns-search-input" 
                      style={{ borderRadius: '8px', padding: '10px 14px', flex: 1 }}
                    >
                      {categoriesListState.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                      <option value="__ADD_NEW__">➕ Add New Custom Category...</option>
                    </select>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'center' }}>
                      <input 
                        type="text" 
                        placeholder="Enter new category name (e.g. Results, Sports, Events)..."
                        value={customCategoryInput}
                        onChange={e => setCustomCategoryInput(e.target.value)}
                        className="rns-search-input"
                        style={{ borderRadius: '8px', paddingLeft: '14px', flex: 1 }}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customCategoryInput.trim()) {
                            const newCat = customCategoryInput.trim();
                            if (!categoriesListState.includes(newCat)) {
                              setCategoriesListState(prev => [...prev, newCat]);
                            }
                            setNoticeFormData(prev => ({ ...prev, category: newCat }));
                            setIsCustomCategoryMode(false);
                            setCustomCategoryInput('');
                          }
                        }}
                        className="rns-btn-donate"
                        style={{ fontSize: '12px', padding: '8px 16px', borderRadius: '8px', flexShrink: 0 }}
                      >
                        Add Category
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomCategoryMode(false);
                          setCustomCategoryInput('');
                        }}
                        className="rns-btn-outline"
                        style={{ fontSize: '12px', padding: '8px 12px', borderRadius: '8px', flexShrink: 0 }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {!isCustomCategoryMode && (
                    <button
                      type="button"
                      onClick={() => setIsCustomCategoryMode(true)}
                      className="rns-btn-outline"
                      style={{ fontSize: '11px', padding: '9px 14px', borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      + Manage / Add Category
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Full Notice Body & Narrative</label>
                <CKEditorField 
                  value={noticeFormData.content} 
                  onChange={val => setNoticeFormData(prev => ({ ...prev, content: val }))} 
                  placeholder="Detailed official notice content..."
                  minHeight="200px"
                />
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', fontStyle: 'italic' }}>
                  ℹ️ Notice list summary preview is derived automatically from the first 120 characters of this narrative.
                </div>
              </div>

              {/* ATTACHMENT IMAGES / SCANS */}
              <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ImageIcon size={16} style={{ color: '#d97706' }} /> Document Photo Attachments & Scans ({noticeFormData.images.length} Scans)
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                      Upload official scanned document pages, routines, or flyer photos for this notice.
                    </div>
                  </div>

                  <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '8px 16px' }}>
                    <Upload size={14} /> Add Attachment Scans
                    <input type="file" accept="image/*" multiple onChange={handleAddNoticeImages} style={{ display: 'none' }} />
                  </label>
                </div>

                {/* Notice Images Grid */}
                {noticeFormData.images.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginTop: '8px' }}>
                    {noticeFormData.images.map((imgUrl, imgIdx) => (
                      <div 
                        key={imgIdx} 
                        style={{ 
                          backgroundColor: '#ffffff', 
                          borderRadius: '12px', 
                          overflow: 'hidden', 
                          border: '1px solid #cbd5e1',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#091b36', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={imgUrl} alt={`Attachment ${imgIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>

                        <div style={{ padding: '8px', backgroundColor: '#ffffff' }}>
                          <button
                            type="button"
                            onClick={() => handleRemoveNoticeImage(imgIdx)}
                            style={{ color: '#ef4444', backgroundColor: '#fef2f2', border: 'none', borderRadius: '6px', fontSize: '10px', padding: '4px 8px', fontWeight: 700, cursor: 'pointer', textAlign: 'center', width: '100%' }}
                          >
                            Remove Attachment
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', padding: '20px', border: '1px dashed #cbd5e1', borderRadius: '10px' }}>
                    No attachment scans added. Click "Add Attachment Scans" above to upload photos/routines!
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(false)}
                  className="rns-btn-outline"
                  style={{ fontSize: '13px', padding: '10px 24px', borderRadius: '10px' }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveNoticeFromModal}
                  className="rns-btn-donate"
                  style={{ fontSize: '13px', padding: '10px 28px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={15} /> Save Notice Details
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ADMIN CHRONICLE ADD / EDIT POPUP MODAL */}
      {isChronicleModalOpen && (
        <div 
          onClick={() => setIsChronicleModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(5, 12, 26, 0.82)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '32px'
            }}
          >
            {/* Top Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#091b36', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={20} style={{ color: '#d97706' }} />
                  {editingChronicleIndex === null ? 'Publish New Campus Chronicle' : `Edit Article: "${chronicleFormData.title || 'Untitled'}"`}
                </h3>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>
                  Configure article title, author, publication date, cover photo, and full narrative content.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsChronicleModalOpen(false)}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#091b36', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Form Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Article Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Empowering Rural Saptari Through Higher Education & Research" 
                  value={chronicleFormData.title} 
                  onChange={e => {
                    const newTitle = e.target.value;
                    setChronicleFormData(prev => ({
                      ...prev,
                      title: newTitle,
                      slug: generateSlug(newTitle)
                    }));
                  }} 
                  className="rns-search-input" 
                  style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} 
                />

                {/* Auto-Generated Slug Badge */}
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d4ed8', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '8px 14px', borderRadius: '8px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🔗 Auto-Generated URL Slug:</span>
                  <code style={{ backgroundColor: '#ffffff', padding: '2px 8px', borderRadius: '4px', color: '#091b36', fontFamily: 'monospace' }}>
                    /chronicles/{chronicleFormData.slug || generateSlug(chronicleFormData.title) || 'article-slug'}
                  </code>
                </div>
              </div>

              {/* Author Byline Details with Author Photo Upload */}
              <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={16} style={{ color: '#d97706' }} /> Author Profile & Byline Details
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Author Name / Byline</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Prof. Deepak Gajurel / Editorial Team" 
                    value={chronicleFormData.author} 
                    onChange={e => setChronicleFormData(prev => ({ ...prev, author: e.target.value }))} 
                    className="rns-search-input" 
                    style={{ borderRadius: '8px', paddingLeft: '14px', width: '100%' }} 
                  />
                </div>

                {/* Author Avatar Upload */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#091b36', border: '2px solid #eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {chronicleFormData.authorImage ? (
                      <img src={chronicleFormData.authorImage} alt="Author avatar preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <User size={24} style={{ color: '#eab308' }} />
                    )}
                  </div>
                  <div>
                    <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '8px 16px' }}>
                      <Upload size={14} /> Upload Author Photo
                      <input type="file" accept="image/*" onChange={handleAuthorImageUpload} style={{ display: 'none' }} />
                    </label>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                      Upload square photo/avatar of author to display beside byline on front-end.
                    </div>
                  </div>
                </div>
              </div>

              {/* ARTICLE PDF ATTACHMENT SECTION */}
              <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#091b36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      📄 Official Article PDF Document
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                      Attach downloadable PDF copy of the article for front-end readers to download.
                    </div>
                  </div>

                  <label className="rns-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', padding: '8px 16px' }}>
                    <Upload size={14} /> Upload Article PDF
                    <input type="file" accept="application/pdf" onChange={handleChroniclePdfUpload} style={{ display: 'none' }} />
                  </label>
                </div>

                {chronicleFormData.pdfUrl && (
                  <div style={{ fontSize: '12px', color: '#16a34a', backgroundColor: '#dcfce7', border: '1px solid #bbf7d0', padding: '10px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <span>✅ PDF Attached: <strong>{chronicleFormData.pdfFileName || 'article_document.pdf'}</strong></span>
                    <button
                      type="button"
                      onClick={() => triggerPdfDownload(chronicleFormData.pdfUrl, chronicleFormData.pdfFileName || 'chronicle_article.pdf', 'articlePdf')}
                      className="rns-btn-donate"
                      style={{ fontSize: '11px', padding: '6px 14px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Download size={13} /> Test Download PDF
                    </button>
                  </div>
                )}
              </div>

              {/* RICH TEXT EDITOR FOR FULL ARTICLE BODY */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                  Full Article Body & Narrative
                </label>
                <CKEditorField 
                  value={chronicleFormData.content} 
                  onChange={val => setChronicleFormData(prev => ({ ...prev, content: val }))} 
                  placeholder="Write full article body text..."
                  minHeight="260px"
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsChronicleModalOpen(false)}
                  className="rns-btn-outline"
                  style={{ fontSize: '13px', padding: '10px 24px', borderRadius: '10px' }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveChronicleFromModal}
                  className="rns-btn-donate"
                  style={{ fontSize: '13px', padding: '10px 28px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={15} /> Save Chronicle Article
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* GLOBAL DELETE CONFIRMATION MODAL */}
      <DeleteConfirmModal
        isOpen={deleteModalConfig.isOpen}
        onClose={() => setDeleteModalConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={() => {
          if (deleteModalConfig.onConfirm) {
            deleteModalConfig.onConfirm();
          }
        }}
        title={deleteModalConfig.title}
        itemName={deleteModalConfig.itemName}
        message={deleteModalConfig.message}
      />

    </div>
  );
}
