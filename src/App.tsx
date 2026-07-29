import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProgramProvider } from './context/ProgramContext'
import { AppRoutes } from './routes/AppRoutes'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgramProvider>
          <AppRoutes />
        </ProgramProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
