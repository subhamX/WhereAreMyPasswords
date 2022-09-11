import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { PasswordInstance, SecureNoteInstance } from './AllPasswords'

export function DialogBox({newItemAddInstanceType}: {newItemAddInstanceType: PasswordInstance | SecureNoteInstance}) {
    let [isOpen, setIsOpen] = useState(true)
    const [data, setData] = useState({})
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className='fixed inset-0 flex items-center justify-center p-4'>

                <Dialog.Panel className='w-full max-w-lg bg-gray-50 px-6 py-10'>
                    <Dialog.Title className='text-2xl mb-5 font-extrabold'>Add a new password</Dialog.Title>
                    <Dialog.Description>
                        <label>
                            <div className="label text-sm font-bold">Site Url</div>
                            <input type="url" placeholder="https://github.com/" className="input input-sm input-bordered w-full max-w-xs" />
                        </label>
                    </Dialog.Description>

                    <div className="flex justify-end gap-4 mt-5">
                        <button className='btn' onClick={() => setIsOpen(false)}>Securely add</button>
                        <button className='btn btn-outline' onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </Dialog.Panel>
            </div>

        </Dialog>
    )
}
