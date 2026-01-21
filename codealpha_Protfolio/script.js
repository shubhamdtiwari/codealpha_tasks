"use strict";
// Toggle hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Portfolio dropdown functionality
const dropdown = document.getElementById("project-dropdown");
const details = document.getElementById("project-details");

const projectData = {
  project1: {
    title: "E-commerce Site",
    description:
      "A fully responsive e-commerce platform built with React and Node.js. Features include user authentication, payment integration, and product management.",
    link: "https://example.com/project1",
  },
  project2: {
    title: "Blog Platform",
    description:
      "A custom blog CMS using PHP and MySQL. Includes user roles, commenting system, and SEO optimization.",
    link: "https://example.com/project2",
  },
  project3: {
    title: "Mobile App",
    description:
      "A cross-platform mobile app developed with Flutter. Available on iOS and Android, with real-time data syncing.",
    link: "https://example.com/project3",
  },
};

dropdown.addEventListener("change", (e) => {
  const selected = e.target.value;
  if (selected && projectData[selected]) {
    const { title, description, link } = projectData[selected];
    details.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${link}" target="_blank">View Project</a>
        `;
  } else {
    details.innerHTML =
      "<p>Select a project from the dropdown to view details.</p>";
  }
});
// Parallax effect for welcome section
window.addEventListener("scroll", () => {
  const welcome = document.getElementById("welcome");
  const scrolled = window.pageYOffset;
  welcome.style.transform = `translateY(${scrolled * 0.5}px)`;
});
