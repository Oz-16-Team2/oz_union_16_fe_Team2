/*
 * Todo : Header / Footer 페이지 추가 예정
 */

import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      {/* <Header/> */}
      <div className="max-w-300 mx-auto mt-7.5 bg-red-400 px-4">
        <Outlet />
      </div>
      {/* <Footer/> */}
    </>
  )
}
