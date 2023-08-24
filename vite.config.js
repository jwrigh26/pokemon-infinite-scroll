import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: false, // Disabling esbuild, since we'll be using swc
  swc: {
    jsxImportSource: '@emotion/react',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    // Additional SWC options can be provided here as needed.
  },
  server: {
    port: 9090, // will be used if available, or the next free one if not
    // Add these lines to set the response headers
    // middlewareMode: 'html',
    // watch: {
    //   disableGlobbing: false,
    // },
    // hmr: {
    //   overlay: false,
    // },
    // cors: {
    //   origin: '*',
    // },
    // strictPort: true,
    // force: true,
    // fs: {
    //   strict: true,
    //   allow: ['..'], // Allow serving files from one level up to the project root
    // },
    // host: true,
    // base: './',
    // https: false,
    // open: true,
    // proxy: {
    //   // proxy settings here
    // },
    // optimizeDeps: {
    //   include: ['react', 'react-dom'],
    // },
  },
  build: {
    target: 'es2018', // You can adjust the target based on your browser support requirements
    // Additional build options can be provided here as needed.
  },
  // Resolve and Alias are used to make imports easier.
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      constants: path.resolve(__dirname, 'src/constants'),
      context: path.resolve(__dirname, 'src/context'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      models: path.resolve(__dirname, 'src/models'),
      modules: path.resolve(__dirname, 'src/modules'),
      providers: path.resolve(__dirname, 'src/providers'),
      services: path.resolve(__dirname, 'src/services'),
      styles: path.resolve(__dirname, 'src/styles'),
      src: path.resolve(__dirname, 'src'),
      store: path.resolve(__dirname, 'src/store'),
      validation: path.resolve(__dirname, 'src/validation'),
      React: path.resolve(__dirname, 'node_modules/react/'),
    },
  },
  // More configuration options can be included based on your project's requirements.
});
