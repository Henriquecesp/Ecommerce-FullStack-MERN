process.env.TS_NODE_FILES = 'true';
require('ts-node').register();

const { configure } = require('japa');

configure({
  files: ['src/__test__/**/*.spec.ts'],
});
