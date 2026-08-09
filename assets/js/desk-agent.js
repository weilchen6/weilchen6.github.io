// The little agent sitting on the portrait: greets on load, and again on
// click. No dependencies, and it stays quiet when the visitor asked for
// reduced motion.
(function () {
  var root = document.querySelector("[data-agent]");
  if (!root) return;

  var btn = root.querySelector("[data-agent-btn]");
  var bubble = root.querySelector("[data-agent-bubble]");
  if (!btn || !bubble) return;

  // Ordered so the tone alternates: the first line is the one shown on load.
  var LINES = [
    "Hi! Thanks for stopping by.",
    "I study agents. Like me.",
    "Careful, I hold credentials.",
    "My context window is this page.",
    "Hello. You found the homepage.",
    "I am read-only.",
    "Weiliang is probably in the lab.",
    "Do not grant me admin.",
    "I do not hallucinate. Usually.",
    "Still waiting for my permissions.",
    "Weiliang answers email. I don't.",
  ];

  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var idx = 0;
  var hideTimer;

  function say(text) {
    window.clearTimeout(hideTimer);
    bubble.textContent = text;
    bubble.hidden = false;

    if (!calm) {
      root.removeAttribute("data-waving");
      // reflow, so the wave restarts on repeat clicks
      void root.offsetWidth;
      root.setAttribute("data-waving", "");
    }

    hideTimer = window.setTimeout(function () {
      bubble.hidden = true;
      root.removeAttribute("data-waving");
    }, 4200);
  }

  btn.addEventListener("click", function () {
    say(LINES[idx % LINES.length]);
    idx += 1;
  });

  // Greet once, after the page has settled.
  window.setTimeout(function () {
    say(LINES[0]);
    idx = 1;
  }, 1200);
})();
