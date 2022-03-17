import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

export class WindowManager {
    private readonly _windows: Map<number, BrowserWindow> = new Map()

    public get windows() {
        return this._windows
    }

    public create(options: BrowserWindowConstructorOptions) {
        const window = new BrowserWindow(options)
        this.set(window.webContents.id, window)
        window.once('close', () => this._windows.delete(window.webContents.id))
        return window
    }

    public get(name: number) {
        return this._windows.get(name)
    }

    public set(name: number, window: BrowserWindow) {
        this._windows.set(name, window)
    }

    public broadcast(channel: string, ...args: any[]) {
        this._windows.forEach((window) => window.webContents.send(channel, ...args))
    }
}
