import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react';

const apps = [
  {
    name: 'Task Manager',
    description: 'Organize and track your daily tasks efficiently',
    href: '/mini-apps/task-manager',
    icon: FolderIcon,
    color: 'bg-indigo-500',
  },
  {
    name: 'Notes',
    description: 'Create and manage your notes with AI assistance',
    href: '/mini-apps/notes',
    icon: DocumentDuplicateIcon,
    color: 'bg-yellow-500',
  },
  {
    name: 'Calendar',
    description: 'Schedule and manage your appointments',
    href: '/mini-apps/calendar',
    icon: CalendarIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Analytics',
    description: 'Track and visualize your productivity metrics',
    href: '/mini-apps/analytics',
    icon: ChartPieIcon,
    color: 'bg-purple-500',
  },
]

export default function MiniApps() {
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Mini Applications</h2>
        <p className="mt-2 text-sm text-gray-600">
          Select a mini-app to get started. Each app is designed to help you with specific tasks.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon
            return (
              <Link
                key={app.name}
                href={app.href}
                className="group relative rounded-lg border border-gray-200 p-6 hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500"
              >
                <div>
                  <span
                    className={`inline-flex rounded-lg p-3 ${app.color} ring-4 ring-white`}
                  >
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {app.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {app.description}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-indigo-500"
                  aria-hidden="true"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
