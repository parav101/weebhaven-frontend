// import { useState,useEffect } from 'react'

function About() {
  return (
    <>
      <section className="bg-gray-100/80 mt-2">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Me</h2>
              <p className="mt-4 text-gray-600 text-lg">Hi my name is Paravdeep Singh, I'm detail-oriented and motivated new developer. Eager to apply my knowledge and contribute to dynamic projects while continuously expanding my skill set. Seeking an opportunity to work with a collaborative team in a growth-oriented environment to develop innovative solutions that drive success for both the company and its clients.</p>
              <div className="mt-8">
               
              </div>
            </div>
            <div className="mt-12 md:mt-0">
              <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" alt="About Us Image" className="object-cover rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
