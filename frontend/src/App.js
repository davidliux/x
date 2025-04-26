import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout'; // 引入布局组件
import HomePage from './pages/HomePage'; // 引入页面组件
import ToolsPage from './pages/ToolsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage'; // 引入登录页
import RegisterPage from './pages/RegisterPage'; // 引入注册页
import ProtectedRoute from './components/ProtectedRoute'; // 引入 ProtectedRoute

function App() {
  return (
    <Router>
      <Layout> {/* 使用布局组件包裹所有页面 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/login" element={<LoginPage />} /> {/* 添加登录路由 */}
          <Route path="/register" element={<RegisterPage />} /> {/* 添加注册路由 */}
          <Route 
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          {/* 后续可以添加更多路由，例如工具详情页 */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 