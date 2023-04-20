import {
  CardStyle,
  ScoreCountContainer,
  SpaceBetween,
  ReplyButton,
  TextAreaStyle,
  Block,
  UserData,
  ReplyContainerStyle,
} from "@/styles/main.styled";
import replyIcon from "../public/images/icon-reply.svg";
import Image from "next/image";
import ReplyCard from "./ReplyCard";
import MyComment from "./MyComment";
import { useState } from "react";
import AddComment from "./AddComment";

interface CommentUser {
  id: number;
  user: {
    image: {
      png: string;
    };
    username: string;
  };
}

interface CommentReply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  users: CommentUser[];
}

interface CommentsProps {
  userImage: string;
  userName: string;
  dateCreated: string;
  commentContent: string;
  commentScore: number;
  replies: CommentReply[];
  replyImage: string;
}

const Cards = ({
  userImage,
  userName,
  dateCreated,
  commentContent,
  commentScore,
  replies,
}: CommentsProps) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleSubmit = () => {
    setIsReplying(false);
    setIsSubmitted(true);
  };
  return (
    <>
      <CardStyle>
        <Block>
          <UserData>
            <Image src={userImage} alt={userName} width={30} height={30} />
            <p>{userName}</p>
            <p>{dateCreated}</p>
          </UserData>

          <TextAreaStyle value={commentContent} disabled />
        </Block>
        <SpaceBetween>
          <ScoreCountContainer>
            <button>+</button>
            <button> {commentScore} </button>
            <button>-</button>
          </ScoreCountContainer>

          {!isReplying && (
            <ReplyButton onClick={handleReplyClick}>
              <Image src={replyIcon} alt="reply-icon" />
              Reply
            </ReplyButton>
          )}
        </SpaceBetween>
      </CardStyle>

      <ReplyContainerStyle>
        <hr />
        {isReplying && (
          <AddComment
            image={"/images/avatars/image-amyrobson.png"}
            onSubmit={function (comment: string): void {
              setNewComment(comment);
            }}
          />
        )}
        {!isReplying && <MyComment />}
        <ReplyCard
          userImage={"/images/avatars/image-amyrobson.png"}
          userName={"tonnipaul"}
          dateCreated={"3 weeks ago"}
          commentContent={
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant."
          }
          commentScore={2}
        />
        <ReplyCard
          userImage={"/images/avatars/image-juliusomo.png"}
          userName={"juliusomo"}
          dateCreated={"2 days ago"}
          commentContent={
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first."
          }
          commentScore={6}
        />
      </ReplyContainerStyle>
    </>
  );
};

export default Cards;
