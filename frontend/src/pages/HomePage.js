import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // 引入 Link 用于按钮跳转
import { createTimeline } from 'animejs'; // 只需导入 createTimeline 用于英雄区
import './HomePage.css'; // 引入首页样式
import FeatureCard from '../components/FeatureCard'; // 引入 FeatureCard

function HomePage() {
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const buttonRef = useRef(null);
  const featuresSectionRef = useRef(null); // 保留 ref 可能用于后续滚动触发
  const howItWorksSectionRef = useRef(null); // Ref for How it Works section

  useEffect(() => {
    // 英雄区动画
    const heroTimeline = createTimeline({ // 使用 createTimeline
      easing: 'easeOutExpo',
    });

    // 确保元素存在再添加到时间线
    if (headlineRef.current) {
      heroTimeline.add({
        targets: headlineRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
      });
    }
    if (subheadlineRef.current) {
      heroTimeline.add({
        targets: subheadlineRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
      }, '-=400'); // 相对于上一个动画提前 400ms 开始
    }
    if (buttonRef.current) {
      heroTimeline.add({
        targets: buttonRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 500,
      }, '-=300'); // 相对于上一个动画提前 300ms 开始
    }

    // CSS 动画现在处理卡片入场，JS 部分移除

  }, []);

  const features = [
    { iconName: 'rocket', title: '极速响应', description: '毫秒级工具处理速度，优化您的工作流程。' },
    { iconName: 'brain', title: '智能分析', description: '利用 AI 技术提供精准的数据洞察与建议。' },
    { iconName: 'shield', title: '安全可靠', description: '企业级数据安全保障，多重备份与加密。' }
  ];

  // 新增：运作流程步骤数据
  const howItWorksSteps = [
    { number: 1, title: '轻松注册', description: '仅需邮箱或手机号，快速完成账户创建。' },
    { number: 2, title: '按需充值', description: '根据您的业务量选择合适的金额进行充值。' },
    { number: 3, title: '即刻使用', description: '访问工具库，选择所需工具立即开始使用。' }
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-headline" ref={headlineRef}>
          赋能您的跨境业务
        </h1>
        <p className="hero-subheadline" ref={subheadlineRef}>
          一站式智能工具平台，简化流程，提升效率。探索专为跨境快递行业设计的解决方案。
        </p>
        <Link to="/tools" className="cta-button" ref={buttonRef}>
          探索工具
        </Link>
      </section>

      {/* 特色功能区域 */}
      <section className="features-section" ref={featuresSectionRef}>
        <h2 className="section-title">核心优势</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            // 保留用于 CSS 动画目标的类
            <div key={index} className="feature-card-animation-target">
              <FeatureCard
                iconName={feature.iconName}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 新增：运作流程区域 */}
      <section className="how-it-works-section" ref={howItWorksSectionRef}>
        <h2 className="section-title">运作流程</h2>
        <div className="steps-container">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="step-item step-item-animation">
              <div className="step-number">{String(step.number).padStart(2, '0')}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 后续可以添加更多内容区域，例如特色工具展示、客户评价等 */}
    </div>
  );
}

export default HomePage; 