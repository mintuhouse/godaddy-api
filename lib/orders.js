/*jshint -W069 */
/**
 * 
 * @class orders
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var orders = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function orders(options) {
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
     * @name orders#setToken
     * @param {string} value - token's value
     * @param {string} headerOrQueryName - the header or query name to send the token at
     * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
     *
     */
    orders.prototype.setToken = function(value, headerOrQueryName, isQuery) {
        this.token.value = value;
        this.token.headerOrQueryName = headerOrQueryName;
        this.token.isQuery = isQuery;
    };

    /**
     * Retrieve a list of orders for the authenticated shopper. Only one filter may be used at a time
     * @method
     * @name orders#list
     * @param {string} periodStart - Start of range indicating what time-frame should be returned. Inclusive
     * @param {string} periodEnd - End of range indicating what time-frame should be returned. Inclusive
     * @param {string} domain - Domain name to use as the filter of results
     * @param {integer} productGroupId - Product group id to use as the filter of results
     * @param {integer} paymentProfileId - Payment profile id to use as the filter of results
     * @param {string} parentOrderId - Parent order id to use as the filter of results
     * @param {integer} offset - Number of results to skip for pagination
     * @param {integer} limit - Maximum number of items to return
     * @param {string} sort - Property name that will be used to sort results. '-' indicates descending
     * @param {string} xShopperId - Shopper ID to be operated on, if different from JWT<br/><b>Reseller subaccounts are not supported</b>
     * @param {string} xMarketId - Unique identifier of the Market in which the request is happening
     * 
     */
    orders.prototype.list = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/orders';

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

        Object.keys(parameters).forEach(function(parameterName) {
            if (new RegExp('^[0-9]{4}-(?:0[0-9]{1}|1[0-2]{1})-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$').test(parameterName)) {
                queryParameters[parameterName] = parameters[parameterName];
            }
        });

        Object.keys(parameters).forEach(function(parameterName) {
            if (new RegExp('^[0-9]{4}-(?:0[0-9]{1}|1[0-2]{1})-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$').test(parameterName)) {
                queryParameters[parameterName] = parameters[parameterName];
            }
        });

        if (parameters['domain'] !== undefined) {
            queryParameters['domain'] = parameters['domain'];
        }

        Object.keys(parameters).forEach(function(parameterName) {
            if (new RegExp('^[1-9][0-9]*$').test(parameterName)) {
                queryParameters[parameterName] = parameters[parameterName];
            }
        });

        Object.keys(parameters).forEach(function(parameterName) {
            if (new RegExp('^[1-9][0-9]*$').test(parameterName)) {
                queryParameters[parameterName] = parameters[parameterName];
            }
        });

        if (parameters['parentOrderId'] !== undefined) {
            queryParameters['parentOrderId'] = parameters['parentOrderId'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['sort'] !== undefined) {
            queryParameters['sort'] = parameters['sort'];
        }

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xMarketId'] !== undefined) {
            headers['X-Market-Id'] = parameters['xMarketId'];
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
     * Retrieve details for specified order
     * @method
     * @name orders#get
     * @param {string} orderId - Order id whose details are to be retrieved
     * @param {string} xShopperId - Shopper ID to be operated on, if different from JWT<br/><b>Reseller subaccounts are not supported</b>
     * @param {string} xMarketId - Unique identifier of the Market in which the request is happening
     * 
     */
    orders.prototype.get = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/orders/{orderId}';

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

        path = path.replace('{orderId}', parameters['orderId']);

        if (parameters['orderId'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: orderId'));
            return deferred.promise;
        }

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xMarketId'] !== undefined) {
            headers['X-Market-Id'] = parameters['xMarketId'];
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

    return orders;
})();

exports.orders = orders;