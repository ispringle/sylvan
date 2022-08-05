import Head from 'next/head';

import { format } from 'date-fns';

import Link from './Link';
import { PageProps } from './Page';


const Index = ({ title, allPages, ...props }: PageProps) => {
    return (
        <main>
            <Head>
                <title>{title}</title>
            </Head>
            <h1>{title} index</h1>
            <section id={props.slug.replace('/', '')} className={props.pageType}>
                <ul style={{ margin: 'unset', padding: 'unset' }}>
                    {allPages.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()).map(p => (<li key={p.path}>
                        <Link href={p.path}>{p.title}</Link> {format(new Date(p.date), 'yyyy-MM-dd')}
                    </li>))}
                </ul>
            </section>
        </main>
    );
};

export default Index
