// import { create } from "@/app/actions/create-board"
import { Button } from "@/components/ui/button"


const OrganizationIdPage = ({ params }:
    {
        params: {
            organizationid: String
        }
    }) => {


    return (
        <div>
            Organization Page here : {params.organizationid}
            <form>

                <input
                    name="title"
                    placeholder="type in here"
                    className="border-black outline-double outline-blue-700"
                />

                <Button size={"sm"} variant={"link"} type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default OrganizationIdPage;