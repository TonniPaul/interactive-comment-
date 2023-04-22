import { AddCommentProps } from "@/interface/interfaces";
import { AddCommentStyle, SendButton } from "@/styles/main.styled";
import Image from "next/image";
import { useState } from "react";

const AddComment = ({
  image,
  replyingTo,
  onSubmit,
  onChange,
}: AddCommentProps) => {
  const [replyValue, setReplyValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyValue(e.target.value);
  };

  return (
    <AddCommentStyle onSubmit={onSubmit}>
      <textarea value={replyingTo} onChange={onChange} />
      <Image src={image} alt="profile-img" width={30} height={30} />
      <SendButton>Send</SendButton>
    </AddCommentStyle>
  );
};

export default AddComment;
