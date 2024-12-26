# Lottie Card for Home Assistant

**Lottie Card** is a custom Lovelace card for Home Assistant that allows you to display **Lottie animations** in your dashboards. Bring your Home Assistant interface to life with dynamic and interactive animations!

![Live Preview](./docs/example-1.png)


---

## Features
- Supports rendering Lottie animations.
- Customizable background colors.
- Adjustable animation size (e.g., `size: 150px`).
- Additional options for animation control:
  - **`loop`**: Repeat the animation.
  - **`autoplay`**: Automatically start the animation.
  - **`direction`**: Set the direction of the animation (1 for forward, -1 for reverse).
- Easy to configure and integrate.

---

## Installation

### HACS (Home Assistant Community Store)
1. Open HACS in your Home Assistant instance.
2. Navigate to **Frontend** > **Custom Repositories**.
3. Add this repository: `https://github.com/fastender/lottie-card`.
4. Install **LottieCard** from the available frontend integrations.

### Manual Installation
1. Download the `lottie-card.js` file from this repository.
2. Copy the file to the `www` folder in your Home Assistant configuration directory.
3. Add the following entry to your `configuration.yaml`:
   ```yaml
   resources:
     - url: /local/lottie-card.js
       type: module
   ```

4. Restart Home Assistant.

---

## Usage
Add the card to your Lovelace dashboard. Here's an example:

```yaml
type: custom:lottie-card
animation: /local/animations/example.json
background_color: "#ffffff"
size: 150px
loop: true
autoplay: true
direction: 1
```

### Options
| Option            | Description                               | Default Value     |
|--------------------|-------------------------------------------|-------------------|
| `animation`        | Path to the Lottie animation file         | **Required**      |
| `background_color` | Background color of the card (hex)        | `transparent`     |
| `size`             | Size of the animation (e.g., `150px`)     | `100%`            |
| `loop`             | Enable/disable looping of the animation   | `false`           |
| `autoplay`         | Automatically start the animation         | `false`           |
| `direction`        | Direction of the animation (1 or -1)      | `1`               |

---

## Examples
Here’s a sample configuration:

```yaml
type: custom:lottie-card
animation: /local/animations/loader.json
background_color: "#f0f0f0"
size: 200px
loop: true
autoplay: true
direction: -1
```

---

## Live Preview

Below is a demonstration of the Lottie Card in action:

![Live Preview](./docs/live-preview.gif)

---

## License
This project is licensed under the [GNU General Public License](./LICENSE).

---

## Feedback & Support
If you have questions or want to report an issue, please open an [issue on GitHub](https://github.com/fastender/lottie-card/issues).
