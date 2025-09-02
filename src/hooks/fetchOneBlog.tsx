import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";

export const useFetchBlog = ({id}:{id:string}) => {
    interface BlogCardProps {
        id: string;
        title: string;
        content: string;
        author: {
            name: string;
            email: string;
        };
      }
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogCardProps>({} as BlogCardProps);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setLoading(false);
      return;
    }

    async function fetchAll() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(res.data.blog); 
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return { loading, blog };
};
