"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categories$ = void 0;
var categories = [{
  id: 0,
  name: 'all'
}, {
  id: 1,
  name: 'health'
}, {
  id: 2,
  name: 'community'
}, {
  id: 3,
  name: 'environnment'
}, {
  id: 4,
  name: 'education'
}, {
  id: 5,
  name: 'culture'
}, {
  id: 6,
  name: 'sport'
}, {
  id: 7,
  name: 'animals'
}, {
  id: 8,
  name: 'entrepreneurship'
}];
var categories$ = new Promise(function (resolve, reject) {
  return setTimeout(resolve, 100, categories);
});
exports.categories$ = categories$;