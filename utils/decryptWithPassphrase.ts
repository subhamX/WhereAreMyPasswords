


export const decryptWithPassphrase =(passphrase:string, payload: any) => {
    const decryptedPayload=payload; // TODO: decrypt the payload with passphrase
    const jsonString=Buffer.from(decryptedPayload, 'base64').toString()

    const deserializedPayload=JSON.parse(jsonString)

    return deserializedPayload;
}
