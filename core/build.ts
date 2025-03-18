await Bun.build({
  entrypoints: ['src/index.ts'],
  outdir: './dist',
  external: ['hono'],
  minify: {
    whitespace: false,
    syntax: true,
    identifiers: true,
  },
  target: 'bun',
});
