


export const encryptWithPassphrase =(passphrase:string, payload: any) => {
    const stringifiedPayload=JSON.stringify(payload)
    const base64=Buffer.from(stringifiedPayload).toString('base64')
    const encryptedString=base64; // TODO: encrypt the base64 string with passphrase
    return encryptedString;
}
