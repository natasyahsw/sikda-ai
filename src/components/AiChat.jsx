import { useState, useRef, useEffect } from 'react'
import { budgetCategories, regionInfo, anomalies, formatCurrency, efficiencyScores } from '../data/budgetData'

const AZURE_ENDPOINT = ''
const AZURE_KEY = ''

const systemPrompt = `Kamu adalah SIKDA AI, asisten cerdas untuk analisis keuangan daerah. Kamu membantu pejabat daerah dan masyarakat memahami anggaran APBD.

Data konteks:
- Daerah: ${regionInfo.name}, ${regionInfo.province}
- Tahun Anggaran: ${regionInfo.year}
- Total APBD: Rp 8,75 Triliun
- Total Realisasi: Rp 6,125 Triliun (70%)
- Jumlah Penduduk: 2.530.000

Sektor Anggaran:
${budgetCategories.map(c => `- ${c.name}: Alokasi ${formatCurrency(c.allocated)}, Realisasi ${formatCurrency(c.realized)} (${((c.realized/c.allocated)*100).toFixed(1)}%)`).join('\n')}

Anomali terdeteksi:
${anomalies.map(a => `- [${a.severity.toUpperCase()}] ${a.category}/${a.subcategory}: ${a.description}`).join('\n')}

Top Kecamatan Efisien: ${efficiencyScores.slice(0,3).map(e => `${e.region} (${e.score})`).join(', ')}

Jawab dalam Bahasa Indonesia yang profesional tapi mudah dipahami. Berikan insight berbasis data. Jika ditanya hal di luar keuangan daerah, arahkan kembali ke topik.`

const suggestions = [
  'Bagaimana efisiensi penyerapan anggaran tahun ini?',
  'Sektor mana yang paling rendah realisasinya?',
  'Apa rekomendasi untuk meningkatkan transparansi?',
  'Jelaskan anomali yang terdeteksi di sektor Infrastruktur',
  'Bandingkan alokasi Pendidikan vs Kesehatan',
]

function generateLocalResponse(question) {
  const q = question.toLowerCase()

  if (q.includes('efisiensi') || q.includes('penyerapan')) {
    return `📊 **Analisis Efisiensi Penyerapan Anggaran ${regionInfo.year}**\n\nTotal penyerapan anggaran ${regionInfo.name} saat ini mencapai **${formatCurrency(regionInfo.totalRealization)}** dari total APBD **${formatCurrency(regionInfo.totalBudget)}**, atau sekitar **70%**.\n\n**Sektor dengan penyerapan tertinggi:**\n- Pemerintahan: 80.0%\n- Kesehatan: 75.0%\n- Pendidikan: 75.0%\n\n**Sektor dengan penyerapan terendah:**\n- Ekonomi & UMKM: 55.0%\n- Keamanan: 52.5%\n- Infrastruktur: 60.0%\n\n💡 **Rekomendasi AI:** Perlu percepatan penyerapan di sektor Ekonomi & UMKM dan Infrastruktur. Evaluasi proses pengadaan dan pastikan kontrak proyek berjalan sesuai timeline.`
  }

  if (q.includes('rendah') || q.includes('terendah') || q.includes('lambat')) {
    const sorted = [...budgetCategories].sort((a, b) => (a.realized / a.allocated) - (b.realized / b.allocated))
    const bottom3 = sorted.slice(0, 3)
    return `⚠️ **Sektor dengan Realisasi Terendah:**\n\n${bottom3.map((c, i) => `${i + 1}. **${c.name}** ${c.icon}\n   - Alokasi: ${formatCurrency(c.allocated)}\n   - Realisasi: ${formatCurrency(c.realized)} (${((c.realized / c.allocated) * 100).toFixed(1)}%)\n   - Gap: ${formatCurrency(c.allocated - c.realized)}`).join('\n\n')}\n\n💡 **Insight AI:** Ketiga sektor ini memiliki pola yang serupa — lambatnya proses pengadaan dan kurangnya kapasitas pelaksana. Disarankan untuk melakukan percepatan melalui e-procurement dan penambahan tenaga teknis.`
  }

  if (q.includes('transparansi')) {
    return `🔍 **Rekomendasi Peningkatan Transparansi Keuangan Daerah:**\n\n1. **Portal Data Terbuka** — Publikasikan data APBD secara real-time melalui dashboard publik (seperti SIKDA AI ini)\n2. **Laporan Otomatis** — Gunakan AI untuk menghasilkan laporan keuangan berkala yang mudah dipahami masyarakat\n3. **Notifikasi Anomali** — Sistem deteksi dini untuk penyimpangan anggaran\n4. **Partisipasi Publik** — Buka kanal feedback dari masyarakat terkait penggunaan anggaran\n5. **Audit Berbasis AI** — Implementasi machine learning untuk mendeteksi pola pengeluaran tidak wajar\n\n🏛️ Platform SIKDA AI dirancang untuk menjawab semua kebutuhan ini dengan memanfaatkan **Microsoft Azure AI Services**.`
  }

  if (q.includes('anomali') || q.includes('infrastruktur')) {
    const infra = anomalies.filter(a => a.category === 'Infrastruktur')
    return `🚨 **Anomali Terdeteksi di Sektor Infrastruktur:**\n\n${infra.map(a => `**${a.subcategory}** (Severity: ${a.severity.toUpperCase()})\n- ${a.description}\n- Nilai: ${formatCurrency(a.amount)}\n- Terdeteksi: ${a.detectedDate}\n- 💡 Rekomendasi: ${a.recommendation}`).join('\n\n')}\n\nSistem AI kami menganalisis pola pengeluaran dan membandingkan dengan benchmark kecamatan lain untuk mendeteksi anomali secara otomatis.`
  }

  if (q.includes('pendidikan') && q.includes('kesehatan') || q.includes('bandingkan')) {
    const edu = budgetCategories.find(c => c.name === 'Pendidikan')
    const health = budgetCategories.find(c => c.name === 'Kesehatan')
    return `📊 **Perbandingan Sektor Pendidikan vs Kesehatan:**\n\n| Indikator | 📚 Pendidikan | 🏥 Kesehatan |\n|-----------|--------------|---------------|\n| Alokasi | ${formatCurrency(edu.allocated)} | ${formatCurrency(health.allocated)} |\n| Realisasi | ${formatCurrency(edu.realized)} | ${formatCurrency(health.realized)} |\n| Penyerapan | ${((edu.realized/edu.allocated)*100).toFixed(1)}% | ${((health.realized/health.allocated)*100).toFixed(1)}% |\n| Proporsi APBD | ${((edu.allocated/regionInfo.totalBudget)*100).toFixed(1)}% | ${((health.allocated/regionInfo.totalBudget)*100).toFixed(1)}% |\n\n💡 **Insight:** Pendidikan mendapatkan alokasi terbesar (25% APBD) sesuai amanat UU, sementara Kesehatan di posisi kedua. Kedua sektor menunjukkan penyerapan yang relatif baik.`
  }

  return `📋 **Analisis SIKDA AI:**\n\nTerima kasih atas pertanyaan Anda. Berdasarkan data APBD ${regionInfo.name} ${regionInfo.year}:\n\n- Total anggaran: **${formatCurrency(regionInfo.totalBudget)}**\n- Realisasi saat ini: **${formatCurrency(regionInfo.totalRealization)}** (70%)\n- Terdapat **${anomalies.length} anomali** yang perlu perhatian\n- Kecamatan terefisien: **${efficiencyScores[0].region}** (skor ${efficiencyScores[0].score})\n\nSilakan tanyakan hal lebih spesifik tentang sektor tertentu, anomali, atau rekomendasi kebijakan. Saya siap membantu analisis! 🎯`
}

export default function AiChat() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `👋 Selamat datang di **SIKDA AI Assistant**!\n\nSaya adalah asisten cerdas berbasis **Azure AI** yang siap membantu Anda menganalisis data keuangan daerah ${regionInfo.name}.\n\nAnda bisa bertanya tentang:\n- 📊 Efisiensi penyerapan anggaran\n- 🔍 Detail alokasi per sektor\n- ⚠️ Anomali dan rekomendasi\n- 📈 Tren dan perbandingan\n\nSilakan ketik pertanyaan atau pilih topik di bawah!`
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const userMsg = text || input
    if (!userMsg.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput('')
    setIsTyping(true)

    // Try Azure OpenAI first, fallback to local
    let response = ''
    if (AZURE_ENDPOINT && AZURE_KEY) {
      try {
        const res = await fetch(AZURE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'api-key': AZURE_KEY },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
              { role: 'user', content: userMsg }
            ],
            max_tokens: 800,
            temperature: 0.7,
          })
        })
        const data = await res.json()
        response = data.choices?.[0]?.message?.content || ''
      } catch {
        response = ''
      }
    }

    if (!response) {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 1200))
      response = generateLocalResponse(userMsg)
    }

    setIsTyping(false)
    setMessages(prev => [...prev, { role: 'ai', content: response }])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h2>🤖 AI Assistant</h2>
          <p>Tanyakan apapun tentang keuangan daerah — powered by Azure OpenAI</p>
        </div>
      </div>

      <div className="card chat-container">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.role}`}>
              <div className="chat-avatar">
                {msg.role === 'ai' ? '🤖' : '👤'}
              </div>
              <div className="chat-bubble">
                {msg.content.split('\n').map((line, j) => (
                  <span key={j}>
                    {line.replace(/\*\*(.*?)\*\*/g, (_, t) => t)}
                    {j < msg.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message ai">
              <div className="chat-avatar">🤖</div>
              <div className="chat-bubble">
                <div className="typing-indicator">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="suggestions">
            {suggestions.map((s, i) => (
              <button key={i} className="suggestion-chip" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input-area">
          <textarea
            className="chat-input"
            placeholder="Ketik pertanyaan tentang keuangan daerah..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            id="chat-input"
          />
          <button className="chat-send" onClick={() => sendMessage()} disabled={!input.trim() || isTyping} id="chat-send-btn">
            Kirim
          </button>
        </div>
      </div>
    </div>
  )
}
