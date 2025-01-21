import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="h-screen w-full  ">
      <div className="w-full h-full flex  items-center justify-center bg-slate-50">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
