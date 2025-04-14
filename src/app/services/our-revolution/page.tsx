import React from 'react'

const page = () => {
  return (
       <div className="min-h-screen  text-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-red-400 mt-12">Our Revolution</h1>
        <div className="space-y-6 text-lg">
            <ul className="space-y-4 text-left list-disc list-inside">
            <li><span className="font-semibold">200+</span> school events</li>
            <li><span className="font-semibold">70+</span> college events</li>
            <li><span className="font-semibold">180</span> village events</li>
            <li><span className="font-semibold">100+</span> live webinars</li>
            <li><span className="font-semibold">120+</span> counseling sessions for victims and other women</li>
            <li><strong>Mission Mardini</strong> - Training in self-defense</li>
            <li><strong>Shakti Varta</strong> - Cultural talks</li>
            <li><strong>Shakti Bhava</strong> - Rise of Shakti sessions</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default page
