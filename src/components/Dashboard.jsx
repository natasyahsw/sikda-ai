import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'
import { budgetCategories, monthlyRealization, regionInfo, yearlyComparison, efficiencyScores, formatCurrency, getRealizationPercentage } from '../data/budgetData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <p className="label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="value" style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  )
}

const pieData = budgetCategories.map(c => ({ name: c.name, value: c.allocated, color: c.color }))

const monthlyChart = monthlyRealization.map(m => ({
  ...m,
  budgetT: m.budget / 1e9,
  realizedT: m.realized / 1e9,
}))

export default function Dashboard() {
  const totalBudget = regionInfo.totalBudget
  const totalRealized = regionInfo.totalRealization
  const efficiency = ((totalRealized / totalBudget) * 100).toFixed(1)
  const budgetGrowth = (((totalBudget - regionInfo.previousYearBudget) / regionInfo.previousYearBudget) * 100).toFixed(1)

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h2>Dashboard Keuangan Daerah</h2>
          <p>{regionInfo.name}, {regionInfo.province} — Tahun Anggaran {regionInfo.year}</p>
        </div>
        <div className="header-actions">
          <select className="region-selector" id="region-select">
            <option>Kota Bandung</option>
            <option>Kota Surabaya</option>
            <option>Kota Semarang</option>
          </select>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Anggaran APBD</span>
            <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.15)' }}>💰</div>
          </div>
          <div className="stat-value">{formatCurrency(totalBudget)}</div>
          <div className="stat-change positive">↑ +{budgetGrowth}% dari tahun lalu</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Realisasi</span>
            <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>📈</div>
          </div>
          <div className="stat-value">{formatCurrency(totalRealized)}</div>
          <div className="stat-change positive">Per April {regionInfo.year}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Efisiensi Penyerapan</span>
            <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>⚡</div>
          </div>
          <div className="stat-value">{efficiency}%</div>
          <div className={`stat-change ${parseFloat(efficiency) >= 70 ? 'positive' : 'negative'}`}>
            {parseFloat(efficiency) >= 70 ? '✓ On Track' : '⚠ Perlu Perhatian'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Anomali Terdeteksi</span>
            <div className="stat-icon" style={{ background: 'rgba(239,68,68,0.15)' }}>🔔</div>
          </div>
          <div className="stat-value">5</div>
          <div className="stat-change negative">2 prioritas tinggi</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h3>Realisasi Anggaran Bulanan</h3>
            <span className="badge badge-blue">2026</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyChart}>
              <defs>
                <linearGradient id="gradBudget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradRealized" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => `${v}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="budgetT" stroke="#3b82f6" fill="url(#gradBudget)" name="Anggaran" strokeWidth={2} />
              <Area type="monotone" dataKey="realizedT" stroke="#10b981" fill="url(#gradRealized)" name="Realisasi" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Distribusi Anggaran</h3>
            <span className="badge badge-green">Per Sektor</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {pieData.slice(0, 5).map((d, i) => (
              <span key={i} style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, display: 'inline-block' }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Table + Ranking */}
      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h3>Alokasi vs Realisasi per Sektor</h3>
            <span className="badge badge-amber">Detail</span>
          </div>
          <table className="budget-table">
            <thead>
              <tr>
                <th>Sektor</th>
                <th>Alokasi</th>
                <th>Realisasi</th>
                <th>Progress</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {budgetCategories.map(cat => {
                const pct = getRealizationPercentage(cat.realized, cat.allocated)
                return (
                  <tr key={cat.id}>
                    <td>
                      <div className="category-name">
                        <span>{cat.icon}</span> {cat.name}
                      </div>
                    </td>
                    <td>{formatCurrency(cat.allocated)}</td>
                    <td>{formatCurrency(cat.realized)}</td>
                    <td>
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${Math.min(pct, 100)}%`, background: cat.color }} />
                      </div>
                    </td>
                    <td style={{ color: pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444', fontWeight: 600 }}>
                      {pct.toFixed(1)}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Ranking Efisiensi Kecamatan</h3>
            <span className="badge badge-blue">Top 10</span>
          </div>
          <div className="ranking-list">
            {efficiencyScores.map((item, i) => (
              <div className="ranking-item" key={i}>
                <div className={`ranking-number ${i < 3 ? 'top' : 'normal'}`}>{i + 1}</div>
                <div className="ranking-info">
                  <div className="name">{item.region}</div>
                  <div className="budget">{formatCurrency(item.budget)}</div>
                </div>
                <div className={`ranking-score ${item.score >= 80 ? 'score-high' : item.score >= 65 ? 'score-medium' : 'score-low'}`}>
                  {item.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yearly comparison */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div className="card-header">
          <h3>Tren Anggaran & Realisasi Tahunan</h3>
          <span className="badge badge-green">5 Tahun</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={yearlyComparison.map(y => ({ ...y, budgetT: y.budget / 1e12, realizedT: y.realized / 1e12 }))}>
            <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => `${v}T`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="budgetT" fill="#3b82f6" name="Anggaran" radius={[4, 4, 0, 0]} />
            <Bar dataKey="realizedT" fill="#10b981" name="Realisasi" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
