import React from 'react'

const SpecificGroupsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Services for Specific Groups</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Young Women Section */}
        <div className="bg-pink-50 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Young Women</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Career guidance and mentorship</li>
            <li>Self-defense training</li>
            <li>Personal development workshops</li>
            <li>Financial literacy programs</li>
          </ul>
        </div>

        {/* Mothers Section */}
        <div className="bg-purple-50 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Mothers</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Parenting support groups</li>
            <li>Child care resources</li>
            <li>Work-life balance counseling</li>
            <li>Health and wellness programs</li>
          </ul>
        </div>

        {/* Working Women Section */}
        <div className="bg-blue-50 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Working Women</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Professional networking events</li>
            <li>Leadership development</li>
            <li>Workplace rights awareness</li>
            <li>Stress management workshops</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg mb-4">
          Need more information? Contact us to learn more about our specialized programs.
        </p>
        <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition">
          Contact Us
        </button>
      </div>
    </div>
  )
}

export default SpecificGroupsPage
