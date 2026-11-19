document.addEventListener("DOMContentLoaded", function () {
  // Display the current year automatically in the footer.
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Rotate through role descriptions in the hero section.
  const roleElement = document.getElementById("typedRole");
  const roles = ["Game Developer", "Web Developer", "Creative Programmer"];
  let roleIndex = 0;

  if (roleElement) {
    window.setInterval(function () {
      roleIndex = (roleIndex + 1) % roles.length;
      roleElement.textContent = roles[roleIndex];
    }, 2500);
  }

  // Filter project cards using their data-category attribute.
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedFilter = button.getAttribute("data-filter");

      // Update the active style on the selected filter button.
      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });
      button.classList.add("active");

      // Show all projects or only projects in the selected category.
      projectItems.forEach(function (project) {
        const category = project.getAttribute("data-category");
        const shouldShow = selectedFilter === "all" || category === selectedFilter;
        project.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  // Close the mobile navigation after a navigation link is selected.
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarMenu = document.getElementById("navbarContent");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarMenu && navbarMenu.classList.contains("show")) {
        const collapse = bootstrap.Collapse.getOrCreateInstance(navbarMenu);
        collapse.hide();
      }
    });
  });

  // Reveal sections and cards as they enter the viewport.
  const revealTargets = document.querySelectorAll(
    ".section-heading, .about-card, .philosophy-main, .principle-card, .project-card, .contact-panel"
  );

  revealTargets.forEach(function (element) {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for browsers that do not support IntersectionObserver.
    revealTargets.forEach(function (element) {
      element.classList.add("visible");
    });
  }
});
