# DotNames-Js : A Javascript Library To Resolve Domains On All Blockchains

## Overview of the SDK

### Installation

Install @dotnames/domain-checker

```
npm i @dotnames/domain-checker

```

### Getting Started

Setup with default RPC (May increase latency) :

```
  const dotnames = new DomainChecker();
```

Setup with custom RPC :

```
  const dotnames = new DomainChecker(
  param:{ ethRPC: '',
  polygonRPC: '',
  bnbRPC: '',
  suiRPC: '',
  seiRPC: '',
  osmosisRPC: ''
  });

```

Can be initalized with required selected RPC configuration

### Supported Naming Service Types

```
import {SupportedNs} from '@dotnames/domain-checker'

```

#### Supported Naming Services :   
ENS,
UnstoppableDomains
Space Id,
SuiNs,
DotSeiNS


### Usage :


### Check If A Domain Is Available To Register

ENS : 
```
const ensAvailable = await dotnames.getAvailable('alice.eth');
```
Unstoppable Domains : 
```
const udAvailable = await dotnames.getAvailable('alice.crypto');
```
Dotsei Domains: 
```
const seiAvailable = await dotnames.getAvailable('alice.sei');
```
Space Id : 
```
const sidAvailable = await dotnames.getAvailable('alice.bnb');

```