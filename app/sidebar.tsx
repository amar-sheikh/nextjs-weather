'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Sidebar() {
    const pathname = usePathname()

    const links = [
        { name: 'Current', href: '/' },
        { name: 'Charts', href: '/charts' },
    ]

    return (
        <div>
            <div className="h-36 flex justify-center items-center">
                <Link
                    href="/"
                >
                    <Image
                        width={80}
                        height={80}
                        className="h-12 w-12 mx-3"
                        src="/logo.svg"
                        alt="Weather logo"
                    />
                    <div className="font-bold text-orange-500">
                        Weather App
                    </div>
                </Link>
            </div>
            <div className="flex flex-col gap-1">
                {
                    links.map((link => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={
                                clsx(
                                    'py-2 px-4 text-orange-500 hover:bg-orange-300 hover:text-white',
                                    { 'bg-orange-400 text-white': pathname === link.href }
                                )
                            }>
                            {link.name}
                        </Link>
                    )))
                }
            </div>
        </div>
    )
}