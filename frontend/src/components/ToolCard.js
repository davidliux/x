import React from 'react';
import { Link } from 'react-router-dom'; // 用于后续跳转到工具详情页
import './ToolCard.css';

// 假设的工具图标映射
const ToolIcons = {
  analyzer: '🔬',
  calculator: '🧮',
  converter: '🔄',
  default: '🔧'
};

function ToolCard({ id, name, description, icon = 'default', cost }) {
  const Icon = ToolIcons[icon] || ToolIcons.default;
  const toolPath = `/tools/${id}`; // 假设的工具详情页路径

  return (
    <div className="tool-card tool-card-animation">
      <div className="tool-card-content">
        <div className="tool-icon">{Icon}</div>
        <h3 className="tool-name">{name}</h3>
        <p className="tool-description">{description}</p>
        <div className="tool-cost">
          <span>费用:</span> {cost ? `${cost.toFixed(2)} 元/次` : '咨询'}
        </div>
      </div>
      <Link to={toolPath} className="tool-card-link">
        进入工具
      </Link>
    </div>
  );
}

export default ToolCard; 