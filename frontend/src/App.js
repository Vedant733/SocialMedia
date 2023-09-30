import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import Register from './pages/Register';
import { createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
import Protected from './Protected';
import Landing from './pages/Landing';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#8a2be2'
    }
  },

})

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000, refetchOnReconnect: false, refetchOnMount: false, refetchOnWindowFocus: false } },
})

function App() {

  return (

    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <Routes>
          <Route index element={<Landing />} />

          <Route path='/app' element={<Protected><Home /></Protected>} />

          <Route exact path='/register' element={<Register />} />

          <Route path="*" element={<Navigate to="" />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
