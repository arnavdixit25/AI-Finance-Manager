import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App2.css';
import Dashboard from './Dashboard';
import PrintableReport from './PrintableReport';
import ReactToPrint from 'react-to-print';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [input, setInput] = useState({ amount: '', description: '', category: '' });
  const [advice, setAdvice] = useState('');
  const [showAdvice, setShowAdvice] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [adviceClicked, setAdviceClicked] = useState(false);
  const [activeTab, setActiveTab] = useState('addTransaction');
  const [goal, setGoal] = useState({ name: '', amount: '', months: '' });
  const [goalSet, setGoalSet] = useState(false);

  const printRef = useRef();

  useEffect(() => {
    axios.get('/api/transactions')
      .then(res => setTransactions(res.data))
      .catch(err => console.error('Error fetching transactions:', err));
  }, []);

  const excludedCategories = ['income', 'saving', 'salary'];
  const totalSpent = transactions
    .filter(t => !excludedCategories.includes(t.category.toLowerCase()))
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const getMonthKey = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  };
  const monthsSet = new Set(transactions.map(t => getMonthKey(t.date || new Date())));
  const monthsCount = monthsSet.size || 1;
  const averageSpentPerMonth = totalSpent / monthsCount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/transactions', input);
      setTransactions([...transactions, res.data]);
      setInput({ amount: '', description: '', category: '' });
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  const getAdvice = async () => {
    if (transactions.length === 0) {
      alert("Please add some transactions before requesting advice.");
      return;
    }

    setAdviceClicked(true);
    const context = transactions.map(t => `${t.description} - ₹${t.amount} (${t.category})`).join('\n');
    try {
      const res = await axios.post('/api/ai/advice', { context });
      if (res.data?.reply) {
        setAdvice(res.data.reply);
        setShowAdvice(true);
      } else {
        setAdvice('AI could not provide advice.');
        setShowAdvice(true);
      }
    } catch (err) {
      console.error('Error fetching AI advice:', err);
      setAdvice('Failed to get advice. Check server.');
      setShowAdvice(true);
    }

    setTimeout(() => {
      setAdviceClicked(false);
    }, 1500);
  };

  const handleNewSession = () => {
    setTransactions([]);
    setAdvice('');
    setShowAdvice(false);
    setShowCharts(false);
    setActiveTab('addTransaction');
    setGoal({ name: '', amount: '', months: '' });
    setGoalSet(false);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (!goal.amount || !goal.months || goal.amount <= 0 || goal.months <= 0) {
      alert('Please enter valid goal amount and duration.');
      return;
    }
    setGoalSet(true);
  };

  const monthlySavingsNeeded = goalSet ? (Number(goal.amount) / Number(goal.months)).toFixed(2) : 0;
  const progressPercent = goalSet ? Math.min(100, (totalSpent / Number(goal.amount)) * 100) : 0;

  return (
    <>
      {/* 🎨 Animated Background */}
      <div className="animated-background">
        <div className="circle" style={{ width: '300px', height: '300px', top: '10%', left: '10%', animationDelay: '0s' }}></div>
        <div className="circle" style={{ width: '400px', height: '400px', top: '40%', left: '60%', animationDelay: '5s' }}></div>
        <div className="circle" style={{ width: '200px', height: '200px', top: '70%', left: '30%', animationDelay: '10s' }}></div>
      </div>

      <div className="app-container">
        <div className="content">
          <h1 className="animated-title">AI Financial Management System</h1>

          {/* Tabs */}
          <div className="tab-buttons">
            {['addTransaction', 'viewTransactions', 'advice', 'charts', 'goals', 'export'].map(tab => (
              <button
                key={tab}
                className={activeTab === tab ? 'active-tab' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'addTransaction' ? 'Add Transaction' :
                 tab === 'viewTransactions' ? 'View Transactions' :
                 tab === 'advice' ? 'AI Advice' :
                 tab === 'charts' ? 'Financial Charts' :
                 tab === 'goals' ? 'Goals' :
                 'Export Report'}
              </button>
            ))}
          </div>

          {/* Add Transaction */}
          {activeTab === 'addTransaction' && (
            <form onSubmit={handleSubmit} className="centered-form">
              <input type="number" value={input.amount} placeholder="Amount (₹)" onChange={e => setInput({ ...input, amount: e.target.value })} required />
              <input type="text" value={input.description} placeholder="Description" onChange={e => setInput({ ...input, description: e.target.value })} required />
              <input type="text" value={input.category} placeholder="Category" onChange={e => setInput({ ...input, category: e.target.value })} required />
              <button type="submit">Add Transaction</button>
            </form>
          )}

          {/* View Transactions */}
          {activeTab === 'viewTransactions' && (
            <>
              <h2>Transactions</h2>
              <ul>
                {transactions.map((t, idx) => (
                  <li key={idx}>{t.description} - ₹{t.amount} ({t.category})</li>
                ))}
              </ul>
            </>
          )}

          {/* AI Advice */}
          {activeTab === 'advice' && (
            <>
              <button
                id="get-advice"
                onClick={getAdvice}
                className={adviceClicked ? 'clicked' : ''}
              >
                Get AI Financial Advice
              </button>
              {advice && (
                <button
                  className="toggle-button"
                  onClick={() => setShowAdvice(prev => !prev)}
                >
                  {showAdvice ? 'Hide Advice' : 'Show Advice'}
                </button>
              )}
              {showAdvice && advice && (
                <div className="advice-text">{advice}</div>
              )}
            </>
          )}

          {/* Charts */}
          {activeTab === 'charts' && transactions.length > 0 && (
            <Dashboard transactions={transactions} />
          )}

          {/* Goals */}
          {activeTab === 'goals' && (
            <div className="goal-container">
              {!goalSet ? (
                <form onSubmit={handleGoalSubmit} className="centered-form goal-form">
                  <input type="text" placeholder="Goal Name (optional)" value={goal.name} onChange={e => setGoal({ ...goal, name: e.target.value })} maxLength={50} />
                  <input type="number" placeholder="Goal Amount (₹)" value={goal.amount} onChange={e => setGoal({ ...goal, amount: e.target.value })} required min="1" step="0.01" />
                  <input type="number" placeholder="Duration (months)" value={goal.months} onChange={e => setGoal({ ...goal, months: e.target.value })} required min="1" step="1" />
                  <button type="submit">Set Goal</button>
                </form>
              ) : (
                <div className="goal-summary">
                  <h2>{goal.name || "Your Goal"}</h2>
                  <p><strong>Goal Amount:</strong> ₹{Number(goal.amount).toLocaleString()}</p>
                  <p><strong>Duration:</strong> {goal.months} month{goal.months > 1 ? 's' : ''}</p>
                  <p><strong>Monthly Savings Needed:</strong> ₹{monthlySavingsNeeded}</p>
                  <p><strong>Total Spent So Far:</strong> ₹{totalSpent.toFixed(2)}</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                  <p className={`progress-text ${progressPercent >= 100 ? 'goal-met' : 'goal-not-met'}`}>
                    {progressPercent >= 100 ? "Goal Met! 🎉" : `Progress: ${progressPercent.toFixed(1)}%`}
                  </p>
                  <button className="new-session-button" onClick={() => {
                    setGoal({ name: '', amount: '', months: '' });
                    setGoalSet(false);
                  }}>
                    Reset Goal
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Export Report */}
          {activeTab === 'export' && (transactions.length > 0 || advice) && (
            <>
              <ReactToPrint
                trigger={() => (
                  <button className="download-report-button">Download Report as PDF</button>
                )}
                content={() => printRef.current}
                pageStyle="@media print { body { -webkit-print-color-adjust: exact; background: #fff; color: #000; } }"
              />
            </>
          )}

          <div className="buttons-group">
            {(transactions.length > 0 || advice) && (
              <button className="new-session-button" onClick={handleNewSession}>
                Start New Session
              </button>
            )}
          </div>

          {/* Printable Component */}
          <div style={{ position: 'absolute', left: '-9999px', top: 0, height: 0, overflow: 'hidden' }}>
            <PrintableReport ref={printRef} transactions={transactions} advice={advice} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
