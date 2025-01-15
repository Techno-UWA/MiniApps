'use client';

import { BellIcon, GlobeAltIcon, SwatchIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Switch } from '@headlessui/react'
import { useState } from 'react'
import clsx from 'clsx'

const settingSections = [
  {
    id: 'profile',
    name: 'Profile',
    icon: UserCircleIcon,
    settings: [
      { id: 'public-profile', name: 'Public profile', description: 'Make your profile visible to everyone', type: 'toggle', default: true },
      { id: 'profile-stats', name: 'Show statistics', description: 'Display your usage statistics on your profile', type: 'toggle', default: false },
    ],
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: BellIcon,
    settings: [
      { id: 'email-notifs', name: 'Email notifications', description: 'Receive email notifications for important updates', type: 'toggle', default: true },
      { id: 'push-notifs', name: 'Push notifications', description: 'Get push notifications in your browser', type: 'toggle', default: true },
    ],
  },
  {
    id: 'appearance',
    name: 'Appearance',
    icon: SwatchIcon,
    settings: [
      { id: 'dark-mode', name: 'Dark mode', description: 'Use dark theme across all mini-apps', type: 'toggle', default: false },
      { id: 'high-contrast', name: 'High contrast', description: 'Increase contrast for better visibility', type: 'toggle', default: false },
    ],
  },
  {
    id: 'language',
    name: 'Language & Region',
    icon: GlobeAltIcon,
    settings: [
      { id: 'auto-translate', name: 'Auto-translate', description: 'Automatically translate content to your preferred language', type: 'toggle', default: false },
      { id: '24h-time', name: '24-hour time', description: 'Use 24-hour time format', type: 'toggle', default: false },
    ],
  },
]

export default function Settings() {
  const [enabled, setEnabled] = useState<{ [key: string]: boolean }>(() => {
    const initialState: { [key: string]: boolean } = {}
    settingSections.forEach(section => {
      section.settings.forEach(setting => {
        initialState[setting.id] = setting.default
      })
    })
    return initialState
  })

  return (
    <div className="fade-in">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Manage your preferences and customize your experience.
        </p>

        <div className="mt-6 space-y-6">
          {settingSections.map((section) => (
            <div
              key={section.id}
              className="settings-section"
            >
              <div className="settings-header">
                <section.icon className="settings-icon" aria-hidden="true" />
                <h2 className="settings-title">{section.name}</h2>
              </div>
              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="settings-item"
                  >
                    <div className="settings-content">
                      <h3 className="settings-label">{setting.name}</h3>
                      <p className="settings-description">{setting.description}</p>
                    </div>
                    <Switch
                      checked={enabled[setting.id]}
                      onChange={(checked) => setEnabled(prev => ({ ...prev, [setting.id]: checked }))}
                      className={clsx(
                        enabled[setting.id] ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-200',
                        'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={clsx(
                          enabled[setting.id] ? 'translate-x-4' : 'translate-x-0',
                          'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                      />
                    </Switch>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
