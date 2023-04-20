import { AddCommentStyle, SendButton } from "@/styles/main.styled";
import Image from "next/image";
import { FormEvent, useState } from "react";

interface AddCommentProps {
  image: string;
  onSubmit: (comment: string) => void;
}

const AddComment = ({ image, onSubmit }: AddCommentProps) => {
  const [isSubmitting, setIsSubmitted] = useState<boolean>(false);
  const [myComment, setMyComment] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyComment(e.target.value);
  };

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmit(myComment);
  };

  return (
    <AddCommentStyle onSubmit={handleCommentSubmit}>
      <textarea value={myComment} onChange={handleChange} />
      <Image src={image} alt="profile-img" width={30} height={30} />
      <SendButton disabled={isSubmitting}>Send</SendButton>
    </AddCommentStyle>
  );
};

export default AddComment;
