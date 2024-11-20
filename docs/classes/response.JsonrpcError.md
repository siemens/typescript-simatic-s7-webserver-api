[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [response](../modules/response.md) / JsonrpcError

# Class: JsonrpcError

[response](../modules/response.md).JsonrpcError

## Table of contents

### Constructors

- [constructor](response.JsonrpcError.md#constructor)

### Properties

- [code](response.JsonrpcError.md#code)
- [http\_code](response.JsonrpcError.md#http_code)
- [message](response.JsonrpcError.md#message)

### Methods

- [toString](response.JsonrpcError.md#tostring)

## Constructors

### constructor

• **new JsonrpcError**(`http_code`, `code?`, `message?`): [`JsonrpcError`](response.JsonrpcError.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `http_code` | `number` | `undefined` |
| `code` | `number` | `-1` |
| `message?` | `string` | `undefined` |

#### Returns

[`JsonrpcError`](response.JsonrpcError.md)

#### Defined in

response.ts:20

## Properties

### code

• **code**: `number`

Base type for all errors returned by the SIMATIC S7 Webserver

**`Param`**

Code of the error, defined in webserver documentation

**`Param`**

Optional additional information provided by the Webserver

**`Param`**

HTTP Response code provided by the server response

#### Defined in

response.ts:16

___

### http\_code

• **http\_code**: `number`

#### Defined in

response.ts:18

___

### message

• `Optional` **message**: `string`

#### Defined in

response.ts:17

## Methods

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

response.ts:34
