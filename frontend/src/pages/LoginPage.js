import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // 引入 useLocation
import AuthForm from '../components/AuthForm';
import './AuthPage.css'; // 复用通用认证页面样式
import { useAuth } from '../context/AuthContext'; // 引入 useAuth

function LoginPage() {
  const { login } = useAuth(); // 获取 login 函数
  const navigate = useNavigate(); // 获取 navigate 函数
  const location = useLocation(); // 获取 location 对象

  // 尝试从 location state 获取登录前的目标路径，默认为个人中心
  const from = location.state?.from?.pathname || "/profile";

  const handleLogin = (formData) => {
    console.log('Login attempt:', formData);
    // TODO: 实现调用登录 API 的逻辑
    // 假设 API 调用成功...
    
    // 调用 context 的 login 函数更新全局状态
    login(/* 可以传递 user 数据和 token */);
    
    alert('登录成功！（模拟）'); // 保留模拟提示
    navigate(from, { replace: true }); // 登录成功后跳转回原始页面或默认页面
                                     // replace: true 避免登录页出现在历史记录中
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">用户登录</h1>
        <AuthForm formType="login" onSubmit={handleLogin} />
        <p className="auth-switch">
          还没有账户？ <Link to="/register">立即注册</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage; 