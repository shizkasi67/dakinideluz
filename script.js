document.addEventListener('DOMContentLoaded', function() {
    // Manejo del formulario
    const form = document.getElementById('agenda-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando fetch para enviar a un backend
            
            alert('¡Gracias por tu interés! Te contactaremos pronto para confirmar tu cita.');
            form.reset();
        });
    }

    // Animación suave al hacer scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, section').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Scrollspy para el índice lateral
    const secciones = [
        'sobre-mi',
        'que-hago',
        'valores',
        'lecturas-tarot',
        'horarios',
        'contacto'
    ];
    const links = document.querySelectorAll('#sidebar-indice .indice-link');
    window.addEventListener('scroll', function() {
        let scrollPos = window.scrollY || window.pageYOffset;
        let offset = 120;
        let found = false;
        secciones.forEach((id, idx) => {
            const sec = document.getElementById(id);
            if (sec) {
                const top = sec.offsetTop - offset;
                const bottom = top + sec.offsetHeight;
                // Para la última sección (contacto), marcarla si estamos cerca del final de la página
                if (id === 'contacto') {
                    if (window.innerHeight + scrollPos >= document.body.offsetHeight - 10) {
                        links.forEach(l => l.classList.remove('active'));
                        links[idx].classList.add('active');
                        found = true;
                    }
                }
                if (scrollPos >= top && scrollPos < bottom && !found) {
                    links.forEach(l => l.classList.remove('active'));
                    links[idx].classList.add('active');
                    found = true;
                }
            }
        });
        if (!found) {
            links.forEach(l => l.classList.remove('active'));
        }
    });
}); 