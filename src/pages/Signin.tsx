import { Auth } from '../components/Auth'
import { Quotes } from '../components/Quotes'
export const Signin=()=>{
  return (
     <>
    <div className="grid grid-cols-1 lg:grid-cols-2">
  <div>
    <h1 className="text-3xl font-bold text-center mt-2">Signin</h1>
    <Auth type="signin" />
  </div>

  <div className="hidden lg:block">
    <Quotes />
  </div>
</div>

    </>
  )
}