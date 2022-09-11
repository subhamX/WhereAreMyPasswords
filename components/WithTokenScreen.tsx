import { useState } from "react"
import { AllPasswords } from "./AllPasswords"
import { AllSecureNotes } from "./AllSecureNotes"
import { DialogBox } from "./DialogBox"
import { PasswordIcon } from "./icons/PasswordIcon"
import { SecureNoteIcon } from "./icons/SecureNoteIcon"
import { MainOptionTile } from "./MainOptionTile"



export const WithTokenScreen = () => {
    const [currentActive, setCurrentActive] = useState(0)

    return (
        <div className="max-w-4xl mx-auto px-5">
            {/* A button to add, show a dropdown to choose from */}
            <div className="mt-10 flex justify-end">
                <div className="dropdown">
                    <label tabIndex={0} className="btn font-black text-lg btn-primary m-1">Add an item</label>
                    <ul tabIndex={0} className="dropdown-content font-bold text-sm menu p-2 shadow bg-gray-50 rounded-box w-52">
                        <li><a>Password</a></li>
                        <li><a>Secure Note</a></li>
                    </ul>
                </div>

                {/* 
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </button>
                </div> */}


                <div className="dropdown">

                    <label tabIndex={0} className="btn font-black text-lg btn-primary btn-outline m-1">More</label>
                    <ul tabIndex={0} className="dropdown-content font-bold text-sm menu p-2 shadow bg-gray-50 rounded-box w-52">
                        <li><a>Export Vault</a></li>
                        <li><a>Import Vault</a></li>
                    </ul>
                </div>






                {/* enter a passphrase for encrypt the export */}
                {/* load everything, and dump */}
                {/* .whereIsMyPasswordDB */}
                {/* <button className="btn font-black text-lg btn-primary m-1">Export Vault</button> */}

                {/* select a file */}
                {/* enter the passphrase */}
                {/* and cool */}
                {/* .whereIsMyPasswordDB */}
                {/* <button className="btn font-black text-lg btn-primary m-1">Import Vault</button> */}


                {/* on every secure note and password, there will be a button to share with someone */}
                {/* now enter the passphrase. plz share it to the person. */}
                {/* we will decrypt it, then encrypt it with new passphrase and send it. */}
            </div>

            {/* <DialogBox/> */}


            {/* render a dialog */}

            {/* SHOW two tiles */}
            <div className="mt-5 mb-10 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div onClick={() => setCurrentActive(0)}>
                    <MainOptionTile
                        isActive={currentActive === 0}
                        data={{
                            'name': 'Passwords',
                            'icon': <PasswordIcon className="mb-1 w-12 sm:w-16" />,
                        }}
                    />
                </div>
                <div onClick={() => setCurrentActive(1)}>
                    <MainOptionTile
                        isActive={currentActive === 1}
                        data={{
                            'name': 'Secure Notes',
                            'icon': <SecureNoteIcon className="mb-1 w-12 sm:w-16" />,
                        }}
                    />
                </div>

            </div>

            {/* show them... without pagination */}
            {currentActive === 0 ? <AllPasswords /> : <AllSecureNotes />}





        </div>
    )
}
