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
import { CommentProps } from "@/interface/interfaces";

const Cards = ({
  userImage,
  userName,
  dateCreated,
  commentContent,
  commentScore,
  replies,
}: CommentProps) => {
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
        {/* {!isReplying && <MyComment />} */}

        {replies.map((reply) => {
          return (
            <ReplyCard
              key={reply.id}
              userImage={reply.user.image.png}
              userName={reply.user.username}
              dateCreated={reply.createdAt}
              commentContent={reply.content}
              commentScore={reply.score}
            />
          );
        })}
      </ReplyContainerStyle>
    </>
  );
};

export default Cards;
