import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const GifComponent: QuartzComponent = () => {
    const gifSrc = "https://64.media.tumblr.com/6608429ed04907db4e33abd77bc79092/5d398a18e029d066-ff/s500x750/779028c05fe3d666779cd354deea498b04b9f4f9.gifv" // Update this with the actual path to your GIF

    return (
        <div class="gif-container">
            <img src={gifSrc} alt="Decorative GIF" class="styled-gif" />
        </div>
    )
}

GifComponent.css = `
.gif-container {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 100%; /* Adjust width if needed */
  margin-top: -1rem;
  margin-bottom: -1rem;
}

.styled-gif {
  width: 224px; /* Set your desired width */
  height: 200px; /* Set your desired height */
  margin: 0;
}
`

export default (() => GifComponent) satisfies QuartzComponentConstructor
