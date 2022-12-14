import { Dispatch } from "react"



export const Navbar = (
    {
        setCurrentFilterText,
        showSearchBar = false,
    }
        :
        {
            currentFilterText: string,
            setCurrentFilterText: Dispatch<string>,
            showSearchBar?: boolean
        }
) => {

    return (
        <div className={`navbar bg-base-100 gap-3 flex-col w-full sm:flex-row text-center ${showSearchBar?'justify-between': 'justify-center'}`}>
            <a className="btn btn-ghost normal-case font-extrabold text-xl text-center">🤔 WhereAreMyPasswords?</a>
            {showSearchBar &&
                <div className="w-full max-w-xl">
                        {/* Search icon */}
                        <input onChange={(e) => setCurrentFilterText(e.target.value)} type="text" placeholder="Search the secure vault" className="w-full input input-bordered font-bold placeholder:text-gray-700 input-accent text-gray-700" />
                </div>}
        </div>
    )
}
