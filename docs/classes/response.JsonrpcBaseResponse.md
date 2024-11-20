[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [response](../modules/response.md) / JsonrpcBaseResponse

# Class: JsonrpcBaseResponse

[response](../modules/response.md).JsonrpcBaseResponse

## Hierarchy

- **`JsonrpcBaseResponse`**

  ↳ [`AlarmsBrowseResponse`](alarms.AlarmsBrowseResponse.md)

  ↳ [`AlarmsAcknowledgeResponse`](alarms.AlarmsAcknowledgeResponse.md)

  ↳ [`ApiLoginResponse`](api.ApiLoginResponse.md)

  ↳ [`ApiPingResponse`](api.ApiPingResponse.md)

  ↳ [`ApiBrowseResponse`](api.ApiBrowseResponse.md)

  ↳ [`ApiGetPermissionsResponse`](api.ApiGetPermissionsResponse.md)

  ↳ [`ApiLogoutResponse`](api.ApiLogoutResponse.md)

  ↳ [`ApiGetCertificateUrlResponse`](api.ApiGetCertificateUrlResponse.md)

  ↳ [`ApiVersionResponse`](api.ApiVersionResponse.md)

  ↳ [`ApiCloseTicketsResponse`](api.ApiCloseTicketsResponse.md)

  ↳ [`ApiBrowseTicketsResponse`](api.ApiBrowseTicketsResponse.md)

  ↳ [`ApiGetQuantityStructuresResponse`](api.ApiGetQuantityStructuresResponse.md)

  ↳ [`ApiChangePasswordResponse`](api.ApiChangePasswordResponse.md)

  ↳ [`ApiGetPasswordPolicyResponse`](api.ApiGetPasswordPolicyResponse.md)

  ↳ [`ApiGetAuthenticationModeResponse`](api.ApiGetAuthenticationModeResponse.md)

  ↳ [`DataLogsDownloadAndClearResponse`](datalogs.DataLogsDownloadAndClearResponse.md)

  ↳ [`DiagnosticBufferBrowseResponse`](diagnosticbuffer.DiagnosticBufferBrowseResponse.md)

  ↳ [`FailsafeReadRuntimeGroupsResponse`](failsafe.FailsafeReadRuntimeGroupsResponse.md)

  ↳ [`FailsafeReadParametersResponse`](failsafe.FailsafeReadParametersResponse.md)

  ↳ [`FilesDownloadResponse`](files.FilesDownloadResponse.md)

  ↳ [`FilesCreateResponse`](files.FilesCreateResponse.md)

  ↳ [`FilesDeleteResponse`](files.FilesDeleteResponse.md)

  ↳ [`FilesCreateDirectoryResponse`](files.FilesCreateDirectoryResponse.md)

  ↳ [`FilesDeleteDirectoryResponse`](files.FilesDeleteDirectoryResponse.md)

  ↳ [`FilesRenameResponse`](files.FilesRenameResponse.md)

  ↳ [`FilesBrowseResponse`](files.FilesBrowseResponse.md)

  ↳ [`PlcReadOperatingModeResponse`](plc.PlcReadOperatingModeResponse.md)

  ↳ [`PlcRequestChangeOperatingModeResponse`](plc.PlcRequestChangeOperatingModeResponse.md)

  ↳ [`PlcReadSystemTimeResponse`](plc.PlcReadSystemTimeResponse.md)

  ↳ [`PlcSetSystemTimeResponse`](plc.PlcSetSystemTimeResponse.md)

  ↳ [`PlcReadTimeSettingsResponse`](plc.PlcReadTimeSettingsResponse.md)

  ↳ [`PlcSetTimeSettingsResponse`](plc.PlcSetTimeSettingsResponse.md)

  ↳ [`PlcCreateBackupResponse`](plc.PlcCreateBackupResponse.md)

  ↳ [`PlcRestoreBackupResponse`](plc.PlcRestoreBackupResponse.md)

  ↳ [`PlcProgramBrowseResponse`](plcprogram.PlcProgramBrowseResponse.md)

  ↳ [`PlcProgramDownloadProfilingDataResponse`](plcprogram.PlcProgramDownloadProfilingDataResponse.md)

  ↳ [`PlcProgramReadResponse`](plcprogram.PlcProgramReadResponse.md)

  ↳ [`PlcProgramWriteResponse`](plcprogram.PlcProgramWriteResponse.md)

  ↳ [`ProjectLanguagesResponse`](project.ProjectLanguagesResponse.md)

  ↳ [`SyslogBrowseResponse`](syslog.SyslogBrowseResponse.md)

  ↳ [`WebAppCreateResponse`](webApp.WebAppCreateResponse.md)

  ↳ [`WebAppDeleteResponse`](webApp.WebAppDeleteResponse.md)

  ↳ [`WebAppRenameResponse`](webApp.WebAppRenameResponse.md)

  ↳ [`WebAppRenameResourceResponse`](webApp.WebAppRenameResourceResponse.md)

  ↳ [`WebAppSetStateResponse`](webApp.WebAppSetStateResponse.md)

  ↳ [`WebAppSetDefaultPageResponse`](webApp.WebAppSetDefaultPageResponse.md)

  ↳ [`WebAppSetNotFoundPageResponse`](webApp.WebAppSetNotFoundPageResponse.md)

  ↳ [`WebAppSetNotAuthorizedPageResponse`](webApp.WebAppSetNotAuthorizedPageResponse.md)

  ↳ [`WebAppCreateResourceResponse`](webApp.WebAppCreateResourceResponse.md)

  ↳ [`WebAppDeleteResourceResponse`](webApp.WebAppDeleteResourceResponse.md)

  ↳ [`WebAppDownloadResourceResponse`](webApp.WebAppDownloadResourceResponse.md)

  ↳ [`WebAppSetResourceETagResponse`](webApp.WebAppSetResourceETagResponse.md)

  ↳ [`WebAppSetResourceMediaTypeResponse`](webApp.WebAppSetResourceMediaTypeResponse.md)

  ↳ [`WebAppSetResourceModificationTimeResponse`](webApp.WebAppSetResourceModificationTimeResponse.md)

  ↳ [`WebAppSetResourceVisibilityResponse`](webApp.WebAppSetResourceVisibilityResponse.md)

  ↳ [`WebAppBrowseResponse`](webApp.WebAppBrowseResponse.md)

  ↳ [`WebAppBrowseResourcesResponse`](webApp.WebAppBrowseResourcesResponse.md)

  ↳ [`WebServerSetDefaultPageResponse`](webserver.WebServerSetDefaultPageResponse.md)

  ↳ [`WebServerReadDefaultPageResponse`](webserver.WebServerReadDefaultPageResponse.md)

## Table of contents

### Constructors

- [constructor](response.JsonrpcBaseResponse.md#constructor)

### Properties

- [error](response.JsonrpcBaseResponse.md#error)
- [id](response.JsonrpcBaseResponse.md#id)
- [kind](response.JsonrpcBaseResponse.md#kind)
- [result](response.JsonrpcBaseResponse.md#result)

### Methods

- [\_\_str\_\_](response.JsonrpcBaseResponse.md#__str__)
- [is\_error](response.JsonrpcBaseResponse.md#is_error)
- [parse](response.JsonrpcBaseResponse.md#parse)

## Constructors

### constructor

• **new JsonrpcBaseResponse**(`kind?`, `id?`, `error?`, `result?`): [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind?` | `string` |
| `id?` | `number` |
| `error?` | [`JsonrpcError`](response.JsonrpcError.md) |
| `result?` | `Record`\<`string`, `any`\> |

#### Returns

[`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)

#### Defined in

response.ts:61

## Properties

### error

• `Optional` **error**: [`JsonrpcError`](response.JsonrpcError.md)

#### Defined in

response.ts:55

___

### id

• **id**: `number` = `0`

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

#### Defined in

response.ts:53

___

### result

• `Optional` **result**: `any`

#### Defined in

response.ts:56

## Methods

### \_\_str\_\_

▸ **__str__**(): `string`

#### Returns

`string`

#### Defined in

response.ts:128

___

### is\_error

▸ **is_error**(): `boolean`

#### Returns

`boolean`

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

#### Defined in

response.ts:74
