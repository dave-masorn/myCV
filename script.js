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

  // PDF Modal Elements & Handlers
  const pdfModal = document.getElementById('pdfModal');
  const closePdfModal = document.getElementById('closePdfModal');

  function openPdfModal() {
    if (pdfModal) {
      pdfModal.classList.add('is-visible');
      pdfModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closePdfModalFn() {
    if (pdfModal) {
      pdfModal.classList.remove('is-visible');
      pdfModal.setAttribute('aria-hidden', 'true');
    }
  }

  // Open PDF Modal on PDF item click
  if (pdfBtn) {
    pdfBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPdfModal();
    });
  }

  // Close PDF Modal on close button click
  if (closePdfModal) {
    closePdfModal.addEventListener('click', (e) => {
      e.stopPropagation();
      closePdfModalFn();
    });
  }

  // Close PDF Modal on clicking backdrop
  if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) {
        closePdfModalFn();
      }
    });
  }

  // Download PDF Button Handler
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Ensure smooth download without page navigation or print trigger
      const link = document.createElement('a');
      link.href = 'assets/AS_CV_2025-FEB.pdf';
      link.download = 'AS_CV_2025-FEB.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      e.preventDefault();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal && pdfModal.classList.contains('is-visible')) {
      closePdfModalFn();
    }
  });
});
