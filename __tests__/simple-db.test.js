const fs = require('fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db.js');
const crypto = require('crypto');

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

  it('get(id) should return an object it from the directory', async () => {
    //make a new object
    const newFile = {
      name: 'Orpheus',
    };
    //use crypto to generate a new id
    const id = crypto.randomBytes(4).toString('hex');
    //fs.writeFile to make call the id and object
    await fs.writeFile(`${TEST_DIR}/${id}.json`, JSON.stringify(newFile));
    //variable for importing simple-db
    const db = new SimpleDb(TEST_DIR);
    //variable for calling get method on the id
    const res = await db.get(id);
    //expect res === new object
    expect(res).toEqual(newFile);
  });

  it('getAll should gets all objects in the directory', async () => {});

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
