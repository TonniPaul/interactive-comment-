import {
  CardStyle,
  ImageStyle,
  ScoreCountContainer,
  SpaceBetween,
  ReplyButton,
  TextAreaStyle,
  Block,
  UserData,
} from "@/styles/main.styled";
import replyIcon from "../public/images/icon-reply.svg";
import Image from "next/image";

interface ReplyProps {
  userImage: string;
  userName: string;
  dateCreated: string;
  commentContent: string;
  commentScore: number;
  onClick: () => void;
}
const ReplyCard = ({
  userImage,
  userName,
  dateCreated,
  commentContent,
  commentScore,
  onClick,
}: ReplyProps) => {
  return (
    <CardStyle>
      <Block>
        <UserData>
          <ImageStyle>
            <Image src={userImage} alt={userName} width={30} height={30} />
          </ImageStyle>
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

        <ReplyButton onClick={onClick}>
          <Image src={replyIcon} alt="reply-icon" />
          Reply
        </ReplyButton>
      </SpaceBetween>
    </CardStyle>
  );
};

export default ReplyCard;
