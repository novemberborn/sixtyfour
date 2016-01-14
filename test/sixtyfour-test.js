'use strict'

var assert = require('chai').assert

var sixtyfour = require('../')

/* global describe, it */
describe('encode(utf8OrBuffer)', function () {
  it('encodes strings', function () {
    assert.strictEqual(sixtyfour.encode('foo'), 'Zm9v')
  })

  it('encodes buffers', function () {
    assert.strictEqual(sixtyfour.encode(new Buffer('foo', 'utf8')), 'Zm9v')
  })
})

describe('decodeAsBuffer(base64)', function () {
  it('decodes into a buffer', function () {
    assert.instanceOf(sixtyfour.decodeAsBuffer('Zm9v'), Buffer)
  })

  it('buffer holds expected value', function () {
    assert.strictEqual(
      sixtyfour.decodeAsBuffer('Zm9v').toString('utf8'),
      'foo')
  })
})

describe('decodeAsUtf8(base64)', function () {
  it('decodes into a string', function () {
    assert.strictEqual(sixtyfour.decodeAsUtf8('Zm9v'), 'foo')
  })
})

describe('encodeJson(json, replacer, space)', function () {
  it('encodes a JSON-stringified value', function () {
    assert.strictEqual(sixtyfour.encodeJson('foo'), 'ImZvbyI=')
  })

  it('uses the `replacer` argument', function () {
    assert.strictEqual(
      sixtyfour.encodeJson('not foo', function () { return 'foo' }),
      'ImZvbyI=')
  })

  it('uses the `space` argument', function () {
    assert.strictEqual(
      sixtyfour.encodeJson({ foo: true }, null, 2),
      'ewogICJmb28iOiB0cnVlCn0=')
  })
})

describe('decodeJson(base64)', function () {
  it('parses a decoded JSON-stringified value', function () {
    assert.deepEqual(
      sixtyfour.decodeJson('ewogICJmb28iOiB0cnVlCn0='),
      { foo: true })
  })
})

describe('urlify(base64, preservePadding)', function () {
  it('maps from the base64 alphabet to the base64url one', function () {
    assert.strictEqual(
      sixtyfour.urlify('+foo/bar+baz/qux'),
      '-foo_bar-baz_qux')
  })

  it('strips padding by default', function () {
    assert.strictEqual(sixtyfour.urlify('foo=='), 'foo')
  })

  it('preserves padding if `preservePadding` is truthy', function () {
    assert.strictEqual(sixtyfour.urlify('foo==', true), 'foo==')
  })

  it('only strips padding characters at the end of the string', function () {
    assert.strictEqual(sixtyfour.urlify('=foo='), '=foo')
  })
})

describe('deurlify(base64url)', function () {
  it('maps from the base64url alphabet to the base64 one', function () {
    assert.strictEqual(
      sixtyfour.deurlify('-foo_bar-baz_qux'),
      '+foo/bar+baz/qux')
  })
})

// Using the ◾◿ characters because they survive a string roundtrip and still
// require + and / characters when encoded as base64.
describe('urlencode(utf8OrBuffer, includePadding)', function () {
  it('encodes strings', function () {
    assert.strictEqual(sixtyfour.urlencode('◾◿.'), '4pe-4pe_Lg')
  })

  it('encodes buffers', function () {
    assert.strictEqual(
      sixtyfour.urlencode(new Buffer('4pe+4pe/Lg==', 'base64')),
      '4pe-4pe_Lg')
  })

  it('includes padding for strings', function () {
    assert.strictEqual(sixtyfour.urlencode('◾◿.', true), '4pe-4pe_Lg==')
  })

  it('includes padding for buffers', function () {
    assert.strictEqual(
      sixtyfour.urlencode(new Buffer('4pe+4pe/Lg==', 'base64'), true),
      '4pe-4pe_Lg==')
  })
})

describe('urldecodeAsBuffer(base64)', function () {
  it('decodes into a buffer', function () {
    assert.instanceOf(sixtyfour.urldecodeAsBuffer('4pe-4pe_Lg'), Buffer)
  })

  it('buffer holds expected value', function () {
    assert.strictEqual(
      sixtyfour.urldecodeAsBuffer('4pe-4pe_Lg').toString('utf8'),
      '◾◿.')
  })
})

describe('urldecodeAsUtf8(base64)', function () {
  it('decodes into a string', function () {
    assert.strictEqual(sixtyfour.urldecodeAsUtf8('4pe-4pe_Lg'), '◾◿.')
  })
})

describe('urlencodeJson(json, replacer, space, includePadding)', function () {
  it('encodes a JSON-stringified value', function () {
    // Lead with dots to ensure the double quote is encoded separately from
    // the ◾◿ characters.
    assert.strictEqual(sixtyfour.urlencodeJson('..◾◿'), 'Ii4u4pe-4pe_Ig')
  })

  it('uses the `replacer` argument', function () {
    assert.strictEqual(
      sixtyfour.urlencodeJson('not ◾◿', function () { return '..◾◿' }),
      'Ii4u4pe-4pe_Ig')
  })

  it('uses the `space` argument', function () {
    assert.strictEqual(
      sixtyfour.urlencodeJson({ '.◾◿': true }, null, 2),
      'ewogICIu4pe-4pe_IjogdHJ1ZQp9')
  })

  it('includes padding', function () {
    assert.strictEqual(
      sixtyfour.urlencodeJson('..◾◿', null, null, true),
      'Ii4u4pe-4pe_Ig==')
  })
})

describe('urldecodeJson(base64)', function () {
  it('parses a decoded JSON-stringified value', function () {
    assert.deepEqual(
      sixtyfour.urldecodeJson('ewogICIu4pe-4pe_IjogdHJ1ZQp9'),
      { '.◾◿': true })
  })
})
