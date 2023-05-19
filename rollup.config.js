import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/app.ts', // Replace 'src/index.ts' with the path to your TypeScript entry point
    output: {
      file: 'build/bundle.js', // Replace 'dist/bundle.js' with the desired output file path
      format: 'umd', // Choose the desired output format (e.g., 'umd', 'cjs', 'esm')
      name: 'Afro_Bot', // Replace 'MyApp' with the name of your application/library
    },
    plugins: [typescript()],
}
//"exclude": ["./built/**/*"]

/*export default {
   // input: 'src/app.ts',
   input: 'app.ts',
    output: {
      file: 'dist/bundle.js',
      format: 'umd',
    },
  };*/