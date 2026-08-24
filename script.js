document.addEventListener('DOMContentLoaded', () => {
  const dock = document.getElementById('desktopDock');
  const folderBtn = document.getElementById('folderBtn');
  const pdfBtn = document.getElementById('pdfBtn');
  const highlight = document.getElementById('dockHighlight');
  const dockItems = document.querySelectorAll('.dock-item');

  function updateHighlight(targetEl) {
    if (!targetEl || !dock || !highlight) return;
    const dockRect = dock.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    if (targetRect.width === 0 || targetRect.height === 0) return;

    const left = targetRect.left - dockRect.left;
    const top = targetRect.top - dockRect.top;
    const width = targetRect.width;
    const height = targetRect.height;

    highlight.style.left = `${left}px`;
    highlight.style.top = `${top}px`;
    highlight.style.width = `${width}px`;
    highlight.style.height = `${height}px`;
    highlight.classList.add('is-active');
  }

  function hideHighlight() {
    if (highlight) {
      highlight.classList.remove('is-active');
    }
  }

  dockItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      if (item.classList.contains('pdf-item') && !dock.classList.contains('is-open')) return;
      updateHighlight(item);
    });
  });

  dock.addEventListener('mouseleave', () => {
    hideHighlight();
  });

  if (folderBtn && dock) {
    folderBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dock.classList.toggle('is-open');
      if (isOpen && pdfBtn) {
        // Keep highlight on folder or move to pdf on hover
        updateHighlight(folderBtn);
      } else {
        updateHighlight(folderBtn);
      }
    });
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (dock && !dock.contains(e.target)) {
      dock.classList.remove('is-open');
      hideHighlight();
    }
  });

  // Open / Print CV PDF on click
  if (pdfBtn) {
    pdfBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.print();
    });
  }
});
