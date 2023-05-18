import typescript from 'rollup-plugin-typescript2';
export default {
    input: 'app.ts',
    output: {
        file: 'build/bundle.js',
        format: 'umd',
        name: 'Afro_Bot', // Replace 'MyApp' with the name of your application/library
    },
    plugins: [typescript()],
};
/*export default {
   // input: 'src/app.ts',
   input: 'app.ts',
    output: {
      file: 'dist/bundle.js',
      format: 'umd',
    },
  };*/ 
