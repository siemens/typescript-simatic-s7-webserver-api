[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [webApp](../modules/webApp.md) / WebAppSetNotAuthorizedPageResponse

# Class: WebAppSetNotAuthorizedPageResponse

[webApp](../modules/webApp.md).WebAppSetNotAuthorizedPageResponse

## Hierarchy

- [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

  ↳ **`WebAppSetNotAuthorizedPageResponse`**

## Table of contents

### Constructors

- [constructor](webApp.WebAppSetNotAuthorizedPageResponse.md#constructor)

### Properties

- [error](webApp.WebAppSetNotAuthorizedPageResponse.md#error)
- [id](webApp.WebAppSetNotAuthorizedPageResponse.md#id)
- [kind](webApp.WebAppSetNotAuthorizedPageResponse.md#kind)
- [result](webApp.WebAppSetNotAuthorizedPageResponse.md#result)

### Methods

- [\_\_str\_\_](webApp.WebAppSetNotAuthorizedPageResponse.md#__str__)
- [is\_error](webApp.WebAppSetNotAuthorizedPageResponse.md#is_error)
- [parse](webApp.WebAppSetNotAuthorizedPageResponse.md#parse)

## Constructors

### constructor

• **new WebAppSetNotAuthorizedPageResponse**(): [`WebAppSetNotAuthorizedPageResponse`](webApp.WebAppSetNotAuthorizedPageResponse.md)

#### Returns

[`WebAppSetNotAuthorizedPageResponse`](webApp.WebAppSetNotAuthorizedPageResponse.md)

#### Overrides

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[constructor](response.JsonrpcBaseResponse.md#constructor)

#### Defined in

webApp.ts:228

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

webApp.ts:227

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
