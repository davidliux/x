import React from 'react';
import './HistoryTable.css';

function HistoryTable({ data, columns, emptyMessage = "暂无记录" }) {
  if (!data || data.length === 0) {
    return <p className="history-empty-message">{emptyMessage}</p>;
  }

  return (
    <div className="history-table-container">
      <table className="history-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}> {/* 使用 id 或索引作为 key */} 
              {columns.map((col) => (
                <td key={`${col.key}-${row.id || rowIndex}`}>
                  {col.render ? col.render(row[col.dataIndex], row) : row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable; 