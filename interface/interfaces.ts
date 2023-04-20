interface CommentUser {
  id: number;
  user: {
    image: {
      png: string;
    };
    username: string;
  };
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
}

export interface CommentProps {
  userImage: string;
  userName: string;
  dateCreated: string;
  commentContent: string;
  commentScore: number;
  replies: Replies[];
  replyImage: string;
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
