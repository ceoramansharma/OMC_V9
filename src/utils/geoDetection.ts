import { useState, useEffect } from 'react';
import { STATES_DATA, StateInfo } from '../data/mmjData';

const STORAGE_KEY = 'online_mmj_user_state';
const USER_OVERRIDE_KEY = 'online_mmj_state_manually_selected';

// Map of 2-letter state codes to STATES_DATA IDs
const STATE_CODE_MAP: Record<string, string> = {
  CA: 'california',
  NY: 'new-york',
  FL: 'florida',
  PA: 'pennsylvania',
  OH: 'ohio',
  OK: 'oklahoma',
  MO: 'missouri',
  CT: 'connecticut',
  TX: 'texas',
  GA: 'georgia',
  IL: 'illinois',
  MD: 'maryland',
  VA: 'virginia',
  MA: 'massachusetts',
  MI: 'michigan',
  MN: 'minnesota',
  AZ: 'arizona',
  NJ: 'new-jersey',
  CO: 'colorado',
  NV: 'nevada',
  WA: 'washington',
  ME: 'maine',
  OR: 'oregon',
  UT: 'utah',
  LA: 'louisiana',
  NM: 'new-mexico',
  RI: 'rhode-island',
  DE: 'delaware',
  HI: 'hawaii',
  AR: 'arkansas',
  NH: 'new-hampshire',
  WV: 'west-virginia',
  MS: 'mississippi',
  AL: 'alabama',
  KY: 'kentucky',
  IA: 'iowa',
};

// Map of common US timezones to primary supported states
const TIMEZONE_MAP: Record<string, string> = {
  'America/Los_Angeles': 'california',
  'America/New_York': 'new-york',
  'America/Detroit': 'michigan',
  'America/Chicago': 'illinois',
  'America/Indiana/Indianapolis': 'ohio',
  'America/Menominee': 'michigan',
  'America/Kentucky/Louisville': 'ohio',
  'America/Phoenix': 'california',
};

/**
 * Synchronous initial state resolution:
 * Checks localStorage first, then timeZone heuristic, falls back to California.
 * Prevents any layout shift or UI flickering on initial render.
 */
export function getInitialStateSync(): StateInfo {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const match = STATES_DATA.find((s) => s.id === saved || s.code === saved);
      if (match) return match;
    }

    // Timezone heuristic fallback
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && TIMEZONE_MAP[tz]) {
      const tzMatch = STATES_DATA.find((s) => s.id === TIMEZONE_MAP[tz]);
      if (tzMatch) return tzMatch;
    }
  } catch {
    // Ignore storage/timezone errors in strict browser environments
  }

  // Default fallback
  return STATES_DATA[0]; // California
}

/**
 * Asynchronously detects the visitor's state using IP-based Geolocation with strict timeouts.
 * Never throws — gracefully falls back to cached or timezone-based states.
 */
export async function detectUserState(): Promise<{ state: StateInfo; isAutoDetected: boolean }> {
  // If user already manually selected a state previously, respect their choice
  try {
    const isManuallySelected = localStorage.getItem(USER_OVERRIDE_KEY) === 'true';
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isManuallySelected && saved) {
      const existing = STATES_DATA.find((s) => s.id === saved);
      if (existing) return { state: existing, isAutoDetected: false };
    }
  } catch {
    // Ignore localStorage access issues
  }

  // Fast fetch with AbortController timeout (1800ms max to prevent slowing down the user)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1800);

  try {
    // Primary: ipapi.co (CORS enabled, highly accurate for US states)
    const res = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const regionCode = (data.region_code || data.region || '').toUpperCase();
      const stateId = STATE_CODE_MAP[regionCode];

      if (stateId) {
        const matched = STATES_DATA.find((s) => s.id === stateId);
        if (matched) {
          try {
            localStorage.setItem(STORAGE_KEY, matched.id);
          } catch {}
          return { state: matched, isAutoDetected: true };
        }
      }
    }
  } catch {
    // Fallback if ipapi.co is blocked or timed out
    try {
      const backupRes = await fetch('https://get.geojs.io/v1/ip/geo.json', {
        headers: { Accept: 'application/json' }
      });
      if (backupRes.ok) {
        const geoData = await backupRes.json();
        const region = (geoData.region || '').toUpperCase();
        const stateId = STATE_CODE_MAP[region];
        if (stateId) {
          const matched = STATES_DATA.find((s) => s.id === stateId);
          if (matched) {
            try {
              localStorage.setItem(STORAGE_KEY, matched.id);
            } catch {}
            return { state: matched, isAutoDetected: true };
          }
        }
      }
    } catch {
      // Both IP services failed, will use timezone fallback below
    }
  }

  const fallback = getInitialStateSync();
  return { state: fallback, isAutoDetected: false };
}

/**
 * Saves a user's explicit state selection to override auto-detection.
 */
export function setUserSelectedState(stateId: string) {
  try {
    localStorage.setItem(STORAGE_KEY, stateId);
    localStorage.setItem(USER_OVERRIDE_KEY, 'true');
  } catch {}
}

/**
 * React Hook for seamless geolocation detection and state binding.
 */
export function useDetectedState(initialStateId?: string) {
  const [selectedStateId, setSelectedStateIdState] = useState<string>(() => {
    if (initialStateId) {
      return initialStateId;
    }
    return getInitialStateSync().id;
  });

  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(false);
  const [detectedStateName, setDetectedStateName] = useState<string>('');

  useEffect(() => {
    if (initialStateId) {
      setSelectedStateIdState(initialStateId);
      return;
    }

    let isMounted = true;

    detectUserState().then(({ state, isAutoDetected: detected }) => {
      if (!isMounted) return;

      const userOverrode = (() => {
        try {
          return localStorage.getItem(USER_OVERRIDE_KEY) === 'true';
        } catch {
          return false;
        }
      })();

      if (!userOverrode) {
        setSelectedStateIdState(state.id);
        setIsAutoDetected(detected);
        setDetectedStateName(state.name);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [initialStateId]);

  const setSelectedStateId = (newStateId: string, isManual = true) => {
    setSelectedStateIdState(newStateId);
    if (isManual) {
      setUserSelectedState(newStateId);
      setIsAutoDetected(false);
    }
  };

  const currentState = STATES_DATA.find((s) => s.id === selectedStateId) || STATES_DATA[0];

  return {
    selectedStateId,
    currentState,
    setSelectedStateId,
    isAutoDetected,
    detectedStateName
  };
}
