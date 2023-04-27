import {
  CardStyle,
  ScoreCountContainer,
  SpaceBetween,
  ReplyButton,
  TextAreaStyle,
  Block,
  UserData,
  ButtonContainer,
  PrimaryButton,
  ContentTextStyle,
  ReplyContainerStyle,
} from "@/styles/main.styled";
import { FormEvent } from "react";
import replyIcon from "../public/images/icon-reply.svg";
import editIcon from "../public/images/icon-edit.svg";
import deleteIcon from "../public/images/icon-delete.svg";
import Image from "next/image";
import { useState } from "react";
import DeleteWarning from "./DeleteWarning";
import { Comment } from "@/interface/interfaces";
import AddComment from "./AddComment";

interface ReplyProps {
  userImage: string;
  userName: string;
  dateCreated: string;
  commentContent: string;
  commentScore: number;
  user: string;
  responseTo: string;
  onReplyClick: (commentId: number) => void;
  commentId: number;
  deleteComment: () => void;
  replyValue: string;
  addCommentImage: string;
  commentSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  replyId: boolean;
}
const ReplyCard = ({
  userImage,
  userName,
  dateCreated,
  commentContent,
  commentScore,
  onReplyClick,
  user,
  responseTo,
  commentId,
  deleteComment,
  replyValue,
  addCommentImage,
  commentSubmit,
  onChange,
  replyId,
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
  const handleUpdateCancel = () => {
    setIsEditing(false);
  };

  const handleEditUpdate = () => {
    setIsEditing(false);
  };

  const handleCommentDelete = () => {
    deleteComment();
    setIsDeleting(false);
  };

  return (
    <div>
      <CardStyle>
        <Block>
          <UserData>
            <Image src={userImage} alt={userName} width={30} height={30} />
            <p>{userName}</p>
            {userName === user && <span>you</span>}

            <p>{dateCreated}</p>
          </UserData>
          {!isEditing ? (
            <ContentTextStyle>
              {responseTo && <span>@{responseTo} </span>}
              {editedComment}
            </ContentTextStyle>
          ) : (
            <TextAreaStyle
              value={editedComment}
              disabled={isEditing ? false : true}
              onChange={handleCommentChange}
            />
          )}

          {isEditing && (
            <span>
              <PrimaryButton onClick={handleUpdateCancel}>Cancel</PrimaryButton>
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
            onCancel={handleCancelClick}
            onConfirm={handleCommentDelete}
          />
        )}
      </CardStyle>
      <ReplyContainerStyle>
        <hr />
        {replyId && (
          <AddComment
            onChange={onChange}
            onSubmit={commentSubmit}
            image={addCommentImage}
            replyValue={replyValue}
          />
        )}
      </ReplyContainerStyle>
    </div>
  );
};

export default ReplyCard;
