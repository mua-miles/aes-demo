require('openssl')

pass = 's3cr3tk3y'
salt = "\xce\x57\x86\xaa\xa5\x8d\xd2\xd6\xbd\x38\x18\x88\xb4\x8e\xa7\x08"
# or create it randomly and share with the other side: OpenSSL::Random.random_bytes(16)

key = OpenSSL::KDF.pbkdf2_hmac(
  pass,
  salt: salt,
  iterations: 100,
  length: 32,
  hash: 'sha1'
)

puts key.split('').map{|cc| cc.ord.to_s(16).rjust(2, '0') }.join
# f4840f6bddcdfa8c2c87652b7e095996b7300889d0fc10f556d503262564736f

# let's encrypt

iv = "\x9f\x1e\x0f\xdd\x32\xce\xbc\x2c\x2e\x38\xf3\xe1\x76\xce\xb5\x58"
# or create it randomly and share with the other side: OpenSSL::Random.random_bytes(16)

data = "welcome to my bugs"
aes = OpenSSL::Cipher::Cipher.new('AES-256-CBC')
aes.encrypt
aes.iv = iv
aes.key = key
encrypted = aes.update(data) + aes.final

# puts [cipher].pack('m')

# decrypt
decipher = OpenSSL::Cipher::Cipher.new('AES-256-CBC')
decipher.decrypt
decipher.iv = iv
decipher.key = key

decrypted = decipher.update(encrypted) + decipher.final
puts decrypted 
puts decrypted == data
