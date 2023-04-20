import {
  CardStyle,
  ScoreCountContainer,
  SpaceBetween,
  TextAreaStyle,
  Block,
  UserData,
  ButtonContainer,
} from "@/styles/main.styled";
import editIcon from "../public/images/icon-edit.svg";
import deleteIcon from "../public/images/icon-delete.svg";
import Image from "next/image";

const MyComment = () => {
  return (
    <CardStyle>
      <Block>
        <UserData>
          <Image
            src={"/images/avatars/image-amyrobson.png"}
            alt={"profile photo"}
            width={30}
            height={30}
          />
          <p>ariyo</p>
          <span>you</span>
          <p>seconds ago</p>
        </UserData>

        <TextAreaStyle value={""} disabled />
      </Block>
      <SpaceBetween>
        <ScoreCountContainer>
          <button>+</button>
          <button> {0} </button>
          <button>-</button>
        </ScoreCountContainer>
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
      </SpaceBetween>
    </CardStyle>
  );
};

export default MyComment;
