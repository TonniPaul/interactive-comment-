import {
  CardStyle,
  ImageStyle,
  ScoreCountContainer,
  SpaceBetween,
  ReplyButton,
  TextAreaStyle,
  Block,
  UserData,
  ButtonContainer,
  PrimaryButton,
} from "@/styles/main.styled";
import replyIcon from "../public/images/icon-reply.svg";
import editIcon from "../public/images/icon-edit.svg";
import deleteIcon from "../public/images/icon-delete.svg";
import Image from "next/image";
import { useState } from "react";
import DeleteWarning from "./DeleteWarning";

interface ReplyProps {
  userImage: string;
  userName: string;
  dateCreated: string;
  commentContent: string;
  commentScore: number;
  user: string;
  onReplyClick: (commentId: number) => void;
  commentId: number;
}
const ReplyCard = ({
  userImage,
  userName,
  dateCreated,
  commentContent,
  commentScore,
  onReplyClick,
  user,
  commentId,
}: ReplyProps) => {
  const [voteCount, setVoteCount] = useState<number>(commentScore);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string>(commentContent);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleVoteAdd = () => {
    if (!hasVoted) {
      setVoteCount(voteCount + 1);
      setHasVoted(true);
    }
    if (userName === user) {
      setVoteCount(voteCount);
    }
  };

  const handleVoteRemove = () => {
    if (hasVoted) {
      setVoteCount(voteCount - 1);
      setHasVoted(false);
    }
    if (userName === user) {
      setVoteCount(voteCount);
    }
  };
  const handleCancelClick = () => {
    setIsDeleting(false);
  };
  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedComment(e.target.value);
  };

  const handleEditUpdate = async () => {
    setIsEditing(false);
    // try {
    //   const res = await fetch(`/api/comments/${commentId}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ content: editedComment }),
    //   });
    //   const { data } = await res.json();
    //   setEditedComment(data.content);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <CardStyle>
      <Block>
        <UserData>
          <ImageStyle>
            <Image src={userImage} alt={userName} width={30} height={30} />
          </ImageStyle>
          <p>{userName}</p>
          {userName === user && <span>you</span>}

          <p>{dateCreated}</p>
        </UserData>

        <TextAreaStyle
          value={editedComment}
          disabled={isEditing ? false : true}
          border={!isEditing ? "none" : "2px solid var(--borderColor)"}
          padding={!isEditing ? "none" : ".5rem 1rem"}
          height={!isEditing ? "120px" : "150px"}
          onChange={handleCommentChange}
        />
        {isEditing && (
          <span>
            <PrimaryButton onClick={handleEditUpdate}>Update</PrimaryButton>
          </span>
        )}
      </Block>
      <SpaceBetween>
        <ScoreCountContainer>
          <button onClick={handleVoteAdd}>+</button>
          <button> {voteCount} </button>
          <button onClick={handleVoteRemove}>-</button>
        </ScoreCountContainer>

        {userName !== user ? (
          <ReplyButton onClick={() => onReplyClick(commentId)}>
            <Image src={replyIcon} alt="reply-icon" />
            Reply
          </ReplyButton>
        ) : (
          <ButtonContainer>
            {!isEditing && (
              <button onClick={handleDeleteClick}>
                <Image src={deleteIcon} alt="reply-icon" />
                Delete
              </button>
            )}
            {!isEditing && (
              <button onClick={handleEditClick}>
                <Image src={editIcon} alt="reply-icon" />
                Edit
              </button>
            )}
          </ButtonContainer>
        )}
      </SpaceBetween>
      {isDeleting && (
        <DeleteWarning
          onDelete={handleCancelClick}
          onCancel={handleCancelClick}
        />
      )}
    </CardStyle>
  );
};

export default ReplyCard;
