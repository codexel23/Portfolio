import { db } from 'src/lib/db'
import bcrypt from 'bcryptjs'

console.log('bcrypt is:', bcrypt)

export const handler = async (event) => {
  const { email, password } = JSON.parse(event.body)

  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    return { statusCode: 401, body: 'Invalid credentials' }
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return { statusCode: 401, body: 'Invalid credentials' }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ id: user.id, email: user.email }),
  }
}
