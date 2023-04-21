import Head from "next/head";
import Main from "@/components/Main";

export default function Home() {
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
      <main>
        <Main />
      </main>
    </>
  );
}
