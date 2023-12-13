import { UserButton } from "@clerk/nextjs"

const ProtectedPage = () => {

    return (
        <div>
            {/* {JSON.stringify(user)} */}
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default ProtectedPage