

import { OrganizationControl } from "./_components/org-control"

function OrganizationIdLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>

            {children}
            <OrganizationControl />
        </>
    )
}

export default OrganizationIdLayout