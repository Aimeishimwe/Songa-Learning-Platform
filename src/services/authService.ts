import { users } from '../data/users'

export function authenticate(email: string, password: string) {
  return users.find((user) => user.email === email && user.password === password) ?? null
}
