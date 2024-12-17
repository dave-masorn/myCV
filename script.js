document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      // Remove active class from all links
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');

      // Show the relevant page
      const targetId = link.getAttribute('href').substring(1);
      pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === targetId) {
          page.classList.add('active');
        }
      });
    });
  });
});
