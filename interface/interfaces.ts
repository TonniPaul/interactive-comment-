import { SetStateAction } from "react";

export interface CommentUser {
  id: number;
  image: {
    png: string;
    webp: string;
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
    };
    username: string;
  };
  replies: Replies[];
  replyingTo?: string;
}

export interface AddCommentProps {
  image: string;
  username: string;
  placeholder: string;
  comments: Comment[];
  setComment: (value: SetStateAction<Comment[]>) => void;
  commentId: number;
  responseTo: string;
  type: string;
}

export interface DeleteWarningProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export interface ReplyProps {
  userImage: string;
  userName: string;
  dateCreated: string;
  commentContent: string;
  commentScore: number;
  user: string;
  responseTo: string;
  deleteComment: () => void;
  addCommentImage: string;
  placeholder: string;
  setComment: (value: SetStateAction<Comment[]>) => void;
  id: number;
  comments: Comment[];
}
