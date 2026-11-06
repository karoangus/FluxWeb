'use strict';
(() => {
  let current = MazSettings.normalize();
  let observer;
  function apply() {
    const root = document.documentElement;
    if (!root) return false;
    for (const key of Object.keys(MazSettings.defaults)) {
      if (key === 'enabled') continue;
      const name = `data-mazlite-${key.toLowerCase()}`;
      if (current.enabled && current[key]) root.setAttribute(name, 'on');
      else root.removeAttribute(name);
    }
    return true;
  }
  function applyWhenReady() {
    if (apply()) {
      if (observer) { observer.disconnect(); observer = undefined; }
    } else if (!observer) {
      observer = new MutationObserver(applyWhenReady);
      observer.observe(document, { childList: true });
    }
  }
  // Register before reading storage so a later change cannot be missed.
  let changed = false;
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || !changes[MazSettings.key]) return;
    changed = true;
    current = MazSettings.normalize(changes[MazSettings.key].newValue);
    applyWhenReady();
  });
  chrome.storage.local.get(MazSettings.key, (items) => {
    if (chrome.runtime.lastError || changed) return;
    current = MazSettings.normalize(items[MazSettings.key]);
    applyWhenReady();
  });
})();
