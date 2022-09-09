import Link from "./Link";
import OrgTime from "./OrgTime";
import { PageProps } from "./Page";
import Rehype from "./Rehype";
import Title from "./Title";

const Root = ({ title, hast, backlinks, ...props }: PageProps) => {
  return (
    <article id={"root"} className={props.pageType}>
      <Title id="howdy">Howdy</Title>
      <section className="content">
        <Rehype hast={hast} />
      </section>
      <section>
        <h4>Latest Blog Posts</h4>
        <ul style={{ margin: "unset", padding: "unset" }}>
          {props.allPages
            .filter((p) => p.path.includes("/blog"))
            .sort(
              (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
            )
            .slice(0, 3)
            .map((p) => (
              <li key={p.path}>
                <Link href={p.path}>{p.title}</Link>{" "}
                <OrgTime dateStr={p.date} />
              </li>
            ))}
        </ul>
      </section>
      <section>
        <h4>Latest Grok Updates</h4>
        <ul style={{ margin: "unset", padding: "unset" }}>
          {props.allPages
            .filter((p) => p.path.includes("/loci"))
            .sort(
              (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
            )
            .slice(0, 3)
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

export default Root;
