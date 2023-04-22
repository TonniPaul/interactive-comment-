import {
  CardStyle,
  ScoreCountContainer,
  SpaceBetween,
  ReplyButton,
  TextAreaStyle,
  Block,
  UserData,
  ReplyContainerStyle,
  Container,
  Loader,
  ButtonContainer,
} from "@/styles/main.styled";
import replyIcon from "../public/images/icon-reply.svg";
import Image from "next/image";
import ReplyCard from "./ReplyCard";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AddComment from "./AddComment";
import { Comment, CommentUser } from "@/interface/interfaces";
import editIcon from "../public/images/icon-edit.svg";
import deleteIcon from "../public/images/icon-delete.svg";
import useSWR from "swr";
import DeleteWarning from "./DeleteWarning";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Main = () => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState<string>("");
  const [newComment, setNewComment] = useState<Comment>({
    id: 0,
    content: "",
    createdAt: "",
    score: 0,
    user: { image: { png: "" }, username: "" },
    replies: [],
    replyingTo: "",
  });

  const { data, error, mutate } = useSWR("/api/comments", fetcher);
  if (error) return <Loader color="red">Error fetching comments</Loader>;
  if (!data) return <Loader color="#5357b6">Loading comments...</Loader>;

  const { comments, currentUser } = data;

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyValue(e.target.value);
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsReplying(false);

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
      // setNewComment(updatedComments);
      mutate({ comments: updatedComments, currentUser }, false);
    }
  };

  return (
    <Container>
      {comments.map((data: Comment, index: number) => {
        return (
          <div key={index}>
            <CardStyle>
              <Block>
                <UserData>
                  <Image
                    src={data.user.image.png}
                    alt={data.user.username}
                    width={30}
                    height={30}
                  />
                  <p>{data.user.username}</p>
                  {data.user.username === currentUser.username && (
                    <span>you</span>
                  )}

                  <p>{data.createdAt}</p>
                </UserData>

                <TextAreaStyle value={data.content} disabled />
              </Block>
              <SpaceBetween>
                <ScoreCountContainer>
                  <button
                    onClick={() => {
                      data.score + 1;
                    }}
                  >
                    +
                  </button>
                  <button> {data.score + 1} </button>
                  <button>-</button>
                </ScoreCountContainer>

                {data.user.username !== currentUser.username ? (
                  <ReplyButton onClick={handleReplyClick}>
                    <Image src={replyIcon} alt="reply-icon" />
                    Reply
                  </ReplyButton>
                ) : (
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
                )}
              </SpaceBetween>
            </CardStyle>
            <DeleteWarning
              onCancel={function (): void {
                throw new Error("Function not implemented.");
              }}
              onDelete={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            <ReplyContainerStyle>
              <hr />
              {isReplying && (
                <AddComment
                  image={"/images/avatars/image-amyrobson.png"}
                  onChange={handleInputChange}
                  onSubmit={handleCommentSubmit}
                  replyingTo={""}
                />
              )}
              {data.replies.length > 0 && (
                <ReplyCard
                  userImage={""}
                  userName={""}
                  dateCreated={""}
                  commentContent={""}
                  commentScore={0}
                  user={false}
                  onClick={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  handleAdd={function (): void {
                    throw new Error("Function not implemented.");
                  }}
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
                      onClick={handleReplyClick}
                      user={reply.user.username === currentUser.username}
                      handleAdd={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                    {isReplying && (
                      <ReplyContainerStyle>
                        <hr />
                        {isReplying && (
                          <AddComment
                            image={"/images/avatars/image-amyrobson.png"}
                            onChange={function (): void {
                              throw new Error("Function not implemented.");
                            }}
                            onSubmit={handleCommentSubmit}
                            replyingTo={"hello there"}
                          />
                        )}
                        {isSubmitted && !isReplying && (
                          <ReplyCard
                            userImage={""}
                            userName={""}
                            dateCreated={""}
                            commentContent={""}
                            commentScore={0}
                            user={false}
                            onClick={function (): void {
                              throw new Error("Function not implemented.");
                            }}
                            handleAdd={function (): void {
                              throw new Error("Function not implemented.");
                            }}
                          />
                        )}
                      </ReplyContainerStyle>
                    )}
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
