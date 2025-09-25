// Dados da Aplicação
class BirthdayApp {
    constructor() {
        this.images = [];
        this.currentImageIndex = 0;
        this.isMusicPlaying = false;
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.createContent();
        this.hideLoadingScreen();
        this.startCelebration();
    }

    // Carregar dados do JSON
    async loadData() {
        try {
            // Simulação de carregamento - substitua pela sua URL real
            const response = await fetch('imagens.json');
            const data = await response.json();
            this.images = data.images;
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
            // Fallback para imagens de exemplo
            this.images = this.getFallbackImages();
        }
    }

    getFallbackImages() {
        return Array.from({ length: 30 }, (_, i) => ({
            url: `https://picsum.photos/400/400?random=${i + 1}`,
            alt: `Momento especial ${i + 1}`,
            caption: `Memória preciosa #${i + 1}`
        }));
    }

    // Configurar event listeners
    setupEventListeners() {
        // Música
        const musicToggle = document.getElementById('music-toggle');
        const music = document.getElementById('background-music');
        
        musicToggle.addEventListener('click', () => {
            this.toggleMusic(music);
        });

        // Modal da tributo
        const readMoreBtn = document.getElementById('read-more');
        const tributeModal = document.getElementById('tribute-modal');
        const closeTribute = tributeModal.querySelector('.close-modal');

        readMoreBtn.addEventListener('click', () => this.openModal(tributeModal));
        closeTribute.addEventListener('click', () => this.closeModal(tributeModal));

        // Lightbox da galeria
        const lightbox = document.getElementById('gallery-lightbox');
        const closeLightbox = lightbox.querySelector('.close-lightbox');
        const prevBtn = lightbox.querySelector('.prev-btn');
        const nextBtn = lightbox.querySelector('.next-btn');

        closeLightbox.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.navigateGallery(-1));
        nextBtn.addEventListener('click', () => this.navigateGallery(1));

        // Fechar modais clicando fora
        window.addEventListener('click', (e) => {
            if (e.target === tributeModal) this.closeModal(tributeModal);
            if (e.target === lightbox) this.closeLightbox();
        });

        // Teclado para navegação da galeria
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'block') {
                if (e.key === 'ArrowLeft') this.navigateGallery(-1);
                if (e.key === 'ArrowRight') this.navigateGallery(1);
                if (e.key === 'Escape') this.closeLightbox();
            }
        });
    }

    // Criar conteúdo dinâmico
    createContent() {
        this.createMessageCards();
        this.createGallery();
        this.createGiftCards();
    }

    // Criar cards de mensagens
    createMessageCards() {
        const messages = [
            {
                title: "💖 Para a Minha Lúcia",
                preview: "Cada momento contigo é um tesouro que guardo no coração...",
                fullMessage: "Lúcia, querida...\n\nDesde o momento em que te conheci, soube que eras alguém especial. A tua gentileza, o teu sorriso contagiante, a tua maneira única de ver o mundo - tudo em ti é mágico.\n\nNestes 20 anos, cresceste numa pessoa extraordinária. A tua força de carácter, a tua compaixão pelos outros, a tua inteligência brilhante... tudo isso me enche de orgulho e admiração.\n\nQue este aniversário seja tão maravilhoso quanto és tu!"
            },
            {
                title: "🌟 20 Razões para Te Amar",
                preview: "Poderia listar mil razões, mas aqui estão 20 especiais...",
                fullMessage: "1. O teu sorriso que ilumina o meu dia\n2. A tua voz suave que acalma a minha alma\n3. A tua inteligência que me inspira\n4. A tua compaixão por todos os seres\n5. A tua força perante as adversidades\n6. O teu sentido de humor único\n7. A tua maneira de cuidar de quem amas\n8. A tua determinação em alcançar os sonhos\n9. A tua sensibilidade artística\n10. A tua lealdade incondicional\n11. A tua curiosidade pelo mundo\n12. A tua elegância natural\n13. A tua paciência infinita\n14. A tua sabedoria além dos anos\n15. A tua luz interior\n16. A tua capacidade de perdoar\n17. A tua generosidade\n18. A tua autenticidade\n19. A tua paixão pela vida\n20. O simples facto de seres tu!"
            },
            {
                title: "📜 Poema do Coração",
                preview: "Vinte primaveras se passaram...",
                fullMessage: "Vinte primaveras se passaram,\nDesde que chegaste a este mundo,\nTrazendo contigo a luz\nE um amor profundo.\n\nLúcia, nome que significa luz,\nIluminas cada recanto,\nCom a tua beleza interior\nE um coração tão santo.\n\nQue os próximos vinte anos\nSejam de pura felicidade,\nCheios de conquistas\nE muita prosperidade.\n\nÉs a estrela que guia\nOs meus dias e noites,\nA razão do meu sorriso\nE das minhas esperanças todas."
            },
            {
                title: "🎉 Celebração do Amor",
                preview: "Hoje não celebramos apenas 20 anos...",
                fullMessage: "Lúcia, minha querida,\n\nHoje não celebramos apenas 20 anos de vida. Celebramos 20 anos de ti - da pessoa incrível que és, do amor que espalhas, da luz que emanas.\n\nCada ruga no canto dos teus olhos quando sorrises conta uma história de felicidade. Cada experiência que viveste moldou a mulher forte e maravilhosa que te tornaste.\n\nEstou tão orgulhoso de ti e de tudo o que alcançaste. E sei que o melhor ainda está por vir, porque alguém com o teu coração e determinação só pode continuar a brilhar mais intensamente.\n\nFeliz aniversário, meu amor! Que este dia seja memorável e que o ano que se inicia seja repleto de realizações e alegrias."
            }
        ];

        const container = document.getElementById('clouds-container');
        
        messages.forEach((message, index) => {
            const card = document.createElement('div');
            card.className = 'cloud-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', index * 100);
            
            card.innerHTML = `
                <h3>${message.title}</h3>
                <p>${message.preview}</p>
                <div class="click-hint">✨ Clique para ler a mensagem completa</div>
            `;
            
            card.addEventListener('click', () => this.showMessageModal(message));
            container.appendChild(card);
        });
    }

    // Criar galeria de imagens
    createGallery() {
        const container = document.getElementById('gallery-container');
        
        this.images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-aos', 'zoom-in');
            item.setAttribute('data-aos-delay', index * 50);
            
            item.innerHTML = `
                <img src="${image.url}" alt="${image.alt}" loading="lazy">
                <div class="image-overlay">
                    <i class="fas fa-expand"></i>
                </div>
            `;
            
            item.addEventListener('click', () => this.openLightbox(index));
            container.appendChild(item);
        });
    }

    // Criar cards de presentes
    createGiftCards() {
        const gifts = [
            {
                icon: "🎁",
                title: "Presente do Coração",
                description: "Um presente especial que simboliza todo o amor que sinto por ti."
            },
            {
                icon: "💝",
                title: "Noite Inesquecível",
                description: "Uma celebração íntima só nossa, cheia de magia e romance."
            },
            {
                icon: "🌟",
                title: "Promessa Eterna",
                description: "O compromisso de estar ao teu lado em todos os momentos da vida."
            },
            {
                icon: "📸",
                title: "Memórias Preservadas",
                description: "Todos os nossos momentos especiais guardados para a eternidade."
            }
        ];

        const container = document.getElementById('gifts-container');
        
        gifts.forEach((gift, index) => {
            const card = document.createElement('div');
            card.className = 'gift-card';
            card.setAttribute('data-aos', 'flip-left');
            card.setAttribute('data-aos-delay', index * 200);
            
            card.innerHTML = `
                <div class="gift-icon">${gift.icon}</div>
                <h3>${gift.title}</h3>
                <p>${gift.description}</p>
            `;
            
            container.appendChild(card);
        });
    }

    // Controle de música
    toggleMusic(music) {
        const btn = document.getElementById('music-toggle');
        
        if (this.isMusicPlaying) {
            music.pause();
            btn.innerHTML = '<i class="fas fa-music"></i><span>Música</span>';
        } else {
            music.play().catch(e => console.log('Autoplay prevented:', e));
            btn.innerHTML = '<i class="fas fa-pause"></i><span>Pausar</span>';
        }
        
        this.isMusicPlaying = !this.isMusicPlaying;
    }

    // Mostrar modal de mensagem
    showMessageModal(message) {
        const modal = document.getElementById('message-modal');
        const content = document.getElementById('modal-message');
        
        content.innerHTML = `
            <h3>${message.title}</h3>
            <div class="message-content">${message.fullMessage.replace(/\n/g, '<br>')}</div>
        `;
        
        this.openModal(modal);
        window.particleSystem.createExplosion(window.innerWidth / 2, window.innerHeight / 2);
    }

    // Abrir lightbox da galeria
    openLightbox(index) {
        this.currentImageIndex = index;
        this.updateLightbox();
        
        const lightbox = document.getElementById('gallery-lightbox');
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Efeito especial
        window.magicAnimations.createConfetti();
    }

    // Atualizar lightbox
    updateLightbox() {
        const image = document.getElementById('lightbox-image');
        const caption = document.getElementById('image-caption');
        const thumbnails = document.getElementById('lightbox-thumbnails');
        
        const currentImage = this.images[this.currentImageIndex];
        
        image.src = currentImage.url;
        image.alt = currentImage.alt;
        caption.textContent = currentImage.caption;
        
        // Miniaturas
        thumbnails.innerHTML = '';
        this.images.forEach((img, index) => {
            const thumb = document.createElement('img');
            thumb.className = `thumbnail ${index === this.currentImageIndex ? 'active' : ''}`;
            thumb.src = img.url;
            thumb.alt = img.alt;
            thumb.addEventListener('click', () => {
                this.currentImageIndex = index;
                this.updateLightbox();
            });
            thumbnails.appendChild(thumb);
        });
    }

    // Navegar na galeria
    navigateGallery(direction) {
        this.currentImageIndex += direction;
        
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.images.length - 1;
        } else if (this.currentImageIndex >= this.images.length) {
            this.currentImageIndex = 0;
        }
        
        this.updateLightbox();
    }

    // Fechar lightbox
    closeLightbox() {
        const lightbox = document.getElementById('gallery-lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Gerenciar modais
    openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Esconder tela de loading
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }, 2000);
    }

    // Iniciar celebração
    startCelebration() {
        setTimeout(() => {
            window.magicAnimations.createConfetti();
            
            // Efeito de digitação no título
            const title = document.querySelector('.magic-title');
            gsap.fromTo(title.children, 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "back.out" }
            );
        }, 2500);
    }
}

// Inicializar a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.birthdayApp = new BirthdayApp();
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}