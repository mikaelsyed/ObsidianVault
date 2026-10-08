import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Renders the wrapped component only on the homepage (or only off it, with `invert`)
export default ((component: QuartzComponent, invert: boolean = false) => {
  const Component = component
  const HomeOnly: QuartzComponent = (props: QuartzComponentProps) => {
    const isHome = props.fileData.slug === "index"
    return isHome !== invert ? <Component {...props} /> : <></>
  }

  HomeOnly.displayName = component.displayName
  HomeOnly.afterDOMLoaded = component.afterDOMLoaded
  HomeOnly.beforeDOMLoaded = component.beforeDOMLoaded
  HomeOnly.css = component.css
  return HomeOnly
}) satisfies QuartzComponentConstructor
