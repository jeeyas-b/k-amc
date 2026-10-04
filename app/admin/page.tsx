'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Bell, ChevronDown, FileText, HeartPulse, LayoutDashboard, LogOut, Menu, Pencil, Plus, Save, Settings, Stethoscope, Trash2, Users, X } from 'lucide-react'

type Service = { id?: string; name: string; detail: string; status: 'Aktif' | 'Draft'; color: string; sort_order?: number }

const colors = ['bg-[#d8efe5]', 'bg-[#f8dfd3]', 'bg-[#e1e8f6]', 'bg-[#f7edc9]', 'bg-[#e7def7]']
const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Konten website', icon: FileText },
  { label: 'Layanan & Poli', icon: Stethoscope },
  { label: 'Dokter', icon: Users },
  { label: 'Pengaturan', icon: Settings },
]

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()
  const [menuOpen, setMenuOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [editing, setEditing] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadServices = async () => {
    const { data, error: queryError } = await supabase.from('services').select('id,name,detail,status,color,sort_order').order('sort_order')
    if (queryError) setError('Layanan belum dapat dimuat.')
    else setServices((data ?? []) as Service[])
    setLoading(false)
  }

  useEffect(() => { void loadServices() }, [])

  const saveService = async () => {
    if (!editing?.name.trim() || !editing.detail.trim()) return
    setError('')
    const payload = { name: editing.name.trim(), detail: editing.detail.trim(), status: editing.status, color: editing.color, sort_order: editing.sort_order ?? services.length + 1 }
    const result = editing.id
      ? await supabase.from('services').update(payload).eq('id', editing.id).select().single()
      : await supabase.from('services').insert(payload).select().single()
    if (result.error) { setError('Perubahan belum tersimpan. Coba lagi.'); return }
    setEditing(null)
    await loadServices()
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  const deleteService = async (service: Service) => {
    if (!service.id || !window.confirm(`Hapus ${service.name}?`)) return
    const { error: deleteError } = await supabase.from('services').delete().eq('id', service.id)
    if (deleteError) setError('Layanan belum dapat dihapus.')
    else await loadServices()
  }

  return (
    <main className="min-h-screen bg-[#f6f7f5] text-[#152b3b]">
      <aside className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 flex w-[278px] flex-col border-r border-[#dce4e1] bg-white p-6 transition-transform lg:translate-x-0`}>
        <div className="flex items-center justify-between"><a href="/" className="flex items-center gap-3 font-semibold tracking-tight"><span className="grid size-9 place-items-center rounded-full bg-[#e66d51] text-white"><HeartPulse className="size-5" /></span><span className="text-xl">ruang<span className="text-[#e66d51]">sehat</span></span></a><button className="rounded-full p-2 text-slate-400 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Tutup menu"><X /></button></div>
        <div className="mt-12"><p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Workspace</p><nav className="flex flex-col gap-1">{navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium ${label === 'Layanan & Poli' ? 'bg-[#e7f1ed] text-[#176b5c]' : 'text-slate-500 hover:bg-slate-50'}`}><Icon className="size-[18px]" />{label}</button>)}</nav></div>
        <div className="mt-auto rounded-2xl bg-[#f3f7f5] p-4"><p className="text-xs font-semibold">Butuh bantuan?</p><p className="mt-1 text-xs leading-5 text-slate-500">Hubungi support untuk pertanyaan tentang dashboard.</p></div>
        <button onClick={async () => { await supabase.auth.signOut(); router.replace('/login') }} className="mt-5 flex items-center gap-3 border-t border-[#e9eeec] pt-5 text-sm font-medium text-slate-500"><LogOut className="size-[18px]" /> Keluar</button>
      </aside>
      {menuOpen && <button aria-label="Tutup navigasi" className="fixed inset-0 z-20 bg-[#152b3b]/20 lg:hidden" onClick={() => setMenuOpen(false)} />}
      <section className="lg:pl-[278px]"><header className="flex h-[74px] items-center justify-between border-b border-[#dce4e1] bg-white px-5 sm:px-8 lg:px-10"><button className="rounded-lg p-2 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Buka menu"><Menu /></button><div className="hidden lg:block"><p className="text-xs text-slate-400">Selamat pagi,</p><p className="text-sm font-semibold">Yusri Barid</p></div><div className="ml-auto flex items-center gap-4"><Bell className="size-5 text-slate-500" /><span className="hidden h-6 w-px bg-[#e5ebe8] sm:block" /><span className="flex items-center gap-2 text-sm font-semibold"><span className="grid size-9 place-items-center rounded-full bg-[#d8efe5] text-xs text-[#176b5c]">YB</span><span className="hidden sm:block">Yusri Barid</span><ChevronDown className="hidden size-4 text-slate-400 sm:block" /></span></div></header>
        <div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e66d51]">Content manager</p><h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">Layanan & Poli</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">Tambah, ubah, dan hapus layanan spesialis yang tampil di halaman utama klinik.</p></div><a href="/" target="_blank" className="rounded-xl border border-[#dce4e1] bg-white px-4 py-3 text-sm font-semibold text-slate-600">Lihat website</a></div>
          <section className="mt-8 rounded-2xl border border-[#dce4e1] bg-white p-6 shadow-[0_8px_30px_rgba(30,70,60,0.04)] sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><h2 className="text-lg font-bold">Daftar layanan</h2><p className="mt-1 text-sm text-slate-500">Perubahan tersimpan langsung ke database website.</p></div><button onClick={() => setEditing({ name: '', detail: '', status: 'Aktif', color: colors[services.length % colors.length] })} className="flex items-center justify-center gap-2 rounded-xl bg-[#176b5c] px-4 py-3 text-sm font-semibold text-white"><Plus className="size-4" /> Tambah poli</button></div>
            {error && <p className="mt-5 rounded-xl bg-[#fff0eb] px-4 py-3 text-sm text-[#b34b35]">{error}</p>}
            {saved && <p className="mt-5 rounded-xl bg-[#e7f1ed] px-4 py-3 text-sm font-semibold text-[#176b5c]">Perubahan berhasil disimpan.</p>}
            {editing && <div className="mt-6 grid gap-4 rounded-2xl bg-[#f3f7f5] p-5 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm font-semibold">Nama poli<input autoFocus value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className="rounded-xl border border-[#dce4e1] bg-white px-4 py-3 font-normal outline-none focus:border-[#176b5c]" placeholder="Poli Jantung" /></label><label className="flex flex-col gap-2 text-sm font-semibold">Deskripsi<input value={editing.detail} onChange={e => setEditing({ ...editing, detail: e.target.value })} className="rounded-xl border border-[#dce4e1] bg-white px-4 py-3 font-normal outline-none focus:border-[#176b5c]" placeholder="Layanan spesialis" /></label><label className="flex flex-col gap-2 text-sm font-semibold">Status<select value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value as Service['status'] })} className="rounded-xl border border-[#dce4e1] bg-white px-4 py-3 font-normal"><option>Aktif</option><option>Draft</option></select></label><div className="flex items-end gap-2"><button onClick={saveService} className="flex items-center gap-2 rounded-xl bg-[#176b5c] px-4 py-3 text-sm font-semibold text-white"><Save className="size-4" /> Simpan</button><button onClick={() => setEditing(null)} className="rounded-xl border border-[#dce4e1] bg-white px-4 py-3 text-sm font-semibold text-slate-600">Batal</button></div></div>}
            <div className="mt-6 divide-y divide-[#edf1ef]">{loading ? <p className="py-8 text-center text-sm text-slate-400">Memuat layanan...</p> : services.map(service => <div key={service.id} className="flex items-center gap-4 py-4 first:pt-0"><div className={`grid size-11 shrink-0 place-items-center rounded-xl ${service.color}`}><Stethoscope className="size-5 text-[#176b5c]" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{service.name}</p><p className="mt-1 text-xs text-slate-500">{service.detail}</p></div><span className={`hidden rounded-full px-3 py-1 text-[10px] font-bold sm:inline-flex ${service.status === 'Aktif' ? 'bg-[#e7f1ed] text-[#176b5c]' : 'bg-slate-100 text-slate-500'}`}>{service.status}</span><button onClick={() => setEditing(service)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-[#176b5c]" aria-label={`Edit ${service.name}`}><Pencil className="size-4" /></button><button onClick={() => deleteService(service)} className="rounded-lg p-2 text-slate-400 hover:bg-[#fff0eb] hover:text-[#b34b35]" aria-label={`Hapus ${service.name}`}><Trash2 className="size-4" /></button></div>)}</div>
          </section>
        </div></section>
    </main>
  )
}
