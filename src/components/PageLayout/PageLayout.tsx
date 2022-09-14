import Head from "next/head";

import ThemeToggle from "../ThemeToggle";

import { Blog, Note, Literate, Root, Sitemap, Slip } from "../PageKinds";

import { BacklinkProps } from "../Atoms";
import { OrgDrawerProps } from "../OrgDrawer";

export interface PageLayoutProps {
  pageType: string;
  slug: string;
  title: string;
  isodate?: string;
  date?: string;
  lastModifiedIso?: string;
  lastModified?: string;
  images: Array<{ src: string; alt: string }>;
  hast?: string;
  backlinks: BacklinkProps[];
  description: string | null;
  icon: string;
  allPages?: any[];
  propteries?: OrgDrawerProps;
}

const getContent = (pageType, props) => {
  if (props.pageType === "blog") {
    return <Blog {...props} />;
  } else if (props.pageType === "slip") {
    return <Slip {...props} />;
  } else if (props.pageType === "root") {
    return <Root {...props} />;
  } else if (props.pageType === "index") {
    return <Sitemap {...props} />;
  } else if (props.pageType === "literate") {
    return <Literate {...props} />;
  } else {
    return <Note {...props} />;
  }
};

const PageLayout = ({ ...props }: PageLayoutProps) => {
  const content = getContent(props.pageType, props);

  return (
    <main>
      <Head>
        <title>{props.title}</title>
      </Head>
      <ThemeToggle />
      {content}
      <img className="fleuron" src={"/fleuron.svg"} alt="" />
    </main>
  );
};

export default PageLayout;
