import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ---------------------------------------------------------------------------
// WordPress Page Builder & Headless Integration Guard
// ---------------------------------------------------------------------------
// When Elementor or Divi editor canvases are active, or when running in WordPress
// 'headless-mode', the React SPA yields so page builders can render, drag-and-drop,
// and edit the native post content without any DOM clashing or iframe script collisions.
export function checkIsPageBuilderOrHeadlessMode(): boolean {
  if (typeof window === 'undefined') return false;

  const urlParams = new URLSearchParams(window.location.search);
  const searchStr = window.location.search.toLowerCase();

  // 1. Explicit Headless Mode Query Flag or Setting
  const hasHeadlessFlag =
    urlParams.get('headless-mode') === '1' ||
    urlParams.get('headless-mode') === 'true' ||
    urlParams.get('headless') === '1' ||
    urlParams.get('headless') === 'true' ||
    (window as unknown as { onlineMMJCardSettings?: { headlessMode?: boolean } })?.onlineMMJCardSettings?.headlessMode === true;

  if (hasHeadlessFlag) {
    return true;
  }

  // 2. Elementor Editor Canvas Detection (Active editor mode only - never standard preview)
  const isElementor =
    searchStr.includes('elementor-preview') ||
    urlParams.get('action') === 'elementor' ||
    document.body.classList.contains('elementor-editor-active') ||
    document.body.classList.contains('elementor-editor-preview');

  // 3. Divi Builder Visual Canvas Detection
  const isDivi =
    searchStr.includes('et_fb=1') ||
    document.body.classList.contains('et-fb') ||
    document.body.classList.contains('et_pb_builder_active');

  // 4. Beaver Builder or WordPress Admin Screen
  const isOtherEditorCanvas =
    searchStr.includes('fl_builder') ||
    document.body.classList.contains('wp-admin') ||
    document.body.classList.contains('block-editor-page');

  return Boolean(isElementor || isDivi || isOtherEditorCanvas);
}

const isHeadlessOrBuilder = checkIsPageBuilderOrHeadlessMode();

let container = document.getElementById('online-mmj-card-root') || document.getElementById('root');

// If running in standard visitor mode (not in a page builder editor)
if (!isHeadlessOrBuilder) {
  document.body.classList.add('online-mmj-spa-active');

  // If container does not exist on this page template yet, create it on body
  if (!container && typeof document !== 'undefined') {
    container = document.createElement('div');
    container.id = 'online-mmj-card-root';
    document.body.appendChild(container);
  }

  // If container is nested within WordPress template markup (e.g. .entry-content, article, main),
  // suppress any stray static fallback sibling elements and text nodes so they don't break the layout.
  if (container && container.parentElement && container.parentElement !== document.body) {
    const parent = container.parentElement;
    for (const child of Array.from(parent.children)) {
      if (child !== container && !child.contains(container)) {
        (child as HTMLElement).style.display = 'none';
      }
    }
    for (const node of Array.from(parent.childNodes)) {
      if (node !== container && node.nodeType === Node.TEXT_NODE) {
        node.textContent = '';
      }
    }
  }
}

if (container) {
  createRoot(container).render(<App isHeadlessMode={isHeadlessOrBuilder} />);
}

