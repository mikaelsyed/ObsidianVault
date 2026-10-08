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
      <button class="arcade-button" type="button" aria-label="Switch banner" title="Switch banner">
        <span class="arcade-cap"></span>
      </button>
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
/* Glossy red bezel > dark recess > domed red plunger that sinks when pressed */
.arcade-button {
  position: absolute;
  right: 14px;
  bottom: 12px;
  width: 56px;
  height: 56px;
  padding: 0;
  border: 1px solid #5a0806;
  border-radius: 50%;
  cursor: pointer;
  background:
    radial-gradient(circle at 50% 50%, transparent 58%, rgba(0, 0, 0, 0.25) 72%, transparent 74%),
    radial-gradient(circle at 35% 25%, #d0302a 0%, #a3140f 35%, #7e0a07 70%, #4a0302 100%);
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.55),
    inset 0 2px 1px rgba(255, 170, 160, 0.6),
    inset 0 -3px 4px rgba(60, 0, 0, 0.45);
  -webkit-tap-highlight-color: transparent;
}

/* Gloss arc along the top-left of the bezel */
.arcade-button::after {
  content: "";
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.15) 18%, rgba(255, 255, 255, 0) 34%);
  pointer-events: none;
}

/* Dark recess the plunger sits in */
.arcade-button::before {
  content: "";
  position: absolute;
  inset: 7px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 60%, #4a0605 0%, #250202 100%);
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.85),
    0 1px 0 rgba(255, 150, 140, 0.35);
}

.arcade-cap {
  position: absolute;
  inset: 8px;
  z-index: 1;
  border-radius: 50%;
  background:
    /* top gloss and the soft horizontal sheen band across the lower half */
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.55) 0%,
      rgba(255, 255, 255, 0.08) 34%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.10) 60%,
      rgba(255, 255, 255, 0.03) 80%,
      rgba(255, 255, 255, 0) 100%),
    radial-gradient(ellipse 28% 14% at 40% 16%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 100%),
    radial-gradient(circle at 50% 38%, #c41d17 0%, #9c100b 50%, #650604 100%);
  box-shadow:
    0 0 0 1.5px #c9332c,
    0 3px 3px rgba(0, 0, 0, 0.55),
    inset 0 -2px 3px rgba(70, 0, 0, 0.35);
  transform: scale(1);
  transition:
    transform 0.07s ease,
    box-shadow 0.07s ease,
    filter 0.07s ease;
}

.arcade-button:hover .arcade-cap {
  filter: brightness(1.06);
}

/* Pressed: plunger sinks into the recess, darker, with a shadowed rim */
.arcade-button:active .arcade-cap,
.arcade-button.pressed .arcade-cap {
  transform: scale(0.9);
  filter: brightness(0.82);
  box-shadow:
    0 0 0 1.5px #7a0b07,
    0 0 0 4px rgba(0, 0, 0, 0.45),
    inset 0 3px 5px rgba(40, 0, 0, 0.55);
}

.arcade-button:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .arcade-cap { transition: none; }
}
@media all and (max-width: 600px) {
  .arcade-button { width: 46px; height: 46px; right: 10px; bottom: 8px; }
  .arcade-button::before { inset: 6px; }
  .arcade-cap { inset: 7px; }
  .banner-caption { font-size: 0.65rem; }
}
`

export default (() => HomeBanner) satisfies QuartzComponentConstructor
