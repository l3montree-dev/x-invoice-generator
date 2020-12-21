import electron from 'electron';

const userDataPath = (electron.app || electron.remote.app).getPath('userData');

export default userDataPath;
