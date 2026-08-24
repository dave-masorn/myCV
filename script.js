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

  // Live GitHub Commit Timestamp Formatter & Updater
  function formatCommitDate(dateObj) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = months[dateObj.getMonth()];
    const year = String(dateObj.getFullYear()).slice(-2);
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year}; ${hours}:${minutes}:${seconds}`;
  }

  async function updateCommitTimestamp() {
    const updateEl = document.getElementById('lastUpdateTime');
    if (!updateEl) return;

    // Use cached timestamp if present
    const cached = localStorage.getItem('cv_last_commit_timestamp');
    if (cached) {
      updateEl.textContent = cached;
    }

    try {
      const res = await fetch('https://api.github.com/repos/dave-masorn/myCV/commits?per_page=1', {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      if (res.ok) {
        const commits = await res.json();
        if (commits && commits.length > 0 && commits[0].commit && commits[0].commit.committer) {
          const date = new Date(commits[0].commit.committer.date);
          const formatted = formatCommitDate(date);
          updateEl.textContent = formatted;
          localStorage.setItem('cv_last_commit_timestamp', formatted);
        }
      }
    } catch (err) {
      console.warn('Could not fetch latest commit timestamp:', err);
    }
  }

  updateCommitTimestamp();
});
