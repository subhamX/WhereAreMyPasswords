import CryptoJS from 'crypto-js'
import { DecryptedPayload } from './decryptWithPassphrase'


export const encryptWithPassphrase =(passphrase:string, payload: DecryptedPayload) => {
    const stringifiedPayload=JSON.stringify(payload)
    const encryptedString=CryptoJS.AES.encrypt(stringifiedPayload, passphrase).toString()
    
    return encryptedString;
}
