// === DOM Elements ===
const searchIcon = document.getElementById("search-icon");
const searchOverlay = document.getElementById("search-overlay");
const searchBtn = document.getElementById("search-btn");
const pageOverlay = document.getElementById("page-overlay");

const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart-btn");

// === Search Toggle ===
searchIcon.addEventListener("click", () => {
  searchOverlay.style.display = "flex";
  pageOverlay.classList.add("active"); // Blur background
});

pageOverlay.addEventListener("click", () => {
  searchOverlay.style.display = "none";
  pageOverlay.classList.remove("active"); // Remove blur
});

searchBtn.addEventListener("click", function () {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    // Pass the search query to another file (search.html)
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  }
});


// === Cart Toggle ===
cartIcon.addEventListener("click", () => {
  if (cartSidebar.style.right === "0px") {
    cartSidebar.style.right = "-350px";
  } else {
    cartSidebar.style.right = "0px";
  }
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.style.right = "-350px";
});

// === Hamburger Menu ===
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// === Dropdowns for Mobile ===
const dropdowns = document.querySelectorAll(".dropdown > a");
dropdowns.forEach(link => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.parentElement.classList.toggle("open");
    }
  });
});

const subDropdowns = document.querySelectorAll(".sub-dropdown > a");
subDropdowns.forEach(link => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.parentElement.classList.toggle("open");
    }
  });
});

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active-dot");
  });
  slides[index].classList.add("active");
  dots[index].classList.add("active-dot");
  currentSlide = index;
}

// Optional: Auto slide every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

let currentExploreSlide = 0;

function moveExploreSlide(index) {
  const track = document.querySelector(".explore-slider-track");
  const dots = document.querySelectorAll(".explore-dots .dot");

  const slideWidth = track.offsetWidth / 3; // shows 3 at a time
  currentExploreSlide = index;

  track.style.transform = `translateX(-${slideWidth * index}px)`;

  // update dots
  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[index].classList.add("active-dot");
}
