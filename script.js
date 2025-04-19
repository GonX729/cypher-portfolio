document.addEventListener("DOMContentLoaded", () => {
    // Navigation functionality
    const burger = document.querySelector(".burger")
    const nav = document.querySelector(".nav-links")
    const navLinks = document.querySelectorAll(".nav-links li")
    const header = document.querySelector("header")
    const sections = document.querySelectorAll(".section")
    const navItems = document.querySelectorAll(".nav-links a")
  
    // Toggle navigation menu
    burger.addEventListener("click", () => {
      nav.classList.toggle("active")
      burger.classList.toggle("active")
  
      // Animate links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
      })
    })
  
    // Close menu when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        burger.classList.remove("active")
      })
    })
  
    // Header scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
  
      // Update active section in navigation
      updateActiveSection()
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // CTA button effect
    const ctaButton = document.querySelector(".cta-button")
    if (ctaButton) {
      ctaButton.addEventListener("click", () => {
        const aboutSection = document.querySelector("#about")
        window.scrollTo({
          top: aboutSection.offsetTop - 80,
          behavior: "smooth",
        })
      })
    }
  
    // Update active section in navigation
    function updateActiveSection() {
      const scrollPosition = window.scrollY
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Add active class to section
          section.classList.add("active")
  
          // Update navigation
          navItems.forEach((item) => {
            item.classList.remove("active")
            if (item.getAttribute("href") === `#${sectionId}`) {
              item.classList.add("active")
            }
          })
        }
      })
    }
  
    // Initial call to set active section
    updateActiveSection()
  
    // Reveal sections on scroll
    const revealSection = (entries, observer) => {
      const [entry] = entries
  
      if (!entry.isIntersecting) return
  
      entry.target.classList.add("active")
      observer.unobserve(entry.target)
    }
  
    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    })
  
    sections.forEach((section) => {
      sectionObserver.observe(section)
    })
  
    // Card hover effects
    const cards = document.querySelectorAll(".about-card, .team-member")
  
    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px)"
        this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)"
        this.style.borderColor = "rgba(159, 122, 234, 0.3)"
      })
  
      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
        this.style.boxShadow = "none"
        this.style.borderColor = "rgba(159, 122, 234, 0.1)"
      })
    })
  
    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll("button, .cta-button")
  
    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const x = e.clientX - e.target.getBoundingClientRect().left
        const y = e.clientY - e.target.getBoundingClientRect().top
  
        const ripple = document.createElement("span")
        ripple.classList.add("ripple")
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
  
        this.appendChild(ripple)
  
        setTimeout(() => {
          ripple.remove()
        }, 600)
      })
    })
  
    // Initialize sections on page load
    setTimeout(() => {
      document.querySelector("#home").classList.add("active")
    }, 100)
  
    // Add ripple style to CSS dynamically
    const style = document.createElement("style")
    style.textContent = `
          .ripple {
              position: absolute;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              transform: scale(0);
              animation: ripple 0.6s linear;
              pointer-events: none;
          }
          
          @keyframes ripple {
              to {
                  transform: scale(4);
                  opacity: 0;
              }
          }
      `
    document.head.appendChild(style)
  })

