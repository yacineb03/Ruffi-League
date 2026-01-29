document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    const form = document.getElementById('registrationForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.classList.add('loading');
            btn.disabled = true;
            const formData = new FormData(form);
            fetch("https://formspree.io/f/xqepqrvy", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                btn.classList.remove('loading');
                if (response.ok) {
                    form.style.display = 'none';
                    const successScreen = document.getElementById('successScreen');
                    successScreen.style.display = 'block';
                    successScreen.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    alert("Oups ! Une erreur est survenue lors de l'envoi.");
                    btn.disabled = false;
                }
            }).catch(error => {
                btn.classList.remove('loading');
                alert("Oups ! Une erreur réseau est survenue.");
                btn.disabled = false;
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === "#") {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
        }
    });
    // Countdown Logic
    const targetDate = new Date("February 25, 2026 23:59:59").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");

        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            const heroDeadline = document.querySelector('.hero-deadline');
            if (heroDeadline) heroDeadline.innerHTML = "<span class='deadline-label'>🚨 Les inscriptions sont closes !</span>";
        }
    };

    const countdownInterval = setInterval(updateCountdown, 1000 * 60);
    updateCountdown();

});
