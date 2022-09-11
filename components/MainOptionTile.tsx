import { PasswordIcon } from "./icons/PasswordIcon"

type CardData = {
    name: string;
    icon: JSX.Element;
}

export const MainOptionTile = (
    {
        isActive = false,
        data
    }: {
        isActive?: boolean,
        data: CardData
    }) => (
    <div className={`card border border-gray-500 w-full bg-base-100 shadow-xl ${isActive ? 'bg-accent' : 'cursor-pointer'}`}>
        <div className="card-body flex justify-center items-center">
            {data.icon}
            <h2 className="card-title">{data.name}</h2>
        </div>
    </div>
)
