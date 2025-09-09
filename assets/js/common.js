
const images = [
      './images/Side-Mascot-1.png',
      './images/Side-Mascot-2.png',
      // './images/Side-Mascot-3.png',
      './images/Side-Mascot-1.png',
    ];

    let currentIndex = 0;
    const slider = document.getElementById('slider');

    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      slider.src = images[currentIndex];
    }, 800); // Change image every 1000ms (1 second)


    
//heading animation
class TextAnimator {
    constructor(selector, options) {
        this.text = document.querySelector(selector);
        this.strText = this.text.textContent.trim();
        this.splitText = this.strText.split("");
        this.text.textContent = "";
        this.options = options || {};
        this.margin = this.options.margin || '0px';
        this.delay = this.options.delay || 0;
        this.class = this.options.class || 'text-span';
    }

    animate() {
        for (let i = 0; i < this.splitText.length; i++) {
            if (this.splitText[i] === " ") {
                this.text.innerHTML += "&nbsp;";
            } else {
                this.text.innerHTML += "<span class='"+ this.class + "' style='margin-right:" + this.margin + ";animation-delay:" + (i * this.delay) + "ms;'><span class='fade-in-text' style='animation-delay:" + (i * this.delay) + "ms;'>" + this.splitText[i] + "</span></span>";
            }
        }
    }
}

const animator = new TextAnimator('.text-blob', {
    delay: 100,
    class: "text-blob__letter"
});
const animaorspan = new TextAnimator ('.text-block',{
  delay: 100,
  class: "text-blob__letter"
})
animator.animate();
animaorspan.animate();



// AnimateOnScroll - For general elements
const AnimateOnScroll = function ({ offset } = { offset: 10 }) {
  let elements = [];
  
  const windowTop = (offset * window.innerHeight) / 100;
  const windowBottom = window.innerHeight - windowTop;
  const windowLeft = 0;
  const windowRight = window.innerWidth;

  this.start = (element) => {
    window.requestAnimationFrame(() => {
      element.style.animationDelay = element.dataset.animationDelay || '';
      element.style.animationDuration = element.dataset.animationDuration || '';
      element.classList.add(element.dataset.animation);
      element.dataset.animated = "true";
    });
  };

  this.inViewport = (element) => {
    const elementRect = element.getBoundingClientRect();
    const elementTop =
      elementRect.top + parseInt(element.dataset.animationOffset || 0) ||
      elementRect.top;
    const elementBottom =
      elementRect.bottom - parseInt(element.dataset.animationOffset || 0) ||
      elementRect.bottom;
    const elementLeft = elementRect.left;
    const elementRight = elementRect.right;
    return (
      elementTop <= windowBottom &&
      elementBottom >= windowTop &&
      elementLeft <= windowRight &&
      elementRight >= windowLeft
    );
  };

  this.verifyElementsInViewport = (els = elements) => {
    for (let i = 0, len = els.length; i < len; i++) {
      if (els[i].dataset.animated) continue;

      this.inViewport(els[i]) && this.start(els[i]);
    }
  };

  this.getElements = () =>
    document.querySelectorAll("[data-animation]:not([data-animated])");

  this.update = () => {
    elements = this.getElements();
    elements && this.verifyElementsInViewport(elements);
  };

  window.addEventListener("load", this.update, false);
  window.addEventListener(
    "scroll",
    () => this.verifyElementsInViewport(elements),
    { passive: true }
  );
};

const options = {
  offset: 15 // percentage of the window
};
const animation = new AnimateOnScroll(options);

// header scroll effect
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const scrollThreshold = 100; // Adjust this value as needed
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
});

document.querySelectorAll('.accordion-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('.accordion-icon i');
        
        // Toggle active class on button
        button.classList.toggle('active');
        
        // Toggle content visibility
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.classList.remove('fa-angle-up');
            icon.classList.add('fa-angle-down');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.remove('fa-angle-down');
            icon.classList.add('fa-angle-up');
        }
        
        // Close other open accordion items
        document.querySelectorAll('.accordion-toggle').forEach(otherButton => {
            if (otherButton !== button) {
                const otherContent = otherButton.nextElementSibling;
                const otherIcon = otherButton.querySelector('.accordion-icon i');
                
                otherContent.style.maxHeight = null;
                otherIcon.classList.remove('fa-angle-up');
                otherIcon.classList.add('fa-angle-down');
            }
        });
    });
});





