import { reset, seed } from 'drizzle-seed'
import { db } from '.'
import * as schema from './schema'
import { Language } from './schema'

async function main() {
  await reset(db, schema)
  await seed(db, schema).refine((f) => ({
    user: {
      count: 100,
      columns: {
        id: f.uuid(),
        name: f.fullName(),
        email: f.email(),
        image: f.valuesFromArray({
          values: [''],
        }),
        createdAt: f.datetime(),
        updatedAt: f.datetime(),
        role: f.valuesFromArray({ values: ['admin', 'user'] }),
        banned: f.boolean(),
        banReason: f.loremIpsum({ sentencesCount: 1 }),
        banExpires: f.datetime(),
        age: f.int({ minValue: 18, maxValue: 100 }),
        city: f.city(),
        language: f.valuesFromArray({ values: ['en', 'cs'] }),
      },
      with: {
        todo: 1,
      },
    },
    todo: {
      columns: {
        id: f.intPrimaryKey(),
        title: f.jobTitle(),
        description: f.loremIpsum({ sentencesCount: 1 }),
        project: f.valuesFromArray({
          values: ['tanstack', 'next', 'svelte', 'solid', 'angular', 'vue'],
        }),
        language: f.valuesFromArray({
          values: Object.keys(Language),
        }),
        completed: f.boolean(),
        createdAt: f.datetime(),
        updatedAt: f.datetime(),
      },
    },
  }))
}

main()
