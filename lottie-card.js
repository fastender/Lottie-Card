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
                console.log('Lottie library already loaded');
                resolve(window.lottie);
                return;
            }

            const script = document.createElement('script');

            // Prüfen, ob die lokale Datei existiert
            fetch('/local/js/lottie.min.js', { method: 'HEAD' })
                .then((response) => {
                    if (response.ok) {
                        console.log('Lottie library found locally, loading...');
                        script.src = '/local/js/lottie.min.js';
                    } else {
                        console.log('Lottie library not found locally, downloading from GitHub...');
                        script.src = 'https://raw.githubusercontent.com/fastender/Lottie-Card/main/js/lottie.min.js';
                    }

                    script.onload = () => {
                        console.log('Lottie library loaded successfully');
                        resolve(window.lottie);
                    };
                    script.onerror = () => {
                        console.error('Failed to load Lottie library');
                        reject(new Error('Lottie library could not be loaded.'));
                    };

                    document.head.appendChild(script);
                })
                .catch((error) => {
                    console.error('Error checking local Lottie library:', error);
                    reject(error);
                });
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

customElements.define('lottie-card-1', LottieCard);
