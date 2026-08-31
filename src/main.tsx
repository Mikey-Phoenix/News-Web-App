import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider, useQuery, } from '@tanstack/react-query'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      <App />
    
  </StrictMode>,
)
