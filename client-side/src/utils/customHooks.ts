export const useAuth = () => {
  if (typeof window === 'undefined') return { isAuthenticated: false }
  const token = localStorage.getItem('token')
  return { isAuthenticated: !!token }
}