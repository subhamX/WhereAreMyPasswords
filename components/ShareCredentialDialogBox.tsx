import { Dialog } from "@headlessui/react"
import { ShieldExclamationIcon } from "@heroicons/react/24/outline"
import { Dispatch, useState } from "react"
import { toast } from "react-toastify"
import { EXPORT_VAULT_FILENAME } from "../config/keys"
import { useOfflineCacheService } from "../Hooks/useOfflineCacheService"
import { decryptWithPassphrase } from "../utils/decryptWithPassphrase"
import { encryptWithPassphrase } from "../utils/encryptWithPassphrase"
import { saveFileFromString } from "../utils/saveFileFromString"
import { shareCredential } from "../utils/shareCredential"
import { PasswordInstance, SecureNoteInstance } from "./AllPasswords"



export const ShareCredentialDialogBox = ({
    isOpen,
    setIsOpen,
    secureNotes,
    passwords,
}: {
    isOpen: boolean,
    setIsOpen: Dispatch<boolean>,
    secureNotes: SecureNoteInstance[],
    passwords: PasswordInstance[],
}) => {
    const [passphrase, setPassphrase] = useState('')
    const [email, setEmail] = useState<string>('')

    const handleCredentialsShare = async () => {
        await shareCredential(passphrase, passwords, secureNotes, email)
        setIsOpen(false)
    }


    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className='fixed inset-0 flex items-center justify-center p-4'>

                <Dialog.Panel className='w-full max-w-lg bg-gray-50 px-6 py-10'>
                    <Dialog.Title className='text-2xl mb-5 font-extrabold'>Share Credentials!</Dialog.Title>
                    <Dialog.Description as="div">

                        <div className="alert text-xs font-medium alert-info flex-row"><ShieldExclamationIcon className="w-8" />
                            Please enter any passphrase, and please share it to the user! It should ideally be something different than your current main passphrase!
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(), handleCredentialsShare() }}>

                            <label>
                                <div className="label text-sm font-bold">
                                    Enter the user email you want to share this data with:
                                </div>
                                <input
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email' placeholder='hello@mail.com'
                                    className="input input-sm input-bordered w-full max-w-xs" />
                            </label>

                            <label>
                                <div className="label text-sm font-bold">
                                    Enter the passphrase:
                                </div>
                                <input
                                    required
                                    onChange={(e) => setPassphrase(e.target.value)}
                                    type='text' placeholder='abra-ca-dabra'
                                    className="input input-sm input-bordered w-full max-w-xs" />
                            </label>

                            <div className="flex justify-end gap-4 mt-5">
                                <button type='submit' className='btn'>Share Credentials</button>
                                <button type='button' className='btn btn-outline' onClick={() => setIsOpen(false)}>Cancel</button>
                            </div>
                        </form>

                    </Dialog.Description>
                </Dialog.Panel>
            </div>

        </Dialog>

    )
}
