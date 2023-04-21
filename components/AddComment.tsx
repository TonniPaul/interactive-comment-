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
  const [replyTo, setReplyTo] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyTo(e.target.value);
    onChange(e);
  };

  return (
    <AddCommentStyle onSubmit={onSubmit}>
      <textarea value={replyTo} onChange={handleChange} />
      <Image src={image} alt="profile-img" width={30} height={30} />
      <SendButton>Send</SendButton>
    </AddCommentStyle>
  );
};

export default AddComment;
