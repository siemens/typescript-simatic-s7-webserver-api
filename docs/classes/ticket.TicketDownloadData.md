[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [ticket](../modules/ticket.md) / TicketDownloadData

# Class: TicketDownloadData

[ticket](../modules/ticket.md).TicketDownloadData

## Hierarchy

- [`JsonrpcBaseRequest`](request.JsonrpcBaseRequest.md)

  ↳ **`TicketDownloadData`**

  ↳↳ [`TicketUploadData`](ticket.TicketUploadData.md)

  ↳↳ [`ProxyTicketDownloadData`](ticket.ProxyTicketDownloadData.md)

## Table of contents

### Constructors

- [constructor](ticket.TicketDownloadData.md#constructor)

### Properties

- [address](ticket.TicketDownloadData.md#address)
- [method](ticket.TicketDownloadData.md#method)
- [params](ticket.TicketDownloadData.md#params)
- [plcCertificate](ticket.TicketDownloadData.md#plccertificate)
- [protocol](ticket.TicketDownloadData.md#protocol)
- [response](ticket.TicketDownloadData.md#response)
- [token](ticket.TicketDownloadData.md#token)
- [verifyTls](ticket.TicketDownloadData.md#verifytls)

### Methods

- [\_\_str\_\_](ticket.TicketDownloadData.md#__str__)
- [body](ticket.TicketDownloadData.md#body)
- [execute](ticket.TicketDownloadData.md#execute)
- [format\_response](ticket.TicketDownloadData.md#format_response)
- [gethttpsAgent](ticket.TicketDownloadData.md#gethttpsagent)
- [headers](ticket.TicketDownloadData.md#headers)
- [parse](ticket.TicketDownloadData.md#parse)
- [request](ticket.TicketDownloadData.md#request)
- [url](ticket.TicketDownloadData.md#url)

## Constructors

### constructor

• **new TicketDownloadData**(`config`, `ticket_id`, `token?`): [`TicketDownloadData`](ticket.TicketDownloadData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`RequestConfig`](request.RequestConfig.md) |
| `ticket_id` | `string` |
| `token?` | `string` |

#### Returns

[`TicketDownloadData`](ticket.TicketDownloadData.md)

#### Overrides

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[constructor](request.JsonrpcBaseRequest.md#constructor)

#### Defined in

ticket.ts:7

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

▸ **body**(): ``null``

#### Returns

``null``

#### Overrides

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[body](request.JsonrpcBaseRequest.md#body)

#### Defined in

ticket.ts:13

___

### execute

▸ **execute**(): `Promise`\<``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)\>

#### Returns

`Promise`\<``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)\>

#### Overrides

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[execute](request.JsonrpcBaseRequest.md#execute)

#### Defined in

ticket.ts:50

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

▸ **parse**(`response`): ``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md) |

#### Returns

``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

#### Inherited from

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[parse](request.JsonrpcBaseRequest.md#parse)

#### Defined in

request.ts:206

___

### request

▸ **request**(): `Promise`\<`AxiosResponse`\<`any`, `any`\>\>

#### Returns

`Promise`\<`AxiosResponse`\<`any`, `any`\>\>

#### Overrides

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[request](request.JsonrpcBaseRequest.md#request)

#### Defined in

ticket.ts:38

___

### url

▸ **url**(): `string`

#### Returns

`string`

#### Overrides

[JsonrpcBaseRequest](request.JsonrpcBaseRequest.md).[url](request.JsonrpcBaseRequest.md#url)

#### Defined in

ticket.ts:27
