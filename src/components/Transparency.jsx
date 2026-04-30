import { useState } from 'react'
import { budgetCategories, formatCurrency, getRealizationPercentage } from '../data/budgetData'

export default function Transparency() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  const filtered = budgetCategories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.subcategories.some(s => s.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h2>🔍 Portal Transparansi Anggaran</h2>
          <p>Akses publik terhadap data alokasi dan realisasi APBD</p>
        </div>
      </div>

      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Cari sektor atau program anggaran..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          id="search-budget"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Detail Anggaran per Sektor & Program</h3>
          <span className="badge badge-green">Klik untuk detail</span>
        </div>
        <table className="budget-table">
          <thead>
            <tr>
              <th>Sektor / Program</th>
              <th>Alokasi</th>
              <th>Realisasi</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(cat => {
              const pct = getRealizationPercentage(cat.realized, cat.allocated)
              const isExpanded = expanded === cat.id
              return (
                <> 
                  <tr
                    key={cat.id}
                    className="expandable-row"
                    onClick={() => setExpanded(isExpanded ? null : cat.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div className="category-name">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                        <span style={{ fontSize: 10, color: '#64748b' }}>{isExpanded ? '▼' : '▶'}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{formatCurrency(cat.allocated)}</td>
                    <td>{formatCurrency(cat.realized)}</td>
                    <td>
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${Math.min(pct, 100)}%`, background: cat.color }} />
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${pct >= 70 ? 'badge-green' : pct >= 50 ? 'badge-amber' : 'badge-red'}`}>
                        {pct.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                  {isExpanded && cat.subcategories.map((sub, j) => {
                    const subPct = getRealizationPercentage(sub.realized, sub.allocated)
                    return (
                      <tr key={`${cat.id}-${j}`} className="sub-row">
                        <td style={{ paddingLeft: 48 }}>↳ {sub.name}</td>
                        <td>{formatCurrency(sub.allocated)}</td>
                        <td>{formatCurrency(sub.realized)}</td>
                        <td>
                          <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${Math.min(subPct, 100)}%`, background: cat.color, opacity: 0.7 }} />
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: 12, color: subPct >= 70 ? '#10b981' : subPct >= 50 ? '#f59e0b' : '#ef4444' }}>
                            {subPct.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
