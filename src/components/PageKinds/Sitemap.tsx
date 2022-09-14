import { Link, OrgTime, Title } from "../Atoms";
import { PageLayoutProps } from "../PageLayout";

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

const Sitemap = ({ title, allPages, ...props }: PageLayoutProps) => {
  const pageTitle = capitalize(title.replace("/", "")) + " Index";
  return (
    <article id={props.slug.replace("/", "")} className={props.pageType}>
      <Title>{pageTitle}</Title>
      <section id={props.slug.replace("/", "")} className={props.pageType}>
        <ul style={{ margin: "unset", padding: "unset" }}>
          {allPages
            .sort(
              (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
            )
            .map((p) => (
              <li key={p.path}>
                <Link href={p.path}>{p.title}</Link>{" "}
                <OrgTime dateStr={p.date} />
              </li>
            ))}
        </ul>
      </section>
    </article>
  );
};

export default Sitemap;
