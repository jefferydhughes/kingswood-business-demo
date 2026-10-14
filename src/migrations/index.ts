import * as migration_20260922_222123_initial from './20260922_222123_initial';

export const migrations = [
  {
    up: migration_20260922_222123_initial.up,
    down: migration_20260922_222123_initial.down,
    name: '20260922_222123_initial'
  },
];
