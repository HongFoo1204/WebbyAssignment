//type
import { ReactElement } from "react";
import { Blog } from "../interface";

//library
import React, { useState } from "react";
import Image from "next/image";

//components
import getBlogsData from "./getBlogsData";
import { useAuth } from "./AuthContext";

const BlogList: React.FC = (): ReactElement => {
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(2);
  const { user, logout } = useAuth();
  const { blogs } = getBlogsData(start, limit);

  return (
    <main className="min-h-screen flex flex-col justify-center bg-gray-300">
      <nav className="flex flex-row justify-end">
        <button className="p-5 underline" onClick={() => logout()}>
          logout
        </button>
      </nav>

      <h1 className="pt-20 text-5xl text-center font-semibold">
        Hi, <span className="text-blue-500 ">{user?.user_fullname}</span>!
        Welcome to My Website!
      </h1>

      <p className="m-8 text-2xl text-center">Blog List</p>

      <div className="w-2/3 flex-1 flex flex-wrap justify-center items-center self-center">
        {blogs.map((blog: Blog) => {
          return (
            <a
              href="#"
              className="m-4 p-6 text-left text-inherit border-2 rounded-xl max-w-xs bg-slate-300 hover:bg-slate-400 hover:border-blue-400"
              key={blog.blog_id}
            >
              <Image
                //represent blog_media
                src="/1.jpg"
                alt="Picture of the author"
                width={500}
                height={350}
              ></Image>
              <h2 className="text-blue-500 text-2xl font-medium">
                {blog.blog_title}
              </h2>
              <p className="text-gray-700 italic">{blog.blog_description}</p>
            </a>
          );
        })}
      </div>

      <footer className="w-full flex mt-auto p-4 border-t justify-center items-center">
        <input
          className="w-12 border-2 rounded-lg text-center"
          value={limit}
          type="number"
          onChange={(e) => {
            if (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 6) {
              setLimit(parseInt(e.target.value));
            }
            return;
          }}
        ></input>
        <p className="ml-2">per page</p>
        <button
          className={`border-2 rounded-lg mx-5 bg-white ${
            start == 0 ? "hidden" : "block"
          }`}
          onClick={() => {
            if (start - limit > 0) setStart(start - limit);
            else setStart(0);
          }}
        >
          previous
        </button>
        <button
          className={`border-2 rounded-lg mx-5 bg-white ${
            blogs.length < limit ? "hidden" : "block"
          }`}
          onClick={() => setStart(start + limit)}
        >
          next
        </button>
      </footer>
    </main>
  );
};

export default BlogList;
