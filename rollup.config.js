import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  // CommonJS (Node)
  {
    input: 'src/ajmv.class.ts',
    output: {
      file: 'dist/ajmv.cjs.js',
      format: 'cjs',
      sourcemap: false,
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: [],
  },
  // ES Module (Browser/Modern)
  {
    input: 'src/ajmv.class.ts',
    output: {
      file: 'dist/ajmv.esm.js',
      format: 'esm',
      sourcemap: false,
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: [],
  },
  // UMD (Browser)
  {
    input: 'src/ajmv.class.ts',
    output: {
      file: 'dist/ajmv.umd.js',
      format: 'umd',
      name: 'AJMV',
      sourcemap: false,
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: [],
  }
];
