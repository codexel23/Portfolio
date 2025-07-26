import { db } from 'src/lib/db'
import bcrypt from 'bcryptjs'

console.log('bcrypt is:', bcrypt)

export const handler = async (event) => {
  const { username, password } = JSON.parse(event.body)

  console.log('🛂 Login attempt')
  console.log('➡️ Username:', username)

  const user = await db.user.findUnique({ where: { username } })
  
  if (!user) {
    console.log('❌ No user found with that username')
    return { statusCode: 401, body: 'Invalid credentials' }
  }

  console.log('✅ Found user:', user)

  const match = await bcrypt.compare(password, user.password)
  console.log('🔍 Password match result:', match)

  if (!match) {
    console.log('❌ Passwords do not match')
    return { statusCode: 401, body: 'Invalid credentials' }
  }

  console.log('✅ Login successful!')

  return {
    statusCode: 200,
    body: JSON.stringify({ id: user.id, username: user.username }),
  }
}
