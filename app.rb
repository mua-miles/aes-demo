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

aes = OpenSSL::Cipher::Cipher.new('AES-256-CBC')
aes.encrypt
aes.iv = iv
aes.key = key

cipher = aes.update("welcome to my bugs")
cipher << aes.final

puts [cipher].pack('m')
# IiiNVyEJnRTLmNtefAy8VifEopl8st8z4dSztFhZRIg=

# You can share:
puts [(salt.bytes+iv.bytes+cipher.bytes).pack('c*')].pack('m')
# zleGqqWN0ta9OBiItI6nCJ8eD90yzrwsLjjz4XbOtVgiKI1XIQmdFMuY2158\nDLxWJ8SimXyy3zPh1LO0WFlEiA==

#  and revert:
received = "zleGqqWN0ta9OBiItI6nCJ8eD90yzrwsLjjz4XbOtVgiKI1XIQmdFMuY2158\nDLxWJ8SimXyy3zPh1LO0WFlEiA==".unpack('m*')[0]

salt = received[0..16-1]
iv = received[16..32-1]
cipher = received[32..0-1]

# puts "salt=#{salt}"
# puts "iv=#{iv}"
# puts "cipher=#{cipher}"