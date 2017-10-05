var GoDaddy = function(api_key, api_secret) {
  'use strict';
  var Authorization = `sso-key ${api_key}:${api_secret}`;
  var domainOrOptions = {
    token: {
      value: Authorization,
      headerOrQueryName: 'Authorization'
    }
  }

  var AbuseTickets = require('./lib/AbuseTickets').AbuseTickets;
  var AftermarketListings = require('./lib/AftermarketListings').AftermarketListings;
  var Agreements = require('./lib/Agreements').Agreements;
  var Cart = require('./lib/Cart').Cart;
  var Certificates = require('./lib/Certificates').Certificates;
  var CloudAddresses = require('./lib/CloudAddresses').CloudAddresses;
  var CloudApplications = require('./lib/CloudApplications').CloudApplications;
  var CloudDataCenters = require('./lib/CloudDataCenters').CloudDataCenters;
  var CloudEmailPreferences = require('./lib/CloudEmailPreferences').CloudEmailPreferences;
  var CloudImages = require('./lib/CloudImages').CloudImages;
  var CloudLimits = require('./lib/CloudLimits').CloudLimits;
  var CloudServers = require('./lib/CloudServers').CloudServers;
  var CloudSpecs = require('./lib/CloudSpecs').CloudSpecs;
  var CloudSshKeys = require('./lib/CloudSshKeys').CloudSshKeys;
  var CloudUsage = require('./lib/CloudUsage').CloudUsage;
  var Countries = require('./lib/Countries').Countries;
  var Domains = require('./lib/Domains').Domains;
  var Orders = require('./lib/Orders').Orders;
  var Shoppers = require('./lib/Shoppers').Shoppers;
  var Subscriptions = require('./lib/Subscriptions').Subscriptions;

  return  {
    AbuseTickets: new AbuseTickets(domainOrOptions),
    AftermarketListings: new AftermarketListings(domainOrOptions),
    Agreements: new Agreements(domainOrOptions),
    Cart: new Cart(domainOrOptions),
    Certificates: new Certificates(domainOrOptions),
    CloudAddresses: new CloudAddresses(domainOrOptions),
    CloudApplications: new CloudApplications(domainOrOptions),
    CloudDataCenters: new CloudDataCenters(domainOrOptions),
    CloudEmailPreferences: new CloudEmailPreferences(domainOrOptions),
    CloudImages: new CloudImages(domainOrOptions),
    CloudLimits: new CloudLimits(domainOrOptions),
    CloudServers: new CloudServers(domainOrOptions),
    CloudSpecs: new CloudSpecs(domainOrOptions),
    CloudSshKeys: new CloudSshKeys(domainOrOptions),
    CloudUsage: new CloudUsage(domainOrOptions),
    Countries: new Countries(domainOrOptions),
    Domains: new Domains(domainOrOptions),
    Orders: new Orders(domainOrOptions),
    Shoppers: new Shoppers(domainOrOptions),
    Subscriptions: new Subscriptions(domainOrOptions),
  }
}

module.exports = exports = GoDaddy;