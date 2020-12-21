import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import userDataPath from './userDataPath';

export default class FileHandle<T> {
    protected content: T | undefined;

    protected pathToFile: string;

    constructor(path: string) {
        // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
        // app.getPath('userData') will return a string of the user's app data directory path.
        this.pathToFile = join(userDataPath, path);
    }

    private parseFile(): T {
        // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
        // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
        return JSON.parse(readFileSync(this.pathToFile).toString());
    }

    public save(): void {
        if (this.content)
            writeFileSync(this.pathToFile, JSON.stringify(this.content));
    }

    public set(content: T) {
        this.content = content;
    }

    /**
     * Does support lazy reading of the file.
     * @param {boolean} forceDiskHit
     * @returns {T}
     */
    public read(forceDiskHit = false): T {
        if (this.content && !forceDiskHit) {
            return this.content;
        }
        this.content = this.parseFile();
        return this.content;
    }
}
