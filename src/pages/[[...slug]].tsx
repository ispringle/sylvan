import { join } from 'path';
import { parse } from 'date-fns';

import { getAllPaths, getAllPosts, getPostBySlug } from '../lib/api';
import Page, { PageProps } from '../components/Page';

const specialPaths = ['/', '/blog', '/book', '/grok']

export const getStaticPaths = async () => {
  const paths = await getAllPaths();
  // add '/' which is synonymous to '/index'
  specialPaths.forEach(p => paths.push(p));

  return {
    paths,
    fallback: false,
  };
};

interface PageParams {
  params: {
    slug?: string[];
  };
}

const parseOrgTime = (timestamp) => {
  return parse(timestamp, '<yyyy-MM-dd EEE>', new Date())
}

export const getStaticProps = async ({ params }: PageParams) => {
  const path = '/' + join(...(params.slug || ['index']));
  let page: any;
  let data: any;
  let backlinks: any[] = [];
  let allPosts: any[] = [];
  if (specialPaths.includes(path)) {
    console.log(path)
    allPosts = await getAllPosts().then(
      pages => pages.filter(page => page.path.includes(path)).map(page => ({
        path: page.path,
        title: page.data.title || page.basename,
        date: parseOrgTime(page.data?.properties?.created).toJSON() || new Date().toJSON(),
      }))
    );
  } else {
    page = await getPostBySlug(path);
    data = page?.data;
    backlinks = data ? await Promise.all([...data.backlinks].map(getPostBySlug)) : [];
  }
  console.log(page)
  let creation_date = new Date();
  let modified_date = new Date();
  if (data?.properties?.created) {
    creation_date = parseOrgTime(data.properties.created)
  }
  if (data?.properties?.modified) {
    modified_date = parseOrgTime(data.properties.created)
  }
  return {
    props: {
      title: data?.title || page?.basename || path,
      pageType: data?.properties?.type || 'index',
      hast: page?.result || "",
      allPages: allPosts,
      backlinks: backlinks.map((b) => ({
        path: b.path,
        title: b.data.title || b.basename,
      })),
      slug: path,
      date: creation_date.toJSON(),
      lastModified: modified_date.toJSON(),
      // isodate: data
      // lastModifiedIso?: string;
      // description: string | null;
      // icon: string;
    },
  };
};

const PageContent = ({ ...props }: PageProps) => {
  return <Page {...props} />
}

export default PageContent;
