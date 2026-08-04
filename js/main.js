/* ==========================================
   AUTOMATACREATIVOS
   MAIN.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Navbar transparente al inicio

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.style.background = "rgba(5,8,22,.90)";
            navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,.35)";

        } else {

            navbar.style.background = "rgba(5,8,22,.55)";
            navbar.style.boxShadow = "none";

        }

    });

    // Animación al hacer scroll

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll(
        ".service-card, .timeline-item, .tech-card, .about-image, .about-content, .cta-box"
    ).forEach((el) => {

        el.classList.add("hidden");

        observer.observe(el);

    });

    // Scroll suave

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({
                    behavior:"smooth"
                });

            }

        });

    });

});
