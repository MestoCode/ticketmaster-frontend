import { useLocation } from 'react-router-dom';
import fakeQR from '../assets/fake-qr.jpg';

function MyTickets() {
  const location = useLocation();
  const eventData = location.state?.eventData;

  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='container mx-auto max-w-5xl'>
        <h1 className='text-4xl md:text-5xl font-bold text-white mb-2 text-center'>
          My Tickets
        </h1>
        <p className='text-primary_hint text-center mb-12'>Your confirmed event booking</p>

        {eventData ? (
          <div className='grid md:grid-cols-3 gap-8'>
            {/* Main Ticket Card */}
            <div className='md:col-span-2'>
              <div className='bg-gradient-to-br from-primary via-primary to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-primary_hint/20'>
                {/* Header with Image */}
                {eventData.image && (
                  <div className='relative h-64 overflow-hidden'>
                    <img
                      src={eventData.image}
                      alt={eventData.name}
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='absolute bottom-4 left-6'>
                      <span className='inline-block px-4 py-1 bg-primary_important rounded-full text-white text-sm font-semibold'>
                        Confirmed
                      </span>
                    </div>
                  </div>
                )}

                {/* Event Details */}
                <div className='p-8'>
                  <h2 className='text-3xl font-bold text-white mb-6'>
                    {eventData.name}
                  </h2>

                  <div className='space-y-4'>
                    {/* Date */}
                    {eventData.date && (
                      <div className='flex items-start'>
                        <div className='w-12 h-12 bg-primary_important/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
                          <svg className='w-6 h-6 text-primary_important' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                          </svg>
                        </div>
                        <div>
                          <p className='text-primary_hint text-sm font-semibold'>Event Date</p>
                          <p className='text-white text-lg'>{eventData.date}</p>
                        </div>
                      </div>
                    )}

                    {/* Venue */}

                    {eventData.venue && (
                      <div className='flex items-start'>
                        <div className='w-12 h-12 bg-primary_golden/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
                          <svg className='w-6 h-6 text-primary_golden' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                          </svg>
                        </div>
                        <div>
                          <p className='text-primary_hint text-sm font-semibold'>Venue</p>
                          <p className='text-white text-lg'>{eventData.venue}</p>
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {eventData.city && (
                      <div className='flex items-start'>
                        <div className='w-12 h-12 bg-primary_hint/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
                          <svg className='w-6 h-6 text-primary_hint' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                          </svg>
                        </div>
                        <div>
                          <p className='text-primary_hint text-sm font-semibold'>Location</p>
                          <p className='text-white text-lg'>{eventData.city}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ticket URL */}
                  {eventData.url && (
                    <a
                      href={eventData.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='mt-8 w-full block text-center bg-primary_important hover:bg-primary_hint text-white font-semibold py-4 px-6 rounded-xl transition duration-300 shadow-lg hover:shadow-xl'
                    >
                      View Official Event Page
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Price & Additional Info */}
            <div className='space-y-6'>
              {/* Price Card */}
              <div className='bg-gradient-to-br from-primary_golden to-yellow-300 rounded-2xl shadow-xl p-6'>
                <p className='text-black/70 text-sm font-semibold mb-2'>Total Price</p>
                <div className='flex items-baseline'>
                  <span className='text-4xl font-bold text-black'>${eventData.priceRange?.min || 'N/A'}</span>
                  {eventData.priceRange?.max && (
                    <span className='text-xl text-black/70 ml-2'>- ${eventData.priceRange.max}</span>
                  )}
                </div>
                <p className='text-black/60 text-xs mt-2'>Price range per ticket</p>
              </div>

              {/* Event ID Card */}
              <div className='bg-primary border border-primary_hint/20 rounded-2xl shadow-xl p-6'>
                <p className='text-primary_hint text-sm font-semibold mb-2'>Event ID</p>
                <p className='text-white text-sm font-mono break-all'>{eventData.id}</p>
              </div>

              {/* Ticket Limit Info */}
              {eventData.ticketLimit?.info && (
                <div className='bg-primary border border-primary_important/20 rounded-2xl shadow-xl p-6'>
                  <div className='flex items-center mb-3'>
                    <svg className='w-5 h-5 text-primary_important mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <p className='text-primary_important text-sm font-semibold'>Ticket Information</p>
                  </div>
                  <p className='text-white/80 text-sm'>{eventData.ticketLimit.info}</p>
                </div>
              )}

              {/* QR Code */}
              <div className='bg-white rounded-2xl shadow-xl p-6 text-center'>
                <div className='w-32 h-32 mx-auto mb-3'>
                  <img 
                    src={fakeQR} 
                    alt='QR Code' 
                    className='w-full h-full object-contain'
                  />
                </div>
                <p className='text-gray-600 text-xs'>Booking Confirmation</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center py-20'>
            <div className='w-24 h-24 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center'>
              <svg className='w-12 h-12 text-primary_hint' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-white mb-3'>No Tickets Yet</h2>
            <p className='text-white/60 mb-8 max-w-md mx-auto'>
              You haven't booked any events yet. Browse our featured events and book your tickets to see them here.
            </p>
            <a
              href='/'
              className='inline-block bg-primary_important hover:bg-primary_hint text-white font-semibold py-3 px-8 rounded-lg transition duration-300'
            >
              Browse Events
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTickets;

