"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useOrganization } from "@clerk/nextjs"
import { CreditCard } from "lucide-react"
import Image from "next/image"

export const Info = () => {

    const { organization, isLoaded } = useOrganization()

    if (!isLoaded) {
        return (
            <Info.Skeleton />
        )
    }
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Image
                    fill
                    src={organization?.imageUrl!}
                    alt="Organization"
                    className="rounded-md object-cover"
                />
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-xl">
                    {organization?.name!}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Free
                </div>
            </div>
        </div>
    )
}

Info.Skeleton = function SkeletonInfo() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className="w-[60px] h-[60px]" />
            </div>
            <div className="space-y-1">

                <Skeleton className="h-4 w-10" />

                <div className="flex items-center text-xs text-muted-foreground">

                    <Skeleton className="h-3 w-7" />
                </div>
            </div>
        </div>
    )
}