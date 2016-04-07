import test from 'ava'

import {
  decodeAsBuffer,
  decodeAsUtf8,
  decodeJson,
  deurlify,
  encode,
  encodeJson,
  urldecodeAsBuffer,
  urldecodeAsUtf8,
  urldecodeJson,
  urlencode,
  urlencodeJson,
  urlify
} from './'

test('encode(utf8OrBuffer) encodes strings', t => {
  t.is(encode('foo'), 'Zm9v')
})

test('encode(utf8OrBuffer) encodes buffers', t => {
  t.is(encode(new Buffer('foo', 'utf8')), 'Zm9v')
})

test('decodeAsBuffer(base64) decodes into a buffer', t => {
  t.truthy(Buffer.isBuffer(decodeAsBuffer('Zm9v')))
})

test('decodeAsBuffer(base64) buffer holds expected value', t => {
  t.is(decodeAsBuffer('Zm9v').toString('utf8'), 'foo')
})

test('decodeAsUtf8(base64) decodes into a string', t => {
  t.is(decodeAsUtf8('Zm9v'), 'foo')
})

test('encodeJson(json, replacer, space) encodes a JSON-stringified value', t => {
  t.is(encodeJson('foo'), 'ImZvbyI=')
})

test('encodeJson(json, replacer, space) uses the `replacer` argument', t => {
  t.is(encodeJson('not foo', () => 'foo'), 'ImZvbyI=')
})

test('encodeJson(json, replacer, space) uses the `space` argument', t => {
  t.is(encodeJson({ foo: true }, null, 2), 'ewogICJmb28iOiB0cnVlCn0=')
})

test('decodeJson(base64) parses a decoded JSON-stringified value', t => {
  t.deepEqual(decodeJson('ewogICJmb28iOiB0cnVlCn0='), { foo: true })
})

test('urlify(base64, preservePadding) maps from the base64 alphabet to the base64url one', t => {
  t.is(urlify('+foo/bar+baz/qux'), '-foo_bar-baz_qux')
})

test('urlify(base64, preservePadding) strips padding by default', t => {
  t.is(urlify('foo=='), 'foo')
})

test('urlify(base64, preservePadding) preserves padding if `preservePadding` is truthy', t => {
  t.is(urlify('foo==', true), 'foo==')
})

test('urlify(base64, preservePadding) only strips padding characters at the end of the string', t => {
  t.is(urlify('=foo='), '=foo')
})

test('deurlify(base64url) maps from the base64url alphabet to the base64 one', t => {
  t.is(deurlify('-foo_bar-baz_qux'), '+foo/bar+baz/qux')
})

// Using the ◾◿ characters because they survive a string roundtrip and still
// require + and / characters when encoded as base64.
test('urlencode(utf8OrBuffer, includePadding) encodes strings', t => {
  t.is(urlencode('◾◿.'), '4pe-4pe_Lg')
})

test('urlencode(utf8OrBuffer, includePadding) encodes buffers', t => {
  t.is(urlencode(new Buffer('4pe+4pe/Lg==', 'base64')), '4pe-4pe_Lg')
})

test('urlencode(utf8OrBuffer, includePadding) includes padding for strings', t => {
  t.is(urlencode('◾◿.', true), '4pe-4pe_Lg==')
})

test('urlencode(utf8OrBuffer, includePadding) includes padding for buffers', t => {
  t.is(urlencode(new Buffer('4pe+4pe/Lg==', 'base64'), true), '4pe-4pe_Lg==')
})

test('urldecodeAsBuffer(base64) decodes into a buffer', t => {
  t.truthy(Buffer.isBuffer(urldecodeAsBuffer('4pe-4pe_Lg')))
})

test('urldecodeAsBuffer(base64) buffer holds expected value', t => {
  t.is(urldecodeAsBuffer('4pe-4pe_Lg').toString('utf8'), '◾◿.')
})

test('urldecodeAsUtf8(base64) decodes into a string', t => {
  t.is(urldecodeAsUtf8('4pe-4pe_Lg'), '◾◿.')
})

test('urlencodeJson(json, replacer, space, includePadding) encodes a JSON-stringified value', t => {
  // Lead with dots to ensure the double quote is encoded separately from
  // the ◾◿ characters.
  t.is(urlencodeJson('..◾◿'), 'Ii4u4pe-4pe_Ig')
})

test('urlencodeJson(json, replacer, space, includePadding) uses the `replacer` argument', t => {
  t.is(urlencodeJson('not ◾◿', () => '..◾◿'), 'Ii4u4pe-4pe_Ig')
})

test('urlencodeJson(json, replacer, space, includePadding) uses the `space` argument', t => {
  t.is(urlencodeJson({ '.◾◿': true }, null, 2), 'ewogICIu4pe-4pe_IjogdHJ1ZQp9')
})

test('urlencodeJson(json, replacer, space, includePadding) includes padding', t => {
  t.is(urlencodeJson('..◾◿', null, null, true), 'Ii4u4pe-4pe_Ig==')
})

test('urldecodeJson(base64) parses a decoded JSON-stringified value', t => {
  t.deepEqual(urldecodeJson('ewogICIu4pe-4pe_IjogdHJ1ZQp9'), { '.◾◿': true })
})
