const invertBit = bit => bit === '1' ? '0' : '1';

const parseBinary = str => parseInt(str, 2)

module.exports = { invertBit, parseBinary }