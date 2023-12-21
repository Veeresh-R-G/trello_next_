
import { startCase } from "lodash"
import { auth } from "@clerk/nextjs"

import { OrganizationControl } from "./_components/org-control"

export async function generateMetadata() {
    const { orgSlug } = auth();

    return {
        title: startCase(orgSlug || "organization"),
    }
}

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