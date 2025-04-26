import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 可以创建一个基础的 index.css 或者暂时省略
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext'; // 引入 AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // 暂时注释掉 StrictMode
    <AuthProvider> { /* 用 AuthProvider 包裹 App */}
      <App />
    </AuthProvider>
  // </React.StrictMode> // 暂时注释掉 StrictMode
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 