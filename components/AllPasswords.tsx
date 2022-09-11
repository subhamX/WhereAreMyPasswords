import { useOfflineCacheService } from "../Hooks/useOfflineCacheService"
import { ClipboardDocumentCheckIcon, EyeIcon, EyeSlashIcon, PencilIcon, PencilSquareIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from "react"
import { toast } from "react-toastify"
import { ShareCredentialDialogBox } from "./ShareCredentialDialogBox"
import { copyTextToClipboard } from "../utils/copyTextToClipboard"


export type PasswordInstance = {
    uid: string,
    siteUrl: string,
    usernameOrEmail: string,
    password: string,
    lastUpdated: string
}

export type SecureNoteInstance = {
    uid: string,
    title: string,
    content: string,
    lastUpdated: string
}

export const AllPasswords = (
    {
        openDialogBox,
        currentFilterQuery
    }: {
        openDialogBox: (instanceType: 'password' | 'secure-note', data: SecureNoteInstance | PasswordInstance) => void,
        currentFilterQuery: string
    }) => {
    const { passwords: rawPasswords, deletePassword } = useOfflineCacheService()
    const [showPasswords, setShowPasswords] = useState([] as string[])

    const [shareCredentialDialogBoxIsOpen, setShareCredentialDialogBoxIsOpen] = useState(false)
    const [passwordDataToBeShared, setPasswordDataToBeShared] = useState({} as PasswordInstance)

    // const passwords=rawPasswords.sort((a,b)=>new Date(b.lastUpdated).getTime()-new Date(a.lastUpdated).getTime())
    const passwords = rawPasswords.filter((password) => {
        return password.siteUrl.toLowerCase().includes(currentFilterQuery.toLowerCase()) ||
            password.usernameOrEmail.toLowerCase().includes(currentFilterQuery.toLowerCase())
    })

    return (
        <div className="font-sans">
            {passwords.length == 0 && <div className="alert alert-warning shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    {rawPasswords.length === 0 ? <div>No passwords in the vault!</div> : <div>No passwords found for the specified query!</div>}
                </div>
            </div>}

            {passwords.map((passwordInstance) => {
                const showPassword = showPasswords.includes(passwordInstance.uid)
                return (
                    <div key={passwordInstance.uid} className='text-sm card bg-primary my-4 w-full shadow-xl'>

                        <div className="card-body text-gray-700">

                            <div className="font-bold text-lg space-x-2 flex justify-between">
                                <span>
                                    Username or Email
                                </span>
                                <span className="grid grid-cols-12">
                                    <span className="col-span-10 ml-auto">{passwordInstance.usernameOrEmail}</span>
                                    <span onClick={() => {
                                        copyTextToClipboard(passwordInstance.password)
                                    }}
                                        className="btn btn-circle btn-info border btn-xs col-span-1 col-start-12"><ClipboardDocumentCheckIcon className="w-4" />
                                    </span>
                                </span>
                            </div>

                            <div className="space-x-2 flex justify-between">
                                <span className="font-bold">
                                    Site URL:
                                </span>
                                <span>
                                    {passwordInstance.siteUrl}
                                </span>
                            </div>

                            <div className="space-x-2 flex justify-between">
                                <span className="font-bold">
                                    Password:
                                </span>
                                <span className="grid grid-cols-11 space-x-2 items-center">
                                    <span onClick={() => {
                                        copyTextToClipboard(passwordInstance.password)
                                    }} className="cursor-copy bg-warning px-4 w-full pb-2 pt-2 col-span-9 ml-auto">{showPassword ? passwordInstance.password : '***********'}</span>
                                    <span onClick={() => {
                                        if (showPassword) {
                                            // remove it
                                            setShowPasswords(showPasswords.filter((uid) => uid !== passwordInstance.uid))
                                        } else {
                                            // add it
                                            setShowPasswords([...showPasswords, passwordInstance.uid])
                                        }
                                    }}
                                        className="btn btn-circle btn-info border btn-xs col-span-1">{showPassword ? <EyeSlashIcon className="w-4" /> : <EyeIcon className="w-4" />}</span>
                                    <span onClick={() => {
                                        copyTextToClipboard(passwordInstance.password)
                                    }}
                                        className="btn btn-circle btn-info border btn-xs col-span-1"><ClipboardDocumentCheckIcon className="w-4" />
                                    </span>
                                </span>
                            </div>


                            <div className="text-gray-600 flex justify-between space-x-2">
                                <span className="font-bold">
                                    Last Updated At:
                                </span>
                                <span>
                                    {new Date(passwordInstance.lastUpdated).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex gap-3 mt-4 justify-end">
                                <div
                                    onClick={() => { setPasswordDataToBeShared(passwordInstance), setShareCredentialDialogBoxIsOpen(true) }}
                                    className="btn btn-sm space-x-2"><ShareIcon className="w-5" /><span>Share</span></div>
                                <div
                                    onClick={() => {
                                        if (confirm('Are you sure to delete this password instance?')) {
                                            deletePassword(passwordInstance.uid)
                                            toast.success('Password deleted successfully 🎉')
                                        }
                                    }}
                                    className="btn btn-sm space-x-2"><TrashIcon className="w-5" /> <span>Delete</span></div>
                                <div
                                    onClick={() => {
                                        openDialogBox('password', passwordInstance)
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
                passwords={[passwordDataToBeShared]}
                secureNotes={[]}
            />

        </div>
    )

}
