/*jshint -W069 */
/**
 * 
 * @class countries
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var countries = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function countries(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://api.godaddy.com';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
    }

    /**
     * Set Token
     * @method
     * @name countries#setToken
     * @param {string} value - token's value
     * @param {string} headerOrQueryName - the header or query name to send the token at
     * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
     *
     */
    countries.prototype.setToken = function(value, headerOrQueryName, isQuery) {
        this.token.value = value;
        this.token.headerOrQueryName = headerOrQueryName;
        this.token.isQuery = isQuery;
    };

    /**
     * Retrieves summary country information for the provided marketId and filters
     * @method
     * @name countries#getCountries
     * @param {string} marketId - MarketId in which the request is being made, and for which responses should be localized
     * @param {integer} regionTypeId - Restrict countries to this region type; required if regionName is supplied
     * @param {string} regionName - Restrict countries to this region name; required if regionTypeId is supplied
     * @param {string} sort - The term to sort the result countries by.
     * @param {string} order - The direction to sort the result countries by.
     * 
     */
    countries.prototype.getCountries = function(parameters) {
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

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
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
     * @name countries#getCountry
     * @param {string} countryKey - The country key
     * @param {string} marketId - MarketId in which the request is being made, and for which responses should be localized
     * @param {string} sort - The term to sort the result country states by.
     * @param {string} order - The direction to sort the result country states by.
     * 
     */
    countries.prototype.getCountry = function(parameters) {
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

        if (this.token.isQuery) {
            queryParameters[this.token.headerOrQueryName] = this.token.value;
        } else if (this.token.headerOrQueryName) {
            headers[this.token.headerOrQueryName] = this.token.value;
        } else {
            headers['Authorization'] = 'Bearer ' + this.token.value;
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

    return countries;
})();

exports.countries = countries;