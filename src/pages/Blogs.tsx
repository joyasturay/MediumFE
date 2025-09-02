import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useFetchBlogs } from "../hooks/fetchBlogs";
export const Blogs = () => {
  const { loading, blogs } = useFetchBlogs();

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
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          title={blog.title}
          content={blog.content}
          author={blog.author?.name ?? blog.author?.email ?? "Unknown"}
        />
      ))}
    </>
  );
};
