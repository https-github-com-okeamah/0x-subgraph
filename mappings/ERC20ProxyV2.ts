
// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import types and APIs from graph-ts
import { Entity, store, Value } from '@graphprotocol/graph-ts'

import {AuthorizedAddressAdded, AuthorizedAddressRemoved} from '../types/ERC20ProxyV2/ERC20ProxyV2'

export function handleAdded(event: AuthorizedAddressAdded): void {
  // let proxyID = event.params.target.toHex()
  // let assetProxy = store.get("ProxyUsers", proxyID)
  //
  // if (assetProxy == null){
  //   assetProxy = new Entity()
  //   assetProxy.setString('id', proxyID)
  //   assetProxy.setArray('approvedAddresses', new Array<Value>())
  // }
  //
  // // is this a good design? could be an array in the length of 1000's
  // let approved = assetProxy.getArray('approvedAddresses')
  // approved.push(Value.fromAddress((event.params.caller)))
  //
  // store.set('ProxyUsers', proxyID, assetProxy as Entity)

  let userID = event.params.caller.toHex()
  let user = store.get("User", userID)

  if (user == null) {
    user = new Entity()
    user.setString('id', userID)
    user.setArray('proxiesApproved', new Array<Value>())
  }

  //this != is supposed to prevent double from showing up in proxiesApproved
  // or maybe the event is allowed to happen twice? or maybe it got added, removed , and added . huh
  // so handleRemove should filter that out
  if (user != null) {
    let proxies = user.getArray('proxiesApproved')
    proxies.push(Value.fromAddress((event.params.target)))
  }

  store.set('User', userID, user as Entity)

}



export function handleRemoved(event: AuthorizedAddressRemoved): void {

  // how to remove ? what func do we have

  // SEE POP AND FILTER - assembly script


}