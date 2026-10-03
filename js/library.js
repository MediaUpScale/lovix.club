/* Video shelf.
   Publish a title by appending an object. The library and the player
   both read this list. Leave src empty until the file exists.

   {
     id: "evening-reel",
     creator: "lada",
     title: "Evening reel",
     duration: "12:04",
     tags: ["new"],
     synopsis: "A short reel from the violet set.",
     premium: false,
     src: "/media/lada/evening.mp4",
     poster: "/media/lada/evening.webp"
   }
*/
var LOVIX_VIDEOS = [];

(function () {
  var params = new URLSearchParams(location.search);
  var q = (params.get("q") || "").trim().toLowerCase().slice(0, 80);
  var creator = params.get("creator") || "all";
  var tag = params.get("tag") || "all";

  function matches(video) {
    if (creator !== "all" && video.creator !== creator) return false;
    if (tag !== "all" && (video.tags || []).indexOf(tag) === -1) return false;
    if (!q) return true;
    var hay = (video.title + " " + (video.synopsis || "") + " " + (video.tags || []).join(" ")).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  var input = document.getElementById("q");
  if (input && q) input.value = q;
  document.querySelectorAll(".chip").forEach(function (chip) {
    var wants = new URL(chip.href, location.origin).searchParams.get("creator") || "all";
    if (wants === creator) chip.setAttribute("aria-current", "true");
    else chip.removeAttribute("aria-current");
  });

  var grid = document.getElementById("library-grid");
  if (grid) {
    var found = LOVIX_VIDEOS.filter(matches);
    var empty = document.getElementById("library-empty");
    if (!found.length) {
      var title = document.getElementById("empty-title");
      if (title && (q || tag !== "all")) title.textContent = "No titles match";
      else if (title && creator !== "all") title.textContent = "Nothing published for " + creator.charAt(0).toUpperCase() + creator.slice(1) + " yet";
      return;
    }
    if (empty) empty.hidden = true;
    found.forEach(function (video) {
      var li = document.createElement("li");
      var card = document.createElement("a");
      card.className = "vcard";
      card.href = "/videos/play.html?id=" + encodeURIComponent(video.id);
      var thumb = document.createElement("div");
      thumb.className = "thumb frame-" + (video.title.length % 4);
      if (video.poster) {
        var img = document.createElement("img");
        img.src = video.poster;
        img.alt = "";
        thumb.appendChild(img);
      }
      var badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = video.src ? video.duration : "Soon";
      thumb.appendChild(badge);
      var meta = document.createElement("div");
      meta.className = "meta";
      var h2 = document.createElement("h2");
      h2.textContent = video.title;
      var p = document.createElement("p");
      p.textContent = video.creator;
      meta.appendChild(h2);
      meta.appendChild(p);
      card.appendChild(thumb);
      card.appendChild(meta);
      li.appendChild(card);
      grid.appendChild(li);
    });
    grid.hidden = false;
  }

  var player = document.getElementById("player");
  if (!player) return;
  var id = params.get("id");
  var video = null;
  for (var i = 0; i < LOVIX_VIDEOS.length; i++) {
    if (LOVIX_VIDEOS[i].id === id) video = LOVIX_VIDEOS[i];
  }
  var heading = document.getElementById("player-title");
  var copy = document.getElementById("player-copy");
  var stage = document.getElementById("player-stage");
  if (!video) {
    if (heading) heading.textContent = "This title is not on the shelf";
    return;
  }
  document.title = video.title + " · Lovix";
  if (heading) heading.textContent = video.title;
  if (copy) copy.textContent = video.synopsis || "";
  if (video.src && stage) {
    var el = document.createElement("video");
    el.controls = true;
    el.playsInline = true;
    el.preload = "metadata";
    el.src = video.src;
    if (video.poster) el.poster = video.poster;
    stage.replaceWith(el);
  }
})();
