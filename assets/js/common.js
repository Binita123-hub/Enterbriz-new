

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


// //Multi-line Input 
// let input = document.getElementById("input");
// let output = document.getElementById("output");

// function renderList(){
//   let newList = "";
  
//   var lines = input.value.split('\n');
//   for(var i = 0;i < lines.length;i++){
//     newList += `${lines[i]} `;
//   }
//   //newList += "</ul>";
//   console.log(newList);
//   output.textContent = newList; // set text
//   output.textContent.replace(/(\r\n|\n|\r)/gm, ""); // remove \n (may work)
//   output.style.height = (30 * 10) + "px"; // set output height accordingly
  
// }

// output.addEventListener("click", () => {
//   console.log(output.value);
//   navigator.clipboard.writeText(output.value);
// });





