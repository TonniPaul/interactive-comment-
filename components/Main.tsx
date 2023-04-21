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
} from "@/styles/main.styled";
import replyIcon from "../public/images/icon-reply.svg";
import Image from "next/image";
import ReplyCard from "./ReplyCard";
import MyComment from "./MyComment";
import { useState, useEffect } from "react";
import AddComment from "./AddComment";
import { Comment, CommentUser } from "@/interface/interfaces";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Main = () => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

  const { data, error } = useSWR("/api/comments", fetcher);
  if (error) return <div>Error fetching comments</div>;
  if (!data) return <Loader>Loading comments...</Loader>;

  const { comments, currentUser } = data;

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleSubmit = () => {
    setIsReplying(false);
    setIsSubmitted(true);
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
