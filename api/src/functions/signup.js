import { db } from 'src/lib/db'
import bcrypt from 'bcryptjs'

export const handler = async (event) => {
  const { email, password } = JSON.parse(event.body)

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: { email, password: hashedPassword },
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ id: user.id, email: user.email }),
  }
}
