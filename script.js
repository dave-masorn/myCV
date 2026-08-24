document.addEventListener('DOMContentLoaded', () => {
  const dock = document.getElementById('desktopDock');
  const folderBtn = document.getElementById('folderBtn');
  const pdfBtn = document.getElementById('pdfBtn');

  if (folderBtn && dock) {
    folderBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dock.classList.toggle('is-open');
    });
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (dock && !dock.contains(e.target)) {
      dock.classList.remove('is-open');
    }
  });

  // Prevent closing when clicking PDF button
  if (pdfBtn) {
    pdfBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.print();
    });
  }
});
