'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const camelCase = require("camelcase");
const CodeGen = require('swagger-js-codegen').CodeGen;

const godaddySwaggerFile = 'https://developer.godaddy.com/swagger/doc/resources';

const getJSON = async(url) => {
  return new Promise((resolve, reject) => {
    let req = https.get(url);
    req.on('response', res => {
      var body = '';
      res.on('data', (chunk) => {
        body += chunk;
      })
      res.on('end', () => {
        // console.log(body);
        resolve(JSON.parse(body));
      })
    });
    req.on('error', err => {
      reject(err);
    });
  });
};

const ensureDirectoryExistence = (filePath) => {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const downloadSwagger = async() => {
  try {
    var codegen = []
    const swagger = await getJSON(godaddySwaggerFile);

    await Promise.all(swagger.apis.map(async(resource) => {
      var path = resource.path;
      var url = godaddySwaggerFile + path;
      var dest = 'swagger' + path + '.json';
      var json = await getJSON(url);

      // Modify the default values
      json.basePath = 'https://api.godaddy.com';
      const authorizations = {
        sso_key: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      };
      json.apis.map((api) => {
        api.operations.map((operation) => {
          operation.authorizations = {
            'sso_key': []
          };
        })
      });
      json.authorizations = authorizations;

      ensureDirectoryExistence(dest);
      fs.writeFileSync(dest, JSON.stringify(json, null, 2));
      console.log('Generated ' + dest);

      var unversionedPath = path.slice('4');
      var className = camelCase(unversionedPath.replace('/', '-'));
      codegen.push({
        swagger: dest,
        className: className,
        mustache: {
          isNode: true,
          isSecure: true,
          isSecureApiKey: true,
        },
        template: {
          class: 'templates/swagger-js-codegen/node-class.mustache',
          method: 'templates/swagger-js-codegen/method.mustache',
          request: 'templates/swagger-js-codegen/node-request.mustache'
        },
        custom: true
      });
      ensureDirectoryExistence('lib/' + className + '.js');
    }));

    codegen = codegen.sort((c1, c2) => {
      if (c1.className < c2.className) return -1;
      if (c1.className > c2.className) return 1;
      return 0;
    });
    fs.writeFileSync('swagger/gruntfile.json', JSON.stringify({
      apis: codegen
    }, null, 2));
  } catch (e) {
    console.log(e);
    throw new Error();
  }
};

downloadSwagger();