# sixtyfour

Base64 utilities.

## API

### `encode(utf8OrBuffer)`

Base64-encodes a string or `Buffer` object.

### `decodeAsBuffer(base64)`

Decodes a Base64-encoded string into a `Buffer` object.

### `decodeAsUtf8(base64)`

Decodes a Base64-encoded string, using the `utf8` encoding, into another string.

### `encodeJson(json, replacer, space)`

Stringifies `json` with the `replacer` and `space` arguments passed to
`JSON.stringify()`, then Base64-encodes it.

### `decodeJson(base64)`

Decodes a Base64-encoded string, using the `utf8` encoding, into another string,
then invokes `JSON.parse()` on it.

### `urlify(base64, preservePadding)`

Replaces the `+` and `/` characters from the Base64 alphabet with the `-` and `_`
characters from the Base64url alphabet. By default removes trailing `=` padding
characters, unless `preservePadding` is truthy.

### `deurlify(base64)`

Replaces the `-` and `_` characters from the Base64url alphabet with the `+` and `/`
characters from the Base64 alphabet. Does *not* add `=` padding characters.

### `urlencode(utf8OrBuffer, includePadding)`

Encodes a string or `Buffer` object using the Base64url alphabet. By
default trailing `=` padding characters are not included, unless
`includePadding` is truthy.

### `urldecodeAsBuffer(base64url)`

Decodes a Base64url-encoded string into a `Buffer` object.

### `urldecodeAsUtf8(base64url)`

Decodes a Base64url-encoded string, using the `utf8` encoding, into another string.

### `urlencodeJson(json, replacer, space, includePadding)`

Stringifies `json` with the `replacer` and `space` arguments passed to
`JSON.stringify()`, then encodes it using the Base64url alphabet. By
default trailing `=` padding characters are not included, unless
`includePadding` is truthy.

### `urldecodeJson(base64url)`

Decodes a Base64url-encoded string, using the `utf8` encoding, into another string,
then invokes `JSON.parse()` on it.
