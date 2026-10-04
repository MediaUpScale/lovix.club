(function () {
  var model = lovixModel(window.LOVIX_PAGE);
  var mount = document.getElementById("profile-mount");
  if (!model || !mount) return;

  document.title = model.name + " · Lovix";
  var canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = "https://lovix.club/" + model.id + "/";

  var lock = '<span class="lock" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2.2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>';
  var videoIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="m16 10 5-2.5v9L16 14" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  var photoIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.7"/></svg>';

  var slides = model.slides.map(function (shot, n) {
    var cls = "slide" + (n === 0 ? " is-on" : "") + (shot.locked ? " is-locked" : "");
    var eager = n === 0 ? ' fetchpriority="high"' : ' loading="lazy"';
    return '<div class="' + cls + '"><img src="' + shot.src + '" alt="' + model.name + ' preview ' + (n + 1) + '" width="' + shot.w + '" height="' + shot.h + '"' + eager + '>' + (shot.locked ? lock : "") + "</div>";
  }).join("");
  var dots = model.slides.map(function (_, n) {
    return '<span class="dot"' + (n === 0 ? ' aria-current="true"' : "") + "><span></span></span>";
  }).join("");
  var strip = (model.strip || []).map(function (shot) {
    return '<div class="still' + (shot.locked ? " is-locked" : "") + '"><img src="' + shot.src + '" alt="' + model.name + ' preview" width="' + shot.w + '" height="' + shot.h + '"' + (shot.locked ? "" : "") + ">" + (shot.locked ? lock : "") + "</div>";
  }).join("");
  var verified = model.verified ? '<span class="verified" role="img" aria-label="Verified"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="m8.2 12.2 2.5 2.5 5.1-5.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>' : "";

  mount.innerHTML =
    '<div class="narrow model-top">' +
      '<header class="profile">' +
        '<span class="mark"><span class="mark-face"><img src="' + model.avatar + '" alt="" width="640" height="640"></span></span>' +
        "<div><div class=\"name-row\"><h1 class=\"profile-name display\">" + model.name + "</h1>" + verified + "</div>" +
        '<p class="stats"><span class="stat">' + videoIcon + model.videos + ' videos</span><span class="stat">' + photoIcon + model.photos + " photos</span></p></div>" +
      "</header>" +
      '<div class="reel"><div class="reel-stage"><div class="reel-track" id="reel" tabindex="0" aria-label="' + model.name + ' previews">' + slides + "</div></div>" +
      '<div class="dots" aria-hidden="true">' + dots + "</div></div>" +
      '<div class="actions">' +
        '<button class="action" type="button"><span class="ico" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2.2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span><span><strong>Exclusive</strong><small>Premium content</small></span><span class="chev" aria-hidden="true">›</span></button>' +
        '<button class="action" type="button"><span class="ico" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="m10 8.8 5.2 3.2L10 15.2Z" fill="currentColor"/></svg></span><span><strong>Watch now</strong><small>Live</small></span><span class="chev" aria-hidden="true">›</span></button>' +
      "</div></div>" +
      '<div class="strip bleed" id="model-strip">' + strip + "</div>";

  var offer = document.getElementById("offer");
  var offerLink = document.querySelector(".offer-go");
  var offerPhoto = document.getElementById("offer-photo");
  var countEl = document.getElementById("offer-count");
  if (offerLink) offerLink.href = model.affiliate;
  if (offerPhoto && model.slides[0]) {
    offerPhoto.src = model.slides[0].src;
    offerPhoto.width = model.slides[0].w;
    offerPhoto.height = model.slides[0].h;
  }

  var countTimer = 0;
  function openOffer() {
    if (!offer || !offer.hidden) return;
    offer.hidden = false;
    var n = 5;
    if (countEl) countEl.textContent = "5";
    clearInterval(countTimer);
    countTimer = setInterval(function () {
      n -= 1;
      if (n <= 0) {
        clearInterval(countTimer);
        if (offerLink) location.href = offerLink.href;
        return;
      }
      if (countEl) countEl.textContent = String(n);
    }, 1000);
  }
  function closeOffer() {
    if (!offer) return;
    offer.hidden = true;
    clearInterval(countTimer);
  }
  var site = document.getElementById("site");
  if (site) {
    site.addEventListener("click", function (event) {
      if (event.target.closest("a")) return;
      openOffer();
    });
  }
  document.querySelectorAll("[data-offer-close]").forEach(function (el) {
    el.addEventListener("click", closeOffer);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && offer && !offer.hidden) closeOffer();
  });

  var track = document.getElementById("reel");
  if (!track) return;
  var frames = track.children;
  var marks = document.querySelectorAll(".dot");
  var index = 0;
  function show(i) {
    index = (i + frames.length) % frames.length;
    for (var n = 0; n < frames.length; n++) {
      frames[n].classList.toggle("is-on", n === index);
      if (!marks[n]) continue;
      if (n === index) marks[n].setAttribute("aria-current", "true");
      else marks[n].removeAttribute("aria-current");
    }
  }
  show(0);
  setInterval(function () {
    if (offer && !offer.hidden) return;
    if (frames.length < 2) return;
    var next = index;
    while (next === index) next = Math.floor(Math.random() * frames.length);
    show(next);
  }, 2800);
})();
