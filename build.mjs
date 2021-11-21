import appRoot from 'app-root-path'
import { exec, execSync } from 'child_process'
import consola from 'consola'
import fs from 'fs'

const distDir = appRoot.resolve('/dist')

if (!fs.existsSync(distDir)) {
  consola.info(`Creating a dist folder`)
  fs.mkdirSync(distDir)
} else {
  consola.info(`Dist folder already exists.`)
  execSync(`rm -rf ${distDir}/*`)
}

// Build TypeScript
exec(`tsc`)

// Copy package.json
exec(`cp ${appRoot}/package.json ${distDir}/package.json`)
