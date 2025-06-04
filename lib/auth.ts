import { cookies } from 'next/headers'
import { prisma } from '@/prisma/prisma-client'

export const getAdmin = async () => {
  const sessionCookie = cookies().get('admin_session')?.value
  
  if (!sessionCookie) return null

  const admin = await prisma.user.findFirst({
    where: { 
      id: parseInt(sessionCookie),
      role: 'ADMIN'
    }
  })

  return admin
}

export const loginAdmin = async (email: string, password: string) => {
  'use server'
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (user?.role === 'ADMIN' && user.password === password) {
    cookies().set('admin_session', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 1 day
    })
    return true
  }
  
  return false
}

export const logoutAdmin = () => {
  'use server'
  cookies().delete('admin_session')
}