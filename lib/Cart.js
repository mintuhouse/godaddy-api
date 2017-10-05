/*jshint -W069 */
/**
 * 
 * @class Cart
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Cart = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function Cart(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://api.godaddy.com';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    /**
     * Get contents of the target Shopper's Cart
     * @method
     * @name Cart#get
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} xShopperId - Shopper ID whose Cart should be retrieved, if it differs from authenticated
     * @param {integer} xPrivateLabelId - PrivateLabelId to operate as, if different from JWT
     * @param {string} xMarketId - Unique identifier of the Market in which the request is happening
     * @param {string} xCurrencyId - Currency in which pricing information should be accepted and/or returned
     * @param {array} includes - Optional properties to be included in the response. Including errors performs Product-specific extended validation, such as TLD-based Contact, Eligibility, and Presence requirements
     * 
     */
    Cart.prototype.get = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/cart';

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

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xPrivateLabelId'] !== undefined) {
            headers['X-Private-Label-Id'] = parameters['xPrivateLabelId'];
        }

        if (parameters['xMarketId'] !== undefined) {
            headers['X-Market-Id'] = parameters['xMarketId'];
        }

        if (parameters['xCurrencyId'] !== undefined) {
            headers['X-Currency-Id'] = parameters['xCurrencyId'];
        }

        if (parameters['includes'] !== undefined) {
            queryParameters['includes'] = parameters['includes'];
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
     * Clears contents of the target Shopper's Cart
     * @method
     * @name Cart#delete
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} xShopperId - Shopper ID whose Cart should be modified, if it differs from authenticated
     * @param {integer} xPrivateLabelId - PrivateLabelId to operate as, if different from JWT
     * 
     */
    Cart.prototype.delete = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/cart';

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

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xPrivateLabelId'] !== undefined) {
            headers['X-Private-Label-Id'] = parameters['xPrivateLabelId'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'DELETE',
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
     * Applies the specified additions/changes to the target Shopper's Cart
     * @method
     * @name Cart#update
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} xShopperId - Shopper ID whose Cart should be modified, if it differs from authenticated
     * @param {integer} xPrivateLabelId - PrivateLabelId to operate as, if different from JWT
     * @param {string} xMarketId - Unique identifier of the Market in which the request is happening
     * @param {CartUpdateBulk} body - The modifications to make to the target Shopper's Cart
     * 
     */
    Cart.prototype.update = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/cart';

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

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xPrivateLabelId'] !== undefined) {
            headers['X-Private-Label-Id'] = parameters['xPrivateLabelId'];
        }

        if (parameters['xMarketId'] !== undefined) {
            headers['X-Market-Id'] = parameters['xMarketId'];
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required body parameter: body'));
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
            method: 'PATCH',
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
     * Removes the specified CartItem from the target Shopper's Cart
     * @method
     * @name Cart#deleteItem
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} xShopperId - Shopper ID whose Cart should be modified, if it differs from authenticated
     * @param {integer} xPrivateLabelId - PrivateLabelId to operate as, if different from JWT
     * @param {integer} itemId - CartItem ID to be deleted
     * 
     */
    Cart.prototype.deleteItem = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/cart/items/{itemId}';

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

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xPrivateLabelId'] !== undefined) {
            headers['X-Private-Label-Id'] = parameters['xPrivateLabelId'];
        }

        path = path.replace('{itemId}', parameters['itemId']);

        if (parameters['itemId'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: itemId'));
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
            method: 'DELETE',
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
     * Removes multiple specified CartItems from the target Shopper's Cart
     * @method
     * @name Cart#deleteMultipleItems
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} xShopperId - Shopper ID whose Cart should be modified, if it differs from authenticated
     * @param {integer} xPrivateLabelId - PrivateLabelId to operate as, if different from JWT
     * @param {array} itemIds - IDs of CartItems to be deleted
     * 
     */
    Cart.prototype.deleteMultipleItems = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/cart/items';

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

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xPrivateLabelId'] !== undefined) {
            headers['X-Private-Label-Id'] = parameters['xPrivateLabelId'];
        }

        if (parameters['itemIds'] !== undefined) {
            queryParameters['itemIds'] = parameters['itemIds'];
        }

        if (parameters['itemIds'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: itemIds'));
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
            method: 'DELETE',
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
     * Removes the specified CartGroup from the target Shopper's Cart
     * @method
     * @name Cart#deleteGroup
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} groupKey - CartGroup key to be deleted
     * @param {integer} xPrivateLabelId - PrivateLabelId to operate as, if different from JWT
     * 
     */
    Cart.prototype.deleteGroup = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/cart/groups/{groupKey}';

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

        path = path.replace('{groupKey}', parameters['groupKey']);

        if (parameters['groupKey'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: groupKey'));
            return deferred.promise;
        }

        if (parameters['xPrivateLabelId'] !== undefined) {
            headers['X-Private-Label-Id'] = parameters['xPrivateLabelId'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'DELETE',
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
     * Replace the target Shopper's Cart with source Shopper's Cart
     * @method
     * @name Cart#replace
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} encryptedSourceShopperId - Encrypted source Shopper ID
     * @param {string} xShopperId - Shopper ID whose Cart should be replaced by source Shopper's Cart,if it differs from authenticated
     * 
     */
    Cart.prototype.replace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/cart/replace';

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

        if (parameters['encryptedSourceShopperId'] !== undefined) {
            queryParameters['encryptedSourceShopperId'] = parameters['encryptedSourceShopperId'];
        }

        if (parameters['encryptedSourceShopperId'] === undefined) {
            deferred.reject(new Error('Missing required query parameter: encryptedSourceShopperId'));
            return deferred.promise;
        }

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
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
     * Retrieves the schema which must be completed in order to purchase the specified product
     * @method
     * @name Cart#productSchema
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {integer} pfid - Product ID whose schema should be retrieved
     * @param {integer} xPrivateLabelId - PrivateLabelId to operate as, if different from JWT
     * 
     */
    Cart.prototype.productSchema = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/cart/products/{pfid}/schema';

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

        path = path.replace('{pfid}', parameters['pfid']);

        if (parameters['pfid'] === undefined) {
            deferred.reject(new Error('Missing required path parameter: pfid'));
            return deferred.promise;
        }

        if (parameters['xPrivateLabelId'] !== undefined) {
            headers['X-Private-Label-Id'] = parameters['xPrivateLabelId'];
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
     * Expands listings and adds prices the supplied virtual cart
     * @method
     * @name Cart#renderVirtual
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {CartUpdateBulk} body - A virtual cart to expand and price
     * @param {string} xShopperId - Shopper ID who owns this virtual cart, if it differs from authenticated
     * @param {integer} xPrivateLabelId - PrivateLabelId to operate as, if different from JWT
     * @param {string} xMarketId - Unique identifier of the Market in which the request is happening
     * @param {string} xCurrencyId - Currency in which pricing information should be accepted and/or returned
     * 
     */
    Cart.prototype.renderVirtual = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/cart/virtual/render';

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

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required body parameter: body'));
            return deferred.promise;
        }

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xPrivateLabelId'] !== undefined) {
            headers['X-Private-Label-Id'] = parameters['xPrivateLabelId'];
        }

        if (parameters['xMarketId'] !== undefined) {
            headers['X-Market-Id'] = parameters['xMarketId'];
        }

        if (parameters['xCurrencyId'] !== undefined) {
            headers['X-Currency-Id'] = parameters['xCurrencyId'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
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
     * Performs product specific validation on the item metadata in the target Shopper's Cart
     * @method
     * @name Cart#validate
     * @param {string} Authorization - Authorization header value in format 'sso-key <key>:<secret>'
     * @param {string} xShopperId - Shopper ID whose Cart should be retrieved, if it differs from authenticated
     * @param {string} xMarketId - Unique identifier of the Market in which the request is happening
     * @param {integer} xPrivateLabelId - PrivateLabelId to operate as, if different from JWT
     * 
     */
    Cart.prototype.validate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/v1/cart/validate';

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

        if (parameters['xShopperId'] !== undefined) {
            headers['X-Shopper-Id'] = parameters['xShopperId'];
        }

        if (parameters['xMarketId'] !== undefined) {
            headers['X-Market-Id'] = parameters['xMarketId'];
        }

        if (parameters['xPrivateLabelId'] !== undefined) {
            headers['X-Private-Label-Id'] = parameters['xPrivateLabelId'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        var req = {
            method: 'POST',
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

    return Cart;
})();

exports.Cart = Cart;