"use strict";

// Element Selectors
const elements = {
  nextBtn: document.getElementById("nextBtn"),
  closeScheduleBtn: document.getElementById("closeScheduleBtn"),
  hamburger: document.getElementById("hamburger"),
  aboutBtn: document.getElementById("aboutBtn"),
  homeBtn: document.getElementById("homeBtn"),
  checkFormBtn: document.getElementById("checkFormBtn"),
  checkFormCloseBtn: document.getElementById("checkFormCloseBtn"),
  inputForm: document.getElementById("inputForm"),
  closeTopMessage: document.getElementById("closeTopMessage"),
  nav: document.getElementById("nav"),
  scheduleBtn: document.getElementById("scheduleBtn"),
  aside: document.getElementById("aside"),
  myScheduleBtn: document.getElementById("myScheduleBtn"),
  myScheduleBtnSide: document.getElementById("myScheduleBtnSide"),
  main: document.getElementById("main"),
  wrapper: document.getElementById("wrapper"),
  topMessage: document.getElementById("topMessage"),
  scheduleContainer: document.getElementById("scheduleContainer"),
  dark: document.getElementById("dark"),
  aboutSection: document.getElementById("aboutSection"),
  hero: document.getElementById("hero"),
  noScheduleAlert: document.getElementById("noScheduleAlert"),
};

const delay = 5000;
const hours = [0, 8, 24, 36, 48, 60];
const hoursAfter = [8, 24, 36, 48, 60];
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: userTimeZone,
  timeZoneName: "short",
};

// Utility Functions
const validateTimeInput = (input) =>
  /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/.test(input);
const sanitizeInput = (input) => {
  const div = document.createElement("div");
  div.innerText = input;
  return div.innerHTML;
};

// Toggle Elements
const toggleElement = (element, classes) => element.classList.toggle(classes);

// Time Functions
const displayTime = (timeArray) => {
  const now = new Date();
  timeArray.forEach((hour) => {
    const dateTime = new Date(now);
    dateTime.setHours(dateTime.getHours() + hour);
    const formattedDate = new Intl.DateTimeFormat(
      navigator.language,
      options
    ).format(dateTime);
    const newdose = document.createElement("p");
    newdose.style.marginBottom = "2rem";
    newdose.textContent = formattedDate;
    elements.scheduleContainer.appendChild(newdose);
  });
};

const displayTimeAfter = (time) => {
  let timeString = time;
  let today = new Date();
  let now = new Date(`${today.toDateString()} ${timeString}`);
  hoursAfter.forEach((hour) => {
    const dateWithTime = new Date(now);
    dateWithTime.setHours(dateWithTime.getHours() + hour);
    const formattedDate = new Intl.DateTimeFormat(
      navigator.language,
      options
    ).format(dateWithTime);
    const newdose = document.createElement("p");
    newdose.style.marginBottom = "2rem";
    newdose.textContent = formattedDate;
    elements.scheduleContainer.appendChild(newdose);
  });
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => toggleElement(elements.topMessage, "hidden"), 3000);

  const sections = document.querySelectorAll(".section");
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-10");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach((section) => observer.observe(section));
});

elements.hamburger.addEventListener("click", () => {
  toggleElement(elements.aside, "translate-x-full hidden");
  toggleElement(elements.dark, "hidden");
});

elements.closeTopMessage.addEventListener("click", () =>
  toggleElement(elements.topMessage, "hidden")
);

elements.dark.addEventListener("click", () => {
  if (!elements.aside.classList.contains("translate-x-full")) {
    toggleElement(elements.aside, "translate-x-full translate-x-0");
    toggleElement(elements.dark, "hidden");
  }
});

elements.nextBtn.addEventListener("click", () => {
  toggleElement(elements.dark, "hidden");
  toggleElement(elements.checkForm, "hidden flex");
});

elements.checkFormCloseBtn.addEventListener("click", () => {
  toggleElement(elements.checkForm, "hidden");
  toggleElement(elements.dark, "hidden");
});

elements.scheduleBtn.addEventListener("click", () => {
  if (window.innerWidth <= 425) elements.hero.classList.add("hidden");
  displayTime(hours);
  toggleElement(elements.scheduleContainer, "hidden");
  toggleElement(elements.closeScheduleBtn, "hidden");
});

elements.checkFormBtn.addEventListener("click", () => {
  const inputMessage = sanitizeInput(elements.inputForm.value);
  if (validateTimeInput(inputMessage)) {
    displayTimeAfter(inputMessage);
    elements.scheduleContainer.classList.toggle("hidden");
  } else {
    alert("Please enter a valid time in the format of '2:30 pm'!");
  }
});
