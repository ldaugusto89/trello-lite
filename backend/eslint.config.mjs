// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import path from 'path'; // <--- Importe 'path' para resolver o caminho do tsconfig.json
import { fileURLToPath } from 'url'; // <--- Importe para resolver import.meta.dirname em módulos ES


export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'error', // Garante que você não está atribuindo 'any'
      '@typescript-eslint/no-unsafe-call': 'error', // Garante que você não está chamando funções 'any'
      '@typescript-eslint/no-unsafe-member-access': 'error', // Garante que você não está acessando membros de 'any'
      '@typescript-eslint/no-unsafe-return': 'error', // Garante que você não está retornando 'any'
    },
  },
);