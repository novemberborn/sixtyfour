'use strict'

function encode (utf8OrBuffer) {
  if (Buffer.isBuffer(utf8OrBuffer)) {
    return utf8OrBuffer.toString('base64')
  }

  return new Buffer(utf8OrBuffer, 'utf8').toString('base64')
}
exports.encode = encode

function decodeAsBuffer (base64) {
  return new Buffer(base64, 'base64')
}
exports.decodeAsBuffer = decodeAsBuffer

function decodeAsUtf8 (base64) {
  return decodeAsBuffer(base64).toString('utf8')
}
exports.decodeAsUtf8 = decodeAsUtf8

function encodeJson (json, replacer, space) {
  return encode(JSON.stringify(json, replacer, space))
}
exports.encodeJson = encodeJson

function decodeJson (base64) {
  return JSON.parse(decodeAsUtf8(base64))
}
exports.decodeJson = decodeJson

function urlify (base64, preservePadding) {
  var base64url = base64.replace(/\+/g, '-').replace(/\//g, '_')
  if (!preservePadding) {
    base64url = base64url.replace(/\=+$/, '')
  }
  return base64url
}
exports.urlify = urlify

function deurlify (base64url) {
  return base64url.replace(/-/g, '+').replace(/_/g, '/')
}
exports.deurlify = deurlify

function urlencode (utf8OrBuffer, includePadding) {
  return urlify(encode(utf8OrBuffer), includePadding)
}
exports.urlencode = urlencode

function urldecodeAsBuffer (base64url) {
  return decodeAsBuffer(deurlify(base64url))
}
exports.urldecodeAsBuffer = urldecodeAsBuffer

function urldecodeAsUtf8 (base64url) {
  return decodeAsUtf8(deurlify(base64url))
}
exports.urldecodeAsUtf8 = urldecodeAsUtf8

function urlencodeJson (json, replacer, space, includePadding) {
  return urlify(encodeJson(json, replacer, space), includePadding)
}
exports.urlencodeJson = urlencodeJson

function urldecodeJson (json) {
  return decodeJson(deurlify(json))
}
exports.urldecodeJson = urldecodeJson
