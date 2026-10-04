'use server'

import { createClient } from '@supabase/supabase-js'

export async function ensureDefaultAdmin() {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
  const email = 'admin@ruangsehat.id'
  const password = 'RuangSehat#2026'
  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 100 })
  if (error) return { ok: false, message: 'Layanan login sedang tidak tersedia.' }
  if (!data.users.some((user) => user.email === email)) {
    const { error: createError } = await admin.auth.admin.createUser({ email, password, email_confirm: true })
    if (createError) return { ok: false, message: 'Akun admin belum dapat disiapkan.' }
  }
  return { ok: true }
}
