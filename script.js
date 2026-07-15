// Forge Tool - PDF Tools main script

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // Smooth-scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            if (target && target.length > 1) {
                const el = document.querySelector(target);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (navMenu && navMenu.classList.contains('open')) {
                        navMenu.classList.remove('open');
                    }
                }
            }
        });
    });

    // Demo handler for tool cards (will be wired to real backends later)
    document.querySelectorAll('.tool-card, .all-tool').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const name = card.querySelector('h3')?.innerText
                || card.querySelector('span')?.innerText
                || 'هذه الأداة';
            showToast(`🚧 ${name} - قريباً!`);
        });
    });

    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #1f1f1f;
            color: white;
            padding: 16px 28px;
            border-radius: 100px;
            font-family: 'Cairo', sans-serif;
            font-weight: 600;
            font-size: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideUp 0.3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    }
});

// Inject animation keyframes once
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideUp {
        from { transform: translate(-50%, 20px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
`;
document.head.appendChild(styleSheet);
