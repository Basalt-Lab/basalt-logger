import pkg from './package.json';

const dependencies = 'dependencies' in pkg ? Object.keys(pkg.dependencies ?? {}) : [];
const devDependencies = 'devDependencies' in pkg ? Object.keys(pkg.devDependencies ?? {}) : [];
const peerDependencies = 'peerDependencies' in pkg ? Object.keys(pkg.peerDependencies ?? {}) : [];

await Bun.build({
    target: 'bun',
    external: [...dependencies, ...devDependencies, ...peerDependencies],
    root: './source',
    entrypoints: [
        './source/core/index.ts',
        './source/core/strategy/index.ts',

        './source/error/index.ts',
        './source/error/key/index.ts',

        './source/i18n/index.ts',

        './source/types/index.ts',

        './source/index.ts'
    ],
    outdir: './build',
    splitting: true,
    format: 'esm',
    minify: {
        identifiers: false,
        syntax: true,
        whitespace: true
    },
    sourcemap: 'none'
});