import antfu from '@antfu/eslint-config'
import query from '@tanstack/eslint-plugin-query'
import router from '@tanstack/eslint-plugin-router'
import drizzle from 'eslint-plugin-drizzle'
import prettier from 'eslint-plugin-prettier/recommended'
import compiler from 'eslint-plugin-react-compiler'

export default antfu(
  {
    formatters: {
      css: 'prettier',
      markdown: 'prettier',
    },
    plugins: {
      'react-compiler': compiler,
      drizzle,
    },
    javascript: {
      overrides: {
        'prefer-const': 'off',
        'no-console': 'off',
        'require-await': 'error',
      },
    },
    typescript: {
      tsconfigPath: './tsconfig.json',
      overridesTypeAware: {
        'ts/no-floating-promises': 'off',
        'ts/no-misused-promises': 'off',
        'ts/promise-function-async': 'off',
        'ts/prefer-nullish-coalescing': [
          'error',
          {
            ignorePrimitives: true,
          },
        ],
        'ts/strict-boolean-expressions': [
          'error',
          {
            allowNullableString: true,
          },
        ],
        'ts/switch-exhaustiveness-check': [
          'error',
          {
            considerDefaultExhaustiveForUnions: true,
          },
        ],
      },
    },
    react: {
      overrides: {
        'react-compiler/react-compiler': 'error',
        'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
      },
    },
    rules: {
      'drizzle/enforce-delete-with-where': [
        'error',
        { drizzleObjectName: ['db'] },
      ],
      'drizzle/enforce-update-with-where': [
        'error',
        { drizzleObjectName: ['db'] },
      ],
    },
    ignores: ['src/routeTree.gen.ts', '.drizzle/visualizer.json'],
  },
  ...query.configs['flat/recommended'],
  ...router.configs['flat/recommended'],
  {
    files: ['package.json', 'tsconfig.json'],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  },
  {
    files: ['src/components/ui/**/*.tsx'],
    rules: {
      'ts/strict-boolean-expressions': 'off',
      'react/no-unstable-context-value': 'off',
      'react/no-array-index-key': 'off',
      'react/no-context-provider': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,mjs,js,json}'],
    ...prettier,
  },
)
