import Head from "next/head";

import ThemeToggle from "./ThemeToggle";

import BlogPost from "../components/Blog";
import Index from "../components/Index";
import Note from "../components/Note";
import Literate from "../components/Literate";
import Slip from "../components/Slip";
import Root from "../components/Root";

import { BacklinkProps } from "../components/Backlink";
import { PropertiesDrawerProps } from "../components/PropertiesDrawer";

export interface PageProps {
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
  propteries?: PropertiesDrawerProps;
}

const getContent = (pageType, props) => {
  if (props.pageType === "blog") {
    return <BlogPost {...props} />;
  } else if (props.pageType === "slip") {
    return <Slip {...props} />;
  } else if (props.pageType === "root") {
    return <Root {...props} />;
  } else if (props.pageType === "index") {
    return <Index {...props} />;
  } else if (props.pageType === "literate") {
    return <Literate {...props} />;
  } else {
    return <Note {...props} />;
  }
};

const Page = ({ ...props }: PageProps) => {
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

export default Page;
export { BlogPost, Index, Note, Slip, Root };
