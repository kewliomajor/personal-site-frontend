import {PostSection} from './post_section';
export class Post {
  uuid: string;
  title: string;
  post_sections: PostSection[];
  created_at: string;
  updated_at: string;
}
