document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.navbar-toggler').forEach((toggler) => {
    const targetSelector = toggler.getAttribute('data-target');
    const target = targetSelector ? document.querySelector(targetSelector) : null;
    if (!target) return;

    toggler.addEventListener('click', () => {
      const isExpanded = target.classList.toggle('show');
      toggler.setAttribute('aria-expanded', String(isExpanded));
    });
  });
});
