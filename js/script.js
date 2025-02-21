// Function to load HTML components
function loadComponent(id, file) {
  return fetch(file) // Return the fetch promise
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((error) => console.error(`Error loading ${file}:`, error));
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Load components and wait for them to be inserted into the DOM
  Promise.all([
    loadComponent("topheader", "./components/topheader.html"),
    loadComponent("navbar", "./components/navbar.html"),
    loadComponent("hero", "./components/hero.html"),
    loadComponent("discount", "./components/discount.html"),
  ]).then(() => {
    // Initialize Lucide icons after loading components
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
    // Language Dropdown Flag Changer
    const languageSelect = document.getElementById("language-select");
    const flagIcon = document.getElementById("selected-flag");

    if (languageSelect && flagIcon) {
      languageSelect.addEventListener("change", function () {
        const selectedOption =
          languageSelect.options[languageSelect.selectedIndex];
        flagIcon.src = selectedOption.getAttribute("data-flag");
      });
    }

    // ✅ Initialize SwiperJS for Hero Section
    if (document.querySelector("#mySwiperHero")) {
      var heroSwiper = new Swiper("#mySwiperHero", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true,
        },
        pagination: {
          el: ".swiper-pagination-hero",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next-hero",
          prevEl: ".swiper-button-prev-hero",
        },
        effect: "slide",
        speed: 500,
      });
    }

    // ✅ Initialize SwiperJS for Discount Section
    if (document.querySelector("#mySwiperDiscount")) {
      var discountSwiper = new Swiper("#mySwiperDiscount", {
        loop: true,
        pagination: {
          el: ".swiper-pagination-discount",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next-discount",
          prevEl: ".swiper-button-prev-discount",
        },
        effect: "slide",
        speed: 500,
        breakpoints: {
          0: {
            slidesPerView: 2, // Show 2 cards for screens < 760px
            spaceBetween: 3,
          },
          760: {
            slidesPerView: 2, // Show 4 cards for screens >= 760px
            spaceBetween: 6,
          },
          1024: {
            slidesPerView: 4, // Show two slides for medium screens
            spaceBetween: 6,
          },
          1400: {
            slidesPerView: 5, // Show two slides for medium screens
            spaceBetween: 6,
          },
          1500: {
            slidesPerView: 5, // Show two slides for medium screens
            spaceBetween: 30,
          },
          2000: {
            slidesPerView: 5, // Show two slides for medium screens
            spaceBetween: 6,
          },
        },
      });
    }

    // ✅ Product Selection & Shopping Cart Icon Logic
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      const cartIcon = card.querySelector(".cart-icon");

      // Create the "Sold Out" message div
      const notAvailable = document.createElement("div");
      notAvailable.classList.add("not-available");
      notAvailable.innerHTML = "<p>Sorry this item is currently sold out</p>";

      // Insert the "Sold Out" message div after the product image
      card
        .querySelector(".product-image")
        .insertAdjacentElement("afterend", notAvailable);

      // Hide all cart icons initially
      cartIcon.style.opacity = "0";
      cartIcon.style.transition = "opacity 0.3s ease-in-out";

      // Check if item is out of stock
      const quantity = parseInt(card.getAttribute("data-quantity"), 10);
      if (quantity === 0) {
        cartIcon.style.display = "none"; // Hide the cart icon
        notAvailable.style.display = "flex"; // Show the "sold out" message
      } else {
        notAvailable.style.display = "none"; // Hide "sold out" message
      }

      // Check if the discount is greater than 40
      const discount = parseInt(card.getAttribute("data-discount"), 10);
      if (discount > 40) {
        // Create flash icon
        const flashIcon = document.createElement("div");
        flashIcon.classList.add("flash-icon");
        flashIcon.innerHTML = `<i class="fa-solid fa-bolt-lightning"></i>`; // Flash icon (Font Awesome)

        // Create round div below the flash icon
        const roundDiv = document.createElement("div");
        roundDiv.classList.add("round-div");

        // Insert flash icon and round div
        card.querySelector(".product-image").parentNode.appendChild(flashIcon);
        card.querySelector(".product-image").parentNode.appendChild(roundDiv);
      }

      card.addEventListener("click", function () {
        if (quantity > 0) {
          // Hide cart icons for all other cards
          productCards.forEach((c) => {
            c.querySelector(".cart-icon").style.opacity = "0";
          });

          // Show cart icon for the selected card
          cartIcon.style.opacity = "1";
        }
      });
    });

    // ✅ Initialize Countdown Timer
    const targetDate = new Date("2025-03-02T23:59:59").getTime(); // Set the target date

    const countdownInterval = setInterval(function () {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      // Calculate time remaining
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Update the countdown elements
      document.getElementById("days").innerText = days < 10 ? "0" + days : days;
      document.getElementById("hours").innerText =
        hours < 10 ? "0" + hours : hours;
      document.getElementById("minutes").innerText =
        minutes < 10 ? "0" + minutes : minutes;
      document.getElementById("seconds").innerText =
        seconds < 10 ? "0" + seconds : seconds;

      // If countdown is over, display a message
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown").innerHTML = "EXPIRED";
      }
    }, 1000); // Update every second
    // ✅ Hamburger Menu Logic
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const closeMenu = document.querySelector(".close-menu");

    if (hamburger && navMenu && closeMenu) {
      // ✅ Open Menu
      hamburger.addEventListener("click", function () {
        navMenu.classList.add("show");
      });

      // ✅ Close Menu
      closeMenu.addEventListener("click", function () {
        navMenu.classList.remove("show");
      });

      // ✅ Close when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !navMenu.contains(event.target) &&
          !hamburger.contains(event.target)
        ) {
          navMenu.classList.remove("show");
        }
      });
    }
  });
});
