import { Dispatch, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { PasswordInstance, SecureNoteInstance } from './AllPasswords'

const fields = {
    'password': [
        {
            label: 'Site Url',
            type: 'url',
            fieldId: 'siteUrl',
            placeholder: "https://github.com/"
        },
        {
            label: 'Username Or Email',
            type: 'text',
            fieldId: 'usernameOrEmail',
            placeholder: "ladiesman217"

        },
        {
            label: 'Password',
            type: "password",
            fieldId: 'password',
            placeholder: "**********"
        },
    ],
    'secure-note': [
        {
            label: 'Title',
            type: 'text',
            fieldId: 'title',
            placeholder: "metamask secret passphrase"
        },
        {
            label: 'Content',
            type: "textarea",
            fieldId: 'content',
            placeholder: `base	deer	image
close	depart	bargain
invite	celery	brick
gap	able	caught
feature	bottle	hair
empty	across	deposit
barely	any	magic
boat	begin	lawn`
        },
    ]
}
export function AddNewItemDialogBox({
    newItemAddInstanceType,
    isOpen,
    setIsOpen,
    handleNewItemCreation,
    initialData
}: {
    newItemAddInstanceType: 'password' | 'secure-note',
    isOpen: boolean,
    setIsOpen: Dispatch<boolean>,
    handleNewItemCreation: (data: any) => void,
    initialData: Record<string,string>
}) {
    const [data, setData] = useState<Record<string,string>>({})

    useEffect(() => {
        setData(initialData)
    }, [initialData])


    const isEditMode=Object.keys(initialData).length>0;

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className='fixed inset-0 flex items-center justify-center p-4'>

                <Dialog.Panel className='w-full max-w-lg bg-gray-50 px-6 py-10'>
                    <Dialog.Title className='text-2xl mb-5 font-extrabold'>{isEditMode? 'Edit': 'Add a new'} {newItemAddInstanceType === 'password' ? 'password' : 'secure note'}!</Dialog.Title>
                    <Dialog.Description>
                        <form onSubmit={(e) => {e.preventDefault(), handleNewItemCreation(data)}}>
                            {fields[newItemAddInstanceType].map((field, index) => (
                                <label key={index}>
                                    <div className="label text-sm font-bold">
                                        {field.label}
                                    </div>
                                    {field.type === 'textarea' ?
                                        (<textarea
                                            required
                                            value={data?.[field.fieldId]??""}
                                            onChange={(e) => setData({ ...data, [field.fieldId]: e.target.value })}
                                            placeholder={field.placeholder}
                                            className="input min-h-[200px] input-sm input-bordered w-full max-w-xs" />)
                                        :
                                        (<input
                                            required
                                            value={data?.[field.fieldId]??""}
                                            onChange={(e) => setData({ ...data, [field.fieldId]: e.target.value })}
                                            type={field.type} placeholder={field.placeholder}
                                            className="input input-sm input-bordered w-full max-w-xs" />)
                                    }
                                </label>

                            ))}

                            <div className="flex justify-end gap-4 mt-5">
                                <button type='submit' className='btn'>Securely add</button>
                                <button type='submit' className='btn btn-outline' onClick={() => setIsOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </Dialog.Description>
                </Dialog.Panel>
            </div>

        </Dialog>
    )
}
