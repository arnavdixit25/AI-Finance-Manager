import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28', '#AA336A', '#4444AA'];

const Dashboard = ({ transactions = [] }) => {
  const [showCharts, setShowCharts] = useState(false);

  // Process category data
  const categoryData = transactions.reduce((acc, t) => {
    const category = t.category || 'Uncategorized';
    const amount = parseFloat(t.amount) || 0;
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: category, value: amount });
    }
    return acc;
  }, []);

  // Process description data
  const descriptionData = transactions.map(t => ({
    name: t.description || 'No Description',
    value: parseFloat(t.amount) || 0
  }));

  return (
    <div className="dashboard-container">
      <h2>Financial Insights</h2>

      <button
        className="toggle-charts-button"
        onClick={() => setShowCharts(!showCharts)}
      >
        {showCharts ? 'Hide Charts' : 'Show Charts'}
      </button>

      {showCharts && (
        <div className="charts">
          <div className="chart-wrapper">
            <h3>Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-wrapper">
            <h3>Expenses by Description</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={descriptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
