import CryptoJS from 'crypto-js'
import { PasswordInstance, SecureNoteInstance } from '../components/AllPasswords';

export type DecryptedPayload = {
    passwords: PasswordInstance[],
    secureNotes: SecureNoteInstance[]
}
export const decryptWithPassphrase =(passphrase:string, payload: any): DecryptedPayload => {
    const decryptedPayload=CryptoJS.AES.decrypt(payload, passphrase).toString(CryptoJS.enc.Utf8);
    const deserializedPayload=JSON.parse(decryptedPayload)

    return deserializedPayload;
}
