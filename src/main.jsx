import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/styles.scss';
import { Router } from './router';
import { ConfigProvider } from 'antd';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#20a53a',
        },
      }}
    >
      <Router />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            border: 'none',
            borderRadius: 0,
            padding: '12px 16px',
            color: '#EAEDE9',
            background: '#2A4826',
          },
        }}
      />
    </ConfigProvider>
  </StrictMode>
);
