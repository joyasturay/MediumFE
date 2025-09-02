import { Quotes } from "../components/Quotes"
import { Auth } from "../components/Auth"

export const Signup=()=>{
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2">
  <div>
    <h1 className="text-3xl font-bold text-center mt-2">Signup</h1>
    <Auth type="signup" />
  </div>

  <div className="hidden lg:block">
    <Quotes />
  </div>
</div>

    </>
  )
}