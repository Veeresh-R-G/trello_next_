"use client"

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { useEffect, useState } from "react"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"

export const MobileSidebar = () => {

    const pathname = usePathname()
    const [Ismounted, setIsMounted] = useState<boolean>(false)

    const onOpen = useMobileSidebar((state) => state.onOpen)
    const onClose = useMobileSidebar((state) => state.onClose)
    const isOpen = useMobileSidebar((state) => state.isOpen)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    useEffect(() => {
        onClose();
    }, [onClose, pathname])

    if (!Ismounted) {
        return null;
    }
    return (
        <>
            <Button onClick={onOpen} className="block md:hidden"
                variant={"ghost"} size={"sm"}>
                <Menu className="h-4 w-4"></Menu>
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent
                    side={"left"}
                    className="pt-10 p-2"
                >
                    <Sidebar storageKey="t-sidebar-mobile-state" />
                </SheetContent>
            </Sheet>
        </>
    )
}