/* Shared contact-click measurement. A click does not prove a conversation or sale. */
(function () {
  'use strict';
  function trackContact(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var url;
    try { url = new URL(link.href, window.location.href); } catch (_) { return; }
    if (url.protocol !== 'https:' || url.hostname !== 'wa.me') return;
    var section = link.closest('section[id], nav, footer');
    var position = link.classList.contains('whatsapp-float') ? 'floating' :
      (section ? (section.id || section.tagName.toLowerCase()) : 'other');
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion_event_contact', {
        send_to: 'G-540DXT0KW4',
        contact_method: 'whatsapp',
        page_path: window.location.pathname,
        cta_location: position,
        cta_text: (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100),
        transport_type: 'beacon'
      });
    }
    // Never block native navigation, even when analytics is unavailable.
  }
  document.addEventListener('click', trackContact);
  document.addEventListener('auxclick', trackContact);
}());
