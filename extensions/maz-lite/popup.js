'use strict';
(() => {
  const controls = Object.keys(MazSettings.defaults).map((key) => [key, document.getElementById(key)]);
  const status = document.getElementById('status');
  let state = MazSettings.normalize();
  let ready = false;
  function render() { for (const [key, input] of controls) input.checked = state[key]; }
  function setDisabled(disabled) {
    for (const [, input] of controls) input.disabled = disabled;
    document.getElementById('reset').disabled = disabled;
  }
  function save() {
    setDisabled(true);
    status.textContent = 'در حال ذخیره…';
    chrome.storage.local.set({ [MazSettings.key]: state }, () => {
      setDisabled(false);
      if (chrome.runtime.lastError) {
        status.textContent = 'ذخیره نشد؛ دوباره تلاش کن.';
      } else {
        status.textContent = 'ذخیره شد';
      }
    });
  }
  setDisabled(true);
  chrome.storage.local.get(MazSettings.key, (items) => {
    if (chrome.runtime.lastError) {
      status.textContent = 'خواندن تنظیمات ممکن نبود.';
      return;
    }
    state = MazSettings.normalize(items[MazSettings.key]);
    ready = true;
    render();
    setDisabled(false);
  });
  for (const [key, input] of controls) input.addEventListener('change', () => {
    if (!ready) return;
    state[key] = input.checked;
    save();
  });
  document.getElementById('reset').addEventListener('click', () => {
    if (!ready) return;
    state = MazSettings.normalize();
    render();
    save();
  });
})();
