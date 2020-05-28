module.exports = {
    apps: [{
        name: 'on_state_frontend',
        script: 'npm',

        args: 'run start:production',

        env_production: {
            NODE_ENV: 'production'
        }
    }, {
        script: './service-worker/',
        watch: ['./service-worker']
    }],
    deploy: {
        production: {
            user: 'solutionweb79',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
