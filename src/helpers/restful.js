import { client } from 'ontology-dapi';
export const Restful = [{
  description:'Return current block height of net',
  type:'GET',
  urlDescribe:'/api/v1/block/height',
  url:'/api/v1/block/height',
  params:[],
  response:'',
  dapi:true,
},{
  description:'Return contract state according to the contract address hash',
  type:'GET',
  urlDescribe:'/api/v1/contract/:hash',
  url:'/api/v1/contract/',
  params:[{
    name:'hash',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return the smartcode event in the block at the height',
  type:'GET',
  urlDescribe:'/api/v1/smartcode/event/transactions/:height',
  url:'/api/v1/smartcode/event/transactions/',
  params:[{
    name:'height',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return smartcode event by transaction hash',
  type:'GET',
  urlDescribe:'/api/v1/smartcode/event/txhash/:hash',
  url:'/api/v1/smartcode/event/txhash/',
  params:[{
    name:'hash',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return the stored value',
  type:'GET',
  urlDescribe:'/api/v1/storage/:hash/:key',
  url:'/api/v1/storage/',
  params:[{
    name:'hash',
    value:''
  },{
    name:'key',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return balance of the account address',
  type:'GET',
  urlDescribe:'/api/v1/balance/:addr',
  url:'/api/v1/balance/',
  params:[{
    name:'addr',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return the number of unbound ong of given address',
  type:'GET',
  urlDescribe:'/api/v1/unboundong/:addr',
  url:'/api/v1/unboundong/',
  params:[{
    name:'addr',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Get grant ong',
  type:'GET',
  urlDescribe:'/api/v1/grantong/:addr',
  url:'/api/v1/grantong/',
  params:[{
    name:'addr',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return block info of the height',
  type:'GET',
  urlDescribe:'/api/v1/block/details/height/:height?raw=0',
  url:'/api/v1/block/details/height/',
  params:[{
    name:'height',
    value:''
  },{
    name:'raw',
    value:'0'
  }],
  response:'',
  dapi:true,
},{
  description:'Return the number of node connect to the network',
  type:'GET',
  urlDescribe:'/api/v1/node/connectioncount',
  url:'/api/v1/node/connectioncount',
  params:[
  ],
  response:'',
  dapi:true,
},{
  description:'Return whole transaction hash of the block',
  type:'GET',
  urlDescribe:'/api/v1/block/transactions/height/:height',
  url:'/api/v1/block/transactions/height/',
  params:[{
    name:'height',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return block info of the block hash',
  type:'GET',
  urlDescribe:'/api/v1/block/details/hash/:hash?raw=1',
  url:'/api/v1/block/details/hash/',
  params:[{
    name:'hash',
    value:''
  },{
    name:'Raw',
    value:'1'
  }],
  response:'',
  dapi:true,
},{
  description:'Return block hash of the height',
  type:'GET',
  urlDescribe:'/api/v1/block/hash/:height',
  url:'/api/v1/block/hash/',
  params:[{
    name:'height',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return transaction info by transaction hash',
  type:'GET',
  urlDescribe:'/api/v1/transaction/:hash',
  url:'/api/v1/transaction/',
  params:[{
    name:'hash',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return the block height where transaction at',
  type:'GET',
  urlDescribe:'/api/v1/block/height/txhash/:hash',
  url:'/api/v1/block/height/txhash/',
  params:[{
    name:'hash',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return merkle proof of the transaction',
  type:'GET',
  urlDescribe:'/api/v1/merkleproof/:hash',
  url:'/api/v1/merkleproof/',
  params:[{
    name:'hash',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return gas price',
  type:'GET',
  urlDescribe:'/api/v1/gasprice',
  url:'/api/v1/gasprice',
  params:[],
  response:'',
  dapi:true,
},{
  description:'Return the allowance from transfer-from accout to transfer-to account',
  type:'GET',
  urlDescribe:'/api/v1/allowance/:asset/:from/:to',
  url:'/api/v1/allowance/',
  params:[{
    name:'asset',
    value:''
  },{
    name:'from',
    value:''
  },{
    name:'to',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return the number of transaction locate in memory',
  type:'GET',
  urlDescribe:'/api/v1/mempool/txcount',
  url:'/api/v1/mempool/txcount',
  params:[],
  response:'',
  dapi:true,
},{
  description:'Return the state of transaction locate in memory',
  type:'GET',
  urlDescribe:'/api/v1/mempool/txstate/:hash',
  url:'/api/v1/mempool/txstate/',
  params:[{
    name:'hash',
    value:''
  }],
  response:'',
  dapi:true,
},{
  description:'Return the version of ontology',
  type:'GET',
  urlDescribe:'/api/v1/version',
  url:'/api/v1/version',
  params:[],
  response:'',
  dapi:true,
  dapiNum:''
},{
  description:'Return the networkid',
  type:'GET',
  urlDescribe:'/api/v1/networkid',
  url:'/api/v1/networkid',
  params:[],
  response:'',
  dapi:true,
},{
  description:'Send transaction to ontology network',
  type:'POST',
  urlDescribe:'/api/v1/transaction?preExec=0',
  url:'/api/v1/transaction',
  params:[{
    name:'data',
    value:''
  },{
    name:'preExec',
    value:'0'
  }],
  response:'',
  dapi:false,
}]



