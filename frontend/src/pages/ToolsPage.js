import React, { useState, useEffect } from 'react';
import ToolCard from '../components/ToolCard'; // 引入工具卡片
import './ToolsPage.css'; // 引入页面样式

// 模拟工具数据 (后续会从后端 API 获取)
const mockTools = [
  {
    id: 'clearance-analyzer',
    name: '清关品名分析助手',
    description: '基于 AI 大模型分析您的商品描述，提供精准的清关品名建议与 HS Code。减少申报错误风险。',
    icon: 'analyzer',
    cost: 0.50
  },
  {
    id: 'shipping-calculator',
    name: '运费智能计算器',
    description: '综合考虑体积、重量、目的地、渠道等多重因素，快速估算跨境运费。',
    icon: 'calculator',
    cost: 0.20
  },
  {
    id: 'currency-converter',
    name: '实时汇率转换器',
    description: '提供多种主要货币间的实时汇率查询与转换功能，支持历史汇率查看。',
    icon: 'converter',
    cost: 0.00 // 假设此工具免费
  },
  {
    id: 'address-validator',
    name: '国际地址校验',
    description: '校验国际收件人地址格式的准确性与有效性，降低派送失败率。',
    icon: 'shield',
    cost: 0.30
  },
  {
    id: 'package-tracker',
    name: '包裹追踪聚合',
    description: '聚合多家主流国际快递服务商的包裹追踪信息，一站式查询。',
    icon: 'globe' // 使用已定义的 globe 图标
    // cost: null // 费用待定，显示为咨询
  }
];

function ToolsPage() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  // 模拟数据加载
  useEffect(() => {
    // 模拟 API 请求延迟
    const timer = setTimeout(() => {
      setTools(mockTools);
      setLoading(false);
    }, 500); // 模拟 0.5 秒加载时间
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tools-page">
      <h1 className="page-title">工具中心</h1>
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>正在加载工具...</p> // 简单的加载提示
      ) : (
        <div className="tools-grid">
          {tools.map((tool, index) => (
            // 添加包装器用于 CSS 动画延迟
            <div key={tool.id} className="tool-card-wrapper">
              <ToolCard
                id={tool.id}
                name={tool.name}
                description={tool.description}
                icon={tool.icon}
                cost={tool.cost}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ToolsPage; 