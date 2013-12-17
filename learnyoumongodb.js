#!/usr/bin/env node

const Workshopper = require('workshopper')
    , path        = require('path')

Workshopper({
    name     : 'learnyoumongodb'
  , title    : 'LEARN YOU THE MONGODB FOR MUCH WIN!'
  , appDir   : __dirname
  , helpFile : path.join(__dirname, 'help.txt')
  , setupsFile : path.join(__dirname, 'setups.txt')
  , creditsFile : path.join(__dirname, 'credits.txt')
}).init()