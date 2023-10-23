import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductList from './pages/ProductList'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './components/Profile'

import { useContext } from 'react'
import { AppContext } from './contexts/app.context'

// nếu isAuthenticated = true thì sẽ pass qua được ProtectedRoute và có thể truy cập được đến cái path(children) bên trong(các path cần phải đăng nhập mới vào được)
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

// nếu isAuthenticated = true thì sẽ không pass vào login và register nữa và navigate về /
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  // có rất nhiều path ''(rỗng) nên sẽ chạy vào cái đầu tiên nếu không cái nào set index
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: 'register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      // khi path là '' thì sẽ luôn chạy vào đây vì đã set index: true mặc dù path này đặt cuối cùng
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
