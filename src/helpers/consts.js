export const PROJECT_LANGAUGE = {
  C_SHARP : "1",
  PYTHON : "2",
  JAVASCRIPT : "3",
  C :    "4",
  CPP : "5",
  RUST : '6'
}

export const VM_TYPE = {
  NEOVM    : 1,
  WASMVM   : 3
}

export const OP_TYPE = {
  Compile : 'Compile',
  Deploy : 'Deploy',
  Invoke : 'Invoke',
  Notify : 'Notify',
  Log : 'Log',
  Error : 'Error'
}

export const DEFAULT_SCRYPT = {
  cost: 16384, // 除以2时间减半
  blockSize: 8,
  parallel: 8,
  size: 64
};

export const INCLUDE_ONT_H = '#include "ont.h"'

// export const USER_AGENT_ADDRESS = 'AWc6N2Yawk12Jt14F7sjGGos4nFc8UztVe'
export const USER_AGENT_ADDRESS = 'AbG3ZgFrMK6fqwXWR1WkQ1d1EYVunCwknu'

// export const USER_AGENT_REGISTER_API = 'http://app.ont.io/api/v1/ontpass/ontid/register'
export const USER_AGENT_REGISTER_API = 'https://app.ont.io/S1/api/v1/ontpass/ontid/register'

export const NODE_URL = '139.219.134.195'
