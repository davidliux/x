import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 可能用于充值或编辑跳转
import './ProfilePage.css'; // 引入样式
import HistoryTable from '../components/HistoryTable'; // 引入 HistoryTable

// 模拟用户数据
const mockUserData = {
  username: 'user@example.com',
  companyName: '示例科技有限公司',
  contactPerson: '张三',
  phoneNumber: '138********',
  email: 'user@example.com',
  registrationDate: '2023-10-26',
  currencyBalance: 123.45
};

// 模拟历史记录 (简化)
const mockTransactionHistory = [
  { id: 1, date: '2024-03-15', type: '充值', amount: 200.00, method: '支付宝' },
  { id: 2, date: '2024-03-14', type: '工具使用', amount: -0.50, tool: '清关品名分析' },
  { id: 3, date: '2024-03-13', type: '工具使用', amount: -0.20, tool: '运费计算器' },
];
const mockUsageHistory = [
  { id: 1, date: '2024-03-14', tool: '清关品名分析', status: '成功', cost: 0.50 },
  { id: 2, date: '2024-03-13', tool: '运费计算器', status: '成功', cost: 0.20 },
];

// --- 定义列配置 ---
const transactionColumns = [
  { title: '日期', dataIndex: 'date', key: 'date', width: '120px' },
  { title: '类型', dataIndex: 'type', key: 'type', width: '100px' },
  { 
    title: '金额 (元)', 
    dataIndex: 'amount', 
    key: 'amount', 
    width: '100px', 
    render: (amount) => (
      <span className={amount > 0 ? 'transaction-amount-positive' : 'transaction-amount-negative'}>
        {amount > 0 ? '+' : ''}{amount.toFixed(2)}
      </span>
    )
  },
  { title: '关联信息', dataIndex: 'tool', key: 'tool', render: (text, record) => record.tool || record.method || '-' }
];

const usageColumns = [
  { title: '使用日期', dataIndex: 'date', key: 'date', width: '120px' },
  { title: '工具名称', dataIndex: 'tool', key: 'tool' },
  { 
    title: '状态', 
    dataIndex: 'status', 
    key: 'status', 
    width: '80px', 
    render: (status) => (
      <span className={status === '成功' ? 'usage-status-success' : 'usage-status-failed'}>
        {status}
      </span>
    )
  },
  { 
    title: '消耗金额 (元)', 
    dataIndex: 'cost', 
    key: 'cost', 
    width: '120px', 
    render: (cost) => cost !== undefined ? cost.toFixed(2) : '-'
  },
  // { title: '操作', key: 'action', render: (text, record) => (<button>查看详情</button>) } // 后续可添加
];
// --- 列配置结束 ---

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [usageLogs, setUsageLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setUserData(mockUserData);
      setTransactions(mockTransactionHistory);
      setUsageLogs(mockUsageHistory);
      setLoading(false);
    }, 300); // 模拟延迟
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="profile-page"><p style={{ textAlign: 'center', fontSize: '1.2rem' }}>正在加载用户信息...</p></div>;
  }

  if (!userData) {
    return <div className="profile-page"><p style={{ textAlign: 'center', color: 'red' }}>无法加载用户信息。</p></div>;
  }

  return (
    <div className="profile-page">
      <h1 className="page-title">个人中心</h1>

      <div className="profile-grid">
        {/* 用户信息区 */}
        <section className="profile-section user-info-section">
          <h2>账户信息</h2>
          <ul className="user-info-list">
            <li><span className="info-label">用户名:</span> <span className="info-value">{userData.username}</span></li>
            <li><span className="info-label">公司名称:</span> <span className="info-value">{userData.companyName || '-'}</span></li>
            <li><span className="info-label">联系人:</span> <span className="info-value">{userData.contactPerson || '-'}</span></li>
            <li><span className="info-label">联系电话:</span> <span className="info-value">{userData.phoneNumber || '-'}</span></li>
            <li><span className="info-label">邮箱:</span> <span className="info-value">{userData.email}</span></li>
            <li><span className="info-label">注册日期:</span> <span className="info-value">{userData.registrationDate}</span></li>
          </ul>
          <button className="edit-profile-button">修改信息</button> {/* 后续实现功能 */}
        </section>

        {/* 余额与操作区 */}
        <section className="profile-section balance-section">
          <h2>账户余额</h2>
          <div className="balance-display">
            <div className="balance-amount">¥ {userData.currencyBalance.toFixed(2)}</div>
            <div className="balance-label">当前可用金额</div>
          </div>
          <Link to="/recharge" className="recharge-button">立即充值</Link> {/* 假设充值页面路由 */}
        </section>

        {/* 交易记录区 */}
        <section className="profile-section transaction-history-section">
          <h2>金额交易记录</h2>
          <HistoryTable 
            data={transactions} 
            columns={transactionColumns} 
            emptyMessage="暂无金额交易记录"
          />
        </section>

        {/* 工具使用记录区 */}
        <section className="profile-section usage-history-section">
          <h2>工具使用记录</h2>
          <HistoryTable 
            data={usageLogs} 
            columns={usageColumns} 
            emptyMessage="暂无工具使用记录"
          />
        </section>
      </div>
    </div>
  );
}

export default ProfilePage; 