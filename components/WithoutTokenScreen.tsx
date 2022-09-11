import { useState } from "react";



export const WithoutTokenScreen = ({
    isNewUser, handleSubmit
}: {
    isNewUser: boolean,
    handleSubmit: (potentialMainPassword: string) => void
}) => {
    const [potentialMainPassword, setPotentialMainPassword] = useState("");


    return (
        <div className="max-w-4xl mx-auto px-5">

            <h1 className="text-3xl font-black mt-7 mb-7">Hi there 👋, Welcome{!isNewUser && ' back'}!</h1>

            <div className="alert alert-info shadow-lg text-sm font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                <div className="flex flex-col items-start flex-grow">
                    {isNewUser ?
                        <div>Please choose a strong password for your vault! Please note that, we won&apos;t be able recover your vault if this passphrase is lost. 🥲</div>
                        :
                        <div>We see you already have the vault. Please enter the secure password below to access it.</div>}
                </div>
            </div>


            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(potentialMainPassword) }}>
                <input onChange={e => setPotentialMainPassword(e.target.value)} required type="text" placeholder="Enter the secure master password 🔐" className="mt-4 input input-bordered input-info w-full" />
                <button type="submit" className="btn mt-3 mb-10">Take me to the vault 🔒</button>
            </form>

            <div className="space-y-2 list-disc list-inside text-gray-500">
                <li>We are here to help you find your passwords. 💪</li>
                <li>We are completely browser based 🌐. And we never store either your encrypted passwords, or encryption keys on our servers! Everything stays at your browser always!</li>
                <li>You can easily share the encrypted secret note, or password anyone via email 📩.</li>
                {/* {isNewUser && <div>Incase you have a backup, and want to import your vault. Please ensure that the passphrase matches with that of backup!</div>} */}

            </div>
        </div>
    )
}
