import { makeSource } from 'contentlayer/source-files';
import { BlogPost } from './content_type';

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost],
});

export default contentLayerConfig;
