import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation(); // 获取当前位置信息，用于登录后重定向回来

  // 在这里添加日志，查看 isLoggedIn 的值
  console.log('ProtectedRoute check: isLoggedIn =', isLoggedIn, 'Location:', location.pathname);

  if (!isLoggedIn) {
    console.log('Redirecting to login from:', location.pathname);
    // 用户未登录，重定向到登录页
    // 将用户尝试访问的原始路径作为 state 传递给登录页
    // 这样登录成功后可以重定向回原始页面
    return <Navigate to="/login" state={{ from: location }} replace />;
    // replace 属性可以防止用户通过后退按钮回到这个重定向前的位置
  }

  // 用户已登录，渲染子组件 (即受保护的页面)
  return children;
}

export default ProtectedRoute; 