document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-button');
  const pages = document.querySelectorAll('.page');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show the relevant page with e-ink refresh effect
      const targetId = button.getAttribute('data-target');
      pages.forEach(page => {
        if (page.id === targetId) {
          page.classList.add('refresh-effect');
          setTimeout(() => {
            page.classList.remove('refresh-effect');
            pages.forEach(p => p.classList.remove('active'));
            page.classList.add('active');
          }, 300); // Duration of the refresh effect
        }
      });
    });
  });
});
