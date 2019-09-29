/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const bodyParser = require('body-parser');
const readline = require('readline');
const fs = require('fs');


// const xml = require('xml');
// const path = require('path');

module.exports = {
    outputDir: 'dist',
    assetsDir: 'static',

    // chainWebpack: config => {
    //   config.resolve.alias
    //       .set('@', path.resolve(__dirname, '/src'));
    // },
    devServer: {
        // proxy: {
        //     '/api*': {
        //         // Forward frontend dev server request for /api to django dev server
        //         // target: 'http://localhost:8000/',
        //     }
        // },
        
        before(app) {
          app.use(bodyParser.urlencoded());
          app.use(bodyParser.json());
          app.post('/sheet/demo', (req, res) => {
            let content = '';
            const rl = readline.createInterface({
              input: fs.createReadStream(`${__dirname}/mock/MozartTrio.musicxml`),
            });
            rl.on('line', (line) => {
                content += `${line}`;
            });
            
            rl.on('close', () => {
              res.set('Content-Type', 'text/xml');
              // res.type('application/xml');
              res.send(content);
            });
          })
        }        
    }
}
