const LINE1 = "Automation";
const LINE2 = "Reinvented by AI";

const l1 = document.getElementById("l1");
const l2 = document.getElementById("l2");
const wrap = document.getElementById("wrap");

// simple typewriter for plain text
function typeText(el, text, perCharMs) {
  return new Promise((resolve) => {
    el.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, perCharMs);
  });
}

(async () => {
  // type first line
  await typeText(
    l1,
    LINE1,
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--type-speed-1")
    )
  );

  // type second line normally
  await typeText(
    l2,
    LINE2,
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--type-speed-2")
    )
  );

  // ✅ after typing finishes, wrap "AI" in a span
  l2.innerHTML = l2.textContent.replace(
    "AI",
    "<span class='ai'>AI</span>"
  );

  // pause after typing
  await new Promise((r) =>
    setTimeout(
      r,
      parseTime(
        getComputedStyle(document.documentElement).getPropertyValue("--pause-after-typing")
      )
    )
  );

  // trigger scale animation
  wrap.classList.add("scale");
})();

// ✅ NEW: Remove element after animation finishes
wrap.addEventListener("animationend", (e) => {
  if (e.animationName === "grow") {
    wrap.style.display = "none"; // prevent glitch/flicker
  }
});

// helper to parse "500ms" / "3s" to ms
function parseTime(val) {
  val = val.trim();
  if (val.endsWith("ms")) return parseFloat(val);
  if (val.endsWith("s")) return parseFloat(val) * 1000;
  return parseFloat(val) || 0;
}
