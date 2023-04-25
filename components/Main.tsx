import { ReplyContainerStyle, Container, Loader } from "@/styles/main.styled";
import ReplyCard from "./ReplyCard";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AddComment from "./AddComment";
import { Comment, CommentUser } from "@/interface/interfaces";
import useSWR from "swr";
import DeleteWarning from "./DeleteWarning";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Main = () => {
  const [comment, setComments] = useState<Comment[]>([]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const { data, error, mutate } = useSWR("/api/comments", fetcher);
  if (error) return <Loader color="var(--red)">Error fetching comments</Loader>;
  if (!data) return <Loader color="var(--blue)">Loading comments...</Loader>;

  const { comments, currentUser } = data;

  const handleReplyClick = (commentId: number) => {
    setReplyingTo(commentId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyValue(e.target.value);
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsReplying(false);

    if (!replyValue.trim()) return;

    const nComment = {
      id: comments.length + 1,
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
    setReplyValue("");
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nComment),
    });

    if (res.ok) {
      const updatedComments = [...comments, nComment];
      localStorage.setItem("myData", JSON.stringify(updatedComments));
      mutate({ comments: updatedComments, currentUser }, false);
    }
  };

  return (
    <Container>
      {comments.map((data: Comment, index: number) => {
        return (
          <div key={index}>
            <ReplyCard
              userImage={data.user.image.png}
              userName={data.user.username}
              dateCreated={data.createdAt}
              commentContent={data.content}
              commentScore={data.score}
              user={currentUser.username}
              onReplyClick={handleReplyClick}
              commentId={data.id}
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
                  <div key={reply.id}>
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
                    />
                  </div>
                );
              })}
            </ReplyContainerStyle>
          </div>
        );
      })}
      <AddComment
        key={currentUser.username}
        image={currentUser.image.png}
        onChange={handleInputChange}
        onSubmit={handleCommentSubmit}
        replyingTo={replyValue}
      />
    </Container>
  );
};

export default Main;
