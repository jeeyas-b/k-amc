'use client'

import { FormEvent, useState } from 'react'
import { HeartPulse, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ensureDefaultAdmin } from './actions'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@ruangsehat.id')
  const [password, setPassword] = useState('RuangSehat#2026')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    const setup = await ensureDefaultAdmin()
    if (!setup.ok) {
      setError(setup.message ?? 'Akses admin belum siap. Coba lagi.')
      setLoading(false)
      return
    }
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError('Email atau password admin tidak valid.')
      setLoading(false)
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#f6f7f5] text-[#152b3b] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden bg-[#152b3b] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <a href="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight"><span className="grid size-9 place-items-center rounded-full bg-[#e66d51]"><HeartPulse className="size-5" /></span>ruang<span className="text-[#f0b29f]">sehat</span></a>
        <div className="max-w-md"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f0b29f]">Ruang pengelola</p><h1 className="mt-5 font-serif text-6xl leading-[0.98] tracking-tight">Rawat pengalaman pasien dari satu tempat.</h1><p className="mt-6 max-w-sm text-sm leading-7 text-white/60">Kelola konten, layanan spesialis, dan informasi dokter Klinik ruangsehat dengan lebih mudah.</p></div>
        <p className="text-xs text-white/40">© 2026 ruangsehat clinic</p>
      </section>
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[430px]">
          <a href="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight lg:hidden"><span className="grid size-9 place-items-center rounded-full bg-[#e66d51] text-white"><HeartPulse className="size-5" /></span>ruang<span className="text-[#e66d51]">sehat</span></a>
          <div className="mt-16 sm:mt-20"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e66d51]">Admin portal</p><h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Selamat datang kembali.</h2><p className="mt-4 text-sm leading-6 text-slate-500">Masuk untuk mengatur konten website klinik.</p></div>
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-sm font-semibold">Email admin<div className="flex items-center gap-3 rounded-xl border border-[#dce4e1] bg-white px-4 py-3 focus-within:border-[#176b5c] focus-within:ring-2 focus-within:ring-[#176b5c]/10"><Mail className="size-4 text-slate-400" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm font-normal outline-none" /></div></label>
            <label className="flex flex-col gap-2 text-sm font-semibold">Password<div className="flex items-center gap-3 rounded-xl border border-[#dce4e1] bg-white px-4 py-3 focus-within:border-[#176b5c] focus-within:ring-2 focus-within:ring-[#176b5c]/10"><LockKeyhole className="size-4 text-slate-400" /><input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm font-normal outline-none" /></div></label>
            {error && <p role="alert" className="rounded-xl bg-[#fff0eb] px-4 py-3 text-sm text-[#b54e38]">{error}</p>}
            <button disabled={loading} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#176b5c] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#125849] disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Menyiapkan akses...' : 'Masuk ke dashboard'}</button>
          </form>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#dce4e1] bg-white p-4"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#176b5c]" /><p className="text-xs leading-5 text-slate-500">Akses ini khusus pengelola klinik. Jangan bagikan kredensial kepada orang lain.</p></div>
        </div>
      </section>
    </main>
  )
}
