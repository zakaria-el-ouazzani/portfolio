// Home

const menuToggle = document.getElementById("menuBtn");
const navLinks = document.getElementById("menu");
const navLinkItems = document.querySelectorAll(".link");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  const icon = menuToggle.querySelector("i");

  if (navLinks.classList.contains("show")) {
    icon.className = "fa-solid fa-xmark";
  } else {
    icon.className = "fa-solid fa-bars";
  }
});

navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.querySelector("i").className = "fa-solid fa-bars";
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    navLinks.classList.remove("show");
    menuToggle.querySelector("i").className = "fa-solid fa-bars";
  }
});


// All

const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinkItems.forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.45
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


// All

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// Contact

const contactForm = document.getElementById("myForm");
const formMessage = document.getElementById("formText");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("nameBox").value.trim();
  const email = document.getElementById("emailBox").value.trim();
  const message = document.getElementById("msgBox").value.trim();

  if (name === "" || email === "" || message === "") {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  showMessage("Message sent successfully! This is a demo form.", "success");
  contactForm.reset();
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = type;
}