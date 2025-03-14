import { createAccessControl } from 'better-auth/plugins/access'
import {
  adminAc,
  defaultStatements,
  userAc,
} from 'better-auth/plugins/admin/access'

const statement = {
  ...defaultStatements,
  todo: ['create', 'share', 'update', 'delete'],
} as const

export const ac = createAccessControl(statement)

const user = ac.newRole({
  ...userAc.statements,
  todo: ['share'],
})

const editor = ac.newRole({
  ...userAc.statements,
  todo: ['create', 'share', 'update', 'delete'],
})

const admin = ac.newRole({
  ...adminAc.statements,
  todo: ['create', 'share', 'update', 'delete'],
})

export const roles = {
  user,
  editor,
  admin,
}
