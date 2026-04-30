import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import AiChat from './components/AiChat'
import Transparency from './components/Transparency'
import Anomalies from './components/Anomalies'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />
      case 'chat': return <AiChat />
      case 'transparency': return <Transparency />
      case 'anomalies': return <Anomalies />
      default: return <Dashboard />
    }
  }

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
