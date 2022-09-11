import { toast } from "react-toastify";
import { PasswordInstance, SecureNoteInstance } from "../components/AllPasswords";
import { encryptWithPassphrase } from "./encryptWithPassphrase";

export async function shareCredential(passphrase: string, passwords: PasswordInstance[], secureNotes: SecureNoteInstance[], toUser: string) {
    const encryptedPayload = encryptWithPassphrase(passphrase, { passwords, secureNotes });

    try{
        const response=await fetch('/api/shareCredential', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                encryptedPayload,
                toUser
            })
        })
        const json=await response.json()

        if(!json.ok){
            throw new Error(json.message)
        }

        toast.success('Credential shared successfully! 🎉🚀')
    }catch(err:any){
        toast.error(err.message)
    }
}
