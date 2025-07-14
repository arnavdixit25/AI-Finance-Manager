import React,{ forwardRef } from 'react';

const PrintableReport = forwardRef(({ transactions = [], advice }, ref) => {
  return (
    <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#000' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Financial Report</h2>

      {transactions.length > 0 ? (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #000', textAlign: 'left', padding: '8px' }}>
                Description
              </th>
              <th style={{ borderBottom: '1px solid #000', textAlign: 'right', padding: '8px' }}>
                Amount ($)
              </th>
              <th style={{ borderBottom: '1px solid #000', textAlign: 'left', padding: '8px' }}>
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{t.description}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ccc', textAlign: 'right' }}>
                  {t.amount.toFixed(2)}
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{t.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions available.</p>
      )}

      {advice && (
        <>
          <h3>AI Financial Advice</h3>
          <p>{advice}</p>
        </>
      )}
    </div>
  );
});

export default PrintableReport;
