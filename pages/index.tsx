import Head from "next/head";
import { Container } from "@/styles/main.styled";
import Cards from "@/components/Cards";
import { useState, useEffect } from "react";
import AddComment from "@/components/AddComment";
import { Comment } from "@/interface/interfaces";

export default function Home() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/api/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Head>
        <title>Interactive comments section</title>
        <meta
          name="description"
          content="This is TonniPaul's solution to the Interactive comments section challenge on Frontend Mentor"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <Container>
        {comments.map((comment, index) => {
          return (
            <Cards
              key={index}
              userImage={comment.user.image.png}
              userName={comment.user.username}
              dateCreated={comment.createdAt}
              commentContent={comment.content}
              commentScore={comment.score}
              replies={comment.replies}
              replyImage={comment.user.image.png}
            />
          );
        })}
        <AddComment
          image={"/images/avatars/image-amyrobson.png"}
          onSubmit={function (comment: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        {/* {c.map((user) => {
          return <AddComment key={user.username} image={user.image.png} />;
        })} */}
      </Container>
    </>
  );
}
