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
} from "@/styles/main.styled";
import replyIcon from "../public/images/icon-reply.svg";
import editIcon from "../public/images/icon-edit.svg";
import deleteIcon from "../public/images/icon-delete.svg";
import Image from "next/image";

interface ReplyProps {
  userImage: string;
  userName: string;
  dateCreated: string;
  commentContent: string;
  commentScore: number;
  user: boolean;
  handleAdd: () => void;
  onClick: () => void;
}
const ReplyCard = ({
  userImage,
  userName,
  dateCreated,
  commentContent,
  commentScore,
  onClick,
  user,
}: ReplyProps) => {
  return (
    <CardStyle>
      <Block>
        <UserData>
          <ImageStyle>
            <Image src={userImage} alt={userName} width={30} height={30} />
          </ImageStyle>
          <p>{userName}</p>
          {user && <span>you</span>}

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

        {!user ? (
          <ReplyButton onClick={onClick}>
            <Image src={replyIcon} alt="reply-icon" />
            Reply
          </ReplyButton>
        ) : (
          <ButtonContainer>
            <button>
              <Image src={deleteIcon} alt="reply-icon" />
              Delete
            </button>
            <button>
              <Image src={editIcon} alt="reply-icon" />
              Edit
            </button>
          </ButtonContainer>
        )}
      </SpaceBetween>
    </CardStyle>
  );
};

export default ReplyCard;
