#!/usr/bin/env node

const Workshopper = require('workshopper')
    , path        = require('path')

Workshopper({
    name     : 'learnyoumongodb'
  , title    : 'LEARN YOU THE MONGODB FOR MUCH WIN!'
  , appDir   : __dirname
  , helpFile : path.join(__dirname, 'help.txt')
  , prerequisitesFile : path.join(__dirname, 'prerequisites.txt')
  , creditsFile : path.join(__dirname, 'credits.txt')
}).init()