import { Link, Title } from "../Atoms";
import { PageLayoutProps } from "../PageLayout";
import RenderContent from "../RenderContent";

const Slip = ({ title, hast, backlinks, ...props }: PageLayoutProps) => {
  return (
    <article id={props.slug.replace("/", "")} className={props.pageType}>
      <Title>{title}</Title>
      <section className="content">
        <RenderContent hast={hast} />
      </section>
      {!!backlinks.length && (
        <section>
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

export default Slip;
