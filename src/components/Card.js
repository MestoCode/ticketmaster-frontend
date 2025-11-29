function Card({ title, description, image, date, location, price, onBookNow }) {
  return (
    <div className='bg-primary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>
      {image && (
        <div className='h-48 overflow-hidden'>
          <img 
            src={image} 
            alt={title} 
            className='w-full h-full object-cover'
          />
        </div>
      )}
      <div className='p-6'>
        <h3 className='text-xl font-bold text-white mb-2'>
          {title}
        </h3>
        {description && (
          <p className='text-white/70 text-sm mb-4'>
            {description}
          </p>
        )}
        <div className='flex flex-col gap-2 mb-4'>
          {date && (
            <div className='flex items-center text-primary_hint text-sm'>
              <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
              {date}
            </div>
          )}
          {location && (
            <div className='flex items-center text-primary_hint text-sm'>
              <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
              {location}
            </div>
          )}
        </div>
        <div className='flex justify-between items-center'>
          {price && (
            <span className='text-2xl font-bold text-primary_golden'>
              ${price}
            </span>
          )}
          <button 
            onClick={onBookNow}
            className='bg-primary_important hover:bg-primary_hint text-white px-4 py-2 rounded-md text-sm font-semibold transition duration-300'
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

