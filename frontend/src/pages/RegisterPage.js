import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 链接到登录页
import AuthForm from '../components/AuthForm';
import './AuthPage.css'; // 复用通用认证页面样式
import { useAuth } from '../context/AuthContext'; // 引入 useAuth

function RegisterPage() {
  const { login } = useAuth(); // 获取 login 函数 (注册成功后也登录)
  const navigate = useNavigate();

  const handleRegister = (formData) => {
    // TODO: 实现调用注册 API 的逻辑
    console.log('Register attempt:', formData);
    // 假设 API 调用成功...

    // 调用 context 的 login 函数更新全局状态
    login(/* 可以传递 user 数据和 token */);

    alert('注册成功！（模拟）');
    navigate('/'); // 注册成功后跳转到首页
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">创建账户</h1>
        <AuthForm formType="register" onSubmit={handleRegister} />
        <p className="auth-switch">
          已有账户？ <Link to="/login">立即登录</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage; 