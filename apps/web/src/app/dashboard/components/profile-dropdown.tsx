import React, { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import SignOutButton from './sign-out-button'
import { AvatarComponent } from 'avatar-initials'
import { useUser, UserContextType, User } from '../../components/user-context'
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const userNavigation = [
  { name: 'Your Profile', href: '/dashboard/profile' },
  { name: 'Settings', href: '#' },
]

export default function ProfileDropdown() {
  const context = useUser() as UserContextType
  const user = context?.user || ({} as User)

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <AvatarComponent
            classes="rounded-full"
            useGravatar={false}
            size={44}
            color="#000000"
            background="#f1f1f1"
            fontSize={16}
            fontWeight={400}
            offsetY={24}
            initials={`${user?.firstName ? user?.firstName[0] : ''}${user?.lastName ? user?.lastName[0] : ''}`}
          />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map(item => (
            <MenuItem key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  {item.name}
                </a>
              )}
            </MenuItem>
          ))}
          <MenuItem key={'Sign Out'}>
            <SignOutButton />
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
