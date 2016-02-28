let config;

if (ENV.development){
    config = require('./config.dev.js');
} else if (ENV.node) {
    config = require('./config.node.js');
} else {
    config = require('./config.prod.js');
}

export default config;
