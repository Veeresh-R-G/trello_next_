import { Medal } from 'lucide-react'

import localFont from "next/font/local"
import { Poppins } from "next/font/google"
import Link from 'next/link'


import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'


const headingFont = localFont({
    src: "../../public/fonts/font.woff2"
})

//with the google fonts import
const poppinFont = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600"],

})
function MarketingPage() {
    return (
        <div className='flex items-center justify-center flex-col'>
            <div className={cn('flex items-center justify-center flex-col', headingFont.className)}>
                <div className='mb-4 flex items-center border 
                shadow-sm p-4 bg-green-100
                text-emerald-700 rounded-full uppercase'>
                    <Medal className='mr-2 h-6 w-6' />
                    No 1 Task Management
                </div>
                <h1 className='text-3xl mg:text-6xl text-center text-neutral-800 mb-6'>
                    Taskify helps team move
                </h1>
                <div className='text-3xl mg:text-6xl bg-gradient-to-r from-blue-600 to-green-600 text-white px-4
                p-2 rounded-md'>
                    work forward.
                </div>
                <div className={cn('text-sm md:text-xl text-neutral-400 mt-4 first-letter:max-w-xs md:max-w-2xl text-center mx-auto', poppinFont.className)}>

                    Collaborate, manage projects and reach new productivity peaks.
                    From hugh rises to home office, the way your team words is unique
                    - accomplish it all with taskify
                </div>
            </div>
            <Button className='mt-6' size="lg" asChild>
                <Link href="/">
                    Get Taskify for free
                </Link>
            </Button>
        </div>
    )
}

export default MarketingPage