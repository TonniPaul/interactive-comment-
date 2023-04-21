import { FormEvent } from "react";

export interface CommentUser {
  id: number;
  image: {
    png: string;
  };
  username: string;
}

export interface Replies {
  id: number;
  user: {
    image: {
      png: string;
    };
    username: string;
  };
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Replies[];
  replyingTo?: string;
}

export interface AddCommentProps {
  image: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  replyingTo: string;
}
