const Ont = require('ontology-ts-sdk')

export function formatAndValidateParameters(paramList) {
    if(!paramList) {
      return [];
    }
    //validate and format parameters
    const parameters = [];
    for(let i = 0; i<paramList.length; i++) {
      let p = new Ont.Parameter(paramList[i].name, paramList[i].type, paramList[i].value); 
      parameters.push(p);
      if(p.name && p.type !=='Boolean' && !p.value) {
        alert('Parameter '+ p.name + ' is required.')
        // this.$store.commit({
        //   type : types.SET_RUN_STATUS,
        //   running : false
        // })
        return;
      }
      if(p.type === 'ByteArray' && !Ont.utils.isHexString(p.value)) {
        alert('Parameter ' + p.name + ' is not valid hex string.')
        // this.runStatus = false;
        return;
      }
      if(p.type === 'Integer') {
        p.value = parseInt(p.value)
      }
      if(p.type === 'Boolean') {
        p.value = p.value === 'true' ? true : false;
      }
      if(p.type === 'Address') {
        p.value = new Ont.Crypto.Address(p.value).serialize();
        p.type = 'ByteArray'
      }
      if(p.type === 'Array') {
        p = formatArrayParameter(p)
        if(!p) return ;
      }
      if(p.type === 'Map') {
        p = formatMapParameter(p)
        if(!p) return ;
      }
    }
    return parameters
  }

export function formatMapParameter(param){
    let values;
    try {
        values = JSON.parse(param.value)
        if(typeof values !== 'object') {
          throw 'Invalid Object'
        }
      } catch(err) {
        alert('Parameter ' + param.name + ' is not valid JSON Object')
        // this.runStaus = false;
        return false;
    }
    const val = {}
    for(let k in values) {
      let temp = transformParamItem(values[k]);
      val[k] = temp;
    }
    param.value = val;
    return param
  }

  export function formatArrayParameter(param) {
    let values;
    try {
        values = JSON.parse(param.value)
        if(!Array.isArray(values)) {
          throw 'Invalid array'
        }
      } catch(err) {
        alert('Parameter ' + param.name + ' is not valid Array')
        // this.runStaus = false;
        return;
    }
    const list = []
    for(let p of values) {
      let temp = transformParamItem(p);
      list.push(temp);
    }
    param.value = list;
    return param
  }

  export function transformParamItem(p) {
    let temp;
    if(!p.type) {
      alert('Parameter must contain [type]');
      return;
    }
    validateArrayParamItem(p);
    if(p.type === 'Address') {
      p.value = new Ont.Crypto.Address(p.value).serialize();
      temp = new Ont.Parameter('', Ont.ParameterType.ByteArray, p.value)
    } else if (p.type === 'Array') {
      const val = p.value.map(item => transformParamItem(item))
      temp = new Ont.Parameter('', p.type, val)
    } 
    else if (p.type === 'Map') {
      const val = p.value;
       Object.keys(val).forEach(k => {val[k] = transformParamItem(val[k])});
      temp = new Ont.Parameter('', p.type, val);
    } else {
      temp = new Ont.Parameter('', p.type, p.value)
    } 
    return temp;
  }

export function validateArrayParamItem(p) {
    if(!p.type || !p.value) return;

    const paramTypes = ['ByteArray', 'String', 'Integer', 'Boolean', 'Address', 'Array', 'Map']
    if(paramTypes.indexOf(p.type) < 0 ){
      alert('Invalid parameter type ['+ p.type + '] in array')
      return;
    }
    if(p.type === 'ByteArray' && !Ont.utils.isHexString(p.value)) {
      alert('Invalid parameter value, expect ByteArray, got '+ p.value + ' in array')
      return;
    }
    if(p.type === 'Boolean' && typeof p.value !== "boolean") {
      alert('Invalid parameter value, expect Boolean, got '+ p.value + ' in array')
      return;
    }
    if(p.type === 'Address' && p.value && (p.value.length !==34 || p.value[0]!=='A' )) {
      alert('Invalid parameter value, expect Address, got '+ p.value + ' in array')
      return;
    }
    if(p.type === 'Integer' && typeof p.value !== "number") {
      alert('Invalid parameter value, expect Integer, got '+ p.value + ' in array')
      return;
    }
    if(p.type === 'String' && typeof p.value !== "string") {
      alert('Invalid parameter value, expect String, got '+ p.value + ' in array')
      return;
    }
    if(p.type === 'Array' && !Array.isArray(p.value)) {
      alert('Invalid parameter value, expect Array, got '+ p.value + ' in array')
      return;
    }
  }