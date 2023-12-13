import { OrganizationSwitcher, auth } from "@clerk/nextjs"

const OrganizationIdPage = ({ params }:
    {
        params: {
            organizationid: String
        }
    }) => {

    const { userId, orgId } = auth()
    return (
        <div>
            <OrganizationSwitcher
                hidePersonal

            />
            {orgId}
        </div>
    )
}

export default OrganizationIdPage;