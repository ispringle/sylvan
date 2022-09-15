import React from 'react';

import Link from './Link';

export interface BacklinkProps {
  slug: string;
  title: string;
  path: string;
}

const Backlink = ({ slug, title }: BacklinkProps) => {
  return <Link href={slug}>{title}</Link>;
};

export default Backlink;
