import { join } from "path";
import { parse } from "date-fns";

import { getAllPaths, getAllPosts, getPostBySlug } from "../lib/api";
import Page, { PageProps } from "../components/Page";
import Footer from "../components/Footer";

// '/' is synonymous to '/index'
const specialPaths = ["/", "/blog", "/book", "/loci", "/literate"];

export const getStaticPaths = async () => {
  const paths = await getAllPaths();
  specialPaths.forEach((p) => paths.push(p));

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
  const tsNoTimeRegex = /<\d{4}-\d{2}-\d{2} [A-Z][a-z]{2}>/;
  const tsWithTimeToMinutesRegex =
    /<\d{4}-\d{2}-\d{2} [A-Z][a-z]{2} \d{2}:\d{2}>/;
  const tsWithTimeToSecondsRegex =
    /<\d{4}-\d{2}-\d{2} [A-Z][a-z]{2} \d{2}:\d{2}:\d{2}>/;

  let ts = new Date();

  switch (true) {
    case tsNoTimeRegex.test(timestamp):
      ts = parse(timestamp, "<yyyy-MM-dd EEE>", new Date());
      break;
    case tsWithTimeToMinutesRegex.test(timestamp):
      ts = parse(timestamp, "<yyyy-MM-dd EEE HH:mm>", new Date());
      break;
    case tsWithTimeToSecondsRegex.test(timestamp):
      ts = parse(timestamp, "<yyyy-MM-dd EEE HH:mm:ss>", new Date());
      break;
  }
  return ts;
};

export const getStaticProps = async ({ params }: PageParams) => {
  const path = "/" + join(...(params.slug || ["index"]));
  let page: any;
  let data: any;
  let backlinks: any[] = [];
  let allPosts: any[] = [];
  if (specialPaths.includes(path)) {
    allPosts = await getAllPosts().then((pages) =>
      pages
        .filter((page) => page.path.includes(path))
        .map((page) => ({
          path: page.path,
          title: page.data.title || page.basename,
          date:
            parseOrgTime(page.data?.properties?.created).toJSON() ||
            new Date().toJSON(),
        }))
    );
  } else if (path === "/index") {
    allPosts = await getAllPosts().then((pages) =>
      pages.map((page) => ({
        path: page.path,
        title: page.data.title || page.basename,
        date:
          parseOrgTime(page.data?.properties?.created).toJSON() ||
          new Date().toJSON(),
      }))
    );
    page = await getPostBySlug(path);
    data = page?.data;
    backlinks = data
      ? await Promise.all([...data.backlinks].map(getPostBySlug))
      : [];
  } else {
    page = await getPostBySlug(path);
    data = page?.data;
    backlinks = data
      ? await Promise.all([...data.backlinks].map(getPostBySlug))
      : [];
  }
  // console.log(page)
  let creation_date = new Date();
  let modified_date = new Date();
  if (data?.properties?.created) {
    creation_date = parseOrgTime(data.properties.created);
  }
  if (data?.properties?.modified) {
    modified_date = parseOrgTime(data.properties.created);
  }

  const properties = data?.properties || {};

  return {
    props: {
      title: data?.title || page?.basename || path,
      pageType: data?.properties?.type || "index",
      hast: page?.result || "",
      allPages: allPosts,
      backlinks: backlinks.map((b) => ({
        path: b.path,
        title: b.data.title || b.basename,
      })),
      slug: path,
      date: creation_date.toJSON(),
      lastModified: modified_date.toJSON(),
      properties: properties,
      // isodate: data
      // lastModifiedIso?: string;
      // description: string | null;
      // icon: string;
    },
  };
};

const PageContent = ({ ...props }: PageProps) => {
  return (
    <>
      <Page {...props} />
      <Footer {...props} />
    </>
  );
};

export default PageContent;
