'use strict';

// The app has no analytics or external requests. Installation is optional.
let installPrompt;
const installButton = document.getElementById('install-app');
const installHint = document.getElementById('install-hint');
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
  installHint.textContent = 'وب‌اپ را به دستگاهت اضافه کن؛ افزونه Chrome جداگانه نصب می‌شود.';
});
installButton.addEventListener('click', async () => {
  if (!installPrompt) return;
  const prompt = installPrompt;
  installPrompt = null;
  installButton.hidden = true;
  await prompt.prompt();
});
window.addEventListener('appinstalled', () => {
  installPrompt = null;
  installButton.hidden = true;
  installHint.textContent = 'وب‌اپ نصب شد. برای نصب افزونه، مراحل راهنمای بالا را دنبال کن.';
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // The site remains usable if offline support is unavailable.
    });
  });
}
