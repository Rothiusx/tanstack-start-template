import { pgEnum } from 'drizzle-orm/pg-core'

export enum Language {
  en = 'English',
  cs = 'Czech',
  de = 'German',
  fr = 'French',
  es = 'Spanish',
  it = 'Italian',
}

export const languageEnum = pgEnum(
  'language',
  Object.keys(Language).map((key) => key) as [keyof typeof Language],
)
