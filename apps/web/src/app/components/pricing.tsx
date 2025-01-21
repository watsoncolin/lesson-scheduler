import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Single Lesson',
    id: 'tier-single',
    href: '#',
    price: '$22',
    description: 'Try out our services with a single lesson.',
    features: ['Personal Instructor', 'Warm Waters', 'Felxible Scheduling'],
    mostPopular: false,
    button: 'Buy now',
  },
  {
    name: '10 Lesson pack',
    id: 'tier-10-lesson-pack',
    href: '#',
    price: '$20',
    description: 'A great value for families with multiple children.',
    features: ['Personal Instructor', 'Warm Waters', 'Felxible Scheduling'],
    mostPopular: false,
    button: 'Buy now',
  },
  {
    name: '30 Lesson pack',
    id: 'tier-30-lesson-pack',
    href: '#',
    price: '$17',
    description: 'Our best value for families with multiple children.',
    features: ['Personal Instructor', 'Warm Waters', 'Felxible Scheduling'],
    mostPopular: true,
    button: 'Buy now',
  },
  {
    name: 'Parents and Tots',
    id: 'tier-parents-tots',
    href: '#',
    price: '$45',
    description: 'Group lessons for parents and tots. ',
    features: ['Group Lessons', 'Warm Waters', 'Felxible Scheduling', 'Parent Participation', 'Socialization'],
    mostPopular: false,
    button: 'View schedule',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Pricing() {
  return (
    <div id="pricing" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for families of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          We offer a variety of pricing plans for families of all sizes and interest level. Choose the one that best
          fits your needs.
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map(tier => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
                'rounded-3xl p-8',
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                  'text-lg font-semibold leading-8',
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                )}
              >
                {tier.button}
              </a>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {tier.features.map(feature => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
