document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Loader logic
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            document.body.classList.remove('loading');
        }, 1500);
    }, 1500);

    // Audio Player Toggle
    const vibeBtn = document.getElementById('vibe-toggle');
    const iconPlay = vibeBtn.querySelector('.icon-play');
    const iconPause = vibeBtn.querySelector('.icon-pause');
    const audioEl = document.getElementById('vibe-audio');
    
    let isPlaying = false;

    vibeBtn.addEventListener('click', () => {
        if (!isPlaying) {
            audioEl.play().then(() => {
                isPlaying = true;
                iconPlay.classList.add('hidden');
                iconPause.classList.remove('hidden');
            }).catch(err => {
                console.error("Audio playback failed:", err);
            });
        } else {
            audioEl.pause();
            isPlaying = false;
            iconPlay.classList.remove('hidden');
            iconPause.classList.add('hidden');
        }
    });

    // Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 50;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    setTimeout(revealOnScroll, 100);

    // Parallax scrolling for grid columns
    const columns = document.querySelectorAll('.grid-column');
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 900) {
            const scrolled = window.pageYOffset;
            columns.forEach((col, index) => {
                // Different speeds for different columns
                const speed = index % 2 === 0 ? 0.05 : 0.15;
                col.style.transform = `translateY(${-scrolled * speed}px)`;
            });
        } else {
            columns.forEach(col => col.style.transform = 'none');
        }
    });
});
