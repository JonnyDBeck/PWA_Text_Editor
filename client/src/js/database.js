import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
});

//Completely honestly, I'm still getting the errors that were here, like the ones manually added.
//I'm guessing they are ghost errors that have stayed due to the cache or something i dunno.
//I'm just hope this actually works everywhere else than on my system then

export const putDb = async (content) => {
  console.log('PUT to the database');

  const contactDb = await openDB('contact', 1);

  const tx = contactDb.transaction('contact', 'readwrite');

  const store = tx.objectStore('contact');

  const request = store.add(content);

  const result = await request;
  console.log('Data saved to the database', result);
};


export const getDb = async () => {
  console.log('GET from the database');

  const contactDb = await openDB('contact', 1);

  const tx = contactDb.transaction('contact', 'readonly');

  const store = tx.objectStore('contact');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
