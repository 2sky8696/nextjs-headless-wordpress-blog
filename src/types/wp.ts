export type WPPostBase = {
  id: number;
  slug: string;
  date: string;
  modified:string;
  
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
    }[];
  };
};

export type Post = WPPostBase;
export type News = WPPostBase;

export type WPCategory = {
  id:number;
  name: string;
  slug: string;
}