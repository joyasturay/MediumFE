
interface BlogCardProps{
  id: string;
  title: string;
  content: string;
  author: string;
}
import { Link } from 'react-router-dom'
export const BlogCard=({id,title,content,author}:BlogCardProps)=>{
  return (
    <>
    <Link to={`/blog/${id}`}>
    <div className="max-w-2xl mx-auto px-4 cursor-pointer">
  <BlogCardAuthor name={author} />
  <h1 className="text-2xl font-bold leading-7 mb-4">{title}</h1>
  <p className="text-gray-600 text-md font-light leading-7 mb-4">
    {content.slice(0, 100) + "..."}
  </p>
  <p className="text-sm text-gray-500 font-light leading-7 mb-2">
    By {author}
  </p>
  <p className="text-sm text-gray-500 font-light leading-7 mb-2">
    {Math.ceil(content.length / 100)} mins read
  </p>
  <hr className="mt-6 border-gray-200" />
</div>
</Link>
</>
  )
}
export function Avatar({name}:{name:string}){
  return (
    <>
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-lg font-bold">{name[0].toUpperCase()}</span>
      </div>
    </>
  )
}
export const BlogCardAuthor=({name}:{name:string})=>{
  return (
    <>
      <div className="flex items-center mt-2 mb-4">
        <Avatar name={name} />
        <p className="pl-2">{name}</p>
      </div>
    </>
  )
}