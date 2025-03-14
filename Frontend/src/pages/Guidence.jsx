import React from 'react'

const Guidence = () => {
  return (
    <div>
             

        {/* How It Works Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Upload Audio</h3>
                <p>
                  Submit the audio file you wish to analyze through our secure
                  platform.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-bold text-xl mb-2">AI Analysis</h3>
                <p>
                  Our advanced algorithms process the file to detect any
                  synthetic elements.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-bold text-xl mb-2">View Results</h3>
                <p>
                  Receive a detailed report on the audio's authenticity with
                  confidence scores.
                </p>
              </div>
            </div>
          </div>
        </section>





    </div>
  )
}

export default Guidence
