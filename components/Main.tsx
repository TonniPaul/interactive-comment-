import { ReplyContainerStyle, Container, Loader } from "@/styles/main.styled";
import ReplyCard from "./ReplyCard";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AddComment from "./AddComment";
import { Comment, CommentUser } from "@/interface/interfaces";
import myData from "../public/data.json";
import crypto from "crypto";

const Main = () => {
  const [comment, setComment] = useState<Comment[]>([]);
  const currentUser = myData.currentUser;

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("myComments") || "[]");
    if (localData.length <= 0) {
      setComment(myData.comments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myComments", JSON.stringify(comment));
  }, [comment]);

  const handleCommentDelete = (commentId: number) => {
    const filteredComments = comment.filter(
      (comments) => comments.id !== commentId
    );
    setComment(filteredComments);
  };

  const handleCommentReplyDelete = (commentId: number, replyId: number) => {
    const filteredReplies = comment.map((comment) => {
      if (comment.id === commentId) {
        comment.replies = comment.replies.filter(
          (comment) => comment.id !== replyId
        );
      }
      return comment;
    });
    setComment(filteredReplies);
  };

  return (
    <Container>
      {comment.map((data: Comment, index: number) => {
        return (
          <div key={data.id}>
            <ReplyCard
              userImage={data.user.image.png}
              userName={data.user.username}
              dateCreated={data.createdAt}
              commentContent={data.content}
              commentScore={data.score}
              user={currentUser.username}
              deleteComment={() => handleCommentDelete(data.id)}
              responseTo={""}
              setComment={setComment}
              addCommentImage={currentUser.image.png}
              placeholder={"Add Reply...."}
              id={data.id}
              comments={comment}
            />
            <ReplyContainerStyle>
              {data.replies.map((reply) => {
                return (
                  <ReplyCard
                    key={reply.id}
                    userImage={reply.user.image.png}
                    userName={reply.user.username}
                    dateCreated={reply.createdAt}
                    commentContent={reply.content}
                    commentScore={reply.score}
                    user={currentUser.username}
                    deleteComment={() =>
                      handleCommentReplyDelete(data.id, reply.id)
                    }
                    responseTo={reply.replyingTo}
                    addCommentImage={currentUser.image.png}
                    placeholder={"Add Reply...."}
                    comments={comment}
                    setComment={setComment}
                    id={data.id}
                  />
                );
              })}
            </ReplyContainerStyle>
          </div>
        );
      })}

      <AddComment
        image={currentUser.image.png}
        placeholder={"Add Comment...."}
        username={currentUser.username}
        comments={comment}
        setComment={setComment}
        commentId={parseInt(crypto.randomBytes(16).toString("hex"))}
        type={"comment"}
      />
    </Container>
  );
};

export default Main;
