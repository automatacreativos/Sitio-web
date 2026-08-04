// ===========================
// HAMBURGER MENU
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle del menú al hacer click en el hamburger
    if(hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Cerrar menú cuando se hace click en un link
    if(navLinks) {
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Cerrar menú cuando se hace scroll
    window.addEventListener('scroll', function() {
        if(hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

