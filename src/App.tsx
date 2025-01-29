import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil'
import { ThemeProvider, theme } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Admin from './Components/Dashboard/Pages/Admin';
import Agents from './Components/Dashboard/Pages/Agents';
import PaydayLoan from './Components/Dashboard/Pages/PaydayLoan';
import SMELoan from './Components/Dashboard/Pages/SMELoan';
import Users from './Components/Dashboard/Pages/Users';

export const queryClient = new QueryClient();


function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />}>
                {/* Any nested routes can also be defined here if needed */}
                <Route index element={<Navigate to="smeloans" replace />} />
                <Route path="users" element={<Users />} />
                <Route path="paydayloans" element={<PaydayLoan />} />
                <Route path="smeloans" element={<SMELoan />} />
                <Route path="agents" element={<Agents />} />
                <Route path="admins" element={<Admin />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
