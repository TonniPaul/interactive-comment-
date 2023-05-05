import { AddCommentProps } from "@/interface/interfaces";
import { AddCommentStyle, SendButton } from "@/styles/main.styled";
import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";
import crypto from "crypto";

const AddComment = ({
  image,
  placeholder,
  comments,
  setComment,
  username,
  commentId,
  type,
}: AddCommentProps) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("myComments", JSON.stringify(comments));
  }, [comments]);

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    const nComment = {
      id: parseInt(crypto.randomBytes(16).toString("hex")),
      content: value,
      score: 0,
      user: {
        image: { png: image },
        username: username,
      },
      replies: [],
      replyingTo: "",
      createdAt: "just now",
    };

    if (type === "comment") {
      const updatedComments = [...comments, nComment];

      setComment(updatedComments);
    } else {
      const updatedReplies = comments.map((comment) => {
        const nReply = {
          id: parseInt(crypto.randomBytes(16).toString("hex")),
          content: value,
          createdAt: "just now",
          score: 0,
          user: {
            image: { png: image },
            username: username,
          },
          replyingTo: comment.user.username,
        };
        if (comment.id === commentId) {
          return { ...comment, replies: [...comment.replies, nReply] };
        }
        return comment;
      });

      setComment(updatedReplies);
    }

    setValue("");
  };

  return (
    <AddCommentStyle onSubmit={handelSubmit}>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={handleValueChange}
      />

      <Image src={image} alt="profile-img" width={30} height={30} />
      <SendButton>Send</SendButton>
    </AddCommentStyle>
  );
};

export default AddComment;
