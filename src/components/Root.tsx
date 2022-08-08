import { format } from 'date-fns';

import Link from './Link';
import OrgTime from './OrgTime'
import { PageProps } from './Page';
import Rehype from './Rehype';

const Root = ({ title, hast, backlinks, ...props }: PageProps) => {
    return (
        <main>
            <article id={"root"} className={props.pageType}>
                <Rehype hast={hast} />

                <h3>Latest Blog Posts</h3>
                <ul style={{ margin: 'unset', padding: 'unset' }}>
                    {
                        props.allPages
                            .filter(p => p.path.includes("/blog"))
                            .sort(
                                (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
                            .slice(0, 3)
                            .map(p => (
                                <li key={p.path}>
                                    <Link href={p.path}>{p.title}</Link> <OrgTime dateStr={p.date} />
                                </li>))
                    }
                </ul>
                <h3>Latest Grok Updates</h3>
                <ul style={{ margin: 'unset', padding: 'unset' }}>
                    {
                        props.allPages
                            .filter(p => p.path.includes("/grok"))
                            .sort(
                                (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
                            .slice(0, 3)
                            .map(p => (
                                <li key={p.path}>
                                    <Link href={p.path}>{p.title}</Link> <OrgTime dateStr={p.date} />
                                </li>))
                    }
                </ul>
            </article>
        </main>
    );
};

export default Root
