"use strict";

(function () {
  const nextBtn = document.getElementById("nextBtn");
  const closeScheduleBtn = document.getElementById("closeScheduleBtn");
  const hamburger = document.getElementById("hamburger");
  const aboutBtn = document.getElementById("aboutBtn");
  const homeBtn = document.getElementById("homeBtn");
  const sections = document.querySelectorAll("sections");
  const checkFormBtn = document.getElementById("checkFormBtn");
  const checkFormCloseBtn = document.getElementById("checkFormCloseBtn");
  const inputForm = document.getElementById("inputForm");
  const closeTopMessage = document.getElementById("closeTopMessage");
  const nav = document.getElementById("nav");
  const scheduleBtn = document.getElementById("scheduleBtn");

  const aside = document.getElementById("aside");
  const myScheduleBtn = document.getElementById("myScheduleBtn");
  const myScheduleBtnSide = document.getElementById("myScheduleBtnSide");
  const main = document.getElementById("main");
  const wrapper = document.getElementById("wrapper");
  const homeSection = document.getElementById("homeSection");
  const topMessage = document.getElementById("topMessage");
  const schedule = document.getElementById("schedule");
  const header = document.getElementById("header");
  const listnav = document.getElementById("listnav");
  const dark = document.getElementById("dark");
  const aboutSection = document.getElementById("aboutSection");
  const footerSection = document.getElementById("footerSection");
  const checkForm = document.getElementById("checkForm");
  const scheduleContainer = document.getElementById("scheduleContainer");
  const noScheduleAlert = document.getElementById("noScheduleAlert");
  const hero = document.getElementById("hero");

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

  document.addEventListener("DOMContentLoaded", function () {
    // Delay your code execution by 3 seconds (3000 milliseconds)
    setTimeout(function () {
      // Your code here
      topMessage.classList.toggle("hidden");
    }, 3000);
  });

  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    const options = {
      threshold: 0.1, // Trigger when 10% of the section is in view
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-10"); // Remove the initial hidden classes
          observer.unobserve(entry.target); // Stop observing once the animation is triggered
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section); // Observe each section
    });
  });

  // Example time validation function (12-hour format with AM/PM)
  function validateTimeInput(input) {
    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/;
    return regex.test(input);
  }

  // Sanitization function
  function sanitizeInput(input) {
    const div = document.createElement("div");
    div.innerText = input;
    return div.innerHTML;
  }

  hamburger.addEventListener("click", function () {
    if (aside.classList.contains("translate-x-full")) {
      // Show the sidebar
      aside.classList.remove("translate-x-full");
      aside.classList.remove("hidden");
      aside.classList.add(
        "translate-x-0",
        "transition-transform",
        "duration-500"
      );
      dark.classList.remove("hidden");
    }
  });

  closeTopMessage.addEventListener("click", function () {
    topMessage.classList.add("hidden");
  });

  dark.addEventListener("click", function () {
    if (
      !aside.classList.contains("translate-x-full") &&
      !dark.classList.contains("hidden")
    ) {
      // Hide the dark overlay and slide the sidebar out
      dark.classList.add("hidden");
      aside.classList.add("translate-x-full");
      aside.classList.remove("translate-x-0");
    }
  });

  nextBtn.addEventListener("click", function () {
    dark.classList.remove("hidden");
    checkForm.classList.toggle("hidden");
    checkForm.classList.add("flex");
  });

  checkFormCloseBtn.addEventListener("click", function () {
    checkForm.classList.toggle("hidden");
    dark.classList.toggle("hidden");
  });

  aside.addEventListener("click", function (e) {
    if (
      e.target.id === "aboutBtn" ||
      e.target.id === "homeBtn" ||
      e.target.id === "myScheduleBtnSide"
    ) {
      dark.classList.toggle("hidden");
      aside.classList.remove("translate-x-0");
      aside.classList.toggle("translate-x-full");
    }
  });

  wrapper.addEventListener("click", function (e) {
    if (e.target.id === "aboutBtn") {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }

    if (e.target.id === "homeBtn") {
      header.scrollIntoView({ behavior: "smooth" });
    }
  });

  const checkTime = function () {
    const now = new Date();
    hours.forEach((hour) => {
      const dateTime = new Date(now);
      dateTime.setHours(dateTime.getHours() + hour);

      let formattedDate = new Intl.DateTimeFormat(
        navigator.language,
        options
      ).format(dateTime);

      const newdose = document.createElement("p");
      newdose.style.marginBottom = "2rem";
      newdose.textContent = formattedDate;

      scheduleContainer.appendChild(newdose);
    });
  };

  const checkTimeAfter = function (time) {
    let timeString = time;
    let today = new Date();
    let now = new Date(`${today.toDateString()} ${timeString}`);

    hoursAfter.forEach((hour) => {
      const dateWithTime = new Date(now);
      const timestring = dateWithTime.setHours(dateWithTime.getHours() + hour);
      const dateTime = new Date(timestring);
      let formattedDate = new Intl.DateTimeFormat(
        navigator.language,
        options
      ).format(dateTime);

      const newdose = document.createElement("p");
      newdose.style.marginBottom = "2rem";
      newdose.textContent = formattedDate;

      scheduleContainer.appendChild(newdose);
    });
  };

  scheduleBtn.addEventListener("click", function () {
    if (window.innerWidth <= 425) {
      hero.classList.add("hidden");
    }

    checkTime();
    scheduleContainer.classList.toggle("hidden");

    // Reset all buttons to default colors
    homeBtn.classList.remove("text-green-500");
    aboutBtn.classList.remove("text-green-500");
    myScheduleBtn.classList.remove("text-green-500");

    // Apply the active color to the clicked button
    myScheduleBtn.classList.add("text-green-500");

    scheduleBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    closeScheduleBtn.classList.remove("hidden");
  });

  homeBtn.addEventListener("click", function () {
    if (!scheduleContainer.classList.contains("hidden")) {
      scheduleContainer.classList.toggle("hidden");
    }

    // Reset all buttons to default colors
    myScheduleBtn.classList.remove("text-green-500");
    aboutBtn.classList.remove("text-green-500");
    homeBtn.classList.remove("text-green-500");

    // Apply the active color to the clicked button
    homeBtn.classList.add("text-green-500");
  });

  aboutBtn.addEventListener("click", function () {
    if (!scheduleContainer.classList.contains("hidden")) {
      scheduleContainer.classList.toggle("hidden");
    }

    // Reset all buttons to default colors
    myScheduleBtn.classList.remove("text-green-500");
    homeBtn.classList.remove("text-green-500");
    aboutBtn.classList.remove("text-green-500");

    // Apply the active color to the clicked button
    aboutBtn.classList.add("text-green-500");
  });

  myScheduleBtn.addEventListener("click", function () {
    if (scheduleContainer.hasChildNodes()) {
      scheduleContainer.classList.toggle("hidden");

      // Reset all buttons to default colors
      homeBtn.classList.remove("text-green-500");
      aboutBtn.classList.remove("text-green-500");

      // Apply the active color to the clicked button
      myScheduleBtn.classList.add("text-green-500");
    } else {
      noScheduleAlert.classList.remove("opacity-0");

      setTimeout(function () {
        myScheduleBtn.classList.remove("text-green-500");
        noScheduleAlert.classList.add("opacity-0");
      }, 2000);
    }
  });

  myScheduleBtnSide.addEventListener("click", function () {
    if (scheduleContainer.hasChildNodes()) {
      if (window.innerWidth <= 425) {
        hero.classList.toggle("hidden");
      }
      scheduleContainer.classList.toggle("hidden");
    } else {
      noScheduleAlert.classList.remove("opacity-0");

      setTimeout(function () {
        noScheduleAlert.classList.add("opacity-0");
      }, 2000);
    }
  });

  closeScheduleBtn.addEventListener("click", function () {
    if (window.innerWidth <= 425) {
      hero.classList.remove("hidden");
    }
    if (scheduleContainer.classList.contains("hidden")) {
      scheduleContainer.innerHTML = "";
      scheduleBtn.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
      closeScheduleBtn.classList.add("hidden");
      myScheduleBtn.classList.toggle("text-green-500");
    } else {
      scheduleContainer.classList.toggle("hidden");
      myScheduleBtn.classList.toggle("text-green-500");

      scheduleContainer.innerHTML = "";
      scheduleBtn.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
      closeScheduleBtn.classList.add("hidden");
    }
  });

  checkFormBtn.addEventListener("click", function () {
    // Check if the input is empty
    if (inputForm.value === "") {
      inputForm.placeholder = "Enter time here!";
      inputForm.classList.remove("outline-none");
      inputForm.classList.add("outline", "outline-red-500");
      inputForm.focus();
    } else {
      // Reset any error styles when valid input is detected
      inputForm.classList.remove("outline", "outline-red-500");
      inputForm.classList.add("outline-none");

      // Responsive check for small screens
      if (window.innerWidth <= 425) {
        hero.classList.add("hidden");
      }

      // Sanitize the user input
      let inputMessage = sanitizeInput(inputForm.value);

      // Call a time validation function here before passing to checkTimeAfter
      if (validateTimeInput(inputMessage)) {
        checkForm.classList.toggle("hidden");
        dark.classList.toggle("hidden");
        checkTimeAfter(inputMessage);

        // Clear input field
        inputForm.value = "";

        // Toggle visibility of elements
        scheduleContainer.classList.toggle("hidden");
        scheduleBtn.classList.add("hidden");
        nextBtn.classList.add("hidden");
        closeScheduleBtn.classList.remove("hidden");
      } else {
        // Handle invalid time input (e.g., show an alert or error message)
        alert("Please enter a valid time in the format of '2:30 pm'!");
      }
    }
  });
})();
