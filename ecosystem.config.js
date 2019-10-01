module.exports = {
  apps: [{
    name: 'Mistify Website',
    script: './index.js',
    exec_mode: 'cluster',
    watch: true,
    instances: 'max',
    env_production: {
      NODE_ENV: 'production',
      max_memory_restart: '260M',
      trace: true
    },
    env_development: {
      NODE_ENV: 'development',
      trace: true
    }
  }]
}
