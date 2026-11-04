document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('current-year');
  const printButton = document.querySelector('[data-action="print-resume"]');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (printButton) {
    printButton.addEventListener('click', () => window.print());
  }
});