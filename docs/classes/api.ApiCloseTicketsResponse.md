[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [api](../modules/api.md) / ApiCloseTicketsResponse

# Class: ApiCloseTicketsResponse

[api](../modules/api.md).ApiCloseTicketsResponse

## Hierarchy

- [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

  ↳ **`ApiCloseTicketsResponse`**

## Table of contents

### Constructors

- [constructor](api.ApiCloseTicketsResponse.md#constructor)

### Properties

- [error](api.ApiCloseTicketsResponse.md#error)
- [id](api.ApiCloseTicketsResponse.md#id)
- [kind](api.ApiCloseTicketsResponse.md#kind)
- [result](api.ApiCloseTicketsResponse.md#result)

### Methods

- [\_\_str\_\_](api.ApiCloseTicketsResponse.md#__str__)
- [is\_error](api.ApiCloseTicketsResponse.md#is_error)
- [parse](api.ApiCloseTicketsResponse.md#parse)

## Constructors

### constructor

• **new ApiCloseTicketsResponse**(): [`ApiCloseTicketsResponse`](api.ApiCloseTicketsResponse.md)

#### Returns

[`ApiCloseTicketsResponse`](api.ApiCloseTicketsResponse.md)

#### Overrides

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[constructor](response.JsonrpcBaseResponse.md#constructor)

#### Defined in

api.ts:258

## Properties

### error

• `Optional` **error**: [`JsonrpcError`](response.JsonrpcError.md)

#### Inherited from

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[error](response.JsonrpcBaseResponse.md#error)

#### Defined in

response.ts:55

___

### id

• **id**: `number` = `0`

#### Inherited from

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[id](response.JsonrpcBaseResponse.md#id)

#### Defined in

response.ts:54

___

### kind

• `Optional` `Readonly` **kind**: `string`

Base type for all responsed returned by the SIMATIC S7 Webserver

**`Param`**

Generic type for error if there is one, else None

**`Param`**

Object that provides result data

#### Inherited from

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[kind](response.JsonrpcBaseResponse.md#kind)

#### Defined in

response.ts:53

___

### result

• `Optional` **result**: `boolean`

#### Overrides

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[result](response.JsonrpcBaseResponse.md#result)

#### Defined in

api.ts:257

## Methods

### \_\_str\_\_

▸ **__str__**(): `string`

#### Returns

`string`

#### Inherited from

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[__str__](response.JsonrpcBaseResponse.md#__str__)

#### Defined in

response.ts:128

___

### is\_error

▸ **is_error**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[is_error](response.JsonrpcBaseResponse.md#is_error)

#### Defined in

response.ts:68

___

### parse

▸ **parse**(`response`): ``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `AxiosResponse`\<`any`, `any`\> |

#### Returns

``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

#### Inherited from

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[parse](response.JsonrpcBaseResponse.md#parse)

#### Defined in

response.ts:74
