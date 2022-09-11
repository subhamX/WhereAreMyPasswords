import { Dialog } from "@headlessui/react"
import { ShieldExclamationIcon } from "@heroicons/react/24/outline"
import { Dispatch, useState } from "react"
import { toast } from "react-toastify"
import { EXPORT_VAULT_FILENAME } from "../config/keys"
import { useOfflineCacheService } from "../Hooks/useOfflineCacheService"
import { decryptWithPassphrase } from "../utils/decryptWithPassphrase"
import { encryptWithPassphrase } from "../utils/encryptWithPassphrase"
import { saveFileFromString } from "../utils/saveFileFromString"



export const ImportVaultDialogBox = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean,
    setIsOpen: Dispatch<boolean>,
}) => {
    const [passphrase, setPassphrase] = useState('')
    const [fileName, setFileName] = useState<null | File>(null)


    const { passwords, secureNotes, mergeVault } = useOfflineCacheService();

    const handleVaultImport = async () => {
        try {
            const data = await fileName?.text();
            // decrypt it
            const decrypted = decryptWithPassphrase(passphrase, data)
            // update the db
            // const currentPasswordsLength= passwords.length;
            // const currentSecureNoteLength= secureNotes.length;
            mergeVault(decrypted)
            // TODO: some error is here, and we're unable to find the difference between the two
            // toast.success(`Added ${newPasswordsLength - currentPasswordsLength} passwords and ${newSecureNoteLength - currentSecureNoteLength} secure notes after carefully merging them! 🎉🚀`)
            toast.success(`Added passwords and secure notes after carefully merging them! 🎉🚀`)
            setIsOpen(false)
        } catch (err: any) {
            toast.error('Something went wrong! Are you sure you entered the correct passphrase? 🧐')
        }

    }
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className='fixed inset-0 flex items-center justify-center p-4'>

                <Dialog.Panel className='w-full max-w-lg bg-gray-50 px-6 py-10'>
                    <Dialog.Title className='text-2xl mb-5 font-extrabold'>Import Encrypted Vault!</Dialog.Title>
                    <Dialog.Description as="div">

                        <div className="alert text-xs font-medium alert-info flex-row"><ShieldExclamationIcon className="w-8" />Please ensure that you enter the same passphrase you used while exporting the vault. It could be something different than your current main passphrase!</div>
                        <form onSubmit={(e) => { e.preventDefault(), handleVaultImport() }}>

                            <label>
                                <div
                                    className="label text-sm font-bold">
                                    Select the exported vault database
                                </div>
                                <input
                                    required
                                    className="block w-full text-sm text-gray-900 border border-gray-300 max-w-xs bg-base-100 cursor-pointer dark:text-gray-400 focus:outline-none"
                                    id="file_input"
                                    accept=".db"
                                    onChange={(e) => setFileName(e.target.files?.[0] ?? null)}
                                    type="file" />
                            </label>


                            <label>
                                <div className="label text-sm font-bold">
                                    Enter the encrypted vault passphrase:
                                </div>
                                <input
                                    required
                                    onChange={(e) => setPassphrase(e.target.value)}
                                    type='text' placeholder='abra-ca-dabra'
                                    className="input input-sm input-bordered w-full max-w-xs" />
                            </label>

                            <div className="flex justify-end gap-4 mt-5">
                                <button type='submit' className='btn'>Import vault</button>
                                <button type='button' className='btn btn-outline' onClick={() => setIsOpen(false)}>Cancel</button>
                            </div>
                        </form>

                    </Dialog.Description>
                </Dialog.Panel>
            </div>

        </Dialog>

    )
}
