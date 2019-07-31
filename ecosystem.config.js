module.exports = {
//   apps : [{
//     name: 'Admin',
//     script: 'serve',

//     // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
//     args: 'spa',
//     spa: true,
//     instances: 1,
//     autorestart: true,
//     watch: false,
//     max_memory_restart: '1G',
//     env: {
//         NODE_ENV: 'development',
//         PM2_SERVE_PATH: './build',
//         PM2_SERVE_PORT: 8080
//     },
//     env_production: {
//       NODE_ENV: 'production'
//     }
//   }],

  static : [{
    name: 'spa',
    path: './build',
    spa: true,
    directory: false,
    monitor: 'app-id'
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'pre-deploy-local': "npm run build && ./deploy.sh",
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js'
    }
  }
};
