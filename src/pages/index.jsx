import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "../pages/[id]/index";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <main>
        <header className="mb-8">
          <h1 className="text-lg text-center">Oraciones</h1>
        </header>

        <p className="">All Posts</p>
        <ol className="list-none ">
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            
            return (
              <Link key={post.id} href={`/${post.id}`}>
                <li className="pl-2 list-none rounded-md bg-zinc-200 hover:scale-95">
                  <h3 className="mt-4">
                    <Text text={post.properties.Name.title} />
                  </h3>

                  <p className="mb-2">{date}</p>
                  <p className="font-bold text-red-500">Read post →</p>
                </li>
              </Link>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
