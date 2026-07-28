// Enable hover on mobile
document.addEventListener("touchstart", function () {}, true);

document.addEventListener('DOMContentLoaded', () => { 
  // Dynamic copyright year
  const yearEl = document.getElementById('current-year'); 
  if (yearEl) { 
    yearEl.textContent = new Date().getFullYear(); 
  } 

  const navLinks = document.querySelectorAll('.nav-link'); 
  const menuBtn = document.querySelector('.mobile-menu-btn'); 
  const navLinksContainer = document.querySelector('.nav-links'); 
  const srText = menuBtn?.querySelector('.sr-only');

  // Mobile menu setup
  if (menuBtn && navLinksContainer) { 
    const isSpanish = window.location.pathname.endsWith('index-es.html');
    
    const toggleMenu = (isOpen) => { 
      menuBtn.setAttribute('aria-expanded', String(isOpen)); 
      
      const labelText = isSpanish 
        ? (isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación')
        : (isOpen ? 'Close navigation menu' : 'Open navigation menu');

      menuBtn.setAttribute('aria-label', labelText); 
      if (srText) srText.textContent = labelText; 
      
      menuBtn.classList.toggle('open', isOpen); 
      navLinksContainer.classList.toggle('open', isOpen); 
    }; 

    // Toggle menu state on click
    menuBtn.addEventListener('click', () => { 
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true'; 
      toggleMenu(!isExpanded); 
    }); 

    // Close menu when clicking a link
    navLinks.forEach(link => { 
      link.addEventListener('click', () => { 
        toggleMenu(false); 
      }); 
    }); 

    // Close menu on escape key press
    document.addEventListener('keydown', (e) => { 
      if (e.key === 'Escape' && navLinksContainer.classList.contains('open')) { 
        toggleMenu(false); 
        menuBtn.focus(); 
      } 
    }); 
  } 

  // Active navigation highlighting (intersection observer)
  const sections = document.querySelectorAll('section[id]'); 
  if (sections.length > 0 && navLinks.length > 0) { 
    const observerOptions = { 
      root: null, 
      rootMargin: '-20% 0px -60% 0px', 
      threshold: 0 
    }; 

    const observer = new IntersectionObserver((entries) => { 
      entries.forEach(entry => { 
        if (entry.isIntersecting) { 
          const id = entry.target.getAttribute('id'); 
          navLinks.forEach(link => { 
            const href = link.getAttribute('href'); 
            link.classList.toggle('active', href === `#${id}`);
          }); 
        } 
      }); 
    }, observerOptions); 
    
    sections.forEach(section => observer.observe(section)); 
  } 

  // Decrease the height of the header when scrolling down
  const header = document.querySelector('header'); 
  if (header) { 
    window.addEventListener('scroll', () => { 
      header.classList.toggle('header-scrolled', window.scrollY > 20); 
    }, { passive: true }); 
  } 

  // Language switcher active state
  const langEn = document.getElementById('lang-en'); 
  const langEs = document.getElementById('lang-es'); 
  if (langEn && langEs) { 
    const isSpanish = window.location.pathname.endsWith('index-es.html'); 
    langEs.classList.toggle('active', isSpanish); 
    langEn.classList.toggle('active', !isSpanish); 
  } 

  // Protect phone and email from basic bots
  const phoneEl = document.getElementById('protected-phone'); 
  if (phoneEl) { 
    const phone = '805-723-0348'; 
    phoneEl.href = `tel:${phone.replace(/-/g, '')}`; 
    phoneEl.textContent = phone; 
  } 

  const emailEl = document.getElementById('protected-email'); 
  if (emailEl) { 
    const email = 'pazfamilychildcare805@gmail.com'; 
    emailEl.href = `mailto:${email}`; 
    emailEl.textContent = email; 
  } 

  // Language choice preference storage
  document.getElementById('lang-en')?.addEventListener('click', () => { 
    sessionStorage.setItem('preferredLang', 'en'); 
  }); 
  
  document.getElementById('lang-es')?.addEventListener('click', () => { 
    sessionStorage.setItem('preferredLang', 'es'); 
  }); 
});
