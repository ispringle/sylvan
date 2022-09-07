import Head from "next/head";

import { format } from "date-fns";

import Link from "./Link";
import OrgTime from "./OrgTime";
import { PageProps } from "./Page";

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

const Index = ({ title, allPages, ...props }: PageProps) => {
  const pageTitle = capitalize(title.replace("/", "")) + " Index";
  return (
    <main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <h1>{pageTitle}</h1>
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
    </main>
  );
};

export default Index;
