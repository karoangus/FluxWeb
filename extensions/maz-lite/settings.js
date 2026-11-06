'use strict';
// Missing or malformed values fall back to the 1.0 behavior.
const MazSettings = Object.freeze({
  key: 'mazLiteSettings',
  defaults: Object.freeze({ enabled: true, animations: true, transitions: true, shadows: true, textShadows: true, blur: true, smoothScroll: true }),
  normalize(value) {
    const result = {};
    for (const [key, fallback] of Object.entries(this.defaults)) {
      result[key] = value && typeof value[key] === 'boolean' ? value[key] : fallback;
    }
    return result;
  }
});
