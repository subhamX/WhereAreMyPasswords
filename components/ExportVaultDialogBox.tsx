import { Dialog } from "@headlessui/react"
import { ShieldExclamationIcon } from "@heroicons/react/24/outline"
import { Dispatch, useState } from "react"
import { EXPORT_VAULT_FILENAME } from "../config/keys"
import { useOfflineCacheService } from "../Hooks/useOfflineCacheService"
import { encryptWithPassphrase } from "../utils/encryptWithPassphrase"
import { saveFileFromString } from "../utils/saveFileFromString"



export const ExportVaultDialogBox = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean,
    setIsOpen: Dispatch<boolean>,
}) => {
    const [passphrase, setPassphrase] = useState('')

    const {passwords, secureNotes}=useOfflineCacheService();

    const handleVaultExport = () => {
        // get whole decrypted vault
        const payload={
            passwords,
            secureNotes
        }
        // encrypt it with passphrase
        const encryptedString=encryptWithPassphrase(passphrase, payload)
        // force download the file

        saveFileFromString(EXPORT_VAULT_FILENAME ,encryptedString)
        setIsOpen(false)
    }
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className='fixed inset-0 flex items-center justify-center p-4'>

                <Dialog.Panel className='w-full max-w-lg bg-gray-50 px-6 py-10'>
                    <Dialog.Title className='text-2xl mb-5 font-extrabold'>Export Encrypted Vault!</Dialog.Title>
                    <Dialog.Description as="div">

                        <div className="alert text-xs font-medium alert-info flex-row"><ShieldExclamationIcon className="w-8"/> The passphrase can be something different than your current main passphrase!</div>
                        <form onSubmit={(e) => { e.preventDefault(), handleVaultExport() }}>

                            <label>
                                <div className="label text-sm font-bold">
                                    Enter the export passphrase:
                                </div>
                                <input
                                    required
                                    onChange={(e) => setPassphrase(e.target.value)}
                                    type='text' placeholder='Enter the passphrase'
                                    className="input input-sm input-bordered w-full max-w-xs" />
                            </label>

                            <div className="flex justify-end gap-4 mt-5">
                                <button type='submit' className='btn'>Export vault</button>
                                <button type='button' className='btn btn-outline' onClick={() => setIsOpen(false)}>Cancel</button>
                            </div>
                        </form>

                    </Dialog.Description>
                </Dialog.Panel>
            </div>

        </Dialog>

    )
}
