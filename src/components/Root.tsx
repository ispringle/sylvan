import Head from 'next/head';

import Backlink from './Backlink';
import Link from './Link';
import Rehype from './Rehype';
import { PageProps } from './Page';

const Root = ({ title, hast, backlinks, ...props }: PageProps) => {
  return (
    <main>
      <article id={"root"} className={props.pageType}>
        <Rehype hast={hast} />
      </article>
    </main>
  );
};

export default Root
