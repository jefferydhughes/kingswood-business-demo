import * as migration_20260922_222123_initial from './20260922_222123_initial';
import * as migration_20261023_181909 from './20261023_181909';

export const migrations = [
  {
    up: migration_20260922_222123_initial.up,
    down: migration_20260922_222123_initial.down,
    name: '20260922_222123_initial',
  },
  {
    up: migration_20261023_181909.up,
    down: migration_20261023_181909.down,
    name: '20261023_181909'
  },
];
