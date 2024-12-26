
class LottieCard extends HTMLElement {
    setConfig(config) {
        if (!config.animation) {
            throw new Error("Animation file must be defined");
        }

        this.config = config;

        // Standardwerte für Hintergrundfarbe und andere Parameter
        const backgroundColor = config.background_color || 'transparent';

        // Erstelle das Haupt-Card-Element
        const card = document.createElement('ha-card');
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.style.backgroundColor = backgroundColor;

        // Lottie-Container erstellen
        const lottieContainer = document.createElement('div');
        lottieContainer.style.position = 'absolute';
        lottieContainer.style.top = '0';
        lottieContainer.style.left = '0';
        lottieContainer.style.width = '100%';
        lottieContainer.style.height = '100%';
        lottieContainer.style.zIndex = '-1';
        card.appendChild(lottieContainer);

        // Lottie-Animation laden
        this.loadLottieLibrary().then((Lottie) => {
            Lottie.loadAnimation({
                container: lottieContainer,
                renderer: 'svg',
                loop: config.loop !== false, // Standard: true
                autoplay: config.autoplay !== false, // Standard: true
                path: config.animation,
            });
        }).catch((error) => {
            console.error('Lottie Animation konnte nicht geladen werden:', error);
        });

        // Card-Inhalt erstellen
        const content = document.createElement('div');
        content.style.position = 'relative';
        content.style.zIndex = '1';
        card.appendChild(content);

        this.content = content;
        this.card = card;
    }

    loadLottieLibrary() {
        return new Promise((resolve, reject) => {
            if (window.lottie) {
                resolve(window.lottie);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.10.1/lottie.min.js';
            script.onload = () => resolve(window.lottie);
            script.onerror = () => reject(new Error('Lottie-Web library could not be loaded.'));
            document.head.appendChild(script);
        });
    }

    set hass(hass) {
        if (!this.content) {
            return;
        }

        // Home Assistant-Daten verarbeiten (z.B. Entity-Daten anzeigen)
        this.content.innerHTML = `<div>${this.config.title || ''}</div>`;
    }

    getCardSize() {
        return 3;
    }

    connectedCallback() {
        if (!this.card) {
            return;
        }
        this.appendChild(this.card);
    }

    disconnectedCallback() {
        if (this.card && this.card.parentElement) {
            this.card.parentElement.removeChild(this.card);
        }
    }
}

customElements.define('lottie-card', LottieCard);
