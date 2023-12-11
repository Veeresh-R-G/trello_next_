import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

import Link from "next/link"

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full h-14 px-4 border-b shoadow-xm bg-white flex items-center">
            <div className="md:max-w-screen-4xl mx-auto flex 
            items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size={"sm"} variant={"outline"} asChild>
                        <Link href="/sign-in"> Login </Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="sign-up">
                            Get Taskify for Free
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

