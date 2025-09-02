import { useFetchBlog } from "../hooks/fetchOneBlog";
import { AppBar } from "../components/AppBar";
import { useParams } from "react-router-dom";
import { Avatar } from "../components/BlogCard";
import { DeleteBlog } from "../hooks/DeleteBlog";
import { useNavigate } from "react-router-dom";
export function Blog() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {loading, blog} = useFetchBlog({id:id!});
  if (loading) {
    return (
      <>
        <AppBar />
        <div className="max-w-2xl mx-auto px-4 animate-pulse">
      {/* Author */}
      <div className="flex items-center mt-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="ml-2 h-4 w-24 bg-gray-300 rounded"></div>
      </div>

      {/* Title */}
      <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>

      {/* Content preview lines */}
      <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-gray-300 rounded mb-4"></div>

      {/* Footer */}
      <div className="h-3 w-40 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-20 bg-gray-300 rounded"></div>

      <hr className="mt-6 border-gray-200" />
    </div>
      </>
    );
  }
  return (
    <>
    <AppBar />
     <div className="max-w-2xl mx-auto px-4 pt-20">
     <div className="mb-6">
  <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-3 break-words">
    {blog.title}
  </h1>
      <div className="flex items-center">
        <Avatar name={blog.author?.name ?? blog.author?.email} />
       <p className="text-gray-500 text-sm ml-2 truncate max-w-[200px] md:max-w-none">
         By {blog.author?.name ?? blog.author?.email}
        </p>
      </div>
    </div>

      <p className="text-lg leading-7">{blog.content}</p>
      <div className="mt-3">
      <button  className="text-md bg-red-500 text-white px-4 py-2 rounded-full"onClick={async (e)=>{
      e.preventDefault();
      await DeleteBlog({id:id!});
      navigate("/blogs");
    }}>Delete Blog</button>
    <button  className="text-md bg-green-500 text-white px-4 py-2 rounded-full ml-2" onClick={()=>{
      navigate("/blogs");
    }}>Back to Blogs</button>
    </div>
    </div>
    </>
  )
}