import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react';

const apps = [
  {
    name: 'Task Manager',
    description: 'Organize and track your daily tasks efficiently',
    href: '/mini-apps/task-manager',
    icon: FolderIcon,
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    name: 'Notes',
    description: 'Create and manage your notes with AI assistance',
    href: '/mini-apps/notes',
    icon: DocumentDuplicateIcon,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Calendar',
    description: 'Schedule and manage your appointments',
    href: '/mini-apps/calendar',
    icon: CalendarIcon,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Analytics',
    description: 'Track and visualize your productivity metrics',
    href: '/mini-apps/analytics',
    icon: ChartPieIcon,
    gradient: 'from-purple-500 to-pink-600',
  },
]

export default function MiniApps() {
  return (
    <div className="fade-in">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Mini Applications
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Select a mini-app to get started. Each app is designed to help you with specific tasks.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {apps.map((app) => {
            const Icon = app.icon
            return (
              <Link
                key={app.name}
                href={app.href}
                className="mini-app-card"
              >
                <div className="relative z-10">
                  <div className={`mini-app-icon bg-gradient-to-r ${app.gradient}`}>
                    <Icon className="w-full h-full" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {app.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {app.description}
                  </p>
                </div>
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 blur-xl transition-all duration-500 group-hover:scale-150"></div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
