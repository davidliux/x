import React from 'react';
import { Link } from 'react-router-dom';
// import { animate } from 'animejs'; // 如果不再需要可以移除
import './Layout.css';

function Layout({ children }) {
  // const titleWrapperRef = useRef(null);
  // useEffect(() => { ... }, []); // CSS 动画处理标题

  // TODO: 后续根据认证状态显示/隐藏 登录/注册 或 用户名/退出
  const isLoggedIn = false; // 临时状态

  return (
    <div className="layout">
      <header className="app-header">
        <div className="logo">
          <div className="main-title-wrapper title-enter-animation">
            <Link to="/" className="main-title-link">跨境快递门户</Link>
          </div>
        </div>
        <nav className="main-nav">
          <Link to="/">首页</Link>
          <Link to="/tools">工具</Link>
          {isLoggedIn ? (
            <Link to="/profile">个人中心</Link>
          ) : null}
          {/* 根据登录状态显示不同链接 */}
          {isLoggedIn ? (
            <button className="logout-button">退出登录</button> // TODO: 实现退出逻辑
          ) : (
            <>
              <Link to="/login">登录</Link>
              <Link to="/register">注册</Link>
            </>
          )}
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} 跨境快递门户. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Layout; 