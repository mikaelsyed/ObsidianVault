import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
       GitHub: "https://github.com/mikaelsyed",
      "LinkedIn": "https://www.linkedin.com/in/mikael-syed/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.HomeOnly(Component.HomeBanner()),
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.HomeOnly(Component.ContentMeta(), true),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.DesktopOnly(Component.GifComponent()),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.ThemeAndSocials({
      github: "https://github.com/mikaelsyed",
      linkedin: "https://www.linkedin.com/in/mikael-syed/",
    }),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.HomeOnly(
      Component.RecentNotes({
        title: "Recent Notes",
        limit: 5,
        showTags: false,
        filter: (f) => f.slug !== "index" && f.slug !== "Readme",
      }),
    ),
    Component.HomeOnly(Component.DesktopOnly(Component.TableOfContents()), true),
    Component.HomeOnly(Component.Backlinks(), true),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.ThemeAndSocials({
      github: "https://github.com/mikaelsyed",
      linkedin: "https://www.linkedin.com/in/mikael-syed/",
    }),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
