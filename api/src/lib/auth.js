import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

export const getCurrentUser = async (decoded, { _token, _type }) => {
  return decoded
}

export const isAuthenticated = () => {
  return !!context.currentUser
}

export const hasRole = (roles) => {
  if (!context.currentUser?.roles) {
    return false
  }

  if (typeof roles === 'string') {
    roles = [roles]
  }

  return context.currentUser.roles.some((role) => roles.includes(role))
}

export const requireAuth = ({ roles } = {}) => {
  const requestIp =
    context.request?.headers['x-forwarded-for'] ||
    context.request?.connection?.remoteAddress

  console.log('🧠 Incoming IP:', requestIp)

  const allowedIps = ['127.0.0.1', '::1', '51.37.202.185']

  const isIpAllowed =
    requestIp === undefined || allowedIps.some((ip) => requestIp?.includes(ip))

  if (!isAuthenticated() && !isIpAllowed) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (roles && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}

