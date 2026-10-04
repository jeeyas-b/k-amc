'use client'

import { useState } from 'react'
import { Bell, ChevronDown, FileText, HeartPulse, ImagePlus, LayoutDashboard, LogOut, Menu, MoreHorizontal, Pencil, Plus, Save, Settings, Stethoscope, Users, X } from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Konten website', icon: FileText, active: true },
  { label: 'Layanan & Poli', icon: Stethoscope },
  { label: 'Dokter', icon: Users },
  { label: 'Pengaturan', icon: Settings },
]

const initialServices = [
  { name: 'Poli Interna', detail: 'Penyakit dalam', status: 'Aktif', color: 'bg-[#d8efe5]' },
  { name: 'Poli Obgyn', detail: 'Kesehatan perempuan', status: 'Aktif', color: 'bg-[#f8dfd3]' },
  { name: 'Poli Bedah', detail: 'Tindakan bedah', status: 'Aktif', color: 'bg-[#e1e8f6]' },
  { name: 'Poli Anak', detail: 'Tumbuh kembang', status: 'Aktif', color: 'bg-[#f7edc9]' },
]

export default function AdminPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeSection, setActiveSection] = useState('Konten website')
  const [heroTitle, setHeroTitle] = useState('Rawat tubuh.\nTenangkan pikiran.')
  const [heroDescription, setHeroDescription] = useState('Klinik modern untuk Anda yang ingin merasa lebih baik — bukan sekadar terlihat baik. Kami hadir dengan waktu, perhatian, dan perawatan yang utuh.')
  const [services, setServices] = useState(initialServices)

  const saveContent = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2600)
  }

  return (
    <main className="min-h-screen bg-[#f6f7f5] text-[#152b3b]">
      <aside className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 flex w-[278px] flex-col border-r border-[#dce4e1] bg-white p-6 transition-transform lg:translate-x-0`}>
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 font-semibold tracking-tight"><span className="grid size-9 place-items-center rounded-full bg-[#e66d51] text-white"><HeartPulse className="size-5" /></span><span className="text-xl">ruang<span className="text-[#e66d51]">sehat</span></span></a>
          <button className="rounded-full p-2 text-slate-400 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Tutup menu"><X /></button>
        </div>
        <div className="mt-12"><p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Workspace</p><nav className="flex flex-col gap-1">{navItems.map(({ label, icon: Icon, active }) => <button key={label} onClick={() => { setActiveSection(label); setMenuOpen(false) }} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${activeSection === label || active && activeSection === 'Konten website' ? 'bg-[#e7f1ed] text-[#176b5c]' : 'text-slate-500 hover:bg-slate-50 hover:text-[#152b3b]'}`}><Icon className="size-[18px]" />{label}</button>)}</nav></div>
        <div className="mt-auto rounded-2xl bg-[#f3f7f5] p-4"><p className="text-xs font-semibold text-[#152b3b]">Butuh bantuan?</p><p className="mt-1 text-xs leading-5 text-slate-500">Hubungi support untuk pertanyaan tentang dashboard.</p><button className="mt-3 text-xs font-bold text-[#176b5c]">Buka pusat bantuan →</button></div>
        <button className="mt-5 flex items-center gap-3 border-t border-[#e9eeec] pt-5 text-sm font-medium text-slate-500"><LogOut className="size-[18px]" /> Keluar</button>
      </aside>

      {menuOpen && <button aria-label="Tutup navigasi" className="fixed inset-0 z-20 bg-[#152b3b]/20 lg:hidden" onClick={() => setMenuOpen(false)} />}
      <section className="lg:pl-[278px]">
        <header className="flex h-[74px] items-center justify-between border-b border-[#dce4e1] bg-white px-5 sm:px-8 lg:px-10"><button className="rounded-lg p-2 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Buka menu"><Menu /></button><div className="hidden lg:block"><p className="text-xs text-slate-400">Selamat pagi,</p><p className="text-sm font-semibold">Yusri Barid</p></div><div className="ml-auto flex items-center gap-4"><button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-50" aria-label="Notifikasi"><Bell className="size-5" /><span className="absolute right-1 top-1 size-2 rounded-full bg-[#e66d51]" /></button><span className="hidden h-6 w-px bg-[#e5ebe8] sm:block" /><button className="flex items-center gap-2 text-sm font-semibold"><span className="grid size-9 place-items-center rounded-full bg-[#d8efe5] text-xs text-[#176b5c]">YB</span><span className="hidden sm:block">Yusri Barid</span><ChevronDown className="hidden size-4 text-slate-400 sm:block" /></button></div></header>
        <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e66d51]">Content manager</p><h1 className="mt-2 font-serif text-4xl tracking-tight text-[#152b3b] sm:text-5xl">Atur konten website</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">Kelola tampilan dan informasi yang dilihat pasien di halaman utama klinik.</p></div><div className="flex items-center gap-3"><a href="/" target="_blank" className="rounded-xl border border-[#dce4e1] bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:border-[#176b5c]">Lihat website</a><button onClick={saveContent} className="flex items-center gap-2 rounded-xl bg-[#176b5c] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"><Save className="size-4" />{saved ? 'Tersimpan' : 'Simpan perubahan'}</button></div></div>
          <div className="mt-8 grid gap-7 xl:grid-cols-[minmax(0,1fr)_330px]">
            <div className="flex flex-col gap-6">
              <section className="rounded-2xl border border-[#dce4e1] bg-white p-6 shadow-[0_8px_30px_rgba(30,70,60,0.04)] sm:p-8"><div className="flex items-start justify-between"><div><h2 className="text-lg font-bold">Hero section</h2><p className="mt-1 text-sm text-slate-500">Pesan utama yang muncul di bagian paling atas website.</p></div><span className="rounded-full bg-[#e7f1ed] px-3 py-1.5 text-[11px] font-bold text-[#176b5c]">Terbit</span></div><div className="mt-7 grid gap-6 lg:grid-cols-[1fr_230px]"><div className="flex flex-col gap-5"><label className="flex flex-col gap-2 text-sm font-semibold">Judul utama<textarea value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} rows={2} className="resize-none rounded-xl border border-[#dce4e1] bg-[#fbfcfb] px-4 py-3 text-xl font-serif font-normal leading-tight outline-none transition focus:border-[#176b5c] focus:ring-2 focus:ring-[#176b5c]/10" /></label><label className="flex flex-col gap-2 text-sm font-semibold">Deskripsi<textarea value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} rows={4} className="resize-none rounded-xl border border-[#dce4e1] bg-[#fbfcfb] px-4 py-3 text-sm font-normal leading-6 outline-none transition focus:border-[#176b5c] focus:ring-2 focus:ring-[#176b5c]/10" /></label><div className="grid gap-5 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm font-semibold">Teks tombol<input defaultValue="Mulai perjalanan sehat" className="rounded-xl border border-[#dce4e1] bg-[#fbfcfb] px-4 py-3 text-sm font-normal outline-none focus:border-[#176b5c]" /></label><label className="flex flex-col gap-2 text-sm font-semibold">Link tombol<input defaultValue="#janji" className="rounded-xl border border-[#dce4e1] bg-[#fbfcfb] px-4 py-3 text-sm font-normal outline-none focus:border-[#176b5c]" /></label></div></div><div className="group relative overflow-hidden rounded-2xl bg-[#e7f1ed]"><img src="/clinic-hero.png" alt="Pratinjau foto hero" className="h-full min-h-[170px] w-full object-cover" /><button className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-xl bg-white/90 text-[#176b5c] shadow-sm" aria-label="Ganti gambar hero"><ImagePlus className="size-4" /></button></div></div></section>
              <section className="rounded-2xl border border-[#dce4e1] bg-white p-6 shadow-[0_8px_30px_rgba(30,70,60,0.04)] sm:p-8"><div className="flex items-start justify-between"><div><h2 className="text-lg font-bold">Layanan unggulan</h2><p className="mt-1 text-sm text-slate-500">Atur layanan poli yang ditampilkan pada halaman utama.</p></div><button className="flex items-center gap-2 rounded-xl border border-[#dce4e1] px-3 py-2 text-xs font-bold text-[#176b5c] hover:bg-[#f3f7f5]"><Plus className="size-4" /> Tambah poli</button></div><div className="mt-6 divide-y divide-[#edf1ef]">{services.map((service, index) => <div key={service.name} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"><div className={`grid size-11 shrink-0 place-items-center rounded-xl ${service.color}`}><Stethoscope className="size-5 text-[#176b5c]" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{service.name}</p><p className="mt-1 text-xs text-slate-500">{service.detail}</p></div><span className="hidden rounded-full bg-[#e7f1ed] px-3 py-1 text-[10px] font-bold text-[#176b5c] sm:inline-flex">{service.status}</span><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-[#176b5c]" aria-label={`Edit ${service.name}`}><Pencil className="size-4" /></button><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50" aria-label={`Opsi ${service.name}`}><MoreHorizontal className="size-4" /></button></div>)}</div><button className="mt-6 text-sm font-bold text-[#176b5c]">Kelola semua layanan →</button></section>
            </div>
            <aside className="flex flex-col gap-6"><section className="rounded-2xl border border-[#dce4e1] bg-[#152b3b] p-6 text-white"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#f0b29f]">Status website</p><span className="size-2 rounded-full bg-[#7bd7b0]" /></div><p className="mt-5 text-3xl font-serif">Website aktif</p><p className="mt-2 text-sm leading-6 text-white/60">Perubahan terakhir dipublikasikan 2 jam lalu.</p><div className="mt-7 border-t border-white/10 pt-5"><p className="text-xs text-white/50">Draft tersimpan</p><p className="mt-1 text-sm font-semibold">Tidak ada perubahan tertunda</p></div></section><section className="rounded-2xl border border-[#dce4e1] bg-white p-6"><h2 className="font-bold">Aktivitas terbaru</h2><div className="mt-5 flex flex-col gap-5">{['Hero section diperbarui', 'Foto dokter Poli Obgyn diganti', 'Poli Gigi Ortodontis ditambahkan'].map((item, index) => <div key={item} className="flex gap-3"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#e66d51]" /><div><p className="text-sm font-medium leading-5">{item}</p><p className="mt-1 text-xs text-slate-400">{index === 0 ? '2 jam lalu' : `${index + 1} hari lalu`}</p></div></div>)}</div><button className="mt-6 w-full rounded-xl border border-[#dce4e1] py-3 text-xs font-bold text-slate-600">Lihat semua aktivitas</button></section></aside>
          </div>
        </div>
      </section>
    </main>
  )
}
