import { AddCommentProps } from "@/interface/interfaces";
import { AddCommentStyle, SendButton } from "@/styles/main.styled";
import Image from "next/image";

const AddComment = ({
  image,
  replyValue,
  onSubmit,
  onChange,
}: AddCommentProps) => {
  return (
    <AddCommentStyle onSubmit={onSubmit}>
      <textarea value={replyValue} onChange={onChange} />
      <Image src={image} alt="profile-img" width={30} height={30} />
      <SendButton>Send</SendButton>
    </AddCommentStyle>
  );
};

export default AddComment;
