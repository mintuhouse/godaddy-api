/*jshint -W069 */
/**
 * 
 * @class Agreements
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Agreements = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Agreements(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://api.godaddy.com';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    /**
     * Retrieve Legal Agreements for provided agreements keys
     * @method
     * @name Agreements#get
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {integer} xPrivateLabelId - PrivateLabelId to operate as, if different from JWT
     * @param {string} xMarketId - Unique identifier of the Market used to retrieve/translate Legal Agreements
     * @param {array} keys - Keys for Agreements whose details are to be retrieved
     * 
     */
    Agreements.prototype.get = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/agreements';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['Authorization'] !== undefined) {
            headers['Authorization'] = parameters['Authorization'];
        }

        if (parameters['Authorization'] === undefined) {
            deferred.reject(new Error('Missing required header parameter: Authorization'));
            return deferred.promise;
        }

        if (parameters['xPrivateLabelId'] !== undefined) {
            headers['X-Private-Label-Id'] = parameters['xPrivateLabelId'];
        }

        if (parameters['xMarketId'] !== undefined) {
            headers['X-Market-Id'] = parameters['xMarketId'];
        }

        if (parameters['keys'] !== undefined) {
            queryParameters['keys'] = parameters['keys'];
        }

        if (parameters['keys'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: keys'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };

    return Agreements;
})();

exports.Agreements = Agreements;