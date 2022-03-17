import fs from 'fs-extra'
import { createServer } from 'vite'

export const createViteDevServer = async (cwd: string) => {
    if (!fs.existsSync(cwd)) throw new Error(`No such directory: ${cwd}`)

    return await createServer({
        root: cwd,
        logLevel: 'info',
        server: {
            watch: {
                usePolling: true,
                interval: 100,
            },
        },
    })
}
