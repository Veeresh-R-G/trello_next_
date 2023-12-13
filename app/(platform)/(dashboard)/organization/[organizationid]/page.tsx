

const OrganizationIdPage = ({ params }:
    {
        params: {
            organizationid: String
        }
    }) => {


    return (
        <div>
            Organization Page here : {params.organizationid}

        </div>
    )
}

export default OrganizationIdPage;