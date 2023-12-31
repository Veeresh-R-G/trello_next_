import React from 'react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { MobileSidebar } from './MobileSidebar'
import { FormPopover } from '@/components/forms/form-popover'
function Navbar() {
    return (
        <div className='fixed z-50 w-full top-0 h-14 border-b shadow-sm bg-white flex items-center'>
            <MobileSidebar />
            <div className='flex items-center gap-x-5 ml-3'>
                <div className='hidden md:flex'>
                    <Logo />
                </div>
                <FormPopover align='center' side='bottom' sideOffset={18}>
                    <Button variant={"mycolor"} size={"sm"} className='rounded-sm hidden md:block h-auto py-1.5 px-2'>
                        Create
                    </Button>
                </FormPopover>
                <FormPopover>
                    <Button size={"sm"} className='rounded-sm block ml-3 md:hidden'>
                        <Plus className='h-4 w-4' />
                    </Button>
                </FormPopover>
            </div>
            <div className='ml-auto flex items-center gap-x-2 mr-5'>
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl={"/organization/:id"}
                    afterLeaveOrganizationUrl={"/select-org"}
                    afterSelectOrganizationUrl={"/organization/:id"}
                    appearance={{
                        elements: {
                            rootBox:
                            {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }
                    }}
                />
                <UserButton
                    afterSignOutUrl='/'
                    appearance={{
                        elements:
                        {
                            avatarBox: {
                                height: 30,
                                width: 30
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Navbar