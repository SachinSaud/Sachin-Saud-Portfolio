// Minimal JS: navigation smooth scroll + contact form demo
document.querySelectorAll('.main-nav a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thanks! Form submit simulated — hook this to your API or email service.');
  form.reset();
});
