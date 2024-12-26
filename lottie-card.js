class LottieCard extends HTMLElement {
    setConfig(config) {
        if (!config.animation) {
            throw new Error("Animation file must be defined");
        }

        this.config = config;

        // Standardwerte für Hintergrundfarbe und andere Parameter
        const backgroundColor = config.background_color || 'transparent'; // Standard: transparent

        // Erstelle das Haupt-Card-Element
        const card = document.createElement('ha-card');
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.style.backgroundColor = backgroundColor; // Hintergrundfarbe aus Konfiguration
        card.style.boxShadow = 'none'; // Optional: Schatten entfernen

        // Erstelle den Container für die Animation
        const container = document.createElement('div');
        container.style.width = config.size || '100px';
        container.style.height = config.size || '100px';
        container.style.backgroundColor = 'transparent'; // Container bleibt transparent
        container.style.overflow = 'hidden';

        card.appendChild(container);
        this.appendChild(card);

        // Animation laden
        this.loadAnimation(container, config);
    }

    loadAnimation(container, config) {
        if (this.animationInstance) {
            this.animationInstance.destroy(); // Vorherige Instanz entfernen
        }

        const loop = config.loop !== undefined ? config.loop : false;
        const autoplay = config.autoplay !== undefined ? config.autoplay : true;
        const direction = config.direction !== undefined ? config.direction : 1;

        this.animationInstance = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: direction === 1 ? loop : false,
            autoplay: false, // Autoplay wird manuell gesteuert
            path: config.animation
        });

        this.animationInstance.addEventListener('DOMLoaded', () => {
            this.animationInstance.setDirection(direction);

            if (direction === -1) {
                this.animationInstance.goToAndStop(this.animationInstance.totalFrames - 1, true);
            }

            if (autoplay) {
                this.animationInstance.play();
            }
        });

        if (!loop || direction === -1) {
            this.animationInstance.addEventListener('complete', () => {
                if (direction === 1) {
                    this.animationInstance.goToAndStop(this.animationInstance.totalFrames - 1, true);
                } else if (direction === -1) {
                    this.animationInstance.goToAndStop(0, true);
                }
            });
        }
    }

    reloadAnimation() {
        // Animation erneut laden
        this.loadAnimation(this.querySelector('div'), this.config);
    }

    set hass(hass) {
        // Optional: Verarbeite Home Assistant Status
    }

    getCardSize() {
        return 1;
    }
}

// Registriere die neue Karte mit der Bezeichnung 'custom-background-animation-card'
customElements.define('custom-background-animation-card', LottieCard);
