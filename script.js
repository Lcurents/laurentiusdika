const dynamicText = document.querySelector('.teksdiam span');
const words = ['Web Developer', 'Mobile Developer', 'Illustrator'];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  dynamicText.textContent = currentChar;
  dynamicText.classList.add('stop-blinking');
  if (!isDeleting && charIndex < currentWord.length) {
    // If condition is true, type the next character
    charIndex++;
    setTimeout(typeEffect, 200);
  } else if (isDeleting && charIndex > 0) {
    // If condition is true, remove the previous character
    charIndex--;
    setTimeout(typeEffect, 100);
  } else {
    // If word is deleted then switch to the next word
    isDeleting = !isDeleting;
    dynamicText.classList.remove('stop-blinking');
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeEffect, 1200);
  }
};
typeEffect();

function tambahkanBreak() {
  const h3Elem = document.querySelector('.teksdiam');
  const spanElem = h3Elem.querySelector('span');

  if (window.innerWidth <= 991.98) {
    const brElem = document.createElement('br');
    h3Elem.insertBefore(brElem, spanElem);
  }
}

// Panggil fungsi setelah halaman dimuat
window.onload = tambahkanBreak;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hiddenleft');
hiddenElements.forEach((el) => observer.observe(el));

const hiddenElementscenter = document.querySelectorAll('.hiddencenter');
hiddenElementscenter.forEach((el) => observer.observe(el));
