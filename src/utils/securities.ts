import * as CryptoJS from "crypto-js";

// Function to encrypt a value using AES encryption
export const encrypt = (value: any, key: any) => {
  const encrypted = CryptoJS.AES.encrypt(value, key).toString();
  return encrypted;
};

// Function to decrypt a value using AES decryption
export const decrypt = (encryptedValue: any, key: any) => {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};
