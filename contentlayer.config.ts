import { makeSource } from 'contentlayer/source-files';
import { BookReview, BlogPost } from './contentlayer_type';

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [BookReview, BlogPost],
});

export default contentLayerConfig;
