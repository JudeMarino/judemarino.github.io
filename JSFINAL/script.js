const captcha = document.getElementById("captcha");
const captchaQuestion = document.getElementById("captchaQuestion");
const captchaInput = document.getElementById("captchaInput");
const robotCheck = document.getElementById("robotCheck");
const captchaSubmit = document.getElementById("captchaSubmit");
const error = document.getElementById("error");
const display = document.getElementById("display");
const endingPopup = document.getElementById("endingPopup");
const submitNumberBtn = document.getElementById("submitNumber");

const captchaQuestions = [
  { q: "Spell 'two'", a: "two" },
  { q: "How many eyes does a human have?", a: "2" },
  { q: "Type 'OK'", a: "OK" },
  { q: "What’s 2 + 2?", a: "4" },
  { q: "Spell 'nokia'", a: "nokia" },
  { q: "What’s the opposite of OFF?", a: "ON" },
  { q: "Enter number of fingers on a hand", a: "5" },
  { q: "First letter of 'Boulder'", a: "b" },
  { q: "Type 'yes'", a: "yes" },
  { q: "How many legs does a dog have?", a: "4" }
];

let digitQueue = [];
let nextDigit = null;
let currentCaptcha = null;

function handleKey(digit) {
  if (digitQueue.length >= 10) return;
  nextDigit = digit;
  showCaptcha();
}

function showCaptcha() {
  currentCaptcha = captchaQuestions[Math.floor(Math.random() * captchaQuestions.length)];
  captchaQuestion.textContent = currentCaptcha.q;
  captchaInput.value = "";
  error.style.display = "none";
  robotCheck.checked = false;
  captchaSubmit.disabled = true;
  captcha.style.display = "flex";
}

robotCheck.addEventListener("change", function () {
  captchaSubmit.disabled = !this.checked;
});

function submitCaptcha() {
  const userAnswer = captchaInput.value.trim().toUpperCase();
  if (userAnswer === currentCaptcha.a.toUpperCase()) {
    digitQueue.push(nextDigit);
    updateDisplay();
    captcha.style.display = "none";
  } else {
    error.style.display = "block";
  }
}

function updateDisplay() {
  let output = "";
  for (let i = 0; i < 10; i++) {
    output += digitQueue[i] ? digitQueue[i] + " " : "_ ";
  }
  display.textContent = output.trim();
}

function submitNumber() {
  if (digitQueue.length === 10) {
    endingPopup.style.display = "flex";
  } else {
    alert("Please complete the 10-digit phone number before submitting.");
  }
}