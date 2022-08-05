import BlogPost from '../components/Blog';
import Index from '../components/Index';
import Note from '../components/Note';
import Slip from '../components/Slip';
import Root from '../components/Root';
import { BacklinkProps } from '../components/Backlink';

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
}

const Page = ({ ...props }: PageProps) => {
  if (props.pageType === 'blog') {
    return <BlogPost {...props} />
  } else if (props.pageType === 'slip') {
    return <Slip {...props} />
  } else if (props.pageType === 'root') {
    return <Root {...props} />
  } else if (props.pageType === 'index') {
    return <Index {...props} />
  } else {
    return <Note {...props} />
  }

};

export default Page;
export { BlogPost, Index, Note, Slip, Root }
