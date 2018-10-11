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
              <a>————> String : </a>
              <a>{{newString}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a >String : </a>
              <input v-model="originalString"/>
              <a>————> Hex String : </a>
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
              <a>————> Address : </a>
              <a>{{newAddress}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a >Address: </a>
              <input v-model="originalAddress"/>
              <a>————> Script Hash : </a>
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
            <p class="tool-card-text">e.g : 5f5e100 - 100000000&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Hex Number : </a>
              <input v-model="originalHexNumber"/>
              <a>————> Number : </a>
              <a>{{newNumber}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a >Number : </a>
              <input v-model="originalNumber"/>
              <a>————> Hex Number : </a>
              <a>{{newHexNumber}}&nbsp;&nbsp;</a>
            </div>

            <button class="btn btn-outline-success tool-btn-submit" @click="NumberAndHexNumber">
              {{$t('tool.transform')}}
            </button>
            <button class="btn btn-outline-success tool-btn-submit" @click="ClearNumberAndHexNumber">
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
            <br class="tool-card-text">e.g : bc99b2a477e28581b2fd04249ba27599ebd736d3 - d336d7eb9975a29b2404fdb28185e277a4b299bc&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Hex String(big/little) : </a>
              <input v-model="originalScriptH"/>
              <a>————> Hex String(little/big) : </a>
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
            <p class="card-text-title">String to Array</p>
            <br class="tool-card-text">e.g : 7472616e73666572 - {0x74,0x72,0x61,0x6e,0x73,0x66,0x65,0x72}&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Hex String : </a>
              <input v-model="originalHexString_2"/>
              <a>————> Byte array : </a>
              <a>{{newByteArray}}&nbsp;&nbsp;</a>
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
            <p class="card-text-title">Private Key And WIF</p>
            <p class="tool-card-text">e.g : 06572e9a167b23dc230ca1cd522339006f05f2866ddf9650c4f0d813c8f40d2d - KwS33fWUWPAPqJTbM3CdbrGGQ7pu1MweKy79VmtcV5bMtEUVxhbS&nbsp;&nbsp;</p>
            <div class="tool-card-text">
              <a>Private Key : </a>
              <input v-model="originalPrivateKey"/>
              <a>————> WIF : </a>
              <a>{{newWIF}}&nbsp;&nbsp;</a>
            </div>
            <div class="tool-card-text">
              <a >WIF : </a>
              <input v-model="originalWIF"/>
              <a>————> Private Key : </a>
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
              <a>Private Key ————> </a>
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
        originalHexString_2:'',
        newByteArray:'',
        originalPrivateKey:'',
        newWIF:'',
        originalWIF:'',
        newPrivateKey:'',
        encryptedPrivateKey:'',
        address:'',
        salt:'',
        decryptN:4096,
        password:'',
        privateKey:''
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
        for(let i =0;i<this.originalHexString_2.length;i= i+2){
            byteArray = byteArray+'0x'+this.originalHexString_2.substring(i,i+2)+','
        }
        this.newByteArray = byteArray.substring(0,byteArray.length-1)+'}'
      },
      clearHexStringToByteArray(){
        this.newByteArray =''
        this.originalHexString_2 = ''
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
