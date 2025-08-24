


document.addEventListener("DOMContentLoaded", () => {
  // === CART ===
  const cartIcon = document.getElementById("cart-icon");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const subtotalElem = document.getElementById("subtotal");
  const cartItemsContainer = document.createElement("div");
  cartItemsContainer.classList.add("cart-items");
  cartSidebar.insertBefore(cartItemsContainer, cartSidebar.querySelector(".cart-content"));

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartUI();

  // Toggle cart
  cartIcon.addEventListener("click", () => {
    cartSidebar.classList.toggle("active");
    document.getElementById("content-wrapper").classList.toggle("blur");
  });

  closeCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    document.getElementById("content-wrapper").classList.remove("blur");
  });

  // Add to Cart
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price),
        link: button.dataset.link,
        image: button.dataset.image,
        quantity: 1
      };

      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push(product);
      }

      saveCart();
      updateCartUI();
    });
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-details">
        <h4><a href="${item.link}">${item.name}</a></h4>
        <p class="cart-item-price">Rs. ${(item.price * item.quantity).toLocaleString()}</p>
        <div class="cart-actions">
          <button class="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="increase">+</button>
          <button class="remove">×</button>
        </div>
      </div>
    `;

    // decrease quantity
    cartItem.querySelector(".decrease").addEventListener("click", () => {
      if (item.quantity > 1) item.quantity--;
      else cart.splice(index, 1);
      saveCart();
      updateCartUI();
    });

    // increase quantity
    cartItem.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      saveCart();
      updateCartUI();
    });

    // remove item
    cartItem.querySelector(".remove").addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart();
      updateCartUI();
    });

    cartItemsContainer.appendChild(cartItem);
  });

  subtotalElem.textContent = `Rs. ${subtotal.toLocaleString()}`;
}

    // === SEARCH ===
  const searchIcon = document.getElementById("search-icon");
  const searchOverlay = document.getElementById("search-overlay");
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");
  const contentWrapper = document.getElementById("content-wrapper");

  // Toggle search overlay when clicking icon
  searchIcon.addEventListener("click", () => {
    if (searchOverlay.style.display === "none" || searchOverlay.style.display === "") {
      searchOverlay.style.display = "flex";
      if (contentWrapper) contentWrapper.style.filter = "blur(5px)";
    } else {
      searchOverlay.style.display = "none";
      if (contentWrapper) contentWrapper.style.filter = "none";
    }
  });

  // Search button action
  searchBtn.addEventListener("click", () => {
    let query = searchInput.value.trim().toLowerCase();
    if (!query) {
      alert("Please enter something to search.");
      return;
    }

    const searchPages = {
      "bed": "bed.html",
      "beds": "bed.html",
      "headboard": "headboards.html",
      "dresser": "dressers.html",
      "sofa": "sofas.html",
      "table": "coffee-tables.html",
      "lamp": "lamps.html"
    };

    for (const key in searchPages) {
      if (query.includes(key)) {
        window.location.href = searchPages[key];
        return;
      }
    }

    alert("No results found for: " + query);
  });

  // ✅ Close search overlay when clicking background
  searchOverlay.addEventListener("click", (e) => {
  if (e.target === searchOverlay) {  // only when background is clicked
    searchOverlay.style.display = "none";
    if (contentWrapper) contentWrapper.style.filter = "none";
  }
});






  // === HAMBURGER MENU TOGGLE ===
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  
  
  // Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navMenu.classList.contains("show") && // menu is open
    !navMenu.contains(e.target) &&        // click is NOT inside menu
    !hamburger.contains(e.target)         // click is NOT on hamburger
  ) {
    navMenu.classList.remove("show");
  }
});
}




  // === MOBILE DROPDOWN TOGGLE (accordion style) ===
const dropdowns = document.querySelectorAll(".dropdown > a");
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parentLi = dropdown.parentElement;

      // close all other dropdowns
      document.querySelectorAll(".nav-menu li.open").forEach((openLi) => {
        if (openLi !== parentLi) {
          openLi.classList.remove("open");
        }
      });

      // toggle clicked one
      parentLi.classList.toggle("open");
    }
  });
});
});


// === HERO SLIDER ===
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let slideInterval = null;

function showSlide(index) {
  // wrap around
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  currentSlide = index;

  // remove active from all
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active-dot"));

  // add active to current
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active-dot");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function startSlider() {
  slideInterval = setInterval(nextSlide, 3000); // change every 3 sec
}

function stopSlider() {
  clearInterval(slideInterval);
}

// Start autoplay
startSlider();

// OPTIONAL: pause when hovering over slider
const heroSlider = document.querySelector(".hero-slider");
if (heroSlider) {
  heroSlider.addEventListener("mouseenter", stopSlider);
  heroSlider.addEventListener("mouseleave", startSlider);
}


// Dropdown toggle
document.querySelector('.filter-btn').addEventListener('click', function() {
  document.querySelector('.filter-options').style.display =
    document.querySelector('.filter-options').style.display === 'block'
    ? 'none' : 'block';
});

// Sort products
function sortProducts(order) {
  let grid = document.getElementById("product-grid");
  let products = Array.from(grid.getElementsByClassName("product-card"));

  products.sort((a, b) => {
    let priceA = parseInt(a.getAttribute("data-price"));
    let priceB = parseInt(b.getAttribute("data-price"));
    return order === "low-high" ? priceA - priceB : priceB - priceA;
  });

  products.forEach(p => grid.appendChild(p));
  document.querySelector('.filter-options').style.display = "none"; // close dropdown

}
function moveExploreSlide(index) {
  const track = document.querySelector(".explore-slider-track");
  const dots = document.querySelectorAll(".explore-dots .dot");

  // Each slide is 33.33% width → move by index * 33.33%
  track.style.transform = `translateX(-${index * 33.33}%)`;

  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[index].classList.add("active-dot");
}



function changeImage(element) {
  document.getElementById("mainImage").src = element.src;
}

function changeColor(color) {
  let mainImage = document.getElementById("mainImage");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "oak") {
    mainImage.src = "images/d2.jpg";
    cartBtn.dataset.image = "images/d2.jpg";
  } else if (color === "dark") {
    mainImage.src = "images/it.jpg";
    cartBtn.dataset.image = "images/it.jpg";
  }
}

function increaseQty() {
  let qty = document.getElementById("qty");
  qty.value = parseInt(qty.value) + 1;
  document.querySelector(".add-to-cart-btn").dataset.quantity = qty.value;
}

function decreaseQty() {
  let qty = document.getElementById("qty");
  if (qty.value > 1) {
    qty.value = parseInt(qty.value) - 1;
    document.querySelector(".add-to-cart-btn").dataset.quantity = qty.value;
  }
}


function changeImage(element) {
  document.getElementById("mainImage").src = element.src;
}

function changeColor(color) {
  let mainImage = document.getElementById("mainImage");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "cappucino+walnut") {
    mainImage.src = "images/d4.jpg";
    cartBtn.dataset.image = "images/d4.jpg";
  } else if (color === "white+oak") {
    mainImage.src = "images/its.jpg";
    cartBtn.dataset.image = "images/its.jpg";
  }
}

function changeImage(element) {
  document.getElementById("mainImage").src = element.src;
}

function changeColor(color) {
  let mainImage = document.getElementById("mainImage");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "cappucino+walnut") {
    mainImage.src = "images/d8.jpg";
    cartBtn.dataset.image = "images/d8.jpg";
  } else if (color === "white+oak") {
    mainImage.src = "images/itss.jpg";
    cartBtn.dataset.image = "images/itss.jpg";
  }
}







/* === First wardrobe === */


function changeImage(element) {
  document.getElementById("mainImage").src = element.src;
}

function changeColor(color) {
  let mainImage = document.getElementById("mainImage");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "cappucino") {
    mainImage.src = "images/skin.jpg";
    cartBtn.dataset.image = "images/skin.jpg";
  } else if (color === "white") {
    mainImage.src = "images/w1.jpg";
    cartBtn.dataset.image = "images/w1.jpg";
  } else if (color === "Champagne") {
    mainImage.src = "images/black.jpg";
    cartBtn.dataset.image = "images/black.jpg";
  }
}


function changeImage(element) {
  document.getElementById("mainImage").src = element.src;
}

function changeColor(color) {
  let mainImage = document.getElementById("mainImage");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails img");

  if (color === "cappucino") {
    mainImage.src = "images/skin.jpg";
    thumbs[0].src = "images/skin.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/skin.jpg";

  } else if (color === "white") {
    mainImage.src = "images/w1.jpg";
    thumbs[0].src = "images/w1.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/w1.jpg";

  } else if (color === "Champagne") {
    mainImage.src = "images/black.jpg";
    thumbs[0].src = "images/black.jpg";     // first thumbnail changes
    cartBtn.dataset.image = "images/black.jpg";
  }
}


function changeImage(element) {
  document.getElementById("mainImage").src = element.src;
}

function changeColor(color) {
  let mainImage = document.getElementById("mainImage");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails img");

  if (color === "cappucino") {
    mainImage.src = "images/skin.jpg";
    thumbs[0].src = "images/skin.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/skin.jpg"; // update cart image
    cartBtn.dataset.id = "MW4GC-CAP";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - Cappuccino"; // name includes color

  } else if (color === "white") {
    mainImage.src = "images/w1.jpg";
    thumbs[0].src = "images/w1.jpg";
    cartBtn.dataset.image = "images/w1.jpg";
    cartBtn.dataset.id = "MW4GC-WHT";
    cartBtn.dataset.name = "Wardrobe - White";

  } else if (color === "Champagne") {
    mainImage.src = "images/black.jpg";
    thumbs[0].src = "images/black.jpg";
    cartBtn.dataset.image = "images/black.jpg";
    cartBtn.dataset.id = "MW4GC-CHAMP";
    cartBtn.dataset.name = "Wardrobe - Champagne";
  }
}








/* === Second wardrobe === */

function changeImage2(element) {
  document.getElementById("mainImage2").src = element.src;
}

function changeColor2(color) {
  let mainImage2 = document.getElementById("mainImage2");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white-marble") {
    mainImage2.src = "images/w2.jpg";
    cartBtn.dataset.image = "images/w2.jpg";
  } else if (color === "white-brown") {
    mainImage2.src = "images/1w.jpg";
    cartBtn.dataset.image = "images/1w.jpg";
  } else if (color === "grey-marble") {
    mainImage2.src = "images/2w.jpg";
    cartBtn.dataset.image = "images/2w.jpg";
  }
}


function changeImage2(element) {
  document.getElementById("mainImage2").src = element.src;
}

function changeColor2(color) {
  let mainImage = document.getElementById("mainImage2");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails2 img");

  if (color === "white-marble") {
    mainImage.src = "images/w2.jpg";
    thumbs[0].src = "images/w2.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/w2.jpg";

  } else if (color === "white-brown") {
    mainImage.src = "images/1w.jpg";
    thumbs[0].src = "images/1w.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/1w.jpg";

  } else if (color === "grey-marble") {
    mainImage.src = "images/2w.jpg";
    thumbs[0].src = "images/2w.jpg";     // first thumbnail changes
    cartBtn.dataset.image = "images/2w.jpg";
  }
}


function changeImage2(element) {
  document.getElementById("mainImage2").src = element.src;
}

function changeColor2(color) {
  let mainImage = document.getElementById("mainImage2");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails2 img");

  if (color === "white-marble") {
    mainImage.src = "images/w2.jpg";
    thumbs[0].src = "images/w2.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/w2.jpg"; // update cart image
    cartBtn.dataset.id = "MW4DMARB-WM";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white-marble"; // name includes color

  } else if (color === "white-brown") {
    mainImage.src = "images/1w.jpg";
    thumbs[0].src = "images/1w.jpg";
    cartBtn.dataset.image = "images/1w.jpg";
    cartBtn.dataset.id = "MW4DMARB-WB";
    cartBtn.dataset.name = "Wardrobe - white-brown";

  } else if (color === "grey-marble") {
    mainImage.src = "images/2w.jpg";
    thumbs[0].src = "images/2w.jpg";
    cartBtn.dataset.image = "images/2w.jpg";
    cartBtn.dataset.id = "MW4DMARB-GM";
    cartBtn.dataset.name = "Wardrobe - grey-marble";
  }
}





/* === Third wardrobe === */


function changeImage3(element) {
  document.getElementById("mainImage3").src = element.src;
}

function changeColor3(color) {
  let mainImage = document.getElementById("mainImage3");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "cappuccino") {
    mainImage.src = "images/12.jpg";
    cartBtn.dataset.image = "images/12.jpg";
  } else if (color === "White") {
    mainImage.src = "images/w3.jpg";
    cartBtn.dataset.image = "images/w3.jpg";
  } else if (color === "Champagne") {
    mainImage.src = "images/x.jpg";
    cartBtn.dataset.image = "images/x.jpg";
  }
}


function changeImage3(element) {
  document.getElementById("mainImage3").src = element.src;
}

function changeColor3(color) {
  let mainImage = document.getElementById("mainImage3");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails3 img");

  if (color === "cappuccino") {
    mainImage.src = "images/12.jpg";
    thumbs[0].src = "images/12.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/12.jpg";

  } else if (color === "White") {
    mainImage.src = "images/w3.jpg";
    thumbs[0].src = "images/w3.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/w3.jpg";

  } else if (color === "Champagne") {
    mainImage.src = "images/x.jpg";
    thumbs[0].src = "images/x.jpg";     // first thumbnail changes
    cartBtn.dataset.image = "images/x.jpg";
  }
}


function changeImage3(element) {
  document.getElementById("mainImage3").src = element.src;
}

function changeColor3(color) {
  let mainImage = document.getElementById("mainImage3");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails3 img");

  if (color === "cappuccino") {
    mainImage.src = "images/12.jpg";
    thumbs[0].src = "images/12.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/12.jpg"; // update cart image
    cartBtn.dataset.id = "MW3GA-CAP";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - Cappuccino"; // name includes color

  } else if (color === "White") {
    mainImage.src = "images/w3.jpg";
    thumbs[0].src = "images/w3.jpg";
    cartBtn.dataset.image = "images/w3.jpg";
    cartBtn.dataset.id = "MW3GA-WHT";
    cartBtn.dataset.name = "Wardrobe - White";

  } else if (color === "Champagne") {
    mainImage.src = "images/x.jpg";
    thumbs[0].src = "images/x.jpg";
    cartBtn.dataset.image = "images/x.jpg";
    cartBtn.dataset.id = "MW3GA-CHAMP";
    cartBtn.dataset.name = "Wardrobe - Champagne";
  }
}






/* === Fourth wardrobe === */


function changeImage4(element) {
  document.getElementById("mainImage4").src = element.src;
}

function changeColor4(color) {
  let mainImage = document.getElementById("mainImage4");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white-brown") {
    mainImage.src = "images/w4.jpg";
    cartBtn.dataset.image = "images/w4.jpg";
  } else if (color === "grey-marble") {
    mainImage.src = "images/ab.jpg";
    cartBtn.dataset.image = "images/ab.jpg";
}
}

function changeImage4(element) {
  document.getElementById("mainImage4").src = element.src;
}

function changeColor4(color) {
  let mainImage = document.getElementById("mainImage4");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails4 img");

  if (color === "white-brown") {
    mainImage.src = "images/w4.jpg";
    thumbs[0].src = "images/w4.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/w4.jpg";

  } else if (color === "grey-marble") {
    mainImage.src = "images/ab.jpg";
    thumbs[0].src = "images/ab.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/ab.jpg";

  } 
}


function changeImage4(element) {
  document.getElementById("mainImage4").src = element.src;
}

function changeColor4(color) {
  let mainImage = document.getElementById("mainImage4");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails4 img");

  if (color === "white-brown") {
    mainImage.src = "images/w4.jpg";
    thumbs[0].src = "images/w4.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/w4.jpg"; // update cart image
    cartBtn.dataset.id = "MW3GA-CAP";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white-brown"; // name includes color

  } else if (color === "grey-marble") {
    mainImage.src = "images/ab.jpg";
    thumbs[0].src = "images/ab.jpg";
    cartBtn.dataset.image = "images/ab.jpg";
    cartBtn.dataset.id = "MW3GA-WHT";
    cartBtn.dataset.name = "Wardrobe - grey-marble";

  } 
}








/* === Fifth wardrobe === */


function changeImage5(element) {
  document.getElementById("mainImage5").src = element.src;
}

function changeColor5(color) {
  let mainImage = document.getElementById("mainImage5");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white-brown") {
    mainImage.src = "images/w5.jpg";
    cartBtn.dataset.image = "images/w5.jpg";
  } else if (color === "grey-marble") {
    mainImage.src = "images/0.jpg";
    cartBtn.dataset.image = "images/0.jpg";
}
}

function changeImage5(element) {
  document.getElementById("mainImage5").src = element.src;
}

function changeColor5(color) {
  let mainImage = document.getElementById("mainImage5");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails5 img");

  if (color === "white-brown") {
    mainImage.src = "images/w5.jpg";
    thumbs[0].src = "images/w5.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/w5.jpg";

  } else if (color === "grey-marble") {
    mainImage.src = "images/0.jpg";
    thumbs[0].src = "images/0.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/0.jpg";

  } 
}


function changeImage5(element) {
  document.getElementById("mainImage5").src = element.src;
}

function changeColor5(color) {
  let mainImage = document.getElementById("mainImage5");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails5 img");

  if (color === "white-brown") {
    mainImage.src = "images/w5.jpg";
    thumbs[0].src = "images/w5.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/w5.jpg"; // update cart image
    cartBtn.dataset.id = "MW2DMARA-WB";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white-brown"; // name includes color

  } else if (color === "grey-marble") {
    mainImage.src = "images/0.jpg";
    thumbs[0].src = "images/0.jpg";
    cartBtn.dataset.image = "images/0.jpg";
    cartBtn.dataset.id = "MW2DMARA-GM";
    cartBtn.dataset.name = "Wardrobe - grey-marble";

  } 
}







/* === Sixth wardrobe === */


function changeImage6(element) {
  document.getElementById("mainImage6").src = element.src;
}

function changeColor6(color) {
  let mainImage = document.getElementById("mainImage6");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white") {
    mainImage.src = "imagesr.jpg";
    cartBtn.dataset.image = "images/r.jpg";
  } else if (color === "cappucino-walnut") {
    mainImage.src = "images/w6.jpg";
    cartBtn.dataset.image = "images/w6.jpg";
}
}

function changeImage6(element) {
  document.getElementById("mainImage6").src = element.src;
}

function changeColor6(color) {
  let mainImage = document.getElementById("mainImage6");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails6 img");

  if (color === "white") {
    mainImage.src = "images/r.jpg";
    thumbs[0].src = "images/r.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/r.jpg";

  } else if (color === "cappucino-walnut") {
    mainImage.src = "images/w6.jpg";
    thumbs[0].src = "images/w6.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/w6.jpg";

  } 
}


function changeImage6(element) {
  document.getElementById("mainImage6").src = element.src;
}

function changeColor6(color) {
  let mainImage = document.getElementById("mainImage6");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails6 img");

  if (color === "white") {
    mainImage.src = "images/r.jpg";
    thumbs[0].src = "images/r.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/r.jpg"; // update cart image
    cartBtn.dataset.id = "MW2DW-WHT";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white"; // name includes color

  } else if (color === "cappucino-walnut") {
    mainImage.src = "images/w6.jpg";
    thumbs[0].src = "images/w6.jpg";
    cartBtn.dataset.image = "images/w6.jpg";
    cartBtn.dataset.id = "MW2DW-CW";
    cartBtn.dataset.name = "Wardrobe - cappucino-walnut";

  } 
}






/* === Seventh wardrobe === */


function changeImage7(element) {
  document.getElementById("mainImage7").src = element.src;
}

function changeColor7(color) {
  let mainImage = document.getElementById("mainImage7");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white-oak") {
    mainImage.src = "images/h.jpg";
    cartBtn.dataset.image = "images/h.jpg";
  } else if (color === "cappucino-walnut") {
    mainImage.src = "images/w7.jpg";
    cartBtn.dataset.image = "images/w7.jpg";
}
}

function changeImage7(element) {
  document.getElementById("mainImage7").src = element.src;
}

function changeColor7(color) {
  let mainImage = document.getElementById("mainImage7");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails7 img");

  if (color === "white-oak") {
    mainImage.src = "images/h.jpg";
    thumbs[0].src = "images/h.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/h.jpg";

  } else if (color === "cappucino-walnut") {
    mainImage.src = "images/w7.jpg";
    thumbs[0].src = "images/w7.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/w7.jpg";

  } 
}


function changeImage7(element) {
  document.getElementById("mainImage7").src = element.src;
}

function changeColor7(color) {
  let mainImage = document.getElementById("mainImage7");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails7 img");

  if (color === "white-oak") {
    mainImage.src = "images/h.jpg";
    thumbs[0].src = "images/h.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/h.jpg"; // update cart image
    cartBtn.dataset.id = "MW7DW-WO";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white-oak"; // name includes color

  } else if (color === "cappucino-walnut") {
    mainImage.src = "images/w7.jpg";
    thumbs[0].src = "images/w7.jpg";
    cartBtn.dataset.image = "images/w7.jpg";
    cartBtn.dataset.id = "MW7DW-CW";
    cartBtn.dataset.name = "Wardrobe - cappucino-walnut";

  } 
}






/* === Eighth wardrobe === */


function changeImage8(element) {
  document.getElementById("mainImage8").src = element.src;
}

function changeColor8(color) {
  let mainImage = document.getElementById("mainImage8");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white") {
    mainImage.src = "images/w8.jpg";
    cartBtn.dataset.image = "images/w8.jpg";
  } else if (color === "walnut-white") {
    mainImage.src = "images/m.jpg";
    cartBtn.dataset.image = "images/m.jpg";
}
}

function changeImage8(element) {
  document.getElementById("mainImage8").src = element.src;
}

function changeColor8(color) {
  let mainImage = document.getElementById("mainImage8");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails8 img");

  if (color === "white") {
    mainImage.src = "images/w8.jpg";
    thumbs[0].src = "images/w8.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/w8.jpg";

  } else if (color === "walnut-white") {
    mainImage.src = "images/m.jpg";
    thumbs[0].src = "images/m.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/m.jpg";

  } 
}


function changeImage8(element) {
  document.getElementById("mainImage8").src = element.src;
}

function changeColor8(color) {
  let mainImage = document.getElementById("mainImage8");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails8 img");

  if (color === "white") {
    mainImage.src = "images/w8.jpg";
    thumbs[0].src = "images/w8.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/w8.jpg"; // update cart image
    cartBtn.dataset.id = "MW8DW-WHT";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white"; // name includes color

  } else if (color === "walnut-white") {
    mainImage.src = "images/m.jpg";
    thumbs[0].src = "images/m.jpg";
    cartBtn.dataset.image = "images/m.jpg";
    cartBtn.dataset.id = "MW8DW-WALWHT";
    cartBtn.dataset.name = "Wardrobe - walnut-white";

  } 
}






/* === Ninth wardrobe === */


function changeImage9(element) {
  document.getElementById("mainImage9").src = element.src;
}







/* === Tenth wardrobe === */


function changeImage10(element) {
  document.getElementById("mainImage10").src = element.src;
}

function changeColor10(color) {
  let mainImage = document.getElementById("mainImage10");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "walnut") {
    mainImage.src = "images/w10.jpg";
    cartBtn.dataset.image = "images/w10.jpg";
  } else if (color === "wild-plum") {
    mainImage.src = "images/pl.jpg";
    cartBtn.dataset.image = "images/pl.jpg";
}
}

function changeImage10(element) {
  document.getElementById("mainImage10").src = element.src;
}

function changeColor10(color) {
  let mainImage = document.getElementById("mainImage10");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails10 img");

  if (color === "walnut") {
    mainImage.src = "images/w10.jpg";
    thumbs[0].src = "images/w10.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/w10.jpg";

  } else if (color === "wild-plum") {
    mainImage.src = "images/pl.jpg";
    thumbs[0].src = "images/pl.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/pl.jpg";

  } 
}


function changeImage10(element) {
  document.getElementById("mainImage10").src = element.src;
}

function changeColor10(color) {
  let mainImage = document.getElementById("mainImage10");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails10 img");

  if (color === "walnut") {
    mainImage.src = "images/w10.jpg";
    thumbs[0].src = "images/w10.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/w10.jpg"; // update cart image
    cartBtn.dataset.id = "MW8DW-WHT";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - walnut"; // name includes color

  } else if (color === "wild-plum") {
    mainImage.src = "images/pl.jpg";
    thumbs[0].src = "images/pl.jpg";
    cartBtn.dataset.image = "images/pl.jpg";
    cartBtn.dataset.id = "MW8DW-WALWHT";
    cartBtn.dataset.name = "Wardrobe - wild-plum";

  } 
}





/* === Eleventh wardrobe === */


function changeImage11(element) {
  document.getElementById("mainImage11").src = element.src;
}







/* === Twelfth wardrobe === */


function changeImage12(element) {
  document.getElementById("mainImage12").src = element.src;
}

function changeColor12(color) {
  let mainImage = document.getElementById("mainImage12");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white-oak") {
    mainImage.src = "images/grr.jpg";
    cartBtn.dataset.image = "images/grr.jpg";
  } else if (color ==="black-oak") {
    mainImage.src = "images/w12.jpg";
    cartBtn.dataset.image = "images/w12.jpg";
}
}

function changeImage12(element) {
  document.getElementById("mainImage12").src = element.src;
}

function changeColor12(color) {
  let mainImage = document.getElementById("mainImage12");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails12 img");

  if (color === "white-oak") {
    mainImage.src = "images/grr.jpg";
    thumbs[0].src = "images/grr.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/grr.jpg";

  } else if (color === "black-oak") {
    mainImage.src = "images/w12.jpg";
    thumbs[0].src = "images/w12.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/w12.jpg";

  } 
}


function changeImage12(element) {
  document.getElementById("mainImage12").src = element.src;
}

function changeColor12(color) {
  let mainImage = document.getElementById("mainImage12");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails12 img");

  if (color === "white-oak") {
    mainImage.src = "images/grr.jpg";
    thumbs[0].src = "images/grr.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/grr.jpg"; // update cart image
    cartBtn.dataset.id = "MW12-WO";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white-oak"; // name includes color

  } else if (color === "black-oak") {
    mainImage.src = "images/w12.jpg";
    thumbs[0].src = "images/w12.jpg";
    cartBtn.dataset.image = "images/w12.jpg";
    cartBtn.dataset.id = "MW12-BOT";
    cartBtn.dataset.name = "Wardrobe - black-oak";

  } 
}





/* === Thirteen wardrobe === */


function changeImage13(element) {
  document.getElementById("mainImage13").src = element.src;
}





/* === Fourteen wardrobe === */


function changeImage14(element) {
  document.getElementById("mainImage14").src = element.src;
}




/* === Fifteen wardrobe === */


function changeImage15(element) {
  document.getElementById("mainImage15").src = element.src;
}






/* === Sixteen wardrobe === */


function changeImage16(element) {
  document.getElementById("mainImage16").src = element.src;
}

function changeColor16(color) {
  let mainImage = document.getElementById("mainImage16");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white") {
    mainImage.src = "images/w16.jpg";
    cartBtn.dataset.image = "images/w16.jpg";
  } else if (color ==="light-grey") {
    mainImage.src = "images/lg.jpg";
    cartBtn.dataset.image = "images/lg.jpg";
}  else if (color ==="dark-sonama-oak") {
    mainImage.src = "images/dso.jpg";
    cartBtn.dataset.image = "images/dso.jpg";
}
}

function changeImage16(element) {
  document.getElementById("mainImage16").src = element.src;
}

function changeColor16(color) {
  let mainImage = document.getElementById("mainImage16");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails16 img");

  if (color === "white") {
    mainImage.src = "images/w16.jpg";
    thumbs[0].src = "images/w16.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/w16.jpg";

  } else if (color === "light-grey") {
    mainImage.src = "images/lg.jpg";
    thumbs[0].src = "images/lg.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/lg.jpg";

  } else if (color === "dark-sonama-oak") {
    mainImage.src = "images/dso.jpg";
    thumbs[0].src = "images/dso.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/dso.jpg";

  } 
}


function changeImage16(element) {
  document.getElementById("mainImage16").src = element.src;
}

function changeColor16(color) {
  let mainImage = document.getElementById("mainImage16");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails16 img");

  if (color === "white") {
    mainImage.src = "images/w16.jpg";
    thumbs[0].src = "images/w16.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/w16.jpg"; // update cart image
    cartBtn.dataset.id = "MW12-WO";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white"; // name includes color

  } else if (color === "light-grey") {
    mainImage.src = "images/lg.jpg";
    thumbs[0].src = "images/lg.jpg";
    cartBtn.dataset.image = "images/lg.jpg";
    cartBtn.dataset.id = "MW12-BOT";
    cartBtn.dataset.name = "Wardrobe - light-grey";

  } else if (color === "dark-sonama-oak") {
    mainImage.src = "images/dso.jpg";
    thumbs[0].src = "images/dso.jpg";
    cartBtn.dataset.image = "images/dso.jpg";
    cartBtn.dataset.id = "MW12-BOT";
    cartBtn.dataset.name = "Wardrobe - dark-sonama-oak";

  } 
}







/* === Eighteen wardrobe === */


function changeImage18(element) {
  document.getElementById("mainImage18").src = element.src;
}

function changeColor18(color) {
  let mainImage = document.getElementById("mainImage18");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white") {
    mainImage.src = "images/aw.jpg";
    cartBtn.dataset.image = "images/aw.jpg";
  } else if (color ==="cappucino-walnut") {
    mainImage.src = "images/w18.jpg";
    cartBtn.dataset.image = "images/w18.jpg";
}  
}

function changeImage18(element) {
  document.getElementById("mainImage18").src = element.src;
}

function changeColor18(color) {
  let mainImage = document.getElementById("mainImage18");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails18 img");

  if (color === "white") {
    mainImage.src = "images/aw.jpg";
    thumbs[0].src = "images/aw.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/aw.jpg";

  } else if (color === "cappucino-walnut") {
    mainImage.src = "images/w18.jpg";
    thumbs[0].src = "images/w18.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/w18.jpg";

  } 
}


function changeImage18(element) {
  document.getElementById("mainImage18").src = element.src;
}

function changeColor18(color) {
  let mainImage = document.getElementById("mainImage18");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails18 img");

  if (color === "white") {
    mainImage.src = "images/aw.jpg";
    thumbs[0].src = "images/aw.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/aw.jpg"; // update cart image
    cartBtn.dataset.id = "MW12-WO";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white"; // name includes color

  } else if (color === "cappucino-walnut") {
    mainImage.src = "images/w18.jpg";
    thumbs[0].src = "images/w18.jpg";
    cartBtn.dataset.image = "images/w18.jpg";
    cartBtn.dataset.id = "MW12-BOT";
    cartBtn.dataset.name = "Wardrobe - cappucino-walnut";

  } 
}






/* === ninteen wardrobe === */


function changeImage19(element) {
  document.getElementById("mainImage19").src = element.src;
}

function changeColor19(color) {
  let mainImage = document.getElementById("mainImage19");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white") {
    mainImage.src = "images/w19.jpg";
    cartBtn.dataset.image = "images/w19.jpg";
  } else if (color ==="oak ash-grey ash") {
    mainImage.src = "images/og.jpg";
    cartBtn.dataset.image = "images/og.jpg";
}  
}

function changeImage19(element) {
  document.getElementById("mainImage19").src = element.src;
}

function changeColor19(color) {
  let mainImage = document.getElementById("mainImage19");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails19 img");

  if (color === "white") {
    mainImage.src = "images/w19.jpg";
    thumbs[0].src = "images/w19.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/w19.jpg";

  } else if (color === "oak ash-grey ash") {
    mainImage.src = "images/og.jpg";
    thumbs[0].src = "images/og.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/og.jpg";

  } 
}


function changeImage19(element) {
  document.getElementById("mainImage19").src = element.src;
}

function changeColor19(color) {
  let mainImage = document.getElementById("mainImage19");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails19 img");

  if (color === "white") {
    mainImage.src = "images/w19.jpg";
    thumbs[0].src = "images/w19.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/w19.jpg"; // update cart image
    cartBtn.dataset.id = "MW19-WHT";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white"; // name includes color

  } else if (color === "oak ash-grey ash") {
    mainImage.src = "images/og.jpg";
    thumbs[0].src = "images/og.jpg";
    cartBtn.dataset.image = "images/og.jpg";
    cartBtn.dataset.id = "MW19-OAK";
    cartBtn.dataset.name = "Wardrobe - oak ash-grey ash";

  } 
}








/* === ninteen wardrobe === */


function changeImage21(element) {
  document.getElementById("mainImage21").src = element.src;
}

function changeColor21(color) {
  let mainImage = document.getElementById("mainImage21");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "grey-white") {
    mainImage.src = "images/cpp.jpg";
    cartBtn.dataset.image = "images/cpp.jpg";
  } else if (color ==="cappuncino") {
    mainImage.src = "images/w21.jpg";
    cartBtn.dataset.image = "images/w21.jpg";
}  
}

function changeImage21(element) {
  document.getElementById("mainImage21").src = element.src;
}

function changeColor21(color) {
  let mainImage = document.getElementById("mainImage21");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails21 img");

  if (color === "grey-white") {
    mainImage.src = "images/cpp.jpg";
    thumbs[0].src = "images/cpp.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/cpp.jpg";

  } else if (color === "cappucino") {
    mainImage.src = "images/w21.jpg";
    thumbs[0].src = "images/w21.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/w21.jpg";

  } 
}


function changeImage21(element) {
  document.getElementById("mainImage21").src = element.src;
}

function changeColor21(color) {
  let mainImage = document.getElementById("mainImage21");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails21 img");

  if (color === "grey-white") {
    mainImage.src = "images/cpp.jpg";
    thumbs[0].src = "images/cpp.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/cpp.jpg"; // update cart image
    cartBtn.dataset.id = "MW19-WHT";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - grey-white"; // name includes color

  } else if (color === "cappucino") {
    mainImage.src = "images/w21.jpg";
    thumbs[0].src = "images/w21.jpg";
    cartBtn.dataset.image = "images/w21.jpg";
    cartBtn.dataset.id = "MW19-OAK";
    cartBtn.dataset.name = "Wardrobe - cappucino";

  } 
}


/* === 22 wardrobe === */


function changeImage22(element) {
  document.getElementById("mainImage22").src = element.src;
}



/* === 24 wardrobe === */


function changeImage24(element) {
  document.getElementById("mainImage24").src = element.src;
}




/* === 25 wardrobe === */


function changeImage25(element) {
  document.getElementById("mainImage25").src = element.src;
}

function changeColor25(color) {
  let mainImage = document.getElementById("mainImage25");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white") {
    mainImage.src = "images/w25.jpg";
    cartBtn.dataset.image = "images/w25.jpg";
  } else if (color ==="Nature/Titanium") {
    mainImage.src = "images/pg.jpg";
    cartBtn.dataset.image = "images/pg.jpg";
}  
}

function changeImage25(element) {
  document.getElementById("mainImage25").src = element.src;
}

function changeColor25(color) {
  let mainImage = document.getElementById("mainImage25");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails25 img");

  if (color === "white") {
    mainImage.src = "images/w25.jpg";
    thumbs[0].src = "images/w25.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/w25.jpg";

  } else if (color === "Nature/Titanium") {
    mainImage.src = "images/pg.jpg";
    thumbs[0].src = "images/pg.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/pg.jpg";

  } 
}


function changeImage25(element) {
  document.getElementById("mainImage25").src = element.src;
}

function changeColor25(color) {
  let mainImage = document.getElementById("mainImage25");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails25 img");

  if (color === "white") {
    mainImage.src = "images/w25.jpg";
    thumbs[0].src = "images/w25.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/w25.jpg"; // update cart image
    cartBtn.dataset.id = "MW19-WHT";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white"; // name includes color

  } else if (color === "Nature/Titanium") {
    mainImage.src = "images/pg.jpg";
    thumbs[0].src = "images/pg.jpg";
    cartBtn.dataset.image = "images/pg.jpg";
    cartBtn.dataset.id = "MW19-OAK";
    cartBtn.dataset.name = "Wardrobe - Nature/Titanium";

  } 
}






/* === 26 wardrobe === */


function changeImage26(element) {
  document.getElementById("mainImage26").src = element.src;
}

function changeColor26(color) {
  let mainImage = document.getElementById("mainImage26");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "white-oak") {
    mainImage.src = "images/wo26.jpg";
    cartBtn.dataset.image = "images/wo26.jpg";
  } else if (color ==="grey-wood") {
    mainImage.src = "images/w26.jpg";
    cartBtn.dataset.image = "images/w26.jpg";
}  else if (color ==="cappucino-wood") {
    mainImage.src = "images/cw26.jpg";
    cartBtn.dataset.image = "images/cw26.jpg";
}  
}

function changeImage26(element) {
  document.getElementById("mainImage26").src = element.src;
}

function changeColor26(color) {
  let mainImage = document.getElementById("mainImage26");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails26 img");

  if (color === "white-oak") {
    mainImage.src = "images/wo26.jpg";
    thumbs[0].src = "images/wo26.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/wo26.jpg";

  } else if (color === "grey-wood") {
    mainImage.src = "images/w26.jpg";
    thumbs[0].src = "images/w26.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/w26.jpg";

  } else if (color === "cappucino-wood") {
    mainImage.src = "images/cw26.jpg";
    thumbs[0].src = "images/cw26.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/cw26.jpg";

  } 
}


function changeImage26(element) {
  document.getElementById("mainImage26").src = element.src;
}

function changeColor26(color) {
  let mainImage = document.getElementById("mainImage26");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails26 img");

  if (color === "white-oak") {
    mainImage.src = "images/wo26.jpg";
    thumbs[0].src = "images/w026.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/w026.jpg"; // update cart image
    cartBtn.dataset.id = "MW19-WHT";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - white-oak"; // name includes color

  } else if (color === "grey-wood") {
    mainImage.src = "images/w26.jpg";
    thumbs[0].src = "images/w26.jpg";
    cartBtn.dataset.image = "images/w26.jpg";
    cartBtn.dataset.id = "MW19-OAK";
    cartBtn.dataset.name = "Wardrobe - grey-wood";

  } else if (color === "cappucino-wood") {
    mainImage.src = "images/cw26.jpg";
    thumbs[0].src = "images/cw26.jpg";
    cartBtn.dataset.image = "images/cw26.jpg";
    cartBtn.dataset.id = "MW19-OAK";
    cartBtn.dataset.name = "Wardrobe - cappucino-wood";

  } 
}






/* === 27 wardrobe === */


function changeImage27(element) {
  document.getElementById("mainImage27").src = element.src;
}

function changeColor27(color) {
  let mainImage = document.getElementById("mainImage27");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "sonama oak-white") {
    mainImage.src = "images/jh.jpg";
    cartBtn.dataset.image = "images/jh.jpg";
  } else if (color ==="snow white-german oak") {
    mainImage.src = "images/w27.jpg";
    cartBtn.dataset.image = "images/w27.jpg";
} 
}

function changeImage27(element) {
  document.getElementById("mainImage27").src = element.src;
}

function changeColor27(color) {
  let mainImage = document.getElementById("mainImage27");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails27 img");

  if (color === "sonama oak-white") {
    mainImage.src = "images/jh.jpg";
    thumbs[0].src = "images/jh.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/jh.jpg";

  } else if (color === "snow white-german oak") {
    mainImage.src = "images/w27.jpg";
    thumbs[0].src = "images/w27.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/w27.jpg";

  } 
}


function changeImage27(element) {
  document.getElementById("mainImage27").src = element.src;
}

function changeColor27(color) {
  let mainImage = document.getElementById("mainImage27");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails27 img");

  if (color === "sonama oak-white") {
    mainImage.src = "images/jh.jpg";
    thumbs[0].src = "images/jh.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/jh.jpg"; // update cart image
    cartBtn.dataset.id = "MW19-WHT";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - sonama oak-white"; // name includes color

  } else if (color === "snow white-german oak") {
    mainImage.src = "images/w27.jpg";
    thumbs[0].src = "images/w27.jpg";
    cartBtn.dataset.image = "images/w27.jpg";
    cartBtn.dataset.id = "MW19-OAK";
    cartBtn.dataset.name = "Wardrobe - snow white-german oak";

  } 
}






/* === 28 wardrobe === */


function changeImage28(element) {
  document.getElementById("mainImage28").src = element.src;
}

function changeColor28(color) {
  let mainImage = document.getElementById("mainImage28");
  let cartBtn = document.querySelector(".add-to-cart-btn");

  if (color === "natural-oak") {
    mainImage.src = "images/w28.jpg";
    cartBtn.dataset.image = "images/w28.jpg";
  } else if (color ==="greywood") {
    mainImage.src = "images/gw.jpg";
    cartBtn.dataset.image = "images/gw.jpg";
} 
}

function changeImage28(element) {
  document.getElementById("mainImage28").src = element.src;
}

function changeColor28(color) {
  let mainImage = document.getElementById("mainImage28");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails28 img");

  if (color === "natural-oak") {
    mainImage.src = "images/w28.jpg";
    thumbs[0].src = "images/w28.jpg";      // now first thumbnail changes
    cartBtn.dataset.image = "images/w28.jpg";

  } else if (color === "greywood") {
    mainImage.src = "images/gw.jpg";
    thumbs[0].src = "images/gw.jpg";        // first thumbnail changes
    cartBtn.dataset.image = "images/gw.jpg";

  } 
}


function changeImage28(element) {
  document.getElementById("mainImage28").src = element.src;
}

function changeColor28(color) {
  let mainImage = document.getElementById("mainImage28");
  let cartBtn = document.querySelector(".add-to-cart-btn");
  let thumbs = document.querySelectorAll(".thumbnails28 img");

  if (color === "natural-oak") {
    mainImage.src = "images/w28.jpg";
    thumbs[0].src = "images/w28.jpg"; // first thumbnail changes
    cartBtn.dataset.image = "images/w28.jpg"; // update cart image
    cartBtn.dataset.id = "MW19-WHT";          // unique ID for cappuccino
    cartBtn.dataset.name = "Wardrobe - natural-oak"; // name includes color

  } else if (color === "greywood") {
    mainImage.src = "images/gw.jpg";
    thumbs[0].src = "images/gw.jpg";
    cartBtn.dataset.image = "images/gw.jpg";
    cartBtn.dataset.id = "MW19-OAK";
    cartBtn.dataset.name = "Wardrobe - greywood";

  } 
}






/* === 29 wardrobe === */


function changeImage29(element) {
  document.getElementById("mainImage29").src = element.src;
}