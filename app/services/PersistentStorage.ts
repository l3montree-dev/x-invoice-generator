import { readFileSync, writeFileSync } from 'fs';
import * as electron from 'electron';
import { join } from 'path';

interface PersistentStore {
  formData: object;
}
/**
 * @Singleton
 */
export default class PersistentStorage {
  public static getInstance(): PersistentStorage {
    if (this.instance) {
      return this.instance;
    }
    return new PersistentStorage();
  }

  get(key: keyof PersistentStore) {
    return this.store[key];
  }

  set<Key extends keyof PersistentStore>(key: Key, val: PersistentStore[Key]) {
    this.store[key] = val;
    writeFileSync(this.path, JSON.stringify(this.store));
  }

  private static instance?: PersistentStorage;

  private readonly path: string;

  private readonly store: PersistentStore;

  private constructor() {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData'
    );
    this.path = join(userDataPath, 'store.json');

    this.store = this.parseFile();
  }

  private parseFile(): PersistentStore {
    // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
    // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
    try {
      return JSON.parse(readFileSync(this.path).toString());
    } catch (error) {
      // if there was some kind of error, return the passed in defaults instead.
      return { formData: {} } as PersistentStore;
    }
  }
}
