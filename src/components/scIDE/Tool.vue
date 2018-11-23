<template>
  <div class="tool-page tool-card-scroll-y">

    <div class="tool-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="tool-card-scroll-x">
          <div class="card-body tool-cart-body tool-card-text-nowrap" >
            <p class="card-text-title">String</p>
            <p class="tool-card-text">e.g : 7472616e73666572 - transfer&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Hex String : </a>
              <input v-model="originalHexString"/>
              <a>——> String : </a>
              <a>{{newString}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a >String : </a>
              <input v-model="originalString"/>
              <a>——> Hex String : </a>
              <a>{{newHexString}}&nbsp;&nbsp;</a>
            </div>

            <button class="btn btn-outline-success tool-btn-submit" @click="StringAndHexString">
              {{$t('tool.transform')}}
            </button>
            <button class="btn btn-outline-success tool-btn-submit" @click="ClearStringAndHexString">
              {{$t('tool.clear')}}
            </button>

          </div>
        </div>
      </div>
    </div>

    <div class="tool-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="tool-card-scroll-x">
          <div class="card-body tool-cart-body tool-card-text-nowrap" >
            <p class="card-text-title">Address (little endian)</p>
            <p class="tool-card-text ">e.g : d336d7eb9975a29b2404fdb28185e277a4b299bc - Ab2fvZdmnM4HwDgVbdBrbTLz1wK5TcEyhU&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Script Hash : </a>
              <input v-model="originalScriptHash"/>
              <a>——> Address : </a>
              <a>{{newAddress}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a >Address: </a>
              <input v-model="originalAddress"/>
              <a>——> Script Hash : </a>
              <a>{{newScriptHash}}&nbsp;&nbsp;</a>
            </div>

            <button class="btn btn-outline-success tool-btn-submit" @click="AddressAndScriptHash">
              {{$t('tool.transform')}}
            </button>
            <button class="btn btn-outline-success tool-btn-submit" @click="ClearAddressAndScriptHash">
              {{$t('tool.clear')}}
            </button>

          </div>
        </div>
      </div>
    </div>

    <div class="tool-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="tool-card-scroll-x">
          <div class="card-body tool-cart-body tool-card-text-nowrap" >
            <p class="card-text-title">Number</p>
            <p class="tool-card-text">e.g : 05f5e100 - 100000000&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Hex Number : </a>
              <input v-model="originalHexNumber"/>
              <a>——> Number : </a>
              <a>{{newNumber}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a >Number : </a>
              <input v-model="originalNumber"/>
              <a>——> Hex Number : </a>
              <a>{{newHexNumber}}&nbsp;&nbsp;</a>
            </div>

            <button class="btn btn-outline-success tool-btn-submit" @click="NumberAndHexNumber">
              {{$t('tool.transform')}}
            </button>
            <button class="btn btn-outline-success tool-btn-submit" @click="ClearNumberAndHexNumber">
              {{$t('tool.clear')}}
            </button>

            <p class="card-text-title" style="margin-top: 16px">Hex Number <--> Reverse Number</p>
            <p class="tool-card-text">e.g : 00e1f505 - 100000000&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Hex Number : </a>
              <input v-model="originalHexNumber_2"/>
              <a>——> Number : </a>
              <a>{{newNumber_2}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a >Number : </a>
              <input v-model="originalNumber_2"/>
              <a>——> Hex Number : </a>
              <a>{{newHexNumber_2}}&nbsp;&nbsp;</a>
            </div>

            <button class="btn btn-outline-success tool-btn-submit" @click="NumberAndHexNumber_2">
              {{$t('tool.transform')}}
            </button>
            <button class="btn btn-outline-success tool-btn-submit" @click="ClearNumberAndHexNumber_2">
              {{$t('tool.clear')}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="tool-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="tool-card-scroll-x">
          <div class="card-body tool-cart-body tool-card-text-nowrap" >
            <p class="card-text-title">Hex String (Big-endian/Little-endian)</p>
            <p class="tool-card-text">e.g : bc99b2a477e28581b2fd04249ba27599ebd736d3 - d336d7eb9975a29b2404fdb28185e277a4b299bc&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Hex String(big/little) : </a>
              <input v-model="originalScriptH"/>
              <a>——> Hex String(little/big) : </a>
              <a>{{newScriptH}}&nbsp;&nbsp;</a>
            </div>

            <button class="btn btn-outline-success tool-btn-submit" @click="bigEndianAndLittleEndian">
              {{$t('tool.transform')}}
            </button>
            <button class="btn btn-outline-success tool-btn-submit" @click="clearBigEndianAndLittleEndian">
              {{$t('tool.clear')}}
            </button>

          </div>
        </div>
      </div>
    </div>

    <div class="tool-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="tool-card-scroll-x">
          <div class="card-body tool-cart-body tool-card-text-nowrap" >
            <p class="card-text-title">String <--> Byte Array</p>
            <p class="tool-card-text">e.g : 7472616e73666572 - {0x74,0x72,0x61,0x6e,0x73,0x66,0x65,0x72}&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Hex String : </a>
              <input v-model="originalHexString_2"/>
              <a>——> Byte array : </a>
              <a>{{newByteArray}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a>Byte array : </a>
              <input v-model="originalByteArray"/>
              <a>——> Hex String : </a>
              <a>{{newHexString_2}}&nbsp;&nbsp;</a>
            </div>
            <button class="btn btn-outline-success tool-btn-submit" @click="HexStringToByteArray">
              {{$t('tool.transform')}}
            </button>
            <button class="btn btn-outline-success tool-btn-submit" @click="clearHexStringToByteArray">
              {{$t('tool.clear')}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="tool-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="tool-card-scroll-x">
          <div class="card-body tool-cart-body tool-card-text-nowrap" >
            <p class="card-text-title">Private Key <--> WIF</p>
            <p class="tool-card-text">e.g : 06572e9a167b23dc230ca1cd522339006f05f2866ddf9650c4f0d813c8f40d2d - KwS33fWUWPAPqJTbM3CdbrGGQ7pu1MweKy79VmtcV5bMtEUVxhbS&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Private Key : </a>
              <input v-model="originalPrivateKey"/>
              <a>——> WIF : </a>
              <a>{{newWIF}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a >WIF : </a>
              <input v-model="originalWIF"/>
              <a>——> Private Key : </a>
              <a>{{newPrivateKey}}&nbsp;&nbsp;</a>
            </div>

            <button class="btn btn-outline-success tool-btn-submit" @click="PrivateKeyAndWIF">
              {{$t('tool.transform')}}
            </button>
            <button class="btn btn-outline-success tool-btn-submit" @click="clearPrivateKeyAndWIF">
              {{$t('tool.clear')}}
            </button>

          </div>
        </div>
      </div>
    </div>

    <div class="tool-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="tool-card-scroll-x">
          <div class="card-body tool-cart-body tool-card-text-nowrap" >
            <p class="card-text-title">Decrypt Private Key</p>
            <div class="tool-card-text">
              <a>Encrypted Private Key : </a>
              <input v-model="encryptedPrivateKey"/>
            </div>
            <div class="tool-card-text">
              <a>Address : </a>
              <input v-model="address"/>
            </div>
            <div class="tool-card-text">
              <a>Salt : </a>
              <input v-model="salt"/>
            </div>
            <div class="tool-card-text">
              <a>N : </a>
              <input v-model="decryptN"/>
            </div>
            <div class="tool-card-text">
              <a>Password : </a>
              <input v-model="password"/>
            </div>
            <div class="tool-card-text">
              <a>——> Private Key : </a>
              <a>{{privateKey}}&nbsp;&nbsp;</a>
            </div>

            <button class="btn btn-outline-success tool-btn-submit" @click="DecryptPrivateKey">
              {{$t('tool.transform')}}
            </button>
            <button class="btn btn-outline-success tool-btn-submit" @click="clearDecryptPrivateKey">
              {{$t('tool.clear')}}
            </button>

          </div>
        </div>
      </div>
    </div>
    <div class="tool-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="tool-card-scroll-x">
          <div class="card-body tool-cart-body tool-card-text-nowrap" >
            <p class="card-text-title">Generate a random private key</p>

            <div class="tool-card-text">
              <a>——> Private Key : </a>
              <a>{{newPrivateKey_2}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a>——> Wif : </a>
              <a>{{newWif}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a>——> Address : </a>
              <a>{{newAddress_2}}&nbsp;&nbsp;</a>
            </div>

            <button class="btn btn-outline-success tool-btn-submit" @click="GeneratePrivateKey">
              {{$t('tool.transform')}}
            </button>
            <button class="btn btn-outline-success tool-btn-submit" @click="clearGeneratePrivateKey">
              {{$t('tool.clear')}}
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let Ont = require('ontology-ts-sdk');

  export default {
    name: "tool",
    data() {
      return {
        originalHexString:'',
        newString:'',
        originalString:'',
        newHexString:'',
        originalScriptHash:'',
        newAddress:'',
        originalAddress:'',
        newScriptHash:'',
        originalHexNumber:'',
        newNumber:'',
        originalNumber:'',
        newHexNumber:'',
        originalScriptH:'',
        newScriptH:'',
        originalHexNumber_2:'',
        newNumber_2:'',
        originalNumber_2:'',
        newHexNumber_2:'',
        originalHexString_2:'',
        newByteArray:'',
        originalByteArray:'',
        newHexString_2:'',
        originalPrivateKey:'',
        newWIF:'',
        originalWIF:'',
        newPrivateKey:'',
        encryptedPrivateKey:'',
        address:'',
        salt:'',
        decryptN:4096,
        password:'',
        privateKey:'',
        newPrivateKey_2:'',
        newHexStirng_3:'',
        newWif:'',
        newAddress_2:''
      }
    },
    methods: {
      StringAndHexString(){
        let util = Ont.utils
        this.newString = util.hexstr2str(this.originalHexString)
        this.newHexString = util.str2hexstr(this.originalString)
      },
      ClearStringAndHexString(){
        this.newString = ''
        this.originalHexString =''
        this.newHexString = ''
        this.originalString =''
      },
      AddressAndScriptHash(){
        let Crypto = Ont.Crypto
        let util = Ont.utils

        try{
          this.newAddress = Crypto.Address.deserialize(new util.StringReader(this.originalScriptHash)).toBase58()
        }catch (e) {
          console.log(e)
          this.newAddress = ''
        }

        try{
          let Address = new Crypto.Address(this.originalAddress)
          console.log(Address)
          this.newScriptHash = Address.serialize()
        }catch (e) {
          this.newScriptHash = ''
        }
      },
      ClearAddressAndScriptHash(){
        this.newAddress = ''
        this.originalScriptHash = ''
        this.newScriptHash = ''
        this.originalAddress = ''
      },
      NumberAndHexNumber(){
        let BigNumber = require('bignumber.js');
        if(this.originalHexNumber !== ''){
          let HexNumber = new BigNumber(this.originalHexNumber,16)
          this.newNumber = HexNumber.toString(10)
        }else{
          this.newNumber = ''
        }

        if(this.originalNumber !== ''){
          let Number = new BigNumber(this.originalNumber)
          this.newHexNumber = Number.toString(16)
        }else{
          this.newHexNumber = ''
        }

      },
      ClearNumberAndHexNumber(){
        this.newNumber = ''
        this.originalHexNumber = ''
        this.newHexNumber = ''
        this.originalNumber = ''
      },
      NumberAndHexNumber_2(){
        let BigNumber = require('bignumber.js');
        let util = Ont.utils
        if(this.originalHexNumber_2 !== ''){
          let num = util.reverseHex(this.originalHexNumber_2)
          let HexNumber = new BigNumber(num,16)
          this.newNumber_2 = HexNumber.toString(10)
        }else{
          this.newNumber = ''
        }
        if(this.originalNumber_2 !== ''){
          let Number = new BigNumber(this.originalNumber_2)
          let newHexNumber_2 = Number.toString(16)
          if(newHexNumber_2.length%2 === 1){
            newHexNumber_2 = '0'+newHexNumber_2
          }
          this.newHexNumber_2 = util.reverseHex(newHexNumber_2)
        }else{
          this.newHexNumber_2 = ''
        }

      },
      ClearNumberAndHexNumber_2(){
        this.newNumber_2 = ''
        this.originalHexNumber_2 = ''
        this.newHexNumber_2 = ''
        this.originalNumber_2 = ''
      },
      bigEndianAndLittleEndian(){
        let util = Ont.utils
        this.newScriptH = util.reverseHex(this.originalScriptH)
      },
      clearBigEndianAndLittleEndian(){
        this.newScriptH = ''
        this.originalScriptH = ''
      },
      HexStringToByteArray(){
        let byteArray= '{'
        if(this.originalHexString_2.length !== 0){
          for(let i =0;i<this.originalHexString_2.length;i= i+2){
            byteArray = byteArray+'0x'+this.originalHexString_2.substring(i,i+2)+','
          }
          this.newByteArray = byteArray.substring(0,byteArray.length-1)+'}'
        }
        this.newHexString_2 = this.originalByteArray.replace(/0x|\{|\}|\,|\ /g,'')
      },
      clearHexStringToByteArray(){
        this.newByteArray =''
        this.originalHexString_2 = ''
        this.originalByteArray = ''
        this.newHexString_2 = ''
      },
      PrivateKeyAndWIF(){
        let Crypto = Ont.Crypto
        if(this.originalPrivateKey.length === 64){
          try{
            console.log(this.originalPrivateKey.length)
            this.newWIF = new Crypto.PrivateKey(this.originalPrivateKey).serializeWIF()
          }catch (e) {
            console.log(e)
            this.newWIF = ''
          }
        }else{
          this.newWIF = ''
        }

        if(this.originalWIF !==''){
          try{
            this.newPrivateKey = Crypto.PrivateKey.deserializeWIF(this.originalWIF).key
          }catch (e) {
            console.log(e)
            this.newPrivateKey = ''
          }
        }else{
          this.newPrivateKey = ''
        }
      },
      clearPrivateKeyAndWIF(){
        this.newWIF = ''
        this.originalPrivateKey =''
        this.newPrivateKey = ''
        this.originalWIF =''
      },
      DecryptPrivateKey() {
        let Crypto = Ont.Crypto
        try{
          let address = new Ont.Crypto.Address(this.address);
          let DEFAULT_SCRYPT = {
            cost: this.decryptN,
            blockSize: 8,
            parallel: 8,
            size: 64
          };
          this.privateKey = new Crypto.PrivateKey(this.encryptedPrivateKey).decrypt(this.password, address, this.salt,DEFAULT_SCRYPT).key
        }catch (e) {
          console.log(e)
          this.privateKey = ''
        }
      },
      clearDecryptPrivateKey(){
        this.address = ''
        this.encryptedPrivateKey =''
        this.decryptN =''
        this.privateKey = ''
        this.password =''
        this.salt =''
      },
      GeneratePrivateKey(){
        let Crypto = Ont.Crypto
        let util = Ont.utils

        const privatekey = Crypto.PrivateKey.random();
        this.newPrivateKey_2 = privatekey.key

        this.newHexStirng_3 = util.str2hexstr(this.newPrivateKey_2)

        this.newWif = privatekey.serializeWIF()

        const publicKey = privatekey.getPublicKey();
        let addr = Crypto.Address.fromPubKey(publicKey).value
        this.newAddress_2 = Crypto.Address.deserialize(new util.StringReader(addr)).toBase58()
      },
      clearGeneratePrivateKey(){
        this.newPrivateKey_2 = ''
        this.newHexStirng_3 = ''
        this.newWif = ''
        this.newAddress_2 = ''
      }
    }
  }
</script>

<style scoped>
  .tool-page{
    margin-left: 5px ;
    margin-right: 5px;
    height: 100%;
  }
  .tool-card{
    margin-top: 5px;
  }
  .card{
    max-width: 100% !important;
    height: 100% !important;
    border-radius:0px;
    margin-bottom: 0px !important;
  }
  .card-header{
    background-color: white;
    text-align: center;
    color: #36a3bc;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }
  .tool-card-text{
    margin-bottom: 8px;
  }
  .card-text-title{
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
  }
  .border-secondary{
    border-color: #C4C3C3 !important;
  }
  .tool-card-scroll-x{
    overflow-x:auto;
  }
  .tool-card-scroll-y{
    overflow-y:auto;
  }
  .tool-card-text-weight{
    font-weight: bold;
  }
  .tool-cart-body{
    padding: 15px 20px 15px 20px;
  }
  .tool-btn-submit {
    border-radius: 0;
    width: 100px;
    color: white;
    border-color: #36a3bc;
    background-color: #36a3bc;
    font-size: 10px;
    padding: 4px 9px;
  }
  .tool-btn-submit:hover,
  .tool-btn-submit:active {
    background-color: #36a3bc;
    color: white;
  }
  .tool-card-text-nowrap{
    white-space:nowrap;
  }

</style>
