import Head from "next/head";

import Backlink from "./Backlink";
import Link from "./Link";
import Rehype from "./Rehype";
import { PageProps } from "./Page";
import Title from "./Title";

const Note = ({ title, hast, backlinks, ...props }: PageProps) => {
  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>
      <article id={props.slug.replace("/", "")} className={props.pageType}>
        <Title>{title}</Title>
        <Rehype hast={hast} />
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
    </main>
  );
};

export default Note;
