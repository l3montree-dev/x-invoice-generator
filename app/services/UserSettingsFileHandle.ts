import FileHandle from './FileHandle';

export interface UserSettings {
    formData: object;
}
export default class UserSettingsFileHandle {
    private static fileHandle: FileHandle<UserSettings> | undefined;

    static get(): FileHandle<UserSettings> {
        if (this.fileHandle) {
            return this.fileHandle;
        }
        return new FileHandle('store.json');
    }
}
