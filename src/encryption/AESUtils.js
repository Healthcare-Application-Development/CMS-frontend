import CryptoJS from 'crypto-js';

var secretkey = 'uFygug0DmDD65Xbwvwpyy9ZKDtFhRBWW';
var key = CryptoJS.enc.Utf8.parse(secretkey);
var iv = CryptoJS.enc.Utf8.parse(secretkey.substring(0, 16));

function encrypt(input) {
    var cipherText = CryptoJS.AES.encrypt(input, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    return cipherText;
}

function decrypt(encrypted) {
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export default {
    encrypt,
    decrypt
}