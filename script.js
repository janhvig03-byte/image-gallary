// Simple click-to-enlarge feature
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      overlay.remove();
    });
  });
});

// Add overlay styling dynamically
const style = document.createElement('style');
style.innerHTML = `
  .overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex; align-items: center; justify-content: center;
  }
  .overlay img {
    max-width: 90%; max-height: 90%;
    border-radius: 10px;
  }
`;
document.head.appendChild(style);
const images = document.querySelectorAll('.gallery img');
let currentIndex = 0;

function openOverlay(index) {
  currentIndex = index;
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.innerHTML = `
    <button class="nav-btn left">&#10094;</button>
    <img src="${images[index].src}" alt="${images[index].alt}">
    <button class="nav-btn right">&#10095;</button>
  `;
  document.body.appendChild(overlay);

  // Close overlay when background clicked
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });

  // Navigation buttons
  overlay.querySelector('.left').addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    overlay.querySelector('img').src = images[currentIndex].src;
  });

  overlay.querySelector('.right').addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    overlay.querySelector('img').src = images[currentIndex].src;
  });
}

// Attach click events to gallery images
images.forEach((img, i) => {
  img.addEventListener('click', () => openOverlay(i));
});
