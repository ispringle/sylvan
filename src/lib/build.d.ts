export interface PageData {
  type: ".org" | ".bib";
  pageType: "note" | "blog" | "index" | "root" | "slip" | "biblio" | "literate";
  slug: string;
  title: string;
  images: Array<{ src: string; alt: string }>;
  ids: Record</* id: */ string, /* anchor: */ string>;
  links: string[];
  backlinks: Set<string>;
  excerpt: string;
  date?: string;
  last_modified?: string;
  description?: string;
  icon?: string;
}
export type Page = VFile & { data: PageData; path: string; result: any };

export type BibtexEntry = {
  key: string;
  type: string;
  authors?: string[];

  [key: string]: string | string[] | undefined;
};

export interface LociOptions {
  root: string;
  blacklistedDirectories: Set<string>;
  specialPages: Set<string>;
}

export interface BuildCtx {
  options: LociOptions;
  bibliography: Record<string, BibtexEntry>;
  pages: Record<string, Page>;
  backlinks: Record<string, Set<string>>;
}
