import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd"
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ConfigProvider theme={{ hashed: false }}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>
  // </React.StrictMode>,
)
