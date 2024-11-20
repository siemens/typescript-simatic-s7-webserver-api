[typescript-simatic-s7-webserver-api](../README.md) / [Exports](../modules.md) / [request](../modules/request.md) / RequestConfig

# Class: RequestConfig

[request](../modules/request.md).RequestConfig

## Table of contents

### Constructors

- [constructor](request.RequestConfig.md#constructor)

### Properties

- [address](request.RequestConfig.md#address)
- [plcCertificate](request.RequestConfig.md#plccertificate)
- [protocol](request.RequestConfig.md#protocol)
- [verifyTls](request.RequestConfig.md#verifytls)

## Constructors

### constructor

• **new RequestConfig**(): [`RequestConfig`](request.RequestConfig.md)

#### Returns

[`RequestConfig`](request.RequestConfig.md)

## Properties

### address

• **address**: `string` = `''`

Base configuration for all requests

**`Attribute`**

address: Address of the PLC webserver, can be either a IPv4/ IPv6 address
  or the DNS name
   Must not contain the protocol definition, this has to be set
  via the protocol attribute

**`Attribute`**

protocol: defines the protocol (http/https) for connecting to the PLC

**`Attribute`**

verifyTls: Switch wether TLS Server Certificate should be verified against
   trusted certificates or trusted by default

**`Attribute`**

plcCertificate: Identifies the certificate from the PLC in the local system to be able to access the PLC.

#### Defined in

request.ts:26

___

### plcCertificate

• `Optional` **plcCertificate**: `Buffer`

#### Defined in

request.ts:29

___

### protocol

• **protocol**: `string` = `''`

#### Defined in

request.ts:27

___

### verifyTls

• **verifyTls**: `boolean` = `true`

#### Defined in

request.ts:28
