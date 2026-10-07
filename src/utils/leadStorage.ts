export interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  stateId?: string;
  serviceId?: string;
  acceptedTerms: boolean;
  marketingConsent: boolean;
  createdAt: string;
  notifiedEmails: string[];
  affiliateRedirectUrl: string;
  sourceUrl?: string;
  status: 'sent' | 'pending' | 'redirected';
}

export interface LeadSettings {
  notificationEmails: string[];
  affiliateUrl: string;
  passParamsToAffiliate: boolean;
  redirectDelaySeconds: number;
  startingPrice: string;
  businessName: string;
}

const SETTINGS_KEY = 'mmj_lead_settings_v1';
const LEADS_KEY = 'mmj_patient_leads_v1';

export const DEFAULT_LEAD_SETTINGS: LeadSettings = {
  notificationEmails: [
    'doctor@onlinemmjcard.com',
    'intake@onlinemmjcard.com',
    'referrals@onlinemmjcard.com'
  ],
  affiliateUrl: 'https://leafwell.com/get-card?utm_source=onlinemmjcard&ref=affiliate_portal',
  passParamsToAffiliate: true,
  redirectDelaySeconds: 2,
  startingPrice: '$55',
  businessName: 'OnlineMMJCard Telehealth Network',
};

// Seed initial demo leads if storage is empty so the admin can test immediately
const INITIAL_DEMO_LEADS: LeadSubmission[] = [
  {
    id: 'lead_10482',
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phoneNumber: '(310) 555-0194',
    stateId: 'california',
    serviceId: 'new-patient',
    acceptedTerms: true,
    marketingConsent: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    notifiedEmails: ['doctor@onlinemmjcard.com', 'intake@onlinemmjcard.com'],
    affiliateRedirectUrl: 'https://leafwell.com/get-card?utm_source=onlinemmjcard&name=Sarah+Jenkins',
    sourceUrl: 'https://onlinemmjcard.com/book-evaluation/',
    status: 'redirected'
  },
  {
    id: 'lead_10481',
    fullName: 'Marcus Vance',
    email: 'm.vance92@example.org',
    phoneNumber: '(415) 555-8321',
    stateId: 'california',
    serviceId: 'renewal',
    acceptedTerms: true,
    marketingConsent: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    notifiedEmails: ['doctor@onlinemmjcard.com', 'intake@onlinemmjcard.com'],
    affiliateRedirectUrl: 'https://leafwell.com/get-card?utm_source=onlinemmjcard&name=Marcus+Vance',
    sourceUrl: 'https://onlinemmjcard.com/',
    status: 'redirected'
  }
];

export function getLeadSettings(): LeadSettings {
  if (typeof window === 'undefined') return DEFAULT_LEAD_SETTINGS;
  try {
    const wpSettings = (window as any).onlineMMJCardSettings;
    const raw = localStorage.getItem(SETTINGS_KEY);
    let base = DEFAULT_LEAD_SETTINGS;

    if (raw) {
      const parsed = JSON.parse(raw);
      base = {
        ...DEFAULT_LEAD_SETTINGS,
        ...parsed,
        notificationEmails: Array.isArray(parsed.notificationEmails) && parsed.notificationEmails.length > 0
          ? parsed.notificationEmails
          : DEFAULT_LEAD_SETTINGS.notificationEmails
      };
    }

    // Merge WordPress backend settings if injected
    if (wpSettings) {
      if (wpSettings.affiliateUrl) base.affiliateUrl = wpSettings.affiliateUrl;
      if (wpSettings.startingPrice) base.startingPrice = wpSettings.startingPrice;
      if (typeof wpSettings.redirectDelay === 'number') base.redirectDelaySeconds = wpSettings.redirectDelay;
    }

    return base;
  } catch (e) {
    console.error('Failed to load lead settings:', e);
    return DEFAULT_LEAD_SETTINGS;
  }
}

export function saveLeadSettings(settings: LeadSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('lead-settings-updated'));
  } catch (e) {
    console.error('Failed to save lead settings:', e);
  }
}

export function getAllLeads(): LeadSubmission[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_LEADS;
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
      return INITIAL_DEMO_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_LEADS;
  } catch (e) {
    console.error('Failed to load leads:', e);
    return INITIAL_DEMO_LEADS;
  }
}

/**
 * Builds the personalized affiliate redirect URL with patient metadata
 */
export function buildAffiliateUrl(
  baseAffiliateUrl: string, 
  data: { fullName: string; email: string; phoneNumber: string; stateId?: string }
): string {
  try {
    const url = new URL(baseAffiliateUrl);
    const names = data.fullName.trim().split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    url.searchParams.set('first_name', firstName);
    if (lastName) url.searchParams.set('last_name', lastName);
    url.searchParams.set('name', data.fullName);
    url.searchParams.set('email', data.email);
    url.searchParams.set('phone', data.phoneNumber);
    if (data.stateId) url.searchParams.set('state', data.stateId);
    url.searchParams.set('ref_source', 'onlinemmjcard_telehealth');
    url.searchParams.set('timestamp', Date.now().toString());

    return url.toString();
  } catch (e) {
    // If URL is invalid, fallback with query string
    const separator = baseAffiliateUrl.includes('?') ? '&' : '?';
    return `${baseAffiliateUrl}${separator}name=${encodeURIComponent(data.fullName)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phoneNumber)}`;
  }
}

/**
 * Stores a new patient lead, dispatches email notifications to all configured addresses,
 * and returns the final affiliate redirect URL.
 */
export async function submitPatientLead(formData: {
  fullName: string;
  email: string;
  phoneNumber: string;
  stateId?: string;
  serviceId?: string;
  acceptedTerms: boolean;
  marketingConsent: boolean;
  sourceUrl?: string;
}): Promise<{ lead: LeadSubmission; redirectUrl: string; notifiedEmails: string[] }> {
  const settings = getLeadSettings();
  const currentLeads = getAllLeads();

  // Construct final affiliate redirect URL
  const targetRedirectUrl = settings.passParamsToAffiliate
    ? buildAffiliateUrl(settings.affiliateUrl, formData)
    : settings.affiliateUrl;

  const newLead: LeadSubmission = {
    id: `lead_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    phoneNumber: formData.phoneNumber.trim(),
    stateId: formData.stateId || 'national',
    serviceId: formData.serviceId || 'new-patient',
    acceptedTerms: formData.acceptedTerms,
    marketingConsent: formData.marketingConsent,
    createdAt: new Date().toISOString(),
    notifiedEmails: [...settings.notificationEmails],
    affiliateRedirectUrl: targetRedirectUrl,
    sourceUrl: formData.sourceUrl || (typeof window !== 'undefined' ? window.location.href : 'https://onlinemmjcard.com/book-evaluation/'),
    status: 'redirected'
  };

  // 1. Store lead in persistent local array
  const updatedLeads = [newLead, ...currentLeads];
  try {
    localStorage.setItem(LEADS_KEY, JSON.stringify(updatedLeads));
    window.dispatchEvent(new Event('leads-updated'));
  } catch (e) {
    console.error('Failed to save lead:', e);
  }

  // 2. Dispatch simulated / server notification emails to all listed recipients
  await dispatchEmailNotifications(newLead, settings.notificationEmails);

  // 3. If running inside WordPress, submit directly to the WordPress backend endpoint
  let serverRedirectUrl = targetRedirectUrl;
  let serverNotified = settings.notificationEmails;

  if (typeof window !== 'undefined' && (window as any).onlineMMJCardSettings) {
    const wpSettings = (window as any).onlineMMJCardSettings;
    const endpoint = wpSettings.restUrl || (wpSettings.ajaxUrl ? `${wpSettings.ajaxUrl}?action=submit_mmj_lead` : null);
    if (endpoint) {
      try {
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            stateId: formData.stateId,
            serviceId: formData.serviceId,
            marketingConsent: formData.marketingConsent,
            sourceUrl: formData.sourceUrl || window.location.href,
          })
        });
        if (resp.ok) {
          const json = await resp.json();
          if (json.redirectUrl) {
            serverRedirectUrl = json.redirectUrl;
          }
          if (Array.isArray(json.notifiedEmails)) {
            serverNotified = json.notifiedEmails;
          }
        }
      } catch (err) {
        console.warn('WordPress lead endpoint error, fallback to client flow:', err);
      }
    }
  }

  return {
    lead: newLead,
    redirectUrl: serverRedirectUrl,
    notifiedEmails: serverNotified
  };
}

/**
 * Generates and triggers the email dispatch to all configured email addresses
 */
export async function dispatchEmailNotifications(lead: LeadSubmission, recipientEmails: string[]): Promise<boolean> {
  const emailSubject = `🚨 New MMJ Evaluation Lead: ${lead.fullName} (${lead.phoneNumber})`;
  
  const emailPayload = {
    to: recipientEmails,
    subject: emailSubject,
    timestamp: lead.createdAt,
    patient: {
      id: lead.id,
      name: lead.fullName,
      email: lead.email,
      phone: lead.phoneNumber,
      state: lead.stateId,
      acceptedTerms: lead.acceptedTerms,
      marketingConsent: lead.marketingConsent,
    },
    affiliateRedirect: lead.affiliateRedirectUrl,
    source: lead.sourceUrl
  };

  console.group('📧 [LEAD NOTIFICATION DISPATCHED TO ALL CONFIGURED EMAILS]');
  console.log(`Recipients (${recipientEmails.length}):`, recipientEmails.join(', '));
  console.log('Subject:', emailSubject);
  console.log('Intake Data:', emailPayload);
  console.groupEnd();

  // Try server-side proxy route if available
  try {
    await fetch('/api/leads/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload)
    }).catch(() => {
      // Graceful fallback in client-only mode
    });
  } catch (e) {
    // Client-side fallback
  }

  return true;
}

export function deleteLead(id: string): void {
  if (typeof window === 'undefined') return;
  const currentLeads = getAllLeads();
  const filtered = currentLeads.filter((l) => l.id !== id);
  localStorage.setItem(LEADS_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event('leads-updated'));
}

export function clearAllLeads(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LEADS_KEY, JSON.stringify([]));
  window.dispatchEvent(new Event('leads-updated'));
}

export function exportLeadsToCsv(): void {
  const leads = getAllLeads();
  if (leads.length === 0) {
    alert('No patient leads to export.');
    return;
  }

  const headers = ['Lead ID', 'Full Name', 'Email', 'Phone', 'State', 'Service', 'Date & Time', 'Notified Emails', 'Affiliate Redirect URL'];
  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${l.fullName.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${l.phoneNumber.replace(/"/g, '""')}"`,
    `"${(l.stateId || '').replace(/"/g, '""')}"`,
    `"${(l.serviceId || '').replace(/"/g, '""')}"`,
    `"${new Date(l.createdAt).toLocaleString()}"`,
    `"${(l.notifiedEmails || []).join('; ').replace(/"/g, '""')}"`,
    `"${l.affiliateRedirectUrl.replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `onlinemmjcard_patient_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
