import React, { useState, useEffect } from 'react';
import { 
  X, Mail, Plus, Trash2, CheckCircle2, ShieldCheck, Download, 
  ExternalLink, Search, RefreshCw, Send, AlertTriangle, UserCheck, 
  Eye, Settings, Database, Clock, FileText, Globe, Edit2, Link2, 
  Sparkles, Check, ChevronRight, Monitor, Smartphone, Code 
} from 'lucide-react';
import { 
  getLeadSettings, 
  saveLeadSettings, 
  getAllLeads, 
  deleteLead, 
  clearAllLeads, 
  exportLeadsToCsv, 
  dispatchEmailNotifications,
  LeadSettings, 
  LeadSubmission 
} from '../utils/leadStorage';
import {
  useCustomPages,
  addWordPressPage,
  updateWordPressPage,
  deleteWordPressPage,
  WordPressPage
} from '../utils/customPagesStore';

interface LeadManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadManagerModal: React.FC<LeadManagerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'leads' | 'pages'>('settings');
  const [settings, setSettings] = useState<LeadSettings>(getLeadSettings());
  const [newEmailInput, setNewEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testSentSuccess, setTestSentSuccess] = useState(false);

  // Leads list
  const [leads, setLeads] = useState<LeadSubmission[]>(getAllLeads());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);

  // WordPress Pages CRUD & REST API State
  const { pages, navPages, refreshPages } = useCustomPages();
  const [showPageForm, setShowPageForm] = useState(false);
  const [editingPageId, setEditingPageId] = useState<number | string | null>(null);
  const [pageFormTitle, setPageFormTitle] = useState('');
  const [pageFormSlug, setPageFormSlug] = useState('');
  const [pageFormTemplate, setPageFormTemplate] = useState('template-builder.php');
  const [pageFormStatus, setPageFormStatus] = useState<'publish' | 'draft' | 'pending'>('publish');
  const [pageFormContent, setPageFormContent] = useState('');
  const [pageFormShowInNav, setPageFormShowInNav] = useState(true);
  const [pageFormNavOrder, setPageFormNavOrder] = useState<number>(1);
  const [pageFormSeoTitle, setPageFormSeoTitle] = useState('');
  const [pageFormMetaDesc, setPageFormMetaDesc] = useState('');
  const [pageFormCanonicalUrl, setPageFormCanonicalUrl] = useState('');
  const [pagesSearchTerm, setPagesSearchTerm] = useState('');
  const [pageActionMessage, setPageActionMessage] = useState<string | null>(null);
  const [pageActionError, setPageActionError] = useState<string | null>(null);
  const [pageIsSubmitting, setPageIsSubmitting] = useState(false);
  const [pageRestLog, setPageRestLog] = useState<string | null>(null);

  // Temporary Draft Preview Modal State
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewTab, setPreviewTab] = useState<'visual' | 'seo' | 'html'>('visual');
  const [previewCustomPage, setPreviewCustomPage] = useState<WordPressPage | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSettings(getLeadSettings());
      setLeads(getAllLeads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Add new notification recipient
  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    const trimmed = newEmailInput.trim().toLowerCase();
    if (!trimmed) {
      setEmailError('Please enter an email address.');
      return;
    }
    if (!trimmed.includes('@') || !trimmed.includes('.')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (settings.notificationEmails.includes(trimmed)) {
      setEmailError('This email is already in the notification list.');
      return;
    }

    const updatedList = [...settings.notificationEmails, trimmed];
    const updatedSettings = { ...settings, notificationEmails: updatedList };
    setSettings(updatedSettings);
    saveLeadSettings(updatedSettings);
    setNewEmailInput('');
  };

  // Remove email recipient
  const handleRemoveEmail = (emailToRemove: string) => {
    if (settings.notificationEmails.length <= 1) {
      setEmailError('You must keep at least one notification email address.');
      return;
    }
    const updatedList = settings.notificationEmails.filter((em) => em !== emailToRemove);
    const updatedSettings = { ...settings, notificationEmails: updatedList };
    setSettings(updatedSettings);
    saveLeadSettings(updatedSettings);
  };

  // Save general settings
  const handleSaveSettings = () => {
    saveLeadSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Send test notification to all listed emails
  const handleSendTestNotification = async () => {
    const dummyLead: LeadSubmission = {
      id: `test_${Date.now()}`,
      fullName: 'Test Patient (Admin Verification)',
      email: 'test.patient@example.com',
      phoneNumber: '(888) 420-6789',
      stateId: 'california',
      serviceId: 'new-patient',
      acceptedTerms: true,
      marketingConsent: true,
      createdAt: new Date().toISOString(),
      notifiedEmails: settings.notificationEmails,
      affiliateRedirectUrl: settings.affiliateUrl,
      sourceUrl: window.location.href,
      status: 'sent'
    };

    await dispatchEmailNotifications(dummyLead, settings.notificationEmails);
    setTestSentSuccess(true);
    setTimeout(() => setTestSentSuccess(false), 3000);
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const term = searchTerm.toLowerCase();
    return (
      lead.fullName.toLowerCase().includes(term) ||
      lead.email.toLowerCase().includes(term) ||
      lead.phoneNumber.toLowerCase().includes(term) ||
      (lead.stateId && lead.stateId.toLowerCase().includes(term))
    );
  });

  // WordPress Pages CRUD Handlers
  const handleStartAddPage = () => {
    setEditingPageId(null);
    setPageFormTitle('');
    setPageFormSlug('');
    setPageFormTemplate('template-builder.php');
    setPageFormStatus('publish');
    setPageFormContent('');
    setPageFormShowInNav(true);
    setPageFormNavOrder(pages.length + 1);
    setPageFormSeoTitle('');
    setPageFormMetaDesc('');
    setPageFormCanonicalUrl('');
    setPageActionError(null);
    setShowPageForm(true);
  };

  const handleStartEditPage = (page: WordPressPage) => {
    setEditingPageId(page.id);
    setPageFormTitle(page.title);
    setPageFormSlug(page.slug);
    setPageFormTemplate(page.template);
    setPageFormStatus(page.status);
    setPageFormContent(page.content || '');
    setPageFormShowInNav(page.showInNav);
    setPageFormNavOrder(page.navOrder || 1);
    setPageFormSeoTitle(page.seoTitle || '');
    setPageFormMetaDesc(page.metaDescription || '');
    setPageFormCanonicalUrl(page.canonicalUrl || (typeof window !== 'undefined' ? `${window.location.origin}/${page.slug}/` : `https://onlinemmjcard.com/${page.slug}/`));
    setPageActionError(null);
    setShowPageForm(true);
  };

  const handleCancelPageForm = () => {
    setShowPageForm(false);
    setEditingPageId(null);
    setPageActionError(null);
  };

  const handleAutoFillSeoTitle = () => {
    if (pageFormTitle.trim()) {
      setPageFormSeoTitle(`${pageFormTitle.trim()} | Online MMJ Card Telehealth`);
    }
  };

  const handleAutoFillCanonical = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://onlinemmjcard.com';
    const s = pageFormSlug.trim() || (pageFormTitle.trim() ? pageFormTitle.toLowerCase().replace(/[^a-z0-9-_]/g, '-') : 'page');
    setPageFormCanonicalUrl(`${origin}/${s}/`);
  };

  // Open temporary modal preview for current draft
  const handleOpenDraftPreview = () => {
    const cleanSlug = pageFormSlug.trim() 
      ? pageFormSlug.toLowerCase().replace(/[^a-z0-9-_]/g, '-') 
      : (pageFormTitle.trim() ? pageFormTitle.toLowerCase().replace(/[^a-z0-9-_]/g, '-') : 'draft-page');

    const draftPage: WordPressPage = {
      id: editingPageId || 'draft',
      title: pageFormTitle.trim() || 'Untitled Draft Page',
      slug: cleanSlug,
      template: pageFormTemplate,
      status: pageFormStatus,
      content: pageFormContent,
      showInNav: pageFormShowInNav,
      navOrder: Number(pageFormNavOrder) || 1,
      url: `/${cleanSlug}/`,
      date: 'Draft (Pending Save)',
      lastModified: 'Just now',
      seoTitle: pageFormSeoTitle.trim() || `${pageFormTitle.trim() || 'Untitled Draft Page'} | Online MMJ Card`,
      metaDescription: pageFormMetaDesc.trim() || '100% HIPAA-compliant online medical marijuana doctor evaluations and patient consultations.',
      canonicalUrl: pageFormCanonicalUrl.trim() || (typeof window !== 'undefined' ? `${window.location.origin}/${cleanSlug}/` : `https://onlinemmjcard.com/${cleanSlug}/`)
    };

    setPreviewCustomPage(draftPage);
    setShowPreviewModal(true);
  };

  // Open temporary modal preview for an existing page in table
  const handleOpenPagePreview = (page: WordPressPage) => {
    setPreviewCustomPage(page);
    setShowPreviewModal(true);
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setPageActionError(null);
    setPageActionMessage(null);

    const title = pageFormTitle.trim();
    if (!title) {
      setPageActionError('Page title is required.');
      return;
    }

    setPageIsSubmitting(true);
    try {
      if (editingPageId) {
        // Send POST/PUT update to WordPress REST API
        const result = await updateWordPressPage(editingPageId, {
          title,
          slug: pageFormSlug,
          template: pageFormTemplate,
          status: pageFormStatus,
          content: pageFormContent,
          showInNav: pageFormShowInNav,
          navOrder: Number(pageFormNavOrder) || 1,
          seoTitle: pageFormSeoTitle.trim(),
          metaDescription: pageFormMetaDesc.trim(),
          canonicalUrl: pageFormCanonicalUrl.trim()
        });
        setPageActionMessage(result.message);
        setPageRestLog(`POST/PUT /wp-json/online-mmj/v1/pages/edit (ID #${editingPageId}) -> 200 OK. SEO & Navigation Synced.`);
      } else {
        // Send POST create to WordPress REST API
        const result = await addWordPressPage({
          title,
          slug: pageFormSlug,
          template: pageFormTemplate,
          status: pageFormStatus,
          content: pageFormContent,
          showInNav: pageFormShowInNav,
          navOrder: Number(pageFormNavOrder) || pages.length + 1,
          seoTitle: pageFormSeoTitle.trim(),
          metaDescription: pageFormMetaDesc.trim(),
          canonicalUrl: pageFormCanonicalUrl.trim()
        });
        setPageActionMessage(result.message);
        setPageRestLog(`POST /wp-json/online-mmj/v1/pages -> 201 Created. Page ID #${result.page.id} linked to nav & SEO indexed.`);
      }
      refreshPages();
      setShowPageForm(false);
      setEditingPageId(null);
      setShowPreviewModal(false);
      setTimeout(() => setPageActionMessage(null), 4000);
    } catch (err: unknown) {
      setPageActionError(err instanceof Error ? err.message : 'Failed to save page to WordPress REST API.');
    } finally {
      setPageIsSubmitting(false);
    }
  };

  const handleQuickToggleNav = async (page: WordPressPage) => {
    try {
      const nextShowInNav = !page.showInNav;
      await updateWordPressPage(page.id, { showInNav: nextShowInNav });
      refreshPages();
      setPageActionMessage(
        nextShowInNav
          ? `Page "${page.title}" dynamically linked to navigation bar (POST/PUT synced).`
          : `Page "${page.title}" unlinked from navigation bar (POST/PUT synced).`
      );
      setPageRestLog(`POST/PUT /wp-json/online-mmj/v1/pages/edit (ID #${page.id}) -> show_in_nav: ${nextShowInNav}`);
      setTimeout(() => setPageActionMessage(null), 3000);
    } catch (err: unknown) {
      setPageActionError(err instanceof Error ? err.message : 'Failed to update navigation link state.');
    }
  };

  const handleDeletePage = async (page: WordPressPage) => {
    if (!window.confirm(`Are you sure you want to delete WordPress page "${page.title}"? It will also be unlinked from the navigation.`)) {
      return;
    }
    try {
      await deleteWordPressPage(page.id);
      refreshPages();
      setPageActionMessage(`Page "${page.title}" deleted via REST API request.`);
      setPageRestLog(`POST/DELETE /wp-json/online-mmj/v1/pages/delete (ID #${page.id}) -> 200 OK`);
      setTimeout(() => setPageActionMessage(null), 3000);
    } catch (err: unknown) {
      setPageActionError(err instanceof Error ? err.message : 'Failed to delete page.');
    }
  };

  const handleApplyPresetTemplate = (presetType: 'about' | 'reciprocity' | 'grower' | 'dispensary') => {
    if (presetType === 'about') {
      setPageFormTitle('About Our Telehealth Clinic');
      setPageFormSlug('about-our-clinic');
      setPageFormTemplate('template-builder.php');
      setPageFormStatus('publish');
      setPageFormShowInNav(true);
      setPageFormContent('<h2>Compassionate Healthcare For Medical Cannabis Patients</h2><p>Our licensed physicians specialize in evaluated telemedicine consultations with same-day certifications. We provide comprehensive guidance on dosage, state laws, and patient privacy.</p>');
      setPageFormSeoTitle('About Our Telehealth Clinic | Board-Certified Cannabis Physicians');
      setPageFormMetaDesc('Learn about our licensed telemedicine physicians providing same-day legal medical marijuana card evaluations with a 100% money-back approval guarantee.');
      setPageFormCanonicalUrl('https://onlinemmjcard.com/about-our-clinic/');
    } else if (presetType === 'reciprocity') {
      setPageFormTitle('State Cannabis Reciprocity Guide');
      setPageFormSlug('cannabis-reciprocity-guide');
      setPageFormTemplate('template-state.php');
      setPageFormStatus('publish');
      setPageFormShowInNav(true);
      setPageFormContent('<h2>Traveling with Your Medical Marijuana Card</h2><p>Understand which states recognize out-of-state patient cards and dispensary shopping privileges across the country.</p>');
      setPageFormSeoTitle('State Cannabis Reciprocity Guide | Medical Marijuana Card Travel Rules');
      setPageFormMetaDesc('Check which states recognize out-of-state medical marijuana cards. Up-to-date reciprocity laws, patient privileges, and dispensary shopping guidelines.');
      setPageFormCanonicalUrl('https://onlinemmjcard.com/cannabis-reciprocity-guide/');
    } else if (presetType === 'grower') {
      setPageFormTitle('99-Plant Cultivation Regulations');
      setPageFormSlug('99-plant-cultivation-regulations');
      setPageFormTemplate('template-service.php');
      setPageFormStatus('publish');
      setPageFormShowInNav(false);
      setPageFormContent('<h2>California Extended Grower Recommendations</h2><p>Under Health and Safety Code 11362.77, patients with medical necessity recommendations can legally cultivate up to 99 plants for personal therapy.</p>');
      setPageFormSeoTitle('California 99-Plant Cultivation Regulations | Medical Grower Exemptions');
      setPageFormMetaDesc('Understand California Health and Safety Code 11362.77 regulations for extended patient cultivation recommendations and personal medical cannabis gardens.');
      setPageFormCanonicalUrl('https://onlinemmjcard.com/99-plant-cultivation-regulations/');
    } else if (presetType === 'dispensary') {
      setPageFormTitle('Licensed Dispensary Directory');
      setPageFormSlug('dispensary-directory');
      setPageFormTemplate('template-location.php');
      setPageFormStatus('publish');
      setPageFormShowInNav(true);
      setPageFormContent('<h2>Find State-Licensed Cannabis Dispensaries Near You</h2><p>Explore verified medical dispensaries accepting physician recommendations with exclusive patient tax exemptions.</p>');
      setPageFormSeoTitle('Licensed Dispensary Directory | Find Medical Marijuana Stores Near You');
      setPageFormMetaDesc('Search verified state-licensed medical cannabis dispensaries. Access exclusive patient discounts and tax exemptions with your valid physician recommendation.');
      setPageFormCanonicalUrl('https://onlinemmjcard.com/dispensary-directory/');
    }
  };

  const filteredPages = pages.filter((p) => {
    const term = pagesSearchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.slug.toLowerCase().includes(term) ||
      p.template.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#008f58] flex items-center justify-center text-white font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">
                Patient Leads & WordPress Admin Manager
              </h2>
              <p className="text-xs text-slate-400">
                Notification settings, patient records & dynamic WordPress pages CRUD
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-4 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#008f58] text-[#008f58]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Notification Emails & Affiliate Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 px-4 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'leads'
                ? 'border-[#008f58] text-[#008f58]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Stored Patient Leads</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-100 text-[#008f58] text-[10px] font-extrabold">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pages')}
            className={`pb-3 px-4 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'pages'
                ? 'border-[#008f58] text-[#008f58]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>WordPress Pages (CRUD)</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-100 text-[#008f58] text-[10px] font-extrabold">
              {pages.length}
            </span>
            {navPages.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold" title="Pages linked to top navigation">
                {navPages.length} in nav
              </span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* ============================================================== */}
          {/* TAB 1: NOTIFICATION EMAILS & AFFILIATE SETTINGS                */}
          {/* ============================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              
              {/* Notification Success Toast */}
              {saveSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008f58]" />
                  <span>Settings successfully saved!</span>
                </div>
              )}

              {testSentSuccess && (
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold flex items-center gap-2">
                  <Send className="w-4 h-4 text-blue-600" />
                  <span>Test notification email dispatched to all {settings.notificationEmails.length} recipient addresses!</span>
                </div>
              )}

              {/* 1. Multi-Email Recipients Manager */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#008f58]" />
                    <span>Notification Email Recipients</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add as many email addresses as needed. Every time a patient fills out the booking form, full details are dispatched to each address below.
                  </p>
                </div>

                {/* Add Email Form */}
                <form onSubmit={handleAddEmail} className="flex gap-2">
                  <input
                    type="email"
                    value={newEmailInput}
                    onChange={(e) => setNewEmailInput(e.target.value)}
                    placeholder="Add notification email (e.g. clinic@domain.com, intake@domain.com)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#008f58]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#008f58] hover:bg-[#007a4a] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Email</span>
                  </button>
                </form>

                {emailError && (
                  <p className="text-xs text-red-600 font-semibold">{emailError}</p>
                )}

                {/* List of Configured Emails */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Active Notification Recipients ({settings.notificationEmails.length})</span>
                    <button
                      onClick={handleSendTestNotification}
                      type="button"
                      className="text-[#008f58] hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send Test Email</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 pt-1">
                    {settings.notificationEmails.map((emailAddr) => (
                      <div
                        key={emailAddr}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle2 className="w-4 h-4 text-[#008f58] shrink-0" />
                          <span className="text-xs font-medium text-slate-800 truncate font-mono">
                            {emailAddr}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveEmail(emailAddr)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded-md transition-colors cursor-pointer ml-2"
                          title="Remove email"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Affiliate Partner Redirection Settings */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-[#008f58]" />
                    <span>Affiliate Partner Redirection</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    After patient data is securely logged and emailed, the patient is redirected to this affiliate portal.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Affiliate Partner Target URL
                    </label>
                    <input
                      type="url"
                      value={settings.affiliateUrl}
                      onChange={(e) => setSettings({ ...settings, affiliateUrl: e.target.value })}
                      placeholder="https://leafwell.com/get-card?aff=mymmj"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#008f58]"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Evaluation Starting Fee Display
                      </label>
                      <input
                        type="text"
                        value={settings.startingPrice}
                        onChange={(e) => setSettings({ ...settings, startingPrice: e.target.value })}
                        placeholder="$55"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#008f58]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Redirect Countdown Delay (Seconds)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={settings.redirectDelaySeconds}
                        onChange={(e) => setSettings({ ...settings, redirectDelaySeconds: parseInt(e.target.value) || 2 })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#008f58]"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={settings.passParamsToAffiliate}
                      onChange={(e) => setSettings({ ...settings, passParamsToAffiliate: e.target.checked })}
                      className="w-4 h-4 rounded text-[#008f58] focus:ring-[#008f58]"
                    />
                    <span>
                      Pass patient details into affiliate URL query parameters (<code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">?name=...&email=...&phone=...</code>)
                    </span>
                  </label>
                </div>
              </div>

              {/* Save Settings Action */}
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-3 bg-[#008f58] hover:bg-[#007a4a] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Save Settings & Update Form
                </button>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: STORED PATIENT LEADS VAULT                              */}
          {/* ============================================================== */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              
              {/* Actions Header Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, email, phone..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#008f58]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={exportLeadsToCsv}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all patient leads?')) {
                        clearAllLeads();
                        setLeads([]);
                      }
                    }}
                    className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Patient Name</th>
                      <th className="py-3 px-4">Contact Info</th>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Notification Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                          No patient leads found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            <div>{lead.fullName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">ID: {lead.id}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 space-y-0.5">
                            <div className="font-medium text-slate-900">{lead.email}</div>
                            <div className="text-[11px] text-slate-500">{lead.phoneNumber}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                            {new Date(lead.createdAt).toLocaleDateString()} at{' '}
                            {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-[#008f58]" />
                              <span>Emailed to {lead.notifiedEmails.length} addresses</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                                title="View Full Intake Payload"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  deleteLead(lead.id);
                                  setLeads(getAllLeads());
                                }}
                                className="p-1 rounded-lg text-slate-400 hover:text-red-600 cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: WORDPRESS PAGES CRUD & DYNAMIC NAVIGATION SYNC          */}
          {/* ============================================================== */}
          {activeTab === 'pages' && (
            <div className="space-y-6">
              
              {/* Status & REST API Notification Banners */}
              {pageActionMessage && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#008f58] shrink-0" />
                    <span>{pageActionMessage}</span>
                  </div>
                  {pageRestLog && (
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md break-all">
                      {pageRestLog}
                    </span>
                  )}
                </div>
              )}

              {pageActionError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{pageActionError}</span>
                </div>
              )}

              {/* Top Action Bar: Search, API Status & Add Page Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search pages by title, slug, template..."
                      value={pagesSearchTerm}
                      onChange={(e) => setPagesSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#008f58]"
                    />
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
                    <span>REST API Bridge Active</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!showPageForm ? (
                    <button
                      onClick={handleStartAddPage}
                      className="px-4 py-2 bg-[#008f58] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New WordPress Page</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleCancelPageForm}
                      className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Cancel Form
                    </button>
                  )}
                </div>
              </div>

              {/* Add / Edit Page Form (Collapsible Card) */}
              {showPageForm && (
                <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-5 shadow-lg space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#008f58] flex items-center justify-center font-bold">
                        {editingPageId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          {editingPageId ? `Edit WordPress Page (ID #${editingPageId})` : 'Create New WordPress Page'}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-mono">
                          Method: {editingPageId ? 'POST/PUT /wp-json/online-mmj/v1/pages/edit' : 'POST /wp-json/online-mmj/v1/pages'}
                        </p>
                      </div>
                    </div>

                    {/* Quick Preset Template Starters */}
                    {!editingPageId && (
                      <div className="flex items-center gap-1.5 text-[11px] flex-wrap">
                        <span className="text-slate-400 font-bold">Presets:</span>
                        <button
                          type="button"
                          onClick={() => handleApplyPresetTemplate('about')}
                          className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 font-medium transition-colors cursor-pointer"
                        >
                          About Clinic
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyPresetTemplate('reciprocity')}
                          className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 font-medium transition-colors cursor-pointer"
                        >
                          Reciprocity
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyPresetTemplate('dispensary')}
                          className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 font-medium transition-colors cursor-pointer"
                        >
                          Dispensaries
                        </button>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSavePage} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Page Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={pageFormTitle}
                          onChange={(e) => {
                            setPageFormTitle(e.target.value);
                            if (!editingPageId && !pageFormSlug) {
                              setPageFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'));
                            }
                          }}
                          placeholder="e.g. Integrative Cannabis Care & Physician Bio"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#008f58]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          URL Slug *
                        </label>
                        <div className="flex items-center">
                          <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-400 text-xs font-mono">
                            /
                          </span>
                          <input
                            type="text"
                            required
                            value={pageFormSlug}
                            onChange={(e) => setPageFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
                            placeholder="integrative-cannabis-care"
                            className="flex-1 px-3.5 py-2.5 rounded-r-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#008f58]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Page Template
                        </label>
                        <select
                          value={pageFormTemplate}
                          onChange={(e) => setPageFormTemplate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#008f58]"
                        >
                          <option value="template-builder.php">Interactive Telehealth Builder (Default)</option>
                          <option value="template-service.php">Telehealth Service Page</option>
                          <option value="template-location.php">City & Dispensary Location Page</option>
                          <option value="template-state.php">State Law & Telemedicine Guide</option>
                          <option value="template-contact.php">Contact & Support Desk</option>
                          <option value="page.php">Standard Fullwidth Container</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Publication Status
                        </label>
                        <select
                          value={pageFormStatus}
                          onChange={(e) => setPageFormStatus(e.target.value as 'publish' | 'draft' | 'pending')}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#008f58]"
                        >
                          <option value="publish">Published (Live & Public)</option>
                          <option value="draft">Draft (Admin Only)</option>
                          <option value="pending">Pending Review</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Navbar Priority Order
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={pageFormNavOrder}
                          onChange={(e) => setPageFormNavOrder(parseInt(e.target.value) || 1)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#008f58]"
                        />
                      </div>
                    </div>

                    {/* Navigation Link Switch */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="flex items-center gap-2 text-xs font-bold text-emerald-950 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pageFormShowInNav}
                            onChange={(e) => setPageFormShowInNav(e.target.checked)}
                            className="w-4 h-4 rounded text-[#008f58] focus:ring-[#008f58] cursor-pointer"
                          />
                          <span>Dynamically Link to Top Navigation Bar</span>
                        </label>
                        <p className="text-[11px] text-emerald-800 pl-6">
                          When checked, this page will automatically appear as an active navigation tab in the website header and mobile drawer.
                        </p>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        pageFormShowInNav ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {pageFormShowInNav ? 'Linked in Navbar' : 'Hidden from Navbar'}
                      </span>
                    </div>

                    {/* SEO & Indexing Controls */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-emerald-200/80 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-emerald-200/60 gap-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-[#008f58] flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                              Search Engine Optimization (SEO) & Indexing Controls
                            </h5>
                            <p className="text-[10px] text-slate-500">
                              Configure SEO Title, Meta Description, and Canonical URL for search engine indexing
                            </p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-[#008f58] text-[10px] font-extrabold uppercase tracking-wider self-start sm:self-auto">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>SEO Indexing Active</span>
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* SEO Title Field */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                              SEO Title (Meta Title / &lt;title&gt;)
                            </label>
                            <span className={`text-[10px] font-mono font-bold ${
                              pageFormSeoTitle.length > 60 ? 'text-amber-600' : pageFormSeoTitle.length >= 35 ? 'text-emerald-600' : 'text-slate-400'
                            }`}>
                              {pageFormSeoTitle.length}/60 chars
                            </span>
                          </div>
                          <input
                            type="text"
                            value={pageFormSeoTitle}
                            onChange={(e) => setPageFormSeoTitle(e.target.value)}
                            placeholder={pageFormTitle ? `${pageFormTitle} | Online MMJ Card` : 'Online Medical Marijuana Evaluations | Licensed Doctors'}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#008f58]"
                          />
                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span>Headline shown in Google search results and browser tab.</span>
                            <button
                              type="button"
                              onClick={handleAutoFillSeoTitle}
                              className="text-[#008f58] hover:underline font-bold cursor-pointer"
                            >
                              Auto-Fill
                            </button>
                          </div>
                        </div>

                        {/* Canonical URL Field */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                              Canonical URL (&lt;link rel="canonical"&gt;)
                            </label>
                            <span className="text-[10px] text-slate-400 font-mono">Indexing Authority</span>
                          </div>
                          <input
                            type="url"
                            value={pageFormCanonicalUrl}
                            onChange={(e) => setPageFormCanonicalUrl(e.target.value)}
                            placeholder={`https://onlinemmjcard.com/${pageFormSlug || 'page-slug'}/`}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#008f58]"
                          />
                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span>Specifies authoritative master URL to prevent duplicate indexing penalties.</span>
                            <button
                              type="button"
                              onClick={handleAutoFillCanonical}
                              className="text-[#008f58] hover:underline font-bold cursor-pointer"
                            >
                              Auto-Fill
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Meta Description Field */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Meta Description (&lt;meta name="description"&gt;)
                          </label>
                          <span className={`text-[10px] font-mono font-bold ${
                            pageFormMetaDesc.length > 160 ? 'text-amber-600' : pageFormMetaDesc.length >= 110 ? 'text-emerald-600' : 'text-slate-400'
                          }`}>
                            {pageFormMetaDesc.length}/160 chars (110-160 optimal)
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          value={pageFormMetaDesc}
                          onChange={(e) => setPageFormMetaDesc(e.target.value)}
                          placeholder="Get your legal medical marijuana card online with same-day physician evaluation. 100% HIPAA-compliant telehealth, quick approvals, and money-back guarantee."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#008f58]"
                        />
                        <p className="text-[10px] text-slate-500">
                          Summary snippet displayed beneath the title in search engine result pages to improve click-through rates.
                        </p>
                      </div>

                      {/* Real-time Google SERP Snippet Preview */}
                      <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1 shadow-2xs">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Globe className="w-3 h-3 text-blue-600" />
                          <span>Google Search Result Snippet Preview</span>
                        </div>
                        <div className="pt-1">
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                              M
                            </div>
                            <span className="font-medium text-slate-800">Online MMJ Card Telehealth</span>
                            <span className="text-slate-400">›</span>
                            <span className="text-slate-500 font-mono text-[10px] truncate max-w-xs">
                              https://onlinemmjcard.com/{pageFormSlug || 'page-slug'}/
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer truncate mt-0.5">
                            {pageFormSeoTitle || (pageFormTitle ? `${pageFormTitle} | Online MMJ Card` : 'Online Medical Marijuana Recommendations | Telehealth Clinic')}
                          </div>
                          <p className="text-xs text-slate-600 leading-snug line-clamp-2 mt-0.5">
                            {pageFormMetaDesc || 'Learn how to receive your state-legal medical marijuana evaluation online with our board-certified telehealth doctors. Fast, confidential same-day recommendations.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content Editor */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Page Body Content (HTML, Shortcodes, or Markdown)
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Supports &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, and shortcodes
                        </span>
                      </div>
                      <textarea
                        rows={6}
                        value={pageFormContent}
                        onChange={(e) => setPageFormContent(e.target.value)}
                        placeholder="<h2>Clinical Cannabis Guidelines</h2><p>Our licensed physicians specialize in evaluated telemedicine consultations...</p>"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 leading-relaxed focus:outline-none focus:border-[#008f58]"
                      />
                    </div>

                    {/* Action Buttons: Preview Draft + Cancel + Submit */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleOpenDraftPreview}
                        className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border border-blue-200 shadow-2xs"
                        title="Render current draft content in a temporary preview modal before saving to WordPress"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span>Preview Draft Layout</span>
                      </button>

                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={handleCancelPageForm}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={pageIsSubmitting}
                          className="px-6 py-2.5 rounded-xl bg-[#008f58] hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                        >
                          {pageIsSubmitting ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Sending REST Request...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>
                                {editingPageId ? 'Save & Sync Changes (POST/PUT)' : 'Publish Page (POST to WP REST API)'}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Pages Listing Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-extrabold text-slate-700">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#008f58]" />
                    <span>All Configured WordPress Pages ({filteredPages.length})</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-normal">
                    {navPages.length} currently linked to top navigation
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Page Title & Slug</th>
                        <th className="py-3 px-4">Template</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Top Navigation Link</th>
                        <th className="py-3 px-4 text-right">CRUD Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredPages.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400">
                            No WordPress pages found matching your search. Click "+ Add New WordPress Page" above to create one.
                          </td>
                        </tr>
                      ) : (
                        filteredPages.map((page) => (
                          <tr key={page.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                                <span>{page.title}</span>
                                {page.id && (
                                  <span className="text-[10px] font-mono font-normal text-slate-400">
                                    #{page.id}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-mono text-emerald-700 mt-0.5 flex items-center gap-1">
                                <span>/{page.slug}/</span>
                              </div>
                              {/* SEO metadata badges */}
                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                {page.seoTitle ? (
                                  <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-1" title={page.seoTitle}>
                                    <Sparkles className="w-2.5 h-2.5 text-[#008f58]" />
                                    <span>SEO Title</span>
                                  </span>
                                ) : (
                                  <span className="text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                    Auto Title
                                  </span>
                                )}
                                {page.metaDescription && (
                                  <span className="text-[9px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded" title={page.metaDescription}>
                                    Meta Desc
                                  </span>
                                )}
                                {page.canonicalUrl && (
                                  <span className="text-[9px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded" title={page.canonicalUrl}>
                                    Canonical
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                              {page.template}
                            </td>

                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                page.status === 'publish'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {page.status}
                              </span>
                            </td>

                            <td className="py-3 px-4">
                              <button
                                type="button"
                                onClick={() => handleQuickToggleNav(page)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                  page.showInNav
                                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                                }`}
                                title="Click to toggle navigation link on or off"
                              >
                                {page.showInNav ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-[#16a34a]" />
                                    <span>Linked in Navbar</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                    <span>Not in Navbar</span>
                                  </>
                                )}
                              </button>
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleOpenPagePreview(page)}
                                  className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                                  title="Render page layout and content in preview modal"
                                >
                                  <Eye className="w-3 h-3 text-blue-600" />
                                  <span>Preview</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleStartEditPage(page)}
                                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                                  title="Edit page via REST API"
                                >
                                  <Edit2 className="w-3 h-3 text-[#008f58]" />
                                  <span>Edit</span>
                                </button>

                                <a
                                  href={`/${page.slug}/`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 transition-colors"
                                  title="Open live URL in new tab"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>

                                <button
                                  type="button"
                                  onClick={() => handleDeletePage(page)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Delete page"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-semibold text-[#008f58]">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted HIPAA Lead Management Vault</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>

      {/* ============================================================== */}
      {/* LEAD DETAIL SUB-MODAL                                          */}
      {/* ============================================================== */}
      {selectedLead && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-black text-slate-900">
                Patient Intake Record: {selectedLead.fullName}
              </h4>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Full Name</span>
                  <span className="font-bold text-slate-900">{selectedLead.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone</span>
                  <a href={`tel:${selectedLead.phoneNumber}`} className="font-bold text-[#008f58] hover:underline">
                    {selectedLead.phoneNumber}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-bold text-[#008f58] hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Submitted Date</span>
                  <span className="text-slate-700">{new Date(selectedLead.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">
                  Emails Dispatched on Submission:
                </span>
                <ul className="p-2.5 bg-slate-50 rounded-xl space-y-1 font-mono text-[11px] text-slate-700">
                  {selectedLead.notifiedEmails.map((em, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#008f58]" />
                      <span>{em}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">
                  Affiliate Redirect Destination:
                </span>
                <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] font-mono text-slate-600 break-all">
                  {selectedLead.affiliateRedirectUrl}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-[#008f58] text-white rounded-xl text-xs font-bold"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DRAFT PAGE PREVIEW TEMPORARY MODAL VIEW                        */}
      {/* ============================================================== */}
      {showPreviewModal && previewCustomPage && (
        <div className="fixed inset-0 z-70 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Preview Modal Header */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-extrabold tracking-tight">
                      Draft Preview: {previewCustomPage.title || 'Untitled Page'}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      /{previewCustomPage.slug}/
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {previewCustomPage.template}
                    </span>
                    {previewCustomPage.showInNav && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                        Linked in Navbar
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Verify layout, typography, navigation link status, and SEO metadata before saving to WordPress
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPreviewModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Controls Bar: View Mode Tabs + Device Toggles */}
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
              {/* Mode Tabs */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setPreviewTab('visual')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    previewTab === 'visual'
                      ? 'bg-[#008f58] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Rendered Page Layout</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('seo')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    previewTab === 'seo'
                      ? 'bg-[#008f58] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Google SERP & SEO Snippet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('html')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    previewTab === 'html'
                      ? 'bg-[#008f58] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Raw HTML Code</span>
                </button>
              </div>

              {/* Device Switcher (Desktop vs Mobile View) */}
              {previewTab === 'visual' && (
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                      previewDevice === 'desktop'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    <span>Desktop View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                      previewDevice === 'mobile'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Mobile View</span>
                  </button>
                </div>
              )}
            </div>

            {/* Preview Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-200/60 p-3 sm:p-6 flex justify-center">
              
              {/* TAB 1: Visual Layout Preview */}
              {previewTab === 'visual' && (
                <div className={`transition-all duration-300 w-full ${
                  previewDevice === 'mobile' 
                    ? 'max-w-sm rounded-3xl border-8 border-slate-900 shadow-2xl bg-white overflow-hidden my-auto' 
                    : 'max-w-3xl rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden my-auto'
                }`}>
                  
                  {/* Simulated Top Navigation Bar */}
                  <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#008f58] flex items-center justify-center text-white text-[10px] font-black">
                        +
                      </div>
                      <span className="font-black text-slate-900 tracking-tight">ONLINE MMJ CARD</span>
                    </div>

                    {/* Simulated Navigation items */}
                    <div className="hidden sm:flex items-center gap-3 text-[11px] font-bold text-slate-600">
                      <span>HOME</span>
                      <span>STATES</span>
                      <span>SERVICES</span>
                      <span>ABOUT</span>
                      {previewCustomPage.showInNav && (
                        <span className="text-[#008f58] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-black">
                          {previewCustomPage.title} (Linked)
                        </span>
                      )}
                    </div>

                    <div className="px-3 py-1 bg-[#16a34a] text-white text-[10px] font-extrabold rounded-lg">
                      GET CARD
                    </div>
                  </div>

                  {/* Simulated Hero Banner */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>Official Patient Resource</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Physician Reviewed</span>
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
                      {previewCustomPage.title || 'Untitled Draft Page'}
                    </h1>

                    <div className="flex items-center gap-3 text-[11px] text-slate-300">
                      <span>/{previewCustomPage.slug}/</span>
                      <span>•</span>
                      <span>Template: {previewCustomPage.template}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">
                        {previewCustomPage.status === 'publish' ? 'Live on Publication' : 'Draft Mode'}
                      </span>
                    </div>
                  </div>

                  {/* Simulated Body Content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    {previewCustomPage.content && previewCustomPage.content.trim() ? (
                      <div
                        className="prose prose-slate max-w-none prose-headings:font-black prose-h2:text-xl prose-h3:text-lg prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 text-xs sm:text-sm"
                        dangerouslySetInnerHTML={{ __html: previewCustomPage.content }}
                      />
                    ) : (
                      <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="text-xs font-semibold">No content entered in page body yet.</p>
                        <p className="text-[11px] text-slate-400 mt-1">Type in HTML or text in the editor to verify layout here.</p>
                      </div>
                    )}

                    {/* Simulated Clinical Callout CTA */}
                    <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1 text-[#008f58] text-[10px] font-bold uppercase tracking-wider mb-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Telehealth Consultations</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900">
                          Get Your Medical Marijuana Recommendation Online
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          100% HIPAA-compliant video appointment with a state-licensed physician.
                        </p>
                      </div>
                      <div className="px-4 py-2 rounded-xl bg-[#16a34a] text-white text-xs font-bold text-center shrink-0">
                        Book Evaluation
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: SEO & SERP Snippet Preview */}
              {previewTab === 'seo' && (
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-6 my-auto">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span>Search Engine Result Page (SERP) Card</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      How this page appears when indexed by Google and Bing algorithms
                    </p>
                  </div>

                  {/* Google SERP Snippet Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        M
                      </div>
                      <div className="truncate">
                        <span className="font-bold text-slate-900">Online MMJ Card Telehealth</span>
                        <span className="text-slate-400 mx-1.5">›</span>
                        <span className="text-slate-500 font-mono text-[11px]">
                          https://onlinemmjcard.com/{previewCustomPage.slug}/
                        </span>
                      </div>
                    </div>

                    <div className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                      {previewCustomPage.seoTitle || `${previewCustomPage.title} | Online MMJ Card`}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {previewCustomPage.metaDescription || 'Get your state-legal medical marijuana card evaluated online by certified physicians. 100% money-back guarantee, HIPAA-compliant telehealth intake, and instant digital recommendations.'}
                    </p>
                  </div>

                  {/* Technical Indexing Metadata Breakdown Table */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Technical Indexing Metadata Tags
                    </div>
                    <table className="w-full text-left text-xs bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                      <tbody className="divide-y divide-slate-200 text-slate-700">
                        <tr>
                          <td className="py-2.5 px-3 font-mono font-bold text-[11px] text-slate-500 w-36">&lt;title&gt;</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">
                            {previewCustomPage.seoTitle || `${previewCustomPage.title} | Online MMJ Card`}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-mono font-bold text-[11px] text-slate-500">meta description</td>
                          <td className="py-2.5 px-3 text-slate-700">
                            {previewCustomPage.metaDescription || '(Not set - search engines will fallback to content excerpt)'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-mono font-bold text-[11px] text-slate-500">canonical URL</td>
                          <td className="py-2.5 px-3 font-mono text-emerald-700">
                            {previewCustomPage.canonicalUrl || `https://onlinemmjcard.com/${previewCustomPage.slug}/`}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-mono font-bold text-[11px] text-slate-500">Navigation Tab</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              previewCustomPage.showInNav ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {previewCustomPage.showInNav ? 'Linked to Top Navigation' : 'Hidden from Navigation'}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 3: Raw HTML Code Inspector */}
              {previewTab === 'html' && (
                <div className="max-w-2xl w-full bg-slate-900 text-slate-100 rounded-2xl shadow-xl p-6 space-y-4 font-mono text-xs overflow-x-auto my-auto">
                  <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
                    <span>Draft Content HTML Inspector</span>
                    <span>Length: {previewCustomPage.content?.length || 0} characters</span>
                  </div>
                  <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                    {previewCustomPage.content || '<!-- No content provided -->'}
                  </pre>
                </div>
              )}

            </div>

            {/* Preview Modal Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Temporary Draft Preview: layout and copy verified. Ready to synchronize with WordPress.</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Return to Editor
                </button>

                {showPageForm && (
                  <button
                    type="button"
                    onClick={async (e) => {
                      setShowPreviewModal(false);
                      await handleSavePage(e as unknown as React.FormEvent);
                    }}
                    disabled={pageIsSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-[#008f58] hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save & Publish to WordPress (POST/PUT)</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
