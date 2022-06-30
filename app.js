var CryptoJS = require("crypto-js");
var key = "s3cr3tk3y";
var text = "welcome to my bugs";

var result = CryptoJS.AES.encrypt(text, key);

console.log({ciphertext: result.ciphertext.toString(), iv: result.iv.toString(), salt: result.salt.toString(), key: result.key.toString()})

/* { ciphertext: '259a0a3aaab3b5505839dfb66457fb725abe6d93c12da70e3c31cfc892f56f32',
  iv: 'eed7886ce38208cb78146984ad45c337',
  salt: 'b8eb553554481642',
  key: 'fa99058d0fd4ce1d8a697aca1ea061df0b33c86887f2771f5a29692fbcdabc21' }*/

var result = CryptoJS.AES.encrypt(text, key);
console.log({ciphertext: result.ciphertext.toString(), iv: result.iv.toString(), salt: result.salt.toString(), key: result.key.toString()})

/*{ ciphertext: '10f1688c7ffec650dcd1b75f01ac4d34cb18f5c0decbdbcc681eae018cc5b880',
  iv: '9f1e0fdd32cebc2c2e38f3e176ceb558',
  salt: '4228f58e6783d543',
  key: 'a92f8a759d32910c6ad9be8d38d330eac7eb7ce3d3cb7d4583efbd5e9029d403' }*/

// I'll store the iv and key from the last encrypt
var iv = result.iv
var key = result.key

var result = CryptoJS.AES.encrypt(text, key, { iv: iv });

console.log({ciphertext: result.ciphertext.toString(), iv: result.iv.toString(), salt: result.salt, key: result.key.toString()})

/*{ ciphertext: '10f1688c7ffec650dcd1b75f01ac4d34cb18f5c0decbdbcc681eae018cc5b880',
  iv: '9f1e0fdd32cebc2c2e38f3e176ceb558',
  key: 'a92f8a759d32910c6ad9be8d38d330eac7eb7ce3d3cb7d4583efbd5e9029d403' }*/
// salt is no more relevant since we already has a key
// from the same result
var a = result.mode == CryptoJS.mode.CBC // true
var b = result.pad == CryptoJS.pad.PKcs7 // true
console.log("a=" + a)
console.log("b=" + b)

var pass = 's3cr3tk3y';
var salt = CryptoJS.lib.WordArray.random(128/8);

var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: 256/32,
      iterations: 100
    });

console.log(key.toString())
// 'f4840f6bddcdfa8c2c87652b7e095996b7300889d0fc10f556d503262564736f'