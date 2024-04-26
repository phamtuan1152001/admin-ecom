import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd"
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient()

// Redux setup
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import store, { persist } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // <ConfigProvider theme={{ hashed: false }}>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
  // </ConfigProvider>
  // </React.StrictMode>,
)
