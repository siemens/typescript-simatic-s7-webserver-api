[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [plcprogram](../modules/plcprogram.md) / PlcProgramBrowseResponse

# Class: PlcProgramBrowseResponse

[plcprogram](../modules/plcprogram.md).PlcProgramBrowseResponse

## Hierarchy

- [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

  ↳ **`PlcProgramBrowseResponse`**

## Table of contents

### Constructors

- [constructor](plcprogram.PlcProgramBrowseResponse.md#constructor)

### Properties

- [error](plcprogram.PlcProgramBrowseResponse.md#error)
- [id](plcprogram.PlcProgramBrowseResponse.md#id)
- [kind](plcprogram.PlcProgramBrowseResponse.md#kind)
- [result](plcprogram.PlcProgramBrowseResponse.md#result)

### Methods

- [\_\_str\_\_](plcprogram.PlcProgramBrowseResponse.md#__str__)
- [is\_error](plcprogram.PlcProgramBrowseResponse.md#is_error)
- [parse](plcprogram.PlcProgramBrowseResponse.md#parse)

## Constructors

### constructor

• **new PlcProgramBrowseResponse**(): [`PlcProgramBrowseResponse`](plcprogram.PlcProgramBrowseResponse.md)

#### Returns

[`PlcProgramBrowseResponse`](plcprogram.PlcProgramBrowseResponse.md)

#### Overrides

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[constructor](response.JsonrpcBaseResponse.md#constructor)

#### Defined in

plcprogram.ts:93

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

• `Optional` **result**: [`PlcProgramBrowseVariable`](plcprogram.PlcProgramBrowseVariable.md)[]

#### Overrides

[JsonrpcBaseResponse](response.JsonrpcBaseResponse.md).[result](response.JsonrpcBaseResponse.md#result)

#### Defined in

plcprogram.ts:92

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
