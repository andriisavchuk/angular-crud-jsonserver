import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptojsService {
  constructor() {}

  encryptValue(encryptKey: any, value: any) {
    let key = CryptoJS.enc.Utf8.parse(encryptKey);
    let iv = CryptoJS.enc.Utf8.parse(encryptKey);
    let encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value.toString()),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return encrypted.toString();
  }

  decryptValue(decryptKey: any, value: any) {
    let key = CryptoJS.enc.Utf8.parse(decryptKey);
    let iv = CryptoJS.enc.Utf8.parse(decryptKey);
    let decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
