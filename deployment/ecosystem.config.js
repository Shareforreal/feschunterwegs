module.exports = {
  apps: [{
    name: 'feschunterwegs',
    script: 'server.js',
    instances: 1,
    exec_mode: 'cluster',
    cwd: '/var/www/feschunterwegs',
    env: {
      NODE_ENV: 'development',
      PORT: 5002
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5002
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
