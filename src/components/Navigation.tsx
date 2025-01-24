"use client";

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'MiniApps', href: '/mini-apps' },
  { name: 'Settings', href: '/settings' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">MiniApps</h1>
        <ul className="nav-links">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={clsx(
                  pathname === item.href
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700',
                  'text-sm font-medium'
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
