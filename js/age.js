(function () {
  var btn = document.getElementById("age-enter");
  if (!btn) return;
  btn.addEventListener("click", function () {
    if (btn.disabled) return;
    try { localStorage.setItem("lovix-age", "1"); } catch (e) {}
    var path = location.pathname;
    var lower = path.toLowerCase();
    if (!/\.[a-z0-9]+$/i.test(lower) && lower.charAt(lower.length - 1) !== "/") lower += "/";
    var target = lower + location.search + location.hash;
    var here = path + location.search + location.hash;
    var lada = lower === "/lada/" || lower.indexOf("/lada/") === 0;
    if (lada && target !== here) {
      location.replace(target);
      return;
    }
    document.documentElement.classList.add("age-ok");
  });
})();
