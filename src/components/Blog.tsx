import Backlink from "./Backlink";
import Link from "./Link";
import Rehype from "./Rehype";
import { PageProps } from "./Page";
import Title from "./Title";

const BlogPost = ({ title, hast, backlinks, ...props }: PageProps) => {
  return (
    <article id={props.slug.replace("/", "")} className={props.pageType}>
      <Title>{title}</Title>
      <section className="content">
        <Rehype hast={hast} />
      </section>
      {!!backlinks.length && (
        <section className="backlinks">
          <h2>{"Backlinks"}</h2>
          <ul>
            {backlinks.map((b) => (
              <li key={b.path}>
                <Link href={b.path}>{b.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};

export default BlogPost;
