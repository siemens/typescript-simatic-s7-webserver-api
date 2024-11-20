[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [ticket](../modules/ticket.md) / ProxyTicketDownloadData

# Class: ProxyTicketDownloadData

[ticket](../modules/ticket.md).ProxyTicketDownloadData

## Hierarchy

- [`TicketDownloadData`](ticket.TicketDownloadData.md)

  ↳ **`ProxyTicketDownloadData`**

## Table of contents

### Constructors

- [constructor](ticket.ProxyTicketDownloadData.md#constructor)

### Properties

- [address](ticket.ProxyTicketDownloadData.md#address)
- [method](ticket.ProxyTicketDownloadData.md#method)
- [params](ticket.ProxyTicketDownloadData.md#params)
- [plcCertificate](ticket.ProxyTicketDownloadData.md#plccertificate)
- [protocol](ticket.ProxyTicketDownloadData.md#protocol)
- [proxyAddress](ticket.ProxyTicketDownloadData.md#proxyaddress)
- [response](ticket.ProxyTicketDownloadData.md#response)
- [token](ticket.ProxyTicketDownloadData.md#token)
- [verifyTls](ticket.ProxyTicketDownloadData.md#verifytls)

### Methods

- [\_\_str\_\_](ticket.ProxyTicketDownloadData.md#__str__)
- [body](ticket.ProxyTicketDownloadData.md#body)
- [execute](ticket.ProxyTicketDownloadData.md#execute)
- [format\_response](ticket.ProxyTicketDownloadData.md#format_response)
- [gethttpsAgent](ticket.ProxyTicketDownloadData.md#gethttpsagent)
- [headers](ticket.ProxyTicketDownloadData.md#headers)
- [parse](ticket.ProxyTicketDownloadData.md#parse)
- [request](ticket.ProxyTicketDownloadData.md#request)
- [url](ticket.ProxyTicketDownloadData.md#url)

## Constructors

### constructor

• **new ProxyTicketDownloadData**(`config`, `ticket_id`, `proxyAddress`, `token?`): [`ProxyTicketDownloadData`](ticket.ProxyTicketDownloadData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`RequestConfig`](request.RequestConfig.md) |
| `ticket_id` | `string` |
| `proxyAddress` | `string` |
| `token?` | `string` |

#### Returns

[`ProxyTicketDownloadData`](ticket.ProxyTicketDownloadData.md)

#### Overrides

[TicketDownloadData](ticket.TicketDownloadData.md).[constructor](ticket.TicketDownloadData.md#constructor)

#### Defined in

ticket.ts:163

## Properties

### address

• **address**: `string` = `''`

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[address](ticket.TicketDownloadData.md#address)

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

### proxyAddress

• **proxyAddress**: `string`

#### Defined in

ticket.ts:161

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

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[execute](ticket.TicketDownloadData.md#execute)

#### Defined in

ticket.ts:50

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

▸ **headers**(): \{ `Content-type`: `string` = "application/octet-stream"; `X-Auth-Token`: `string` ; `x-plc-ip`: `string`  } \| \{ `Content-type`: `string` = "application/octet-stream"; `X-Auth-Token?`: `undefined` ; `x-plc-ip?`: `undefined`  }

#### Returns

\{ `Content-type`: `string` = "application/octet-stream"; `X-Auth-Token`: `string` ; `x-plc-ip`: `string`  } \| \{ `Content-type`: `string` = "application/octet-stream"; `X-Auth-Token?`: `undefined` ; `x-plc-ip?`: `undefined`  }

#### Overrides

[TicketDownloadData](ticket.TicketDownloadData.md).[headers](ticket.TicketDownloadData.md#headers)

#### Defined in

ticket.ts:177

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

#### Inherited from

[TicketDownloadData](ticket.TicketDownloadData.md).[request](ticket.TicketDownloadData.md#request)

#### Defined in

ticket.ts:38

___

### url

▸ **url**(): `string`

#### Returns

`string`

#### Overrides

[TicketDownloadData](ticket.TicketDownloadData.md).[url](ticket.TicketDownloadData.md#url)

#### Defined in

ticket.ts:168
