import React from 'react'

const Testimonials = () => {
    return (
        <div className="py-16">
            <div className="container mx-auto px-4 mt-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-red-400">What Our Members Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:pr-40 lg:pl-40">
                    <div className="backdrop-blur-lg p-6 rounded-lg shadow-md">
                        <p className="text-white italic mb-4">&quot;Shakti Sabha has been transformative in my spiritual journey. The community and guidance here are invaluable.&quot;</p>
                        <div className="flex items-center">
                            <div>
                                <h4 className="font-semibold">Priya Sharma</h4>
                                <p className="text-white text-sm">Member since 2020</p>
                            </div>
                        </div>
                    </div>

                    <div className="backdrop-blur-xl p-6 rounded-lg shadow-md">
                        <p className="text-white italic mb-4">&quot;The teachings and practices shared here have helped me develop a deeper connection with my spiritual self.&quot;</p>
                        <div className="flex items-center">
                            <div>
                                <h4 className="font-semibold">Amit Patel</h4>
                                <p className="text-white text-sm">Member since 2021</p>
                            </div>
                        </div>
                    </div>

                    <div className="backdrop-blur-xl p-6 rounded-lg shadow-md">
                        <p className="text-white italic mb-4">&quot;A wonderful community that promotes spiritual growth and inner peace through authentic teachings.&quot;</p>
                        <div className="flex items-center">
                            <div>
                                <h4 className="font-semibold">Suman Verma</h4>
                                <p className="text-white text-sm">Member since 2019</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials
