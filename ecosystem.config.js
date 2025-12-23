module.exports = {
  apps: [{
    name: 'codemoly',
    cwd: '/var/www/codemoly',
    script: 'node_modules/.bin/next',
    args: 'start -p 3020',
    interpreter: 'none',
    env: {
      NODE_ENV: 'production',
      PORT: 3020
    },
    // Crash recovery settings
    max_restarts: 50,
    min_uptime: '30s',
    restart_delay: 10000,
    kill_timeout: 15000,
    listen_timeout: 30000,
    max_memory_restart: '500M',
    exp_backoff_restart_delay: 1000,
    autorestart: true,

    // Logging
    error_file: '/home/ubuntu/.pm2/logs/codemoly-error.log',
    out_file: '/home/ubuntu/.pm2/logs/codemoly-out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
