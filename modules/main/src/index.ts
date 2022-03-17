import { app } from 'electron'
import path from 'path'

import { WindowManager } from './core/window-manager'
import { createViteDevServer } from './dev/vite-dev-server'

const isDev = process.env.NODE_ENV === 'development'

export class Main {
    public static main() {
        new Main()
    }

    public readonly windowManager = new WindowManager()

    private constructor() {
        app.once('ready', this.createMainWindow.bind(this))
    }

    private async createMainWindow() {
        const window = this.windowManager.create({
            width: 1280,
            height: 720,
            minWidth: 960,
            minHeight: 720,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
            },
            backgroundColor: '#ffffff',
        })

        if (isDev) {
            const devServer = await createViteDevServer(path.join(__dirname, '../../../', 'modules/renderer'))
            
            await devServer.listen(0)
            if (!devServer.httpServer) throw new Error('Failed to start dev server')

            const addressInfo = devServer.httpServer.address()
            const port = addressInfo && typeof addressInfo === 'object' && addressInfo.port
            if (!port) throw new Error('Failed to get port')

            const url = new URL(`http://localhost:${port}`)
            console.log(`Dev server listening on ${url.toString()}`)

            url.searchParams.append('page', 'home')
            window.loadURL(url.toString())
        } else {
            window.loadFile(path.join(__dirname, '../renderer/index.html'), {
                query: {
                    page: 'home',
                },
            })
        }
    }
}
Main.main()
