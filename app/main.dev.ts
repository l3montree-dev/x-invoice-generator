/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import * as Sentry from '@sentry/electron';
import * as path from 'path';
import MenuBuilder from './menu';

Sentry.init({
    dsn:
        'https://3232fcc1cc174d5c963354466e17f645@o336218.ingest.sentry.io/5500400',
    beforeSend(event) {
        // Modify the captured event
        if (event.user) {
            // Just to ensure no critical user related data is send
            delete event.user.ip_address;
            delete event.user.id;
        }
        return event;
    },
});

export default class AppUpdater {
    constructor() {
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        AppUpdater.checkForUpdates();
    }

    private static async checkForUpdates() {
        try {
            await autoUpdater.checkForUpdatesAndNotify();
        } catch (e) {
            Sentry.captureException(e);
        }
    }
}

const windows = new Set();

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
) {
    require('electron-debug')();
}

const installExtensions = async () => {
    // eslint-disable-next-line global-require
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map((name) =>
            installer.default(installer[name], forceDownload)
        )
    ).catch(console.log);
};

export const createWindow = async () => {
    if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
    ) {
        await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, 'resources')
        : path.join(__dirname, '../resources');

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
    };

    let x;
    let y;

    const currentWindow = BrowserWindow.getFocusedWindow();

    if (currentWindow) {
        const [currentWindowX, currentWindowY] = currentWindow.getPosition();

        x = currentWindowX + 24;
        y = currentWindowY + 24;
    }

    let newWindow: BrowserWindow | null = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        x,
        y,
        fullscreen: false,
        titleBarStyle: 'hidden',
        icon: getAssetPath('icon.png'),
        webPreferences: {
            nodeIntegration: true,
        },
    });

    newWindow.loadURL(`file://${__dirname}/app.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    newWindow.webContents.on('did-finish-load', () => {
        if (!newWindow) {
            throw new Error('"newWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            newWindow.minimize();
        } else {
            newWindow.show();
            newWindow.focus();
        }
    });

    newWindow.on('closed', () => {
        newWindow = null;
    });

    const menuBuilder = new MenuBuilder(newWindow);
    menuBuilder.buildMenu();

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
  new AppUpdater();
    return newWindow;
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

if (process.env.E2E_BUILD === 'true') {
    // eslint-disable-next-line promise/catch-or-return
    app.whenReady().then(createWindow);
} else {
    app.on('ready', createWindow);
}

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (windows.size === 0) createWindow();
});
