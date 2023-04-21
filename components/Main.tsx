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
} from "@/styles/main.styled";
import replyIcon from "../public/images/icon-reply.svg";
import Image from "next/image";
import ReplyCard from "./ReplyCard";
import MyComment from "./MyComment";
import { useState, useEffect } from "react";
import AddComment from "./AddComment";
import { Comment, CommentUser } from "@/interface/interfaces";

const Main = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<CommentUser[]>([]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    fetch("/api/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setUser(data.currentUser);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleSubmit = () => {
    setIsReplying(false);
    setIsSubmitted(true);
  };

  return (
    <Container>
      {comments.map((data, index) => {
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
                  <p>{data.createdAt}</p>
                </UserData>

                <TextAreaStyle value={data.content} disabled />
              </Block>
              <SpaceBetween>
                <ScoreCountContainer>
                  <button>+</button>
                  <button> {data.score} </button>
                  <button>-</button>
                </ScoreCountContainer>

                {!isReplying && (
                  <ReplyButton onClick={handleReplyClick}>
                    <Image src={replyIcon} alt="reply-icon" />
                    Reply
                  </ReplyButton>
                )}
              </SpaceBetween>
            </CardStyle>

            <ReplyContainerStyle>
              <hr />
              {isReplying && (
                <AddComment
                  image={"/images/avatars/image-amyrobson.png"}
                  onChange={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onSubmit={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  replyingTo={"hello there"}
                />
              )}
              {!isReplying && <MyComment />}
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
                            onSubmit={function (): void {
                              throw new Error("Function not implemented.");
                            }}
                            replyingTo={"hello there"}
                          />
                        )}
                        {/* {!isReplying && <MyComment />} */}
                      </ReplyContainerStyle>
                    )}
                  </div>
                );
              })}
            </ReplyContainerStyle>
          </div>
        );
      })}
      {/* {user.map((user) => {
          return (
            <AddComment
              key={user.username}
              image={user.image.png}
              onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
              onChange={() => {}}
            />
          );
        })} */}
    </Container>
  );
};

export default Main;
