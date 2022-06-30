CryptoJS = require('crypto-js');

data = "welcome to my bugs"
pass = 's3cr3tk3y';
saltStr = "\xce\x57\x86\xaa\xa5\x8d\xd2\xd6\xbd\x38\x18\x88\xb4\x8e\xa7\x08";
ivStr = "\x9f\x1e\x0f\xdd\x32\xce\xbc\x2c\x2e\x38\xf3\xe1\x76\xce\xb5\x58"
salt = CryptoJS.enc.Latin1.parse(saltStr);
// or create it randomly and share with the other side: CryptoJS.lib.WordArray.random(16);

key = CryptoJS.PBKDF2(
  pass, salt, { keySize: 256/32, iterations: 100 }
);

// console.log(key.toString());
// f4840f6bddcdfa8c2c87652b7e095996b7300889d0fc10f556d503262564736f

iv = CryptoJS.enc.Latin1.parse(
  ivStr
);
// or create it randomly and share with the other side: CryptoJS.lib.WordArray.random(16); 

// let's encrypt

cipher = CryptoJS.AES.encrypt(
  data,
  key,
  { iv: iv }
);

console.log(cipher.toString());
// IiiNVyEJnRTLmNtefAy8VifEopl8st8z4dSztFhZRIg=
