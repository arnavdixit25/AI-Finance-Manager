# 💰 AI Finance Manager

AI Finance Manager is an intelligent personal finance management web application that empowers users to take control of their finances through AI-driven insights, goal tracking, and expense analysis. Leveraging modern technologies like React, Node.js, and MongoDB—alongside custom Machine Learning and Natural Language Processing logic—this full-stack application acts as your digital financial advisor.

AI Finance Manager demonstrates the seamless integration of AI and web technologies to solve real-world financial challenges with automation, intelligence, and simplicity.

---

## 🧠 Overview

AI Finance Manager is a smart personal finance assistant that helps you manage your money better. It allows you to log and categorize expenses, set and track savings goals, and understand your financial behavior through visual dashboards. You can ask questions in plain English like “How much did I spend on food last month?” and get AI-generated responses using built-in NLP features.

Built as a full-stack web app using React.js, Node.js, Express, and MongoDB, the app integrates custom Machine Learning logic and Natural Language Processing to make financial planning intuitive, intelligent, and user-friendly. It also supports exporting printable reports, giving you complete control and visibility over your financial health.

---

## ✨ Features

- **Intelligent Expense Tracking**: Log, view, and categorize your expenses by type and date.
- **AI-Powered Insights**: Understand where your money goes with actionable insights.
- **Goal-Based Budgeting**: Set savings goals and track progress visually.
- **NLP-Based Assistant**: Ask financial questions in plain language and get smart replies.
- **Real-Time Dashboard**: Get visual breakdowns of income, expenses, and goals.
- **Printable Reports**: Generate and export monthly or custom reports in print-ready format.
- **Secure Architecture**: User data is protected through modular backend configuration.
- **Modular Design**: Built for scalability and future AI feature expansion.

---

## 🧱 Tech Stack

### **Frontend**:
- React.js
- CSS Modules (`App1.css`, `App2.css`)
- JSX Components
- Chart.js (for financial visualizations)
- `react-so-print` (for printable reports)

### **Backend**:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication (can be extended)
- dotenv for environment config
- RESTful API architecture

### **AI/NLP**:
- Custom NLP logic in `ai.js`
- Financial pattern recognition algorithms
- Scope for integration with spaCy or Transformers

---

## 🗂️ Project Structure
AI-Finance-Manager/
├── client/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── App.js
│ │ ├── App1.css
│ │ ├── App2.css
│ │ ├── Dashboard.js
│ │ ├── index.js
│ │ └── PrintableReport.js
│ ├── package.json
│ └── package-lock.json
│
├── server/
│ ├── models/
│ │ ├── Goal.js
│ │ └── Transaction.js
│ ├── routes/
│ │ ├── ai.js
│ │ ├── goals.js
│ │ └── transactions.js
│ ├── .env
│ ├── index.js
│ ├── package.json
│ └── package-lock.json
│
├── LICENSE
└── README.md


---

## ⚙️ Setup & Installation

### 1. Clone the repository
git clone https://github.com/your-username/ai-finance-manager.git
cd ai-finance-manager

### 2. Setup Backend
bash
Copy code
cd server
npm install
Create a .env file inside /server and add the following:

ini
Copy code
MONGO_URI=your_mongodb_uri
PORT=5000
Start the backend server:

bash
Copy code
node index.js

###3. Setup Frontend
bash
Copy code
cd ../client
npm install
npm start
Visit the app in browser: http://localhost:3000

---

🔍 Key Modules Explained:

📊 Dashboard & Analytics
1. Visualizes your financial behavior
2. Tracks income vs expenses with pie/bar charts

🤖 AI Assistant (NLP Logic)
1. Located in routes/ai.js
2. Interprets natural language queries like:
   2.1 "What is my total spending this month?"
   2.2 "Am I spending too much on food?"
   2.3 "Suggest a budget for the next month"

🎯 Goals Module
1. Set specific financial targets
2. Backend route: routes/goals.js
3. Tracks completion percentage dynamically

🧾 Transactions Module
1. Add/edit/delete expense or income logs
2. Backend route: routes/transactions.js
3. Stores all financial records with timestamps

📄 Printable Reports
1. One-click PDF-style reports using react-so-print
2. Select custom time ranges for generating summaries

---

🌐For Deployment : You can deploy the app using:
Frontend: Vercel
Backend: Render or Railway
Database: MongoDB Atlas

---

🧠 Future Scope:

🔌 Integrate GPT or spaCy for smarter NLP

📲 Launch companion mobile app (React Native)

🏦 Connect with real-time bank APIs

🔔 Add financial alerts & email reminders

📈 Use ML to forecast future expenses & savings

---

🙌 Contributing
We welcome contributors!
Please fork this repository and submit pull requests for any enhancements, bug fixes, or ideas.

📄 License
This project is licensed under the MIT License.
For more details, see the LICENSE file.

---
Created by Arnav Dixit.

