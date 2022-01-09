//library
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useState, useEffect } from "react";
import { Blog } from "../interface";

const GetBlogsData = (start: number, limit: number) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const client = new ApolloClient({
        uri: "https://graph-api-test.webby.asia/graphql",
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
        query: gql`
          query GetBlogs {
            blogs(start: ${start}, limit: ${limit}, setting_language_slug: "en") {
              blog_id
              blog_description
              blog_title
              blog_media
            }
          }
        `,
      });

      setBlogs(data.blogs);
    };
    fetchData();
  }, [start, limit]);

  return { blogs };
};

export default GetBlogsData;
