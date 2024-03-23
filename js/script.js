"use strict";
const getStartedBtns = document.querySelectorAll(".getStarted-btn");
const burgerCheckbox = document.querySelector(".burger-menu__checkbox");
const burgerDropDown = document.querySelector(".nav-container"); //also the nav links on winder screens
const boostSection = document.querySelector(".boost-section");
const footer = document.querySelector(".footer");
const shortenBtn = document.querySelector(".link-shortener__btn");
const shortenInput = document.querySelector(".link-shortener__input");
const statisticsSection = document.querySelector(".statistics-section");
const mainTag = document.querySelector("main");
const bodyTag = document.querySelector("body");
const navbarTag = document.querySelector(".navbar");
const burgerLine1 = document.querySelector(".line--1");
const burgerLine2 = document.querySelector(".line--2");
const burgerLine3 = document.querySelector(".line--3");
const loginBtn = document.querySelector(".authentication__login-btn");
const signInModal = document.querySelector(".sign-in");
const signInModalCloseBtn = document.querySelector(".sign-in__close");
const signUpBtn = document.querySelector(".authentication__sign-btn");
const signUpModal = document.querySelector(".sign-up");
const signUpModalCloseBtn = document.querySelector(".sign-up__close");
const signUpRedirect = document.querySelector(".signUp-Redirect");
const signInRedirect = document.querySelector(".signIn-Redirect");

const API_KEY = "jXIHg7UYINL5sC3nUZauNbnXYARkGFFyZ3FqP2Kap1yzP"; // Replace 'YOUR_API_KEY' with your actual API key
const scrollToShortenInput = () => {
  console.log("triggered");
  shortenInput.scrollIntoView({
    scroll: "smooth",
    block: "center",
  });
};
getStartedBtns.forEach((element) => {
  element.addEventListener("click", scrollToShortenInput);
});
// Function to fetch the short link and inject HTML to show it
const shortenApi = async function () {
  const errorSpanElement = document.querySelector(".error-span");
  try {
    let response = await axios.post(
      "https://shrtlnk.dev/api/v2/link",
      { url: shortenInput.value },
      {
        headers: {
          "api-key": API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    let shorten = response.data;
    let result = shorten.shrtlnk;

    // removing error styles if the previous try was invalid
    if (errorSpanElement) {
      shortenInput.setCustomValidity("");
      errorSpanElement.remove();
    }

    let div = document.createElement("div");
    div.setAttribute("class", "link-results");
    div.innerHTML = `
       <div class="link-results__wrapper">
       <p class="link-results__original">${shorten.url}</p>
       <div class="link-results__short">
       <p>${result}</p>
       <button class='link-results__btn'>Copy</button>
       </div>
       </div>`;
    statisticsSection.prepend(div);
  } catch (err) {
    if (!errorSpanElement) {
      shortenInput.setCustomValidity("Invalid field.");
      let errorSpan = document.createElement("span");
      errorSpan.setAttribute("class", "error-span");
      errorSpan.innerHTML = "Please add a valid link";
      shortenInput.after(errorSpan);
    }
  }
};

shortenBtn.addEventListener("click", shortenApi);

//Event propagation on statistics-section, copying the short link
let copiedLinkButton = null; // Variable to keep track of the currently copied link button
statisticsSection.addEventListener("pointerdown", function (e) {
  if (e.target.classList.contains("link-results__btn")) {
    (async () => {
      try {
        const copyContent = e.target.previousElementSibling.textContent;
        await navigator.clipboard.writeText(copyContent);

        // Revert state of previously copied link button, if any
        if (copiedLinkButton) {
          copiedLinkButton.textContent = "Copy";
          copiedLinkButton.style.backgroundColor = ""; // Revert to initial state
        }

        // Mark the current link button as copied
        copiedLinkButton = e.target;
        copiedLinkButton.textContent = "Copied!";
        copiedLinkButton.style.backgroundColor = `hsl(257, 27%, 26%)`;
      } catch (err) {
        alert(err);
      }
    })();
  }
});

// Function to open the navigation menu
function openNavigationMenu() {
  mainTag.style.filter = "blur(0.5rem)";
  burgerDropDown.style.animation = "menuOpen .3s";
  burgerLine1.style.transform = "translateY(12px) rotate(135deg)";
  burgerLine2.style.transform = "scale(0)";
  burgerLine3.style.transform = "translateY(-12px) rotate(-135deg)";
  burgerDropDown.classList.remove("hidden");
}

// Function to close the navigation menu
function closeNavigationMenu() {
  burgerDropDown.style.animation = "menuClose .3s";
  burgerLine1.style.removeProperty("transform");
  burgerLine2.style.removeProperty("transform");
  burgerLine3.style.removeProperty("transform");
  burgerCheckbox.checked = false;
  mainTag.style.filter = "none";
  setTimeout(() => {
    burgerDropDown.classList.add("hidden");
  }, 300);
}

// Event listener for clicks on the document
document.addEventListener("click", function (e) {
  // If the burger menu checkbox is clicked and it's checked
  if (e.target.matches(".burger-menu__checkbox") && burgerCheckbox.checked) {
    openNavigationMenu();
  }
  // If the burger menu checkbox is clicked and it's unchecked, or if a click occurs outside the navigation container while the menu is open
  else if (
    (e.target.matches(".burger-menu__checkbox") && !burgerCheckbox.checked) ||
    (!e.target.closest(".nav-container") && burgerCheckbox.checked)
  ) {
    closeNavigationMenu();
  }
});

//navigation on different sizes
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    // If the window width is 1024px or more, show the menu and reset styles
    burgerDropDown.classList.remove("hidden");
    burgerCheckbox.checked = false;
    mainTag.style.filter = "none";
    burgerDropDown.style.animation = "none";
  } else if (
    window.innerWidth < 1200 &&
    !burgerCheckbox.checked &&
    !burgerDropDown.classList.contains("hidden")
  ) {
    // If the window width is less than 1024px and the menu is open, keep it open
    burgerCheckbox.checked = true;
  }
});

//navigation style on 1200 load
window.addEventListener("load", () => {
  if (window.innerWidth >= 1024) {
    burgerDropDown.classList.remove("hidden");
  }
});

// Define observed elements with their corresponding target and modifier classes
const observedElements = [
  {
    target: document.querySelector(".link-shortener"),
    modifierClass: "link-shortener--int",
  },
  {
    target: document.querySelector(".intro"),
    modifierClass: "intro--int",
  },
  {
    target: document.querySelector(".wrapper--recognition"),
    modifierClass: "wrapper--recognition--int",
  },
  {
    target: document.querySelector(".wrapper--records"),
    modifierClass: "wrapper--records--int",
  },
  {
    target: document.querySelector(".wrapper--customizable"),
    modifierClass: "wrapper--customizable--int",
  },
  {
    target: document.querySelector(".boost-section"),
    modifierClass: "boost-section--int",
  },
  {
    target: document.querySelector(".footer"),
    modifierClass: "footer--int",
  },
];

// Callback function for Intersection Observer
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    const { target, isIntersecting } = entry;
    const { modifierClass } = observedElements.find(
      (element) => element.target === target
    );

    if (isIntersecting) {
      target.classList.add(modifierClass);
      // Remove observer once the target is observed
      observer.unobserve(target);
    }
  });
};

// Create Intersection Observer instance
const observer = new IntersectionObserver(observerCallback, {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
});

// Observe each element
observedElements.forEach(({ target }) => {
  observer.observe(target);
});

// Function to open modal
function openModal(modal) {
  bodyTag.style.overflowY = "hidden";
  mainTag.style.filter = "blur(0.5rem)";
  navbarTag.style.filter = "blur(0.5rem)";
  modal.classList.add("visible");
}

// Function to close modal
function closeModal(modal) {
  bodyTag.style.overflowY = "";
  mainTag.style.filter = "";
  navbarTag.style.filter = "";
  modal.classList.remove("visible");
}

// Open sign-in modal
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  openModal(signInModal);
});

// Close sign-in modal
signInModalCloseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  closeModal(signInModal);
});

// Close sign-in modal on clicks outside the modal
document.addEventListener("click", function (e) {
  if (
    !e.target.closest(".sign-in") &&
    signInModal.classList.contains("visible")
  ) {
    closeModal(signInModal);
  }
});

// Open sign-up modal
signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  openModal(signUpModal);
});

// Close sign-up modal
signUpModalCloseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  closeModal(signUpModal);
});

// Close sign-up modal on clicks outside the modal
document.addEventListener("click", function (e) {
  if (
    !e.target.closest(".sign-up") &&
    signUpModal.classList.contains("visible")
  ) {
    closeModal(signUpModal);
  }
});

// Redirect from sign up to sign in
signInRedirect.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  closeModal(signUpModal);
  openModal(signInModal);
});

// Redirect from sign in to sign up
signUpRedirect.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  closeModal(signInModal);
  openModal(signUpModal);
});
