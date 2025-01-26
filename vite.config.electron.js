// vite.config.ts
import electron from 'vite-plugin-electron'

export default {
    plugins: [
        electron({
            // Main process entry file of the Electron App.
            entry: 'main.js',
        }),
    ],
}

// package (plugin y electron), vite.config.electron, nuevo index y main