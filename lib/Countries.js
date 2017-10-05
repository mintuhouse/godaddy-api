/*jshint -W069 */
/**
 * 
 * @class Countries
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Countries = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Countries(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://api.godaddy.com';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    /**
     * Retrieves summary country information for the provided marketId and filters
     * @method
     * @name Countries#getCountries
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} marketId - MarketId in which the request is being made, and for which responses should be localized
     * @param {integer} regionTypeId - Restrict countries to this region type; required if regionName is supplied
     * @param {string} regionName - Restrict countries to this region name; required if regionTypeId is supplied
     * @param {string} sort - The term to sort the result countries by.
     * @param {string} order - The direction to sort the result countries by.
     * 
     */
    Countries.prototype.getCountries = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/countries';

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

        if (parameters['marketId'] !== undefined) {
            queryParameters['marketId'] = parameters['marketId'];
        }

        if (parameters['marketId'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: marketId'));
            return deferred.promise;
        }

        if (parameters['regionTypeId'] !== undefined) {
            queryParameters['regionTypeId'] = parameters['regionTypeId'];
        }

        if (parameters['regionName'] !== undefined) {
            queryParameters['regionName'] = parameters['regionName'];
        }

        if (parameters['sort'] !== undefined) {
            queryParameters['sort'] = parameters['sort'];
        }

        if (parameters['order'] !== undefined) {
            queryParameters['order'] = parameters['order'];
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
    /**
     * Retrieves country and summary state information for provided countryKey
     * @method
     * @name Countries#getCountry
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} countryKey - The country key
     * @param {string} marketId - MarketId in which the request is being made, and for which responses should be localized
     * @param {string} sort - The term to sort the result country states by.
     * @param {string} order - The direction to sort the result country states by.
     * 
     */
    Countries.prototype.getCountry = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/countries/{countryKey}';

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

        path = path.replace('{countryKey}', parameters['countryKey']);

        if (parameters['countryKey'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: countryKey'));
            return deferred.promise;
        }

        if (parameters['marketId'] !== undefined) {
            queryParameters['marketId'] = parameters['marketId'];
        }

        if (parameters['marketId'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: marketId'));
            return deferred.promise;
        }

        if (parameters['sort'] !== undefined) {
            queryParameters['sort'] = parameters['sort'];
        }

        if (parameters['order'] !== undefined) {
            queryParameters['order'] = parameters['order'];
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

    return Countries;
})();

exports.Countries = Countries;