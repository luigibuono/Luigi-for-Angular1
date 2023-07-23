export interface User {
  name: string;
  email: string;
  gender: string;
  status: string;
  id?: number;
}

export interface Post {
  title: string;
  body: string;
  user_id?: number;
  id?: number;
}

export interface Comment {
  post_id: number;
  name: string;
  email: string;
  body: string;
  id?: number;
}
