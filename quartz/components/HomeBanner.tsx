import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

// Homepage banner: two animated GIFs (Ontario fires, topographic contours), each with a
// light and dark version, switched with an arcade button.
const banners = [
  { id: "fires", label: "Ontario fires, 1976–2022", file: "banner-ontario-fires" },
  { id: "contours", label: "Topographic contours", file: "banner-topographic-contours" },
]

const HomeBanner: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const base = pathToRoot(fileData.slug!)
  return (
    <div class="home-banner" data-banner="fires">
      {banners.flatMap((b) =>
        ["dark", "light"].map((mode) => (
          <img
            class={`banner-img banner-${b.id} banner-${mode}`}
            src={`${base}/static/banners/${b.file}${mode === "light" ? "-light" : ""}.gif`}
            alt={b.label}
            loading="lazy"
            width={1200}
            height={400}
          />
        )),
      )}
      <span class="banner-caption">{banners[0].label}</span>
      <button
        class="arcade-button"
        type="button"
        aria-label="Switch banner"
        title="Switch banner"
        style={`--arcade-up: url(${base}/static/banners/arcade-up.png); --arcade-down: url(${base}/static/banners/arcade-down.png)`}
      ></button>
    </div>
  )
}

HomeBanner.afterDOMLoaded = `
const BANNER_LABELS = ${JSON.stringify(Object.fromEntries(banners.map((b) => [b.id, b.label])))};
function setupBanner() {
  const banner = document.querySelector(".home-banner");
  if (!banner) return;
  const caption = banner.querySelector(".banner-caption");
  const show = (id) => {
    banner.dataset.banner = id;
    caption.textContent = BANNER_LABELS[id];
  };
  let saved = null;
  try { saved = localStorage.getItem("home-banner"); } catch (e) {}
  if (saved && BANNER_LABELS[saved]) show(saved);
  const button = banner.querySelector(".arcade-button");
  const onClick = () => {
    // Hold the pressed look briefly so taps on touch screens show the animation too
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 150);
    const next = banner.dataset.banner === "fires" ? "contours" : "fires";
    show(next);
    try { localStorage.setItem("home-banner", next); } catch (e) {}
  };
  button.addEventListener("click", onClick);
  window.addCleanup(() => button.removeEventListener("click", onClick));
}
document.addEventListener("nav", setupBanner);
`

HomeBanner.css = `
.home-banner {
  position: relative;
  margin: 0 0 1.5rem;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 3 / 1;
  background: var(--lightgray);
}

.home-banner .banner-img {
  display: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  border-radius: 0;
}

/* Show the selected banner in the version matching the theme */
.home-banner[data-banner="fires"] .banner-fires.banner-dark,
.home-banner[data-banner="contours"] .banner-contours.banner-dark {
  display: block;
}
:root[saved-theme="light"] .home-banner .banner-img.banner-dark {
  display: none;
}
:root[saved-theme="light"] .home-banner[data-banner="fires"] .banner-fires.banner-light,
:root[saved-theme="light"] .home-banner[data-banner="contours"] .banner-contours.banner-light {
  display: block;
}

.banner-caption {
  position: absolute;
  left: 12px;
  top: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  color: var(--darkgray);
  background: color-mix(in srgb, var(--light) 75%, transparent);
  pointer-events: none;
}

/* ---------- Arcade button ---------- */
/* Two photos of the same button: raised (up) and pushed in (down) */
.arcade-button {
  position: absolute;
  right: 12px;
  bottom: 10px;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: var(--arcade-up) center / contain no-repeat;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.55));
  transition: transform 0.06s ease;
  -webkit-tap-highlight-color: transparent;
}

/* Preload the pressed image so the first press doesn't flicker */
.arcade-button::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  background: var(--arcade-down);
}

.arcade-button:hover {
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.55)) brightness(1.06);
}

.arcade-button:active,
.arcade-button.pressed {
  background-image: var(--arcade-down);
  transform: translateY(1px) scale(0.97);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.6));
}

.arcade-button:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .arcade-button { transition: none; }
}
@media all and (max-width: 600px) {
  .arcade-button { width: 34px; height: 34px; right: 8px; bottom: 8px; }
  .banner-caption { font-size: 0.65rem; }
}
`

export default (() => HomeBanner) satisfies QuartzComponentConstructor
