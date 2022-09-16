const fs = require('fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db.js');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {
  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  // it('get(id) should return ', async () => {
  //   await fs.writeFile();
  //   const db = new SimpleDb(TEST_DIR);
  //   console.log(db);
  // });

  it('save a file', async () => {
    const file = {
      move: 'Bullet Train',
      actor: 'Brad Pitt',
    };

    const db = new SimpleDb(TEST_DIR);

    await db.save(file);

    const res = await db.get(file.id);

    expect(res).toEqual(file);
  });
});
