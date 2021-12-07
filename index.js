const dayNumber = process.argv[2]
const aOrB = process.argv[3]

const { trim, toUpper } = require('lodash')
const { flow, split } = require('lodash/fp')
const fs = require('fs')
const parseInput = require(`./day${dayNumber}/parseInput`)
const solve = require(`./day${dayNumber}/solution${toUpper(aOrB)}`)

const input = fs.readFileSync(`./day${dayNumber}/input.txt`, 'utf8')
flow(trim, parseInput, solve, console.log)(input)
