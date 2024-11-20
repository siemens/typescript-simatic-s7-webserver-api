[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [plcprogram](../modules/plcprogram.md) / PlcProgramDownloadProfilingData

# Class: PlcProgramDownloadProfilingData

[plcprogram](../modules/plcprogram.md).PlcProgramDownloadProfilingData

## Hierarchy

- [`JsonrpcBaseRequest`](request.JsonrpcBaseRequest.md)

  ↳ **`PlcProgramDownloadProfilingData`**

## Table of contents

### Constructors

- [constructor](plcprogram.PlcProgramDownloadProfilingData.md#constructor)

### Properties

- [address](plcprogram.PlcProgramDownloadProfilingData.md#address)
- [method](plcprogram.PlcProgramDownloadProfilingData.md#method)
- [params](plcprogram.PlcProgramDownloadProfilingData.md#params)
- [plcCertificate](plcprogram.PlcProgramDownloadProfilingData.md#plccertificate)
- [protocol](plcprogram.PlcProgramDownloadProfilingData.md#protocol)
- [response](plcprogram.PlcProgramDownloadProfilingData.md#response)
- [token](plcprogram.PlcProgramDownloadProfilingData.md#token)
- [verifyTls](plcprogram.PlcProgramDownloadProfilingData.md#verifytls)

### Methods

- [\_\_str\_\_](plcprogram.PlcProgramDownloadProfilingData.md#__str__)
- [body](plcprogram.PlcProgramDownloadProfilingData.md#body)
- [execute](plcprogram.PlcProgramDownloadProfilingData.md#execute)
- [format\_response](plcprogram.PlcProgramDownloadProfilingData.md#format_response)
- [gethttpsAgent](plcprogram.PlcProgramDownloadProfilingData.md#gethttpsagent)
- [headers](plcprogram.PlcProgramDownloadProfilingData.md#headers)
- [parse](plcprogram.PlcProgramDownloadProfilingData.md#parse)
- [request](plcprogram.PlcProgramDownloadProfilingData.md#request)
- [url](plcprogram.PlcProgramDownloadProfilingData.md#url)

## Constructors

### constructor

• **new PlcProgramDownloadProfilingData**(`config`, `token`): [`PlcProgramDownloadProfilingData`](plcprogram.PlcProgramDownloadProfilingData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`RequestConfig`](request.RequestConfig.md) |
| `token` | `string` |

#### Returns

[`PlcProgramDownloadProfilingData`](plcprogram.PlcProgramDownloadProfilingData.md)

#### Overrides

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[constructor](request.JsonrpcBaseRequest.md#constructor)

#### Defined in

plcprogram.ts:99

## Properties

### address

• **address**: `string` = `''`

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[address](request.JsonrpcBaseRequest.md#address)

#### Defined in

request.ts:63

___

### method

• `Optional` **method**: `string`

Represents a base type for all jsonrpc requests against
the SIMATC S7 webserver
Provides all functions to build the request and execute it.

**`Attribute`**

method: defines the jsonrpc method and functions that are
   defined for the WebAPI

**`Attribute`**

params: defines additional parameters required by the specific request methods

**`Attribute`**

address: Address of the PLC webserver, can be either a IPv4/ IPv6 address
   or the DNS name
   Must not contain the protocol definition, this has to be set
   via the protocol attribute

**`Attribute`**

protocol: defines the protocol (http/https) for connecting to the PLC

**`Attribute`**

token: Token for authentication and authorization on the PLC

**`Attribute`**

verifyTls: Switch wether TLS Server Certificate should be verified against
   trusted certificates or trusted by default

**`Attribute`**

plcCertificate: File that contains the PLC certificate to be able to access the PLC.

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[method](request.JsonrpcBaseRequest.md#method)

#### Defined in

request.ts:61

___

### params

• `Optional` **params**: `Record`\<`string`, `any`\>

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[params](request.JsonrpcBaseRequest.md#params)

#### Defined in

request.ts:62

___

### plcCertificate

• `Optional` **plcCertificate**: `Buffer`

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[plcCertificate](request.JsonrpcBaseRequest.md#plccertificate)

#### Defined in

request.ts:68

___

### protocol

• **protocol**: `string` = `''`

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[protocol](request.JsonrpcBaseRequest.md#protocol)

#### Defined in

request.ts:64

___

### response

• `Optional` **response**: `AxiosResponse`\<`any`, `any`\>

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[response](request.JsonrpcBaseRequest.md#response)

#### Defined in

request.ts:67

___

### token

• `Optional` **token**: `string`

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[token](request.JsonrpcBaseRequest.md#token)

#### Defined in

request.ts:65

___

### verifyTls

• **verifyTls**: `boolean` = `true`

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[verifyTls](request.JsonrpcBaseRequest.md#verifytls)

#### Defined in

request.ts:66

## Methods

### \_\_str\_\_

▸ **__str__**(): `string`

#### Returns

`string`

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[__str__](request.JsonrpcBaseRequest.md#__str__)

#### Defined in

request.ts:140

___

### body

▸ **body**(): `undefined` \| ``null`` \| \{ `id`: `number` ; `jsonrpc`: `string` ; `method?`: `string` ; `params?`: `Record`\<`string`, `any`\>  }

#### Returns

`undefined` \| ``null`` \| \{ `id`: `number` ; `jsonrpc`: `string` ; `method?`: `string` ; `params?`: `Record`\<`string`, `any`\>  }

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[body](request.JsonrpcBaseRequest.md#body)

#### Defined in

request.ts:107

___

### execute

▸ **execute**(): `Promise`\<``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)\>

#### Returns

`Promise`\<``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)\>

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[execute](request.JsonrpcBaseRequest.md#execute)

#### Defined in

request.ts:162

___

### format\_response

▸ **format_response**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[format_response](request.JsonrpcBaseRequest.md#format_response)

#### Defined in

request.ts:195

___

### gethttpsAgent

▸ **gethttpsAgent**(): `undefined` \| `Agent`

#### Returns

`undefined` \| `Agent`

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[gethttpsAgent](request.JsonrpcBaseRequest.md#gethttpsagent)

#### Defined in

request.ts:95

___

### headers

▸ **headers**(): \{ `Content-type`: `string` = "application/json"; `X-Auth-Token`: `string`  } \| \{ `Content-type`: `string` = "application/json"; `X-Auth-Token?`: `undefined`  }

#### Returns

\{ `Content-type`: `string` = "application/json"; `X-Auth-Token`: `string`  } \| \{ `Content-type`: `string` = "application/json"; `X-Auth-Token?`: `undefined`  }

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[headers](request.JsonrpcBaseRequest.md#headers)

#### Defined in

request.ts:84

___

### parse

▸ **parse**(`response`): ``null`` \| [`PlcProgramDownloadProfilingDataResponse`](plcprogram.PlcProgramDownloadProfilingDataResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md) |

#### Returns

``null`` \| [`PlcProgramDownloadProfilingDataResponse`](plcprogram.PlcProgramDownloadProfilingDataResponse.md)

#### Overrides

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[parse](request.JsonrpcBaseRequest.md#parse)

#### Defined in

plcprogram.ts:104

___

### request

▸ **request**(): `Promise`\<`AxiosResponse`\<`any`, `any`\>\>

#### Returns

`Promise`\<`AxiosResponse`\<`any`, `any`\>\>

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[request](request.JsonrpcBaseRequest.md#request)

#### Defined in

request.ts:145

___

### url

▸ **url**(): `string`

#### Returns

`string`

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[url](request.JsonrpcBaseRequest.md#url)

#### Defined in

request.ts:133