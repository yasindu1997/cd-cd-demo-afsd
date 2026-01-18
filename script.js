// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Theme toggle (dark/light)
const themeBtn = document.getElementById("themeBtn");

function setTheme(mode) {
  if (mode === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️ Light";
  } else {
    document.body.classList.remove("light");
    themeBtn.textContent = "🌙 Dark";
  }
  localStorage.setItem("theme", mode);
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeBtn?.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// FAQ accordion
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
  });
});

// Demo: Simple sentiment classification (rule-based)
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const demoText = document.getElementById("demoText");

const resultTitle = document.getElementById("resultTitle");
const resultDesc = document.getElementById("resultDesc");
const wordCountChip = document.getElementById("wordCountChip");
const scoreChip = document.getElementById("scoreChip");

const POSITIVE = ["good", "great", "amazing", "awesome", "love", "excellent", "helpful", "best", "happy"];
const NEGATIVE = ["bad", "worst", "hate", "terrible", "awful", "poor", "sad", "bug", "problem", "fail"];

function classifySentiment(text) {
  const clean = text.toLowerCase();
  const words = clean.match(/[a-z]+/g) || [];
  let score = 0;

  for (const w of words) {
    if (POSITIVE.includes(w)) score += 1;
    if (NEGATIVE.includes(w)) score -= 1;
  }

  let label = "Neutral 🙂";
  let detail = "Mixed or unclear sentiment.";

  if (score >= 2) {
    label = "Positive ✅";
    detail = "Looks optimistic / supportive.";
  } else if (score <= -2) {
    label = "Negative ⚠️";
    detail = "Looks unhappy / critical.";
  }

  return { label, detail, score, wordCount: words.length };
}

function renderResult({ label, detail, score, wordCount }) {
  resultTitle.textContent = label;
  resultDesc.textContent = detail;
  wordCountChip.textContent = `Words: ${wordCount}`;
  scoreChip.textContent = `Score: ${score}`;
}

analyzeBtn?.addEventListener("click", () => {
  const text = demoText.value.trim();
  if (!text) {
    renderResult({
      label: "Waiting...",
      detail: "Enter a sentence and click Analyze.",
      score: 0,
      wordCount: 0,
    });
    return;
  }
  renderResult(classifySentiment(text));
});

clearBtn?.addEventListener("click", () => {
  demoText.value = "";
  renderResult({
    label: "Waiting...",
    detail: "Enter a sentence and click Analyze.",
    score: 0,
    wordCount: 0,
  });
});
