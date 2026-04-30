import { anomalies, formatCurrency } from '../data/budgetData'

export default function Anomalies() {
  const highCount = anomalies.filter(a => a.severity === 'high').length
  const medCount = anomalies.filter(a => a.severity === 'medium').length
  const lowCount = anomalies.filter(a => a.severity === 'low').length
  const totalValue = anomalies.reduce((s, a) => s + a.amount, 0)

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h2>⚠️ Deteksi Anomali AI</h2>
          <p>Sistem cerdas mendeteksi penyimpangan pola anggaran secara otomatis</p>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Anomali</span>
            <div className="stat-icon" style={{ background: 'rgba(239,68,68,0.15)' }}>🔔</div>
          </div>
          <div className="stat-value">{anomalies.length}</div>
          <div className="stat-change negative">Perlu tindak lanjut</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Prioritas Tinggi</span>
            <div className="stat-icon" style={{ background: 'rgba(239,68,68,0.15)' }}>🔴</div>
          </div>
          <div className="stat-value" style={{ color: '#ef4444' }}>{highCount}</div>
          <div className="stat-change negative">Segera ditangani</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Prioritas Sedang</span>
            <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>🟡</div>
          </div>
          <div className="stat-value" style={{ color: '#f59e0b' }}>{medCount}</div>
          <div className="stat-change">Perlu monitoring</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Nilai Terdampak</span>
            <div className="stat-icon" style={{ background: 'rgba(139,92,246,0.15)' }}>💰</div>
          </div>
          <div className="stat-value" style={{ fontSize: 22 }}>{formatCurrency(totalValue)}</div>
          <div className="stat-change">Total anggaran terdampak</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Daftar Anomali Terdeteksi</h3>
          <span className="badge badge-red">AI-Powered Detection</span>
        </div>
        <div className="anomaly-list">
          {anomalies.map(a => (
            <div key={a.id} className={`anomaly-item ${a.severity}`}>
              <div className="anomaly-header">
                <span className="anomaly-title">{a.icon} {a.category} — {a.subcategory}</span>
                <span className={`badge ${a.severity === 'high' ? 'badge-red' : a.severity === 'medium' ? 'badge-amber' : 'badge-green'}`}>
                  {a.severity === 'high' ? '🔴 Tinggi' : a.severity === 'medium' ? '🟡 Sedang' : '🟢 Rendah'}
                </span>
              </div>
              <p className="anomaly-desc">{a.description}</p>
              <p className="anomaly-desc" style={{ fontSize: 12 }}>
                Nilai terdampak: <strong>{formatCurrency(a.amount)}</strong> | Terdeteksi: {a.detectedDate}
              </p>
              <div className="anomaly-rec">{a.recommendation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
