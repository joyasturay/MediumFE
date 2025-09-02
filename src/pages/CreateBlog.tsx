import { AppBar } from '../components/AppBar'
import { postSchema } from '@joyastu/common'
import {z} from "zod"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from "../../config";
import axios from"axios";
type Post = z.infer<typeof postSchema>
export const CreateBlog=()=>{
     const navigate = useNavigate();                 
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null; 
    const [post,setPost]=useState<Post>({
        title:"",
        content:""
    })
   const sendRequest = async () => {
  try {
    const parsed = postSchema.parse(post); 
    const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, parsed, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    const id=res.data.blog.id;
    navigate(`/blog/${id}`);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log("Validation error:", err);
      alert("Please fill in both title and content before publishing.");
      return;
    }
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    } else {
      console.log(err);
    }
  }
};

    return(
        <>
        <AppBar/>
       <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold mb-6 text-center">Create Blog</h1>

  {/* Title */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Title</label>
    <input
      type="text"
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your blog title"
      value={post.title}
      onChange={(e)=>setPost({...post,title:e.target.value})}
    />
  </div>

  {/* Content */}
  <div className="mb-6">
    <label className="block text-gray-700 font-medium mb-2">Content</label>
    <textarea
      rows={8}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Write your blog content..."
      value={post.content}
      onChange={(e)=>setPost({...post,content:e.target.value})}
    />
  </div>

  {/* Submit */}
  <div className="flex justify-end">
    <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600" onClick={sendRequest}>
      Publish
    </button>
  </div>
</div>

        </>
    )
}