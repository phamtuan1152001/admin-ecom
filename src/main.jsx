import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd"
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // <ConfigProvider theme={{ hashed: false }}>
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
  </QueryClientProvider>
  // </ConfigProvider>
  // </React.StrictMode>,
)
