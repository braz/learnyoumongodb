#!/usr/bin/env node

const Workshopper = require('workshopper')
    , path        = require('path')

function fpath (f) {
    return path.join(__dirname, f)
}

Workshopper({
    name     : 'learnyoumongodb'
  , title    : 'LEARN YOU THE MONGODB FOR MUCH WIN!'
  , appDir   : __dirname
  , menuItems: []
  , exerciseDir: fpath('./exercises/')
})