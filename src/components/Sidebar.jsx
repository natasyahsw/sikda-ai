export default function Sidebar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'transparency', icon: '🔍', label: 'Transparansi Anggaran' },
    { id: 'anomalies', icon: '⚠️', label: 'Deteksi Anomali' },
    { id: 'chat', icon: '🤖', label: 'AI Assistant' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">S</div>
        <div>
          <h1>SIKDA AI</h1>
          <span>Keuangan Daerah Cerdas</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="azure-badge">
          <span>☁️</span>
          <span>Powered by Microsoft Azure AI</span>
        </div>
      </div>
    </aside>
  )
}
