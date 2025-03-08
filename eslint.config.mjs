import antfu from '@antfu/eslint-config'
import drizzle from 'eslint-plugin-drizzle'
import prettier from 'eslint-plugin-prettier/recommended'
import compiler from 'eslint-plugin-react-compiler'

const config = antfu(
  {
    react: true,
    formatters: {
      css: 'prettier',
      markdown: 'prettier',
    },
    plugins: {
      'react-compiler': compiler,
      drizzle,
    },
    rules: {
      'no-console': 'off',
      'require-await': 'error',
      'ts/no-explicit-any': 'error',
      'react-compiler/react-compiler': 'error',
      'drizzle/enforce-delete-with-where': [
        'error',
        { drizzleObjectName: ['db'] },
      ],
      'drizzle/enforce-update-with-where': [
        'error',
        { drizzleObjectName: ['db'] },
      ],
    },
    ignores: ['src/routeTree.gen.ts'],
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react/no-array-index-key': 'off',
      'react/no-unstable-context-value': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['package.json', 'tsconfig.json'],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,mjs,js,json}'],
    ...prettier,
  },
)

export default config
