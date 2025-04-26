import React, { createContext, useState, useContext, useEffect } from 'react';

// 创建上下文对象
const AuthContext = createContext(null);

// 创建一个 Provider 组件
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // 初始化时尝试从 localStorage 读取登录状态
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  // 可以在这里添加 state 来存储 user 信息或 token
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);

  // 登录函数
  const login = (/* userData, authToken */) => {
    // TODO: 在实际 API 调用成功后，设置用户信息和 token
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // 持久化状态
    console.log('User logged in (Context)');
  };

  // 退出登录函数
  const logout = () => {
    // TODO: 调用后端 API 使 token 失效 (如果需要)
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // 移除持久化状态
    // setUser(null);
    // setToken(null);
    console.log('User logged out (Context)');
    // 可能需要重定向到首页或登录页
    // navigate('/');
  };

  // 将状态和函数通过 value 传递下去
  const value = {
    isLoggedIn,
    login,
    logout,
    // user,
    // token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 创建一个自定义 Hook 方便使用 Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 