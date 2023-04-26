import { ReplyContainerStyle, Container, Loader } from "@/styles/main.styled";
import ReplyCard from "./ReplyCard";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AddComment from "./AddComment";
import { Comment, CommentUser } from "@/interface/interfaces";
import myData from "../public/data.json";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Main = () => {
  const [comment, setComment] = useState<Comment[]>([]);
  const currentUser = myData.currentUser;
  const [replyValue, setReplyValue] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  useEffect(() => {
    const localComments = JSON.parse(
      localStorage.getItem("myComments") || "[]"
    );
    if (localComments) {
      setComment(myData.comments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myComments", JSON.stringify(comment));
  }, [comment]);

  // const { data, error, mutate } = useSWR("/api/comments", fetcher);
  // if (error) return <Loader color="var(--red)">Error fetching comments</Loader>;
  // if (!data) return <Loader color="var(--blue)">Loading comments...</Loader>;

  // const { comments, currentUsers } = data;

  const handleReplyClick = (commentId: number) => {
    setReplyingTo(commentId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyValue(e.target.value);
  };

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!replyValue.trim()) return;

    const nComment = {
      id: Date.now(),
      content: replyValue,
      createdAt: "just now",
      score: 0,
      user: {
        image: { png: currentUser.image.png },
        username: currentUser.username,
      },
      replies: [],
      replyingTo: "",
    };

    const updatedComment = [...comment, nComment];
    setComment(updatedComment);
    setReplyValue("");
  };
  const handleCommentReplyAdd = (commentId: number, replyId: number) => {
    const updatedComments = comment.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = [
          ...comment.replies,
          {
            id: Date.now(),
            content: replyValue,
            createdAt: "just now",
            score: 0,
            user: {
              image: { png: currentUser.image.png },
              username: currentUser.username,
            },
            replies: [],
            replyingTo: comment.user.username,
          },
        ];
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComment(updatedComments);
    setReplyingTo(null);
  };

  const handleCommentDelete = (commentId: number) => {
    console.log("commentId", commentId);
    console.log("comment", comment);
    const filteredComments = comment.filter((c) => c.id !== commentId);
    console.log("filteredComments", filteredComments);
    setComment(filteredComments);
  };

  const handleCommentReplyDelete = (commentId: number, replyId: number) => {
    const removedComments = comment.map((comment) => {
      if (comment.id === commentId) {
        comment.replies = comment.replies.filter(
          (comment) => comment.id !== replyId
        );
      }
      return comment;
    });
    console.log("Date Now", Date.now);
    console.log("removedComments", removedComments);
    setComment(removedComments);
  };
  console.log("comment-out", comment);

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
              onReplyClick={handleReplyClick}
              commentId={data.id}
              deleteComment={() => handleCommentDelete(data.id)}
            />
            <ReplyContainerStyle>
              <hr />
              {replyingTo === data.id && (
                <AddComment
                  image={"/images/avatars/image-amyrobson.png"}
                  onChange={handleInputChange}
                  onSubmit={handleCommentSubmit}
                  replyingTo={data.user.username}
                />
              )}
              {data.replies.map((reply) => {
                return (
                  <ReplyCard
                    key={reply.id}
                    userImage={reply.user.image.png}
                    userName={reply.user.username}
                    dateCreated={reply.createdAt}
                    commentContent={reply.content}
                    commentScore={reply.score}
                    onReplyClick={handleReplyClick}
                    user={currentUser.username}
                    commentId={data.id}
                    deleteComment={() =>
                      handleCommentReplyDelete(data.id, reply.id)
                    }
                  />
                );
              })}
            </ReplyContainerStyle>
          </div>
        );
      })}
      <AddComment
        image={currentUser.image.png}
        onChange={handleInputChange}
        onSubmit={handleCommentSubmit}
        replyingTo={replyValue}
      />
    </Container>
  );
};

export default Main;
