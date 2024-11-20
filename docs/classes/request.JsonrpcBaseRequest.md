[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [request](../modules/request.md) / JsonrpcBaseRequest

# Class: JsonrpcBaseRequest

[request](../modules/request.md).JsonrpcBaseRequest

## Hierarchy

- **`JsonrpcBaseRequest`**

  ↳ [`AlarmsBrowse`](alarms.AlarmsBrowse.md)

  ↳ [`AlarmsAcknowledge`](alarms.AlarmsAcknowledge.md)

  ↳ [`ApiLogin`](api.ApiLogin.md)

  ↳ [`ApiPing`](api.ApiPing.md)

  ↳ [`ApiBrowse`](api.ApiBrowse.md)

  ↳ [`ApiGetPermissions`](api.ApiGetPermissions.md)

  ↳ [`ApiLogout`](api.ApiLogout.md)

  ↳ [`ApiGetCertificateUrl`](api.ApiGetCertificateUrl.md)

  ↳ [`ApiVersion`](api.ApiVersion.md)

  ↳ [`ApiCloseTickets`](api.ApiCloseTickets.md)

  ↳ [`ApiBrowseTickets`](api.ApiBrowseTickets.md)

  ↳ [`ApiGetQuantityStructures`](api.ApiGetQuantityStructures.md)

  ↳ [`ApiChangePassword`](api.ApiChangePassword.md)

  ↳ [`ApiGetPasswordPolicy`](api.ApiGetPasswordPolicy.md)

  ↳ [`ApiGetAuthenticationMode`](api.ApiGetAuthenticationMode.md)

  ↳ [`DataLogsDownloadAndClear`](datalogs.DataLogsDownloadAndClear.md)

  ↳ [`DiagnosticBufferBrowse`](diagnosticbuffer.DiagnosticBufferBrowse.md)

  ↳ [`FailsafeReadRuntimeGroups`](failsafe.FailsafeReadRuntimeGroups.md)

  ↳ [`FailsafeReadParameters`](failsafe.FailsafeReadParameters.md)

  ↳ [`FilesDownload`](files.FilesDownload.md)

  ↳ [`FilesCreate`](files.FilesCreate.md)

  ↳ [`FilesDelete`](files.FilesDelete.md)

  ↳ [`FilesCreateDirectory`](files.FilesCreateDirectory.md)

  ↳ [`FilesDeleteDirectory`](files.FilesDeleteDirectory.md)

  ↳ [`FilesRename`](files.FilesRename.md)

  ↳ [`FilesBrowse`](files.FilesBrowse.md)

  ↳ [`PlcReadOperatingMode`](plc.PlcReadOperatingMode.md)

  ↳ [`PlcRequestChangeOperatingMode`](plc.PlcRequestChangeOperatingMode.md)

  ↳ [`PlcReadSystemTime`](plc.PlcReadSystemTime.md)

  ↳ [`PlcSetSystemTime`](plc.PlcSetSystemTime.md)

  ↳ [`PlcReadTimeSettings`](plc.PlcReadTimeSettings.md)

  ↳ [`PlcSetTimeSettings`](plc.PlcSetTimeSettings.md)

  ↳ [`PlcCreateBackup`](plc.PlcCreateBackup.md)

  ↳ [`PlcRestoreBackup`](plc.PlcRestoreBackup.md)

  ↳ [`PlcProgramBrowse`](plcprogram.PlcProgramBrowse.md)

  ↳ [`PlcProgramDownloadProfilingData`](plcprogram.PlcProgramDownloadProfilingData.md)

  ↳ [`PlcProgramRead`](plcprogram.PlcProgramRead.md)

  ↳ [`PlcProgramWrite`](plcprogram.PlcProgramWrite.md)

  ↳ [`ProjectLanguages`](project.ProjectLanguages.md)

  ↳ [`SyslogBrowse`](syslog.SyslogBrowse.md)

  ↳ [`TicketDownloadData`](ticket.TicketDownloadData.md)

  ↳ [`WebAppCreate`](webApp.WebAppCreate.md)

  ↳ [`WebAppDelete`](webApp.WebAppDelete.md)

  ↳ [`WebAppRename`](webApp.WebAppRename.md)

  ↳ [`WebAppRenameResource`](webApp.WebAppRenameResource.md)

  ↳ [`WebAppSetState`](webApp.WebAppSetState.md)

  ↳ [`WebAppSetDefaultPage`](webApp.WebAppSetDefaultPage.md)

  ↳ [`WebAppSetNotFoundPage`](webApp.WebAppSetNotFoundPage.md)

  ↳ [`WebAppSetNotAuthorizedPage`](webApp.WebAppSetNotAuthorizedPage.md)

  ↳ [`WebAppCreateResource`](webApp.WebAppCreateResource.md)

  ↳ [`WebAppDeleteResource`](webApp.WebAppDeleteResource.md)

  ↳ [`WebAppDownloadResource`](webApp.WebAppDownloadResource.md)

  ↳ [`WebAppSetResourceETag`](webApp.WebAppSetResourceETag.md)

  ↳ [`WebAppSetResourceMediaType`](webApp.WebAppSetResourceMediaType.md)

  ↳ [`WebAppSetResourceModificationTime`](webApp.WebAppSetResourceModificationTime.md)

  ↳ [`WebAppSetResourceVisibility`](webApp.WebAppSetResourceVisibility.md)

  ↳ [`WebAppBrowse`](webApp.WebAppBrowse.md)

  ↳ [`WebAppBrowseResources`](webApp.WebAppBrowseResources.md)

  ↳ [`WebServerSetDefaultPage`](webserver.WebServerSetDefaultPage.md)

  ↳ [`WebServerReadDefaultPage`](webserver.WebServerReadDefaultPage.md)

## Table of contents

### Constructors

- [constructor](request.JsonrpcBaseRequest.md#constructor)

### Properties

- [address](request.JsonrpcBaseRequest.md#address)
- [method](request.JsonrpcBaseRequest.md#method)
- [params](request.JsonrpcBaseRequest.md#params)
- [plcCertificate](request.JsonrpcBaseRequest.md#plccertificate)
- [protocol](request.JsonrpcBaseRequest.md#protocol)
- [reqID](request.JsonrpcBaseRequest.md#reqid)
- [response](request.JsonrpcBaseRequest.md#response)
- [token](request.JsonrpcBaseRequest.md#token)
- [verifyTls](request.JsonrpcBaseRequest.md#verifytls)

### Methods

- [\_\_str\_\_](request.JsonrpcBaseRequest.md#__str__)
- [body](request.JsonrpcBaseRequest.md#body)
- [execute](request.JsonrpcBaseRequest.md#execute)
- [format\_response](request.JsonrpcBaseRequest.md#format_response)
- [gethttpsAgent](request.JsonrpcBaseRequest.md#gethttpsagent)
- [headers](request.JsonrpcBaseRequest.md#headers)
- [parse](request.JsonrpcBaseRequest.md#parse)
- [request](request.JsonrpcBaseRequest.md#request)
- [url](request.JsonrpcBaseRequest.md#url)

## Constructors

### constructor

• **new JsonrpcBaseRequest**(`address`, `protocol`, `verifyTls`, `method?`, `params?`, `token?`, `reqID?`, `response?`, `plcCertificate?`): [`JsonrpcBaseRequest`](request.JsonrpcBaseRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `protocol` | `string` |
| `verifyTls` | `boolean` |
| `method?` | `string` |
| `params?` | `Record`\<`string`, `any`\> |
| `token?` | `string` |
| `reqID?` | `number` |
| `response?` | `AxiosResponse`\<`any`, `any`\> |
| `plcCertificate?` | `Buffer` |

#### Returns

[`JsonrpcBaseRequest`](request.JsonrpcBaseRequest.md)

#### Defined in

request.ts:72

## Properties

### address

• **address**: `string` = `''`

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

#### Defined in

request.ts:61

___

### params

• `Optional` **params**: `Record`\<`string`, `any`\>

#### Defined in

request.ts:62

___

### plcCertificate

• `Optional` **plcCertificate**: `Buffer`

#### Defined in

request.ts:68

___

### protocol

• **protocol**: `string` = `''`

#### Defined in

request.ts:64

___

### reqID

• `Private` `Optional` **reqID**: `number`

#### Defined in

request.ts:69

___

### response

• `Optional` **response**: `AxiosResponse`\<`any`, `any`\>

#### Defined in

request.ts:67

___

### token

• `Optional` **token**: `string`

#### Defined in

request.ts:65

___

### verifyTls

• **verifyTls**: `boolean` = `true`

#### Defined in

request.ts:66

## Methods

### \_\_str\_\_

▸ **__str__**(): `string`

#### Returns

`string`

#### Defined in

request.ts:140

___

### body

▸ **body**(): `undefined` \| ``null`` \| \{ `id`: `number` ; `jsonrpc`: `string` ; `method?`: `string` ; `params?`: `Record`\<`string`, `any`\>  }

#### Returns

`undefined` \| ``null`` \| \{ `id`: `number` ; `jsonrpc`: `string` ; `method?`: `string` ; `params?`: `Record`\<`string`, `any`\>  }

#### Defined in

request.ts:107

___

### execute

▸ **execute**(): `Promise`\<``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)\>

#### Returns

`Promise`\<``null`` \| [`JsonrpcBaseResponse`](response.JsonrpcBaseResponse.md)\>

#### Defined in

request.ts:162

___

### format\_response

▸ **format_response**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

request.ts:195

___

### gethttpsAgent

▸ **gethttpsAgent**(): `undefined` \| `Agent`

#### Returns

`undefined` \| `Agent`

#### Defined in

request.ts:95

___

### headers

▸ **headers**(): \{ `Content-type`: `string` = "application/json"; `X-Auth-Token`: `string`  } \| \{ `Content-type`: `string` = "application/json"; `X-Auth-Token?`: `undefined`  }

#### Returns

\{ `Content-type`: `string` = "application/json"; `X-Auth-Token`: `string`  } \| \{ `Content-type`: `string` = "application/json"; `X-Auth-Token?`: `undefined`  }

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

#### Defined in

request.ts:206

___

### request

▸ **request**(): `Promise`\<`AxiosResponse`\<`any`, `any`\>\>

#### Returns

`Promise`\<`AxiosResponse`\<`any`, `any`\>\>

#### Defined in

request.ts:145

___

### url

▸ **url**(): `string`

#### Returns

`string`

#### Defined in

request.ts:133
