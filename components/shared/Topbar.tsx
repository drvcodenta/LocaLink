import Link from "next/link";
import Image from "next/image";
import Logo from "/assets/logo.svg";
import Logout from "/assets/logout.svg";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

function Topbar(){
    return(
        <nav className="topbar">
            <Link href="/" className="flex items-centre gap-4">
                <Image src={Logo} alt="logo" width={28} height={28} />
                <p className="text-heading3-bold text-light-1 max-xs:hidden">LocaLink</p>
            </Link>

            <div className ="flex items-center gap-1">
                <div className='block md:hidden'>
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image 
                                src={Logout}
                                alt='logout'
                                width={24}
                                height={24} />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                
                <OrganizationSwitcher
                appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: "py-2 px-4",
                        }
                    }
                } />
            </div>
        </nav>
    )
}

export default Topbar;