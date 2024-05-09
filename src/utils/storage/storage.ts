import { MMKV } from 'react-native-mmkv';
import Config from 'react-native-config';

const STORAGE_ID = 'core-storage';

class Storage {
  private readonly instance: MMKV;

  constructor() {
    this.instance = new MMKV({
      id: STORAGE_ID,
      encryptionKey: Config.MMKV_KEY,
    });
  }

  /**
   * Set a value for the given `key`.
   */
  setItem(key: string, value: boolean | string | number | Uint8Array) {
    this.instance.set(key, value);
  }

  /**
   * Get the value for the given `key`, or `undefined` if it does not exist.
   *
   * @default undefined
   */
  getItem(key: string) {
    if (this.instance.getString(key)) {
      return this.instance.getString(key);
    }

    if (this.instance.getNumber(key)) {
      return this.instance.getNumber(key);
    }

    if (this.instance.getBuffer(key)) {
      return this.instance.getBuffer(key);
    }

    return this.instance.getBoolean(key);
  }

  /**
   * Delete the given `key`.
   */
  removeItem(key: string) {
    this.instance.delete(key);
  }

  /**
   * By default, delete all keys.
   * If an array of keys is passed, it will delete all keys but those passed.
   */
  clearAll(exceptions?: string[]) {
    if (exceptions === undefined || exceptions.length === 0) {
      this.instance.clearAll();
    } else {
      const keys = this.instance.getAllKeys();
      keys.forEach((key) => {
        if (!exceptions.includes(key)) {
          this.instance.delete(key);
        }
      });
    }
  }
}

export default new Storage();
