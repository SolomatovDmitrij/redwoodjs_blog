const { getConfig } from '@redwoodjs/core'

const config = getConfig({ type: 'jest', target: 'node' })
config.displayName.name = 'api'

module.exports = config
