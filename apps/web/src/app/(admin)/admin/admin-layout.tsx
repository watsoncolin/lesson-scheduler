'use client'

import { Avatar } from '@components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@components/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@components/sidebar'
import { SidebarLayout } from '@components/sidebar-layout'
import {
  ArrowRightStartOnRectangleIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import { CalendarDaysIcon, HomeIcon, TicketIcon, UserGroupIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/login">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()

  const events: any[] = []

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}></DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="/images/logo.png" />
                <SidebarLabel>Stansbury Swim</SidebarLabel>
              </DropdownButton>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/admin" current={pathname === '/admin'}>
                <HomeIcon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/admin/instructors" current={pathname.startsWith('/admin/instructors')}>
                <UserGroupIcon />
                <SidebarLabel>Instructors</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/admin/pools" current={pathname.startsWith('/admin/pools')}>
                <TicketIcon />
                <SidebarLabel>Pools</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/admin/schedules" current={pathname.startsWith('/admin/schedules')}>
                <CalendarDaysIcon />
                <SidebarLabel>Schedules</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/admin/users" current={pathname.startsWith('/admin/users')}>
                <UserCircleIcon />
                <SidebarLabel>Users</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Upcoming Events</SidebarHeading>
              {events.map(event => (
                <SidebarItem key={event.id} href={event.url}>
                  {event.name}
                </SidebarItem>
              ))}
            </SidebarSection>

            <SidebarSpacer />
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>{/* <ChevronUpIcon /> */}</DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
