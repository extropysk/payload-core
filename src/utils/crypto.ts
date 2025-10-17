import CryptoJS from 'crypto-js'

export const encrypt = (text: string, aesKey: string): string => {
  return CryptoJS.AES.encrypt(text, aesKey).toString()
}

export const decrypt = (hash: string, aesKey: string): string => {
  return CryptoJS.AES.decrypt(hash, aesKey).toString(CryptoJS.enc.Utf8)
}
