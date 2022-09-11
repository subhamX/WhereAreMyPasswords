import { EyeIcon, EyeSlashIcon, PencilSquareIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { toast } from "react-toastify"
import { useOfflineCacheService } from "../Hooks/useOfflineCacheService"
import { PasswordInstance, SecureNoteInstance } from "./AllPasswords"
import { ShareCredentialDialogBox } from "./ShareCredentialDialogBox"



export const AllSecureNotes = (
    {
        openDialogBox
    }: {
        openDialogBox: (instanceType: 'password' | 'secure-note', data: SecureNoteInstance | PasswordInstance) => void
    }) => {
    const { secureNotes, deleteSecureNote } = useOfflineCacheService()
    const [showSecureNotes, setShowSecureNotes] = useState([] as string[])
    const [shareCredentialDialogBoxIsOpen, setShareCredentialDialogBoxIsOpen] = useState(false)
    const [secureNoteDataToBeShared, setSecureNoteDataToBeShared] = useState({} as SecureNoteInstance)

    return (
        <div>
            {secureNotes.length == 0 && <div className="alert alert-warning shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <div>No secure notes in the vault!</div>
                </div>
            </div>}

            {secureNotes.map((secureNoteInstance) => {
                const showSecureNote = showSecureNotes.includes(secureNoteInstance.uid)
                return (
                    <div key={secureNoteInstance.uid} className='text-sm card bg-primary my-4 w-full shadow-xl'>

                        <div className="card-body text-gray-700">

                            <div className="font-bold text-lg space-x-2 flex justify-between">
                                <span>
                                    Title:
                                </span>
                                <span>
                                    {secureNoteInstance.title}
                                </span>
                            </div>


                            <div className="gap-1 flex flex-col justify-between">
                                <span>
                                    Content:
                                </span>
                                <span className="grid grid-cols-10 w-full space-x-2 items-center">
                                    <textarea
                                        value={showSecureNote ? secureNoteInstance.content : '***********'}
                                        className="resize-none col-span-9 w-full ml-auto textarea bg-amber-300 textarea-bordered"
                                        name="myTextArea"
                                        rows={4}
                                        readOnly />
                                    <span onClick={() => {
                                        if (showSecureNote) {
                                            // remove it
                                            setShowSecureNotes(showSecureNotes.filter((uid) => uid !== secureNoteInstance.uid))
                                        } else {
                                            // add it
                                            setShowSecureNotes([...showSecureNotes, secureNoteInstance.uid])
                                        }
                                    }}
                                        className="btn btn-circle btn-info border btn-sm col-span-1">{showSecureNote ? <EyeSlashIcon className="w-7" /> : <EyeIcon className="w-7" />}</span>


                                </span>
                            </div>


                            <div className="text-gray-600 mt-1 flex justify-between space-x-2">
                                <span>
                                    Last Updated At:
                                </span>
                                <span>
                                    {new Date(secureNoteInstance.lastUpdated).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex gap-3 mt-4 justify-end">
                                <div
                                    onClick={() => { setSecureNoteDataToBeShared(secureNoteInstance), setShareCredentialDialogBoxIsOpen(true) }}
                                    className="btn btn-sm space-x-2"><ShareIcon className="w-5" /><span>Share</span></div>
                                <div
                                    onClick={() => {
                                        if (confirm('Are you sure to delete this secure note instance?')) {
                                            deleteSecureNote(secureNoteInstance.uid)
                                            toast.success('Secure note instance deleted successfully 🎉')
                                        }
                                    }}
                                    className="btn btn-sm space-x-2"><TrashIcon className="w-5" /> <span>Delete</span></div>
                                <div
                                    onClick={() => {
                                        openDialogBox('secure-note', secureNoteInstance)
                                    }}
                                    className="btn btn-sm space-x-2"><PencilSquareIcon className="w-5" /> <span>Edit</span></div>
                            </div>
                        </div>

                    </div>
                )
            })}

            <ShareCredentialDialogBox
                isOpen={shareCredentialDialogBoxIsOpen}
                setIsOpen={setShareCredentialDialogBoxIsOpen}
                passwords={[]}
                secureNotes={[secureNoteDataToBeShared]}
            />

        </div>
    )

}
