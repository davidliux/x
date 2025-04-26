import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

function AuthForm({ formType, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 仅注册时需要
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isRegister = formType === 'register';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // 清除旧错误

    if (isRegister && password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    // 调用父组件传递的 onSubmit 函数 (后续会连接 API)
    onSubmit({ email, password });
    console.log(`Form submitted for ${formType}:`, { email, password }); // 临时打印

    // 临时：成功后跳转到首页 (实际应根据 API 响应跳转)
    // navigate('/');
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="email">邮箱</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="输入您的邮箱地址"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">密码</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder={isRegister ? "设置您的密码" : "输入您的密码"}
        />
      </div>
      {isRegister && (
        <div className="form-group">
          <label htmlFor="confirmPassword">确认密码</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="再次输入密码"
          />
        </div>
      )}
      <button type="submit" className="auth-button">
        {isRegister ? '注册' : '登录'}
      </button>
    </form>
  );
}

export default AuthForm; 