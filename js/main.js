document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const repoName = "";

  const currentLang = currentPath.includes('/pt/') ? 'pt' : 'en';

  document.getElementById('link-privacy').href = `${repoName}/privacy-policy/${currentLang}/`;
  document.getElementById('link-terms').href = `${repoName}/terms-of-service/${currentLang}/`;

  if (currentPath.includes('privacy-policy')) {
    document.getElementById('link-privacy').classList.add('active');
  } else {
    document.getElementById('link-terms').classList.add('active');
  }

  // traduções (JSON)
  fetch(`${repoName}/locales/${currentLang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) el.innerText = data[key];
      });
    })
    .catch(err => console.log("Erro ao carregar idioma:", err));

  // seletor de idiomas
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');

  langBtn.innerHTML = `🌐 ${currentLang.toUpperCase()}`;

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    langMenu.classList.remove('show');
  });
});

function switchLang(newLang) {
  let path = window.location.pathname;
  // Troca o /pt/ ou /en/ da URL pelo novo idioma selecionado
  path = path.replace(/\/(pt|en)\//, `/${newLang}/`);
  window.location.href = path;
}