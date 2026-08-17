document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header com efeito ao rolar a página
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Destacar link ativo do menu dinamicamente (ScrollSpy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Máscara de Telefone Automática no formato dos EUA: (XXX) XXX-XXXX
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
            if (value.length > 10) value = value.slice(0, 10);

            if (value.length > 6) {
                e.target.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
            } else if (value.length > 3) {
                e.target.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else if (value.length > 0) {
                e.target.value = `(${value}`;
            } else {
                e.target.value = '';
            }
        });
    }

    // 4. Animação dos Números do "About Us" ao aparecer na tela
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const animateCounters = () => {
        const statsSection = document.getElementById('statsSection');
        if (!statsSection) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !animated) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = target / 30; // Velocidade da animação

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
            animated = true;
        }
    };

    window.addEventListener('scroll', animateCounters);

    // 5. Revelação suave de elementos na tela (ScrollReveal)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                el.classList.add('reveal-active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Executa para verificar elementos visíveis logo ao carregar

    // 6. Formulário de envio formatado direto para o WhatsApp
    const form = document.getElementById('whatsappForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const originalBtnContent = submitBtn.innerHTML;

            // Feedback visual de carregamento
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> REDIRECTING...`;
            submitBtn.style.opacity = '0.8';

            const whatsappNumber = "17749464344";

            const name = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('telefone').value.trim();
            const service = document.getElementById('servico').value;
            const message = document.getElementById('mensagem').value.trim();

            const text = `*NEW QUOTE REQUEST*\n\n` +
                         `*Name:* ${name}\n` +
                         `*Email:* ${email}\n` +
                         `*Phone:* ${phone}\n` +
                         `*Project Type:* ${service}\n\n` +
                         `*Message Details:* ${message}`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.style.opacity = '1';
            }, 800);
        });
    }
});