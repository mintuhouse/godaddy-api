var GoDaddy = function(api_key, api_secret) {
  'use strict';
  var Authorization = `sso-key ${api_key}:${api_secret}`;
  var domainOrOptions = {
    token: {
      value: Authorization,
      headerOrQueryName: 'Authorization'
    }
  }

  var abuseTickets = require('./lib/abuseTickets').abuseTickets;
  var aftermarketListings = require('./lib/aftermarketListings').aftermarketListings;
  var agreements = require('./lib/agreements').agreements;
  var cart = require('./lib/cart').cart;
  var certificates = require('./lib/certificates').certificates;
  var cloudAddresses = require('./lib/cloudAddresses').cloudAddresses;
  var cloudApplications = require('./lib/cloudApplications').cloudApplications;
  var cloudDataCenters = require('./lib/cloudDataCenters').cloudDataCenters;
  var cloudEmailPreferences = require('./lib/cloudEmailPreferences').cloudEmailPreferences;
  var cloudImages = require('./lib/cloudImages').cloudImages;
  var cloudLimits = require('./lib/cloudLimits').cloudLimits;
  var cloudServers = require('./lib/cloudServers').cloudServers;
  var cloudSpecs = require('./lib/cloudSpecs').cloudSpecs;
  var cloudSshKeys = require('./lib/cloudSshKeys').cloudSshKeys;
  var cloudUsage = require('./lib/cloudUsage').cloudUsage;
  var countries = require('./lib/countries').countries;
  var domains = require('./lib/domains').domains;
  var orders = require('./lib/orders').orders;
  var shoppers = require('./lib/shoppers').shoppers;
  var subscriptions = require('./lib/subscriptions').subscriptions;

  return  {
    abuseTickets: new abuseTickets(domainOrOptions),
    aftermarketListings: new aftermarketListings(domainOrOptions),
    agreements: new agreements(domainOrOptions),
    cart: new cart(domainOrOptions),
    certificates: new certificates(domainOrOptions),
    cloudAddresses: new cloudAddresses(domainOrOptions),
    cloudApplications: new cloudApplications(domainOrOptions),
    cloudDataCenters: new cloudDataCenters(domainOrOptions),
    cloudEmailPreferences: new cloudEmailPreferences(domainOrOptions),
    cloudImages: new cloudImages(domainOrOptions),
    cloudLimits: new cloudLimits(domainOrOptions),
    cloudServers: new cloudServers(domainOrOptions),
    cloudSpecs: new cloudSpecs(domainOrOptions),
    cloudSshKeys: new cloudSshKeys(domainOrOptions),
    cloudUsage: new cloudUsage(domainOrOptions),
    countries: new countries(domainOrOptions),
    domains: new domains(domainOrOptions),
    orders: new orders(domainOrOptions),
    shoppers: new shoppers(domainOrOptions),
    subscriptions: new subscriptions(domainOrOptions),
  }
}

module.exports = exports = GoDaddy;