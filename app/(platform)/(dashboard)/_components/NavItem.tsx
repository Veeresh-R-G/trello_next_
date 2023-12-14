"use client"

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import {
    Activity,
    CreditCard,
    Layout,
    Settings
} from "lucide-react"
import { Button } from "@/components/ui/button";



export type Organization = {
    id: string;
    slug: string;
    imageUrl: string;
    name: string
}

interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id: string) => void;

}

function NavItem({
    isActive,
    isExpanded,
    organization,
    onExpand }: NavItemProps) {


    const router = useRouter()
    const pathName = usePathname()

    const routes = [
        {
            label: "Boards",
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}`,
        },
        {
            label: "Activity",
            icon: <Activity className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/activity`,
        },
        {
            label: "Settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/settings`,
        },
        {
            label: "Billing",
            icon: <CreditCard className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/billing`,
        }
    ]
    const onClick = (href: string) => {
        router.push(href)
    }
    return (
        <AccordionItem
            value={organization.id}
            className="border-none">
            <AccordionTrigger
                onClick={() => { onExpand(organization.id) }}
                className={cn("flex items-center gap-x-2 p-1.5 text-neutral-700 \
                      rounded-md hover:bg-neutral-500/10 transition text-start no-underline",
                    isActive && !isExpanded && "bg-sky-500/10 text-sky-700")}
            >
                <div className="flex items-center">
                    <div className="w-7 h-7 flex my-auto">
                        <Image src={organization.imageUrl} alt="organization" height={50} width={50}
                            className="rounded-sm object-cover">
                        </Image>
                        <div className="text-sm pl-2.5">
                            {organization.name}
                        </div>
                    </div>

                </div>
            </AccordionTrigger>
            <AccordionContent className="text-neutral-700">
                {routes.map((route) => (
                    <Button key={route.href} onClick={() => { onClick(route.href) }} size={"sm"}
                        className={cn("w-full font-normal justify-start pl-10 mb-1",
                            pathName === route.href && "bg-sky-500/10 text-sky-700")}
                        variant={"ghost"}
                    >
                        {route.icon}
                        {route.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    )
}

export default NavItem