import axios from "axios";
import { BACKEND_URL } from "../../config";
export const DeleteBlog=async ({id}:{id:string})=>{
    try {
        const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.data);
          return res.data;
    } catch (err) {
        console.log(err);
    }
}