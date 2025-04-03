document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const topMenu = document.getElementById("topMenu");

  mobileMenuBtn.addEventListener("click", function () {
    topMenu.classList.toggle("active");
    this.innerHTML = topMenu.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Sticky Header
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Carousel Functionality
  let currentIndex = 0;
  const items = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".carousel-indicator");
  let carouselInterval;

  function showSlide(index) {
    items.forEach((item, i) => {
      item.style.display = i === index ? "block" : "none";
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
  }

  document
    .getElementById("carouselNext")
    .addEventListener("click", function () {
      nextSlide();
      resetCarouselInterval();
    });

  document
    .getElementById("carouselPrev")
    .addEventListener("click", function () {
      prevSlide();
      resetCarouselInterval();
    });

  indicators.forEach((indicator, i) => {
    indicator.addEventListener("click", function () {
      currentIndex = i;
      showSlide(currentIndex);
      resetCarouselInterval();
    });
  });

  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 5000); // Auto-slide every 5s
  }

  function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarousel();
  }

  // Initialize first slide
  showSlide(currentIndex);
  startCarousel();

  // Testimonials Slider
  const testimonialsTrack = document.getElementById("testimonialsTrack");
  const testimonials = document.querySelectorAll(".testimonial");
  let testimonialIndex = 0;
  let testimonialInterval;

  function updateTestimonial() {
    testimonialsTrack.style.transform = `translateX(-${
      testimonialIndex * 100
    }%)`;
  }

  function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    updateTestimonial();
  }

  function startTestimonialSlider() {
    testimonialInterval = setInterval(nextTestimonial, 6000);
  }

  startTestimonialSlider();

  // Menu Tabs
  const menuTabs = document.querySelectorAll(".menu-tab");
  const menuItems = document.querySelectorAll(".menu-item");

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      menuTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      menuItems.forEach((item) => {
        if (
          category === "all" ||
          item.getAttribute("data-category") === category
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        if (topMenu.classList.contains("active")) {
          topMenu.classList.remove("active");
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });
  function callRandomNumber() {
    // Define the two US phone numbers with the country code
    const phoneNumbers = ["+19735079462", "+19735079463"];

    // Randomly select one of the numbers
    const randomIndex = Math.floor(Math.random() * phoneNumbers.length);
    const selectedNumber = phoneNumbers[randomIndex];

    // Redirect to the phone dialer with the selected number
    window.location.href = `tel:${selectedNumber}`;
  }

  // Gallery Lightbox Effect
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").src;
      const lightbox = document.createElement("div");
      lightbox.style.position = "fixed";
      lightbox.style.top = "0";
      lightbox.style.left = "0";
      lightbox.style.width = "100%";
      lightbox.style.height = "100%";
      lightbox.style.backgroundColor = "rgba(0,0,0,0.9)";
      lightbox.style.display = "flex";
      lightbox.style.alignItems = "center";
      lightbox.style.justifyContent = "center";
      lightbox.style.zIndex = "2000";
      lightbox.style.cursor = "zoom-out";

      const img = document.createElement("img");
      img.src = imgSrc;
      img.style.maxWidth = "90%";
      img.style.maxHeight = "90%";
      img.style.objectFit = "contain";

      lightbox.appendChild(img);
      document.body.appendChild(lightbox);

      lightbox.addEventListener("click", function () {
        document.body.removeChild(lightbox);
      });
    });
  });
  document
    .getElementById("reservationForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const guests = document.getElementById("guests").value;
      const message = document.getElementById("message").value;

      // Format date
      // const formattedDate = new Date(date).toLocaleDateString('en-US', {
      //   weekday: 'short',
      //   month: 'short',
      //   day: 'numeric'
      // });

      const whatsappNumber = "9735079462";

      // Create WhatsApp message
      const whatsappMessage = `New Reservation Request:
        
      Name: ${name}
      Phone: ${phone}
      Date: ${formattedDate}
      Time: ${time}
      Guests: ${guests}
      Special Requests: ${message || "None"}
      
      Please confirm this reservation. Thank you!`;

      // Encode for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Open WhatsApp
      window.open(
        `https://wa.me/${9735079462}?text=${encodedMessage}`,
        "_blank"
      );

      // Optional: Show confirmation message
      alert(
        "You'll now be directed to WhatsApp to complete your reservation. Please send the pre-filled message to confirm."
      );
    });

  // Load non-critical CSS
  function loadNonCriticalCSS() {
    const links = document.querySelectorAll('link[media="print"]');
    links.forEach((link) => {
      link.onload = function () {
        this.media = "all";
      };
    });
  }

  // Load after page is interactive
  if (document.readyState === "complete") {
    loadNonCriticalCSS();
  } else {
    window.addEventListener("load", loadNonCriticalCSS);
  }
});

// Load fonts after page is interactive
window.addEventListener("load", function () {
  if (!document.fonts || !document.fonts.ready) return;

  document.fonts.ready.then(function () {
    // Fonts are loaded
    const html = document.documentElement;
    html.classList.add("fonts-loaded");
  });
});
