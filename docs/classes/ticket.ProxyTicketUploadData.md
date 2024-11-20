[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [ticket](../modules/ticket.md) / ProxyTicketUploadData

# Class: ProxyTicketUploadData

[ticket](../modules/ticket.md).ProxyTicketUploadData

## Table of contents

### Constructors

- [constructor](ticket.ProxyTicketUploadData.md#constructor)

### Properties

- [address](ticket.ProxyTicketUploadData.md#address)
- [data](ticket.ProxyTicketUploadData.md#data)
- [proxyAddress](ticket.ProxyTicketUploadData.md#proxyaddress)
- [ticket\_id](ticket.ProxyTicketUploadData.md#ticket_id)
- [token](ticket.ProxyTicketUploadData.md#token)

### Methods

- [execute](ticket.ProxyTicketUploadData.md#execute)
- [gethttpsAgent](ticket.ProxyTicketUploadData.md#gethttpsagent)
- [headers](ticket.ProxyTicketUploadData.md#headers)
- [request](ticket.ProxyTicketUploadData.md#request)
- [url](ticket.ProxyTicketUploadData.md#url)

## Constructors

### constructor

• **new ProxyTicketUploadData**(`proxyAddress`, `address`, `ticket_id`, `data`, `token`): [`ProxyTicketUploadData`](ticket.ProxyTicketUploadData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyAddress` | `string` |
| `address` | `string` |
| `ticket_id` | `string` |
| `data` | `Uint8Array` |
| `token` | `string` |

#### Returns

[`ProxyTicketUploadData`](ticket.ProxyTicketUploadData.md)

#### Defined in

ticket.ts:194

## Properties

### address

• **address**: `string`

#### Defined in

ticket.ts:191

___

### data

• **data**: `Uint8Array`

#### Defined in

ticket.ts:189

___

### proxyAddress

• **proxyAddress**: `string`

#### Defined in

ticket.ts:188

___

### ticket\_id

• **ticket\_id**: `string`

#### Defined in

ticket.ts:192

___

### token

• **token**: `string`

#### Defined in

ticket.ts:190

## Methods

### execute

▸ **execute**(): `Promise`\<``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)\>

#### Returns

`Promise`\<``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)\>

#### Defined in

ticket.ts:235

___

### gethttpsAgent

▸ **gethttpsAgent**(): `undefined` \| `Agent`

#### Returns

`undefined` \| `Agent`

#### Defined in

ticket.ts:217

___

### headers

▸ **headers**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `Content-type` | `string` |
| `X-Auth-Token` | `string` |
| `x-plc-ip` | `string` |
| `x-plc-ticket` | `string` |

#### Defined in

ticket.ts:202

___

### request

▸ **request**(): `Promise`\<`AxiosResponse`\<`any`, `any`\>\>

#### Returns

`Promise`\<`AxiosResponse`\<`any`, `any`\>\>

#### Defined in

ticket.ts:222

___

### url

▸ **url**(): `string`

#### Returns

`string`

#### Defined in

ticket.ts:210
