// Mock data for regional budget (APBD) - Kota Bandung 2026
export const regionInfo = {
  name: "Kota Bandung",
  province: "Jawa Barat",
  year: 2026,
  totalBudget: 8_750_000_000_000, // 8.75 Triliun
  totalRealization: 6_125_000_000_000, // 6.125 Triliun
  previousYearBudget: 8_200_000_000_000,
  population: 2_530_000,
};

export const budgetCategories = [
  {
    id: 1,
    name: "Pendidikan",
    icon: "📚",
    allocated: 2_187_500_000_000,
    realized: 1_640_625_000_000,
    color: "#6366f1",
    subcategories: [
      { name: "Gaji Guru & Tenaga Pendidik", allocated: 875_000_000_000, realized: 831_250_000_000 },
      { name: "Infrastruktur Sekolah", allocated: 656_250_000_000, realized: 393_750_000_000 },
      { name: "Beasiswa & Bantuan Siswa", allocated: 437_500_000_000, realized: 306_250_000_000 },
      { name: "Program Digitalisasi Pendidikan", allocated: 218_750_000_000, realized: 109_375_000_000 },
    ],
  },
  {
    id: 2,
    name: "Kesehatan",
    icon: "🏥",
    allocated: 1_750_000_000_000,
    realized: 1_312_500_000_000,
    color: "#10b981",
    subcategories: [
      { name: "Rumah Sakit Daerah", allocated: 700_000_000_000, realized: 595_000_000_000 },
      { name: "Puskesmas & Posyandu", allocated: 525_000_000_000, realized: 393_750_000_000 },
      { name: "Program Vaksinasi", allocated: 262_500_000_000, realized: 210_000_000_000 },
      { name: "BPJS Kesehatan Daerah", allocated: 262_500_000_000, realized: 113_750_000_000 },
    ],
  },
  {
    id: 3,
    name: "Infrastruktur",
    icon: "🏗️",
    allocated: 1_575_000_000_000,
    realized: 945_000_000_000,
    color: "#f59e0b",
    subcategories: [
      { name: "Perbaikan Jalan & Jembatan", allocated: 630_000_000_000, realized: 441_000_000_000 },
      { name: "Drainase & Sanitasi", allocated: 472_500_000_000, realized: 236_250_000_000 },
      { name: "Fasilitas Publik", allocated: 315_000_000_000, realized: 189_000_000_000 },
      { name: "Smart City Infrastructure", allocated: 157_500_000_000, realized: 78_750_000_000 },
    ],
  },
  {
    id: 4,
    name: "Sosial & Kesejahteraan",
    icon: "🤝",
    allocated: 1_050_000_000_000,
    realized: 787_500_000_000,
    color: "#ef4444",
    subcategories: [
      { name: "Bantuan Sosial Langsung", allocated: 420_000_000_000, realized: 378_000_000_000 },
      { name: "Program Pemberdayaan Masyarakat", allocated: 315_000_000_000, realized: 220_500_000_000 },
      { name: "Penanggulangan Bencana", allocated: 157_500_000_000, realized: 110_250_000_000 },
      { name: "Perlindungan Anak & Perempuan", allocated: 157_500_000_000, realized: 78_750_000_000 },
    ],
  },
  {
    id: 5,
    name: "Pemerintahan",
    icon: "🏛️",
    allocated: 875_000_000_000,
    realized: 700_000_000_000,
    color: "#8b5cf6",
    subcategories: [
      { name: "Gaji & Tunjangan ASN", allocated: 437_500_000_000, realized: 415_625_000_000 },
      { name: "Operasional Kantor", allocated: 218_750_000_000, realized: 175_000_000_000 },
      { name: "Digitalisasi Layanan Publik", allocated: 131_250_000_000, realized: 78_750_000_000 },
      { name: "Pelatihan & Pengembangan SDM", allocated: 87_500_000_000, realized: 30_625_000_000 },
    ],
  },
  {
    id: 6,
    name: "Ekonomi & UMKM",
    icon: "💼",
    allocated: 700_000_000_000,
    realized: 385_000_000_000,
    color: "#06b6d4",
    subcategories: [
      { name: "Bantuan Modal UMKM", allocated: 280_000_000_000, realized: 168_000_000_000 },
      { name: "Pengembangan Pasar Tradisional", allocated: 175_000_000_000, realized: 96_250_000_000 },
      { name: "Program Pelatihan Kewirausahaan", allocated: 140_000_000_000, realized: 84_000_000_000 },
      { name: "Inkubator Startup Daerah", allocated: 105_000_000_000, realized: 36_750_000_000 },
    ],
  },
  {
    id: 7,
    name: "Lingkungan",
    icon: "🌿",
    allocated: 437_500_000_000,
    realized: 262_500_000_000,
    color: "#22c55e",
    subcategories: [
      { name: "Pengelolaan Sampah", allocated: 175_000_000_000, realized: 131_250_000_000 },
      { name: "Penghijauan Kota", allocated: 131_250_000_000, realized: 78_750_000_000 },
      { name: "Pengendalian Polusi", allocated: 87_500_000_000, realized: 35_000_000_000 },
      { name: "Konservasi Air", allocated: 43_750_000_000, realized: 17_500_000_000 },
    ],
  },
  {
    id: 8,
    name: "Keamanan & Ketertiban",
    icon: "🛡️",
    allocated: 175_000_000_000,
    realized: 91_875_000_000,
    color: "#ec4899",
    subcategories: [
      { name: "Satpol PP & Linmas", allocated: 70_000_000_000, realized: 52_500_000_000 },
      { name: "CCTV & Monitoring Kota", allocated: 52_500_000_000, realized: 21_000_000_000 },
      { name: "Penanggulangan Kebakaran", allocated: 35_000_000_000, realized: 12_250_000_000 },
      { name: "Ketertiban Umum", allocated: 17_500_000_000, realized: 6_125_000_000 },
    ],
  },
];

export const monthlyRealization = [
  { month: "Jan", budget: 729_166_666_667, realized: 510_416_666_667 },
  { month: "Feb", budget: 729_166_666_667, realized: 583_333_333_333 },
  { month: "Mar", budget: 729_166_666_667, realized: 656_250_000_000 },
  { month: "Apr", budget: 729_166_666_667, realized: 437_500_000_000 },
  { month: "Mei", budget: 729_166_666_667, realized: 583_333_333_333 },
  { month: "Jun", budget: 729_166_666_667, realized: 510_416_666_667 },
  { month: "Jul", budget: 729_166_666_667, realized: 656_250_000_000 },
  { month: "Ags", budget: 729_166_666_667, realized: 729_166_666_667 },
  { month: "Sep", budget: 729_166_666_667, realized: 510_416_666_667 },
  { month: "Okt", budget: 729_166_666_667, realized: 291_666_666_667 },
  { month: "Nov", budget: 729_166_666_667, realized: 145_833_333_333 },
  { month: "Des", budget: 729_166_666_667, realized: 0 },
];

export const anomalies = [
  {
    id: 1,
    severity: "high",
    category: "Infrastruktur",
    subcategory: "Drainase & Sanitasi",
    description: "Realisasi anggaran hanya 50% dari alokasi pada Q3. Terdapat indikasi keterlambatan proyek yang signifikan.",
    amount: 236_250_000_000,
    detectedDate: "2026-03-15",
    recommendation: "Lakukan audit proyek dan evaluasi vendor pelaksana. Pertimbangkan realokasi anggaran ke proyek yang lebih siap.",
  },
  {
    id: 2,
    severity: "high",
    category: "Ekonomi & UMKM",
    subcategory: "Inkubator Startup Daerah",
    description: "Penyerapan anggaran hanya 35%. Program belum berjalan optimal, target peserta belum tercapai.",
    amount: 68_250_000_000,
    detectedDate: "2026-03-20",
    recommendation: "Perkuat sosialisasi program dan perbaiki mekanisme seleksi peserta. Kolaborasi dengan universitas lokal.",
  },
  {
    id: 3,
    severity: "medium",
    category: "Pemerintahan",
    subcategory: "Pelatihan & Pengembangan SDM",
    description: "Realisasi 35% dari alokasi. Beberapa program pelatihan tertunda karena proses pengadaan yang lambat.",
    amount: 56_875_000_000,
    detectedDate: "2026-04-01",
    recommendation: "Percepat proses pengadaan dengan memanfaatkan e-katalog. Gunakan pelatihan online untuk efisiensi.",
  },
  {
    id: 4,
    severity: "medium",
    category: "Kesehatan",
    subcategory: "BPJS Kesehatan Daerah",
    description: "Klaim BPJS daerah melebihi proyeksi awal sebesar 15%. Perlu evaluasi pola klaim.",
    amount: 148_750_000_000,
    detectedDate: "2026-02-28",
    recommendation: "Analisis pola klaim per faskes. Tingkatkan program preventif untuk mengurangi beban kuratif.",
  },
  {
    id: 5,
    severity: "low",
    category: "Lingkungan",
    subcategory: "Konservasi Air",
    description: "Realisasi rendah (40%) tetapi masih dalam rentang normal mengingat timeline proyek.",
    amount: 26_250_000_000,
    detectedDate: "2026-04-10",
    recommendation: "Monitor secara berkala. Pastikan timeline proyek tetap on track untuk semester 2.",
  },
];

export const efficiencyScores = [
  { region: "Kec. Coblong", score: 92, budget: 120_000_000_000, realized: 110_400_000_000 },
  { region: "Kec. Bandung Wetan", score: 88, budget: 95_000_000_000, realized: 83_600_000_000 },
  { region: "Kec. Cicendo", score: 85, budget: 110_000_000_000, realized: 93_500_000_000 },
  { region: "Kec. Sumur Bandung", score: 82, budget: 88_000_000_000, realized: 72_160_000_000 },
  { region: "Kec. Cibeunying Kaler", score: 79, budget: 105_000_000_000, realized: 82_950_000_000 },
  { region: "Kec. Lengkong", score: 76, budget: 98_000_000_000, realized: 74_480_000_000 },
  { region: "Kec. Astanaanyar", score: 73, budget: 92_000_000_000, realized: 67_160_000_000 },
  { region: "Kec. Regol", score: 69, budget: 85_000_000_000, realized: 58_650_000_000 },
  { region: "Kec. Batununggal", score: 65, budget: 115_000_000_000, realized: 74_750_000_000 },
  { region: "Kec. Kiaracondong", score: 58, budget: 102_000_000_000, realized: 59_160_000_000 },
];

export const yearlyComparison = [
  { year: "2022", budget: 7_200_000_000_000, realized: 5_760_000_000_000, efficiency: 80 },
  { year: "2023", budget: 7_600_000_000_000, realized: 6_308_000_000_000, efficiency: 83 },
  { year: "2024", budget: 7_900_000_000_000, realized: 6_715_000_000_000, efficiency: 85 },
  { year: "2025", budget: 8_200_000_000_000, realized: 6_888_000_000_000, efficiency: 84 },
  { year: "2026*", budget: 8_750_000_000_000, realized: 6_125_000_000_000, efficiency: 70 },
];

export const formatCurrency = (value) => {
  if (value >= 1_000_000_000_000) {
    return `Rp ${(value / 1_000_000_000_000).toFixed(2)} T`;
  } else if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toFixed(1)} M`;
  } else if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(0)} Jt`;
  }
  return `Rp ${value.toLocaleString('id-ID')}`;
};

export const formatPercentage = (value) => `${value.toFixed(1)}%`;

export const getRealizationPercentage = (realized, allocated) => 
  ((realized / allocated) * 100);
