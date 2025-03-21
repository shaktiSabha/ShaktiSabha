import React from 'react';
import Link from 'next/link';

// Sample support group data (you could fetch this from an API)
const supportGroups = [
  {
    id: 1,
    name: 'Anxiety Support Group',
    description: 'A safe space for those dealing with anxiety.',
    members: 245,
    category: 'Mental Health',
    slug: 'anxiety-support',
  },
  {
    id: 2,
    name: 'Grief Recovery',
    description: 'Support for those coping with loss.',
    members: 180,
    category: 'Grief',
    slug: 'grief-recovery',
  },
  {
    id: 3,
    name: 'Parenting Challenges',
    description: 'Connect with other parents facing similar challenges.',
    members: 320,
    category: 'Family',
    slug: 'parenting-challenges',
  },
];

export default function SupportGroupsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-400 mb-4 mt-10">
            Support Groups
          </h1>
          <p className="text-xl text-amber-300 mb-8">
            Find a community that understands and supports you.
          </p>
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 animate-pulse"></div>
            <Link
              href="/join-us"
              className="relative inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:animate-none border-2 border-amber-300/20"
            >
              ✨ Join Us Today ✨
            </Link>
          </div>
        </div>

        {/* Support Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportGroups.map((group) => (
            <div
              key={group.id}
              className="backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-400"
            >
              <h2 className="text-xl font-semibold text-amber-400 mb-2">
                {group.name}
              </h2>
              <p className="text-amber-300 mb-4">{group.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-amber-100">
                  {group.members} Members
                </span>
                <span className="text-sm text-amber-200 font-medium">
                  {group.category}
                </span>
              </div>
              <Link
                href={`/support-groups/${group.slug}`}
                className="block text-center bg-amber-800 text-white-50 py-2 px-4 rounded-md hover:bg-amber-700 transition-colors duration-300"
              >
                Join Group
              </Link>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-amber-300 mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="/support-groups/create"
            className="inline-block bg-amber-600 text-white py-3 px-6 rounded-md hover:bg-amber-700 transition-colors duration-300"
          >
            Create Your Own Group
          </Link>
        </div>
      </div>
    </div>
  );
}