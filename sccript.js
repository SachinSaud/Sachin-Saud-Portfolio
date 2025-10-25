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

// Project Carousel Functionality
class ProjectCarousel {
  constructor() {
    this.currentIndex = 0;
    this.cards = document.querySelectorAll('.project-card');
    this.dots = document.querySelectorAll('.dot');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.totalCards = this.cards.length;
    this.container = document.querySelector('.project-carousel');

    this.pointer = { isDown: false, startX: 0 };

    // guard to prevent double navigation while animation is running
    this.isAnimating = false;
    this.animationDuration = 520; // ms (match CSS transition)

    this.init();
  }

  init() {
    this.updateCarousel();
    this.bindEvents();
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Wheel to navigate
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY > 0) this.nextSlide(); else this.prevSlide();
    }, { passive: false });

    // Pointer drag (mouse / touch)
    this.container.addEventListener('pointerdown', (e) => {
      this.pointer.isDown = true;
      this.pointer.startX = e.clientX;
      this.container.setPointerCapture(e.pointerId);
    });

    this.container.addEventListener('pointermove', (e) => {
      if (!this.pointer.isDown) return;
      const dx = e.clientX - this.pointer.startX;
      // simple threshold for swipe
      if (dx > 60) { this.prevSlide(); this.pointer.isDown = false; }
      if (dx < -60) { this.nextSlide(); this.pointer.isDown = false; }
    });

    window.addEventListener('pointerup', (e) => {
      this.pointer.isDown = false;
    });

    // Click on side cards: clicking prev/next card navigates accordingly
    this.cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (this.isAnimating) return;
        if (card.classList.contains('prev')) {
          this.prevSlide();
        } else if (card.classList.contains('next')) {
          this.nextSlide();
        } else {
          // clicked active card - optionally open details or ignore
          // e.g. console.log('active card clicked');
        }
      });
    });
  }

  updateCarousel() {
    this.cards.forEach((card, index) => {
      card.classList.remove('active', 'prev', 'next');
      
      if (index === this.currentIndex) {
        card.classList.add('active');
      } else if (index === (this.currentIndex - 1 + this.totalCards) % this.totalCards) {
        card.classList.add('prev');
      } else if (index === (this.currentIndex + 1) % this.totalCards) {
        card.classList.add('next');
      }
    });

    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  nextSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateCarousel();
    setTimeout(() => { this.isAnimating = false; }, this.animationDuration);
  }

  prevSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    this.updateCarousel();
    setTimeout(() => { this.isAnimating = false; }, this.animationDuration);
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    this.isAnimating = true;
    this.currentIndex = index;
    this.updateCarousel();
    setTimeout(() => { this.isAnimating = false; }, this.animationDuration);
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProjectCarousel();
});
