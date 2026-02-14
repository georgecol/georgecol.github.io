import { QuartzComponent, QuartzComponentConstructor } from "./types"

const QuickLinks: QuartzComponent = () => {
  return (
    <div class="quick-links">
      <ul>
        <li><a href="career/resume"> Resume</a></li>
        <li><a href="/projects"> Projects</a></li>
      </ul>
    </div>
  )
}

QuickLinks.css = `
.quick-links {
  margin-top: 1rem;
}

.quick-links ul {
  list-style: none;
  padding: 0;
}

.quick-links li {
  margin: 6px 0;
}
`

export default (() => QuickLinks) satisfies QuartzComponentConstructor