import bcrypt from 'bcryptjs'
import { db } from 'src/lib/db'


export const createUser = async ({ input }) => {
  const hashedPassword = await bcrypt.hash(input.password, 10)

  return db.user.create({
    data: {
      username: input.username,
      password: hashedPassword,
      email: input.email,
    },
  })
}
