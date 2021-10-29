import { LsServerConfig } from '@lsegurado/ls-server';

export const config: LsServerConfig = () => {
  // Avoids the need to import h with esbuild
  return {
    esbuildOptions: {
      inject: ['node_modules/@lsegurado/ls-element/dist/index.js'],
      jsxFactory: 'h.createElement',
      jsxFragment: 'h.Fragment'
    }
  };
};

export default config;