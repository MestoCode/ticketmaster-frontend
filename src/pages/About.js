import profileImage from '../assets/avatar_male.jpg';

function About() {
  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <h1 className='text-4xl md:text-5xl font-bold text-white mb-3 text-center'>
          About This Project
        </h1>
        <p className='text-primary_hint text-center mb-12'>University Web Development Project</p>

        <div className='grid md:grid-cols-3 gap-8'>
          {/* Main Column - Left (2/3 width) */}
          <div className='md:col-span-2'>
            <div className='bg-primary rounded-2xl shadow-2xl overflow-hidden border border-primary_hint/20 p-8'>
              {/* Profile Image */}
              <div className='mb-8 flex justify-center'>
                <div className='w-48 h-48 rounded-full overflow-hidden border-4 border-primary_important shadow-xl'>
                  <img 
                    src={profileImage} 
                    alt='Developer Profile' 
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>

              {/* Project Description */}
              <div className='space-y-6 text-white/90'>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'> Hello, I'm Mesto</h2>
                  <p className='leading-relaxed'>
                    This is a university project created by me as part of my <span className='text-primary_hint font-semibold'>Web Development course</span>. 
                    This website showcases my skills in building modern, responsive web applications.
                  </p>
                </div>

                <div>
                  <h3 className='text-xl font-bold text-primary_important mb-3'>🛠️ Technologies Used</h3>
                  <ul className='space-y-2'>
                    <li className='flex items-center'>
                      <span className='w-2 h-2 bg-primary_hint rounded-full mr-3'></span>
                      <span><strong className='text-primary_hint'>React</strong> - Modern JavaScript library for building user interfaces</span>
                    </li>
                    <li className='flex items-center'>
                      <span className='w-2 h-2 bg-primary_hint rounded-full mr-3'></span>
                      <span><strong className='text-primary_hint'>Tailwind CSS</strong> - Utility-first CSS framework for styling</span>
                    </li>
                    <li className='flex items-center'>
                      <span className='w-2 h-2 bg-primary_hint rounded-full mr-3'></span>
                      <span><strong className='text-primary_hint'>React Router</strong> - Client-side routing and navigation</span>
                    </li>
                    <li className='flex items-center'>
                      <span className='w-2 h-2 bg-primary_hint rounded-full mr-3'></span>
                      <span><strong className='text-primary_hint'>Axios</strong> - HTTP client for API requests</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-xl font-bold text-primary_important mb-3'>🎫 API Integration</h3>
                  <p className='leading-relaxed'>
                    This project integrates with the <span className='text-primary_golden font-semibold'>Ticketmaster Discovery API</span> 
                    (<code className='bg-app_bg px-2 py-1 rounded text-sm'>app.ticketmaster.com</code>) to fetch real-time event data, 
                    including concerts, festivals, and live performances from around the world.
                  </p>
                </div>

                <div className='bg-app_bg rounded-lg p-4 border border-primary_hint/20'>
                  <p className='text-sm text-white/70'>
                    <strong className='text-primary_hint'>Note:</strong> This is an educational project developed for learning purposes. 
                    All event data is provided by Ticketmaster's public API.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Column - Right (1/3 width) */}
          <div className='space-y-6'>
            {/* Features Card */}
            <div className='bg-gradient-to-br from-primary_important to-primary_hint rounded-2xl shadow-xl p-6'>
              <h3 className='text-xl font-bold text-white mb-4'>✨ Features</h3>
              <ul className='space-y-3 text-white/90 text-sm'>
                <li>📱 Fully Responsive Design</li>
                <li>🎨 Modern UI/UX</li>
                <li>🔄 Real-time API Data</li>
                <li>📄 Pagination Support</li>
                <li>🎟️ Event Booking Flow</li>
                <li>🔐 Login System</li>
              </ul>
            </div>

            {/* Tech Stack Card */}
            <div className='bg-primary border border-primary_golden/20 rounded-2xl shadow-xl p-6'>
              <h3 className='text-xl font-bold text-primary_golden mb-4'>💻 Built With</h3>
              <div className='space-y-3'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-white/80'>React</span>
                  <span className='text-primary_hint font-semibold'>v19.2.0</span>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-white/80'>Tailwind CSS</span>
                  <span className='text-primary_hint font-semibold'>v3.4.18</span>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-white/80'>React Router</span>
                  <span className='text-primary_hint font-semibold'>v6.x</span>
                </div>
              </div>
            </div>

            {/* Academic Info Card */}
            <div className='bg-gradient-to-br from-primary_golden to-yellow-300 rounded-2xl shadow-xl p-6'>
              <h3 className='text-xl font-bold text-black mb-3'>🎓 Academic Project</h3>
              <p className='text-black/80 text-sm leading-relaxed'>
                Developed as part of coursework to demonstrate proficiency in modern web development practices and technologies.
              </p>
            </div>

            {/* Contact/Social Card */}
            <div className='bg-primary border border-primary_hint/20 rounded-2xl shadow-xl p-6 text-center'>
              <div className='w-16 h-16 bg-primary_hint/20 rounded-full mx-auto mb-3 flex items-center justify-center'>
                <svg className='w-8 h-8 text-primary_hint' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                </svg>
              </div>
              <p className='text-white/60 text-sm'>
                Learning & Building
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

