[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [alarms](../modules/alarms.md) / AlarmsBrowseResponse

# Class: AlarmsBrowseResponse

[alarms](../modules/alarms.md).AlarmsBrowseResponse

## Hierarchy

- [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

  ↳ **`AlarmsBrowseResponse`**

## Table of contents

### Constructors

- [constructor](alarms.AlarmsBrowseResponse.md#constructor)

### Properties

- [error](alarms.AlarmsBrowseResponse.md#error)
- [id](alarms.AlarmsBrowseResponse.md#id)
- [kind](alarms.AlarmsBrowseResponse.md#kind)
- [result](alarms.AlarmsBrowseResponse.md#result)

### Methods

- [\_\_str\_\_](alarms.AlarmsBrowseResponse.md#__str__)
- [is\_error](alarms.AlarmsBrowseResponse.md#is_error)
- [parse](alarms.AlarmsBrowseResponse.md#parse)

## Constructors

### constructor

• **new AlarmsBrowseResponse**(): [`AlarmsBrowseResponse`](alarms.AlarmsBrowseResponse.md)

#### Returns

[`AlarmsBrowseResponse`](alarms.AlarmsBrowseResponse.md)

#### Overrides

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[constructor](response.JsonrpcBaseResponse.md#constructor)

#### Defined in

alarms.ts:136

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

• `Optional` **result**: [`Alarms`](alarms.Alarms.md)

#### Overrides

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[result](response.JsonrpcBaseResponse.md#result)

#### Defined in

alarms.ts:135

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
