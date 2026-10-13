export function sessionCookieString(token: string) {
  const maxAge = 60 * 60 * 24 * 7 // 7 days
  const secure = process.env.NODE_ENV === 'production'
  const cookie = `session=${token}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Strict${secure ? '; Secure' : ''}`
  return cookie
}
