'use server'
import { cookies } from 'next/headers'


const setCookie = ({ key, value }: any) => {
  return cookies().set(key, value, { maxAge: 43_200 })
}

export { setCookie }
