document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('test-btn');
  const badge = document.getElementById('status-badge');

  console.log('Gulp JS-сценарій успішно завантажено!');

  if (button && badge) {
    button.addEventListener('click', () => {
      badge.textContent = 'Успішно!';
      badge.classList.add('active');
      alert('JS та події працюють! Збірка Gulp налаштована вірно.');
    });
  }
});