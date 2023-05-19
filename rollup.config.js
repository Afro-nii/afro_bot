/*import typescript from 'rollup-plugin-typescript2';

export default {
    input: './app.ts', // Replace 'src/index.ts' with the path to your TypeScript entry point
    output: {
      file: 'build/bundle.js', // Replace 'dist/bundle.js' with the desired output file path
      //format: 'umd', // Choose the desired output format (e.g., 'umd', 'cjs', 'esm')
      format : 'cjs',
     // name: 'Afro_Bot', // Replace 'MyApp' with the name of your application/library
    },
    //plugins: [typescript()],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json', // Update with your TypeScript configuration file path
      }),],
    }
//"exclude": ["./built/**/


export default {
   // input: 'src/app.ts',
   input: 'build/app.js',
    output: {
      file: 'build/bundle.js',
      //format: 'umd',
      format : 'cjs',
    },
  };