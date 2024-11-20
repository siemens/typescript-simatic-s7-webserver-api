[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [ticket](../modules/ticket.md) / TicketUploadData

# Class: TicketUploadData

[ticket](../modules/ticket.md).TicketUploadData

## Hierarchy

- [`TicketDownloadData`](ticket.TicketDownloadData.md)

  ↳ **`TicketUploadData`**

## Table of contents

### Constructors

- [constructor](ticket.TicketUploadData.md#constructor)

### Properties

- [address](ticket.TicketUploadData.md#address)
- [data](ticket.TicketUploadData.md#data)
- [method](ticket.TicketUploadData.md#method)
- [params](ticket.TicketUploadData.md#params)
- [plcCertificate](ticket.TicketUploadData.md#plccertificate)
- [protocol](ticket.TicketUploadData.md#protocol)
- [response](ticket.TicketUploadData.md#response)
- [token](ticket.TicketUploadData.md#token)
- [verifyTls](ticket.TicketUploadData.md#verifytls)

### Methods

- [\_\_str\_\_](ticket.TicketUploadData.md#__str__)
- [body](ticket.TicketUploadData.md#body)
- [execute](ticket.TicketUploadData.md#execute)
- [format\_response](ticket.TicketUploadData.md#format_response)
- [gethttpsAgent](ticket.TicketUploadData.md#gethttpsagent)
- [headers](ticket.TicketUploadData.md#headers)
- [parse](ticket.TicketUploadData.md#parse)
- [request](ticket.TicketUploadData.md#request)
- [url](ticket.TicketUploadData.md#url)

## Constructors

### constructor

• **new TicketUploadData**(`config`, `ticket_id`, `data`, `token`): [`TicketUploadData`](ticket.TicketUploadData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`RequestConfig`](request.RequestConfig.md) |
| `ticket_id` | `string` |
| `data` | `Uint8Array` |
| `token` | `string` |

#### Returns

[`TicketUploadData`](ticket.TicketUploadData.md)

#### Overrides

[TicketDownloadData](ticket.TicketDownloadData.md).[constructor](ticket.TicketDownloadData.md#constructor)

#### Defined in

ticket.ts:97

## Properties

### address

• **address**: `string` = `''`

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[address](ticket.TicketDownloadData.md#address)

#### Defined in

request.ts:63

___

### data

• **data**: `Uint8Array`

#### Defined in

ticket.ts:96

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

[TicketDownloadData](ticket.TicketDownloadData.md).[method](ticket.TicketDownloadData.md#method)

#### Defined in

request.ts:61

___

### params

• `Optional` **params**: `Record`\<`string`, `any`\>

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[params](ticket.TicketDownloadData.md#params)

#### Defined in

request.ts:62

___

### plcCertificate

• `Optional` **plcCertificate**: `Buffer`

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[plcCertificate](ticket.TicketDownloadData.md#plccertificate)

#### Defined in

request.ts:68

___

### protocol

• **protocol**: `string` = `''`

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[protocol](ticket.TicketDownloadData.md#protocol)

#### Defined in

request.ts:64

___

### response

• `Optional` **response**: `AxiosResponse`\<`any`, `any`\>

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[response](ticket.TicketDownloadData.md#response)

#### Defined in

request.ts:67

___

### token

• `Optional` **token**: `string`

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[token](ticket.TicketDownloadData.md#token)

#### Defined in

request.ts:65

___

### verifyTls

• **verifyTls**: `boolean` = `true`

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[verifyTls](ticket.TicketDownloadData.md#verifytls)

#### Defined in

request.ts:66

## Methods

### \_\_str\_\_

▸ **__str__**(): `string`

#### Returns

`string`

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[__str__](ticket.TicketDownloadData.md#__str__)

#### Defined in

request.ts:140

___

### body

▸ **body**(): ``null``

#### Returns

``null``

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[body](ticket.TicketDownloadData.md#body)

#### Defined in

ticket.ts:13

___

### execute

▸ **execute**(): `Promise`\<``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)\>

#### Returns

`Promise`\<``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)\>

#### Overrides

[TicketDownloadData](ticket.TicketDownloadData.md).[execute](ticket.TicketDownloadData.md#execute)

#### Defined in

ticket.ts:125

___

### format\_response

▸ **format_response**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[format_response](ticket.TicketDownloadData.md#format_response)

#### Defined in

request.ts:195

___

### gethttpsAgent

▸ **gethttpsAgent**(): `undefined` \| `Agent`

#### Returns

`undefined` \| `Agent`

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[gethttpsAgent](ticket.TicketDownloadData.md#gethttpsagent)

#### Defined in

request.ts:95

___

### headers

▸ **headers**(): \{ `Content-type`: `string` = "application/octet-stream"; `X-Auth-Token`: `string`  } \| \{ `Content-type`: `string` = "application/octet-stream"; `X-Auth-Token?`: `undefined`  }

#### Returns

\{ `Content-type`: `string` = "application/octet-stream"; `X-Auth-Token`: `string`  } \| \{ `Content-type`: `string` = "application/octet-stream"; `X-Auth-Token?`: `undefined`  }

#### Overrides

[TicketDownloadData](ticket.TicketDownloadData.md).[headers](ticket.TicketDownloadData.md#headers)

#### Defined in

ticket.ts:102

___

### parse

▸ **parse**(`response`): ``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md) |

#### Returns

``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[parse](ticket.TicketDownloadData.md#parse)

#### Defined in

request.ts:206

___

### request

▸ **request**(): `Promise`\<`AxiosResponse`\<`any`, `any`\>\>

#### Returns

`Promise`\<`AxiosResponse`\<`any`, `any`\>\>

#### Overrides

[TicketDownloadData](ticket.TicketDownloadData.md).[request](ticket.TicketDownloadData.md#request)

#### Defined in

ticket.ts:110

___

### url

▸ **url**(): `string`

#### Returns

`string`

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[url](ticket.TicketDownloadData.md#url)

#### Defined in

ticket.ts:27
