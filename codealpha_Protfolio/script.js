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
    title: "Modern Calculator",
    description: "It is a fully functional basic calculator",
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
