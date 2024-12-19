document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove 'active' class from all nav links
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // Hide all sections and show the selected section
            const targetSection = document.querySelector(link.getAttribute('href'));
            sections.forEach(section => section.classList.remove('active'));
            targetSection.classList.add('active');
        });
    });
});
