import { createAccessControl } from 'better-auth/plugins/access'

const statement = {
  todo: ['create', 'share', 'update', 'delete'],
  user: ['list', 'create', 'update', 'delete', 'ban'],
} as const

export const ac = createAccessControl(statement)

const user = ac.newRole({
  todo: ['create', 'share', 'update', 'delete'],
})

const admin = ac.newRole({
  todo: ['create', 'share', 'update', 'delete'],
  user: ['list', 'create', 'update', 'delete', 'ban'],
})

export const roles = {
  user,
  admin,
}
