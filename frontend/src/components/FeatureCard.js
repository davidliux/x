import React from 'react';
import './FeatureCard.css'; // 引入卡片样式

// 暂时使用简单的文本图标，后续可以替换为 SVG 或字体图标
const Icons = {
  rocket: '🚀',
  zap: '⚡',
  shield: '🛡️',
  brain: '🧠',
  globe: '🌍',
};

function FeatureCard({ iconName = 'zap', title, description }) {
  const Icon = Icons[iconName] || Icons.zap; // 默认图标

  return (
    <div className="feature-card">
      <div className="feature-icon">{Icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

export default FeatureCard; 