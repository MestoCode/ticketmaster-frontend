import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';
import Spinner from '../components/Spinner';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleBookNow = (event) => {
    navigate('/tickets', { state: { eventData: event } });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://app.ticketmaster.com/discovery/v2/events',
          {
            params: {
              apikey: process.env.REACT_APP_TICKETMASTER_API_KEY,
              locale: '*',
              size: 20,
              page: page
            }
          }
        );

        if (response.data._embedded && response.data._embedded.events) {
          const fetchedEvents = response.data._embedded.events.map(event => {
            // Find the specific image
            const image = event.images?.find(
              img => img.ratio === '16_9' && img.width === 205 && img.height === 115
            );

            // Generate random price range between 20-40 if not available
            const priceRange = event.priceRanges?.[0] || {
              min: Math.floor(Math.random() * 21) + 20,
              max: Math.floor(Math.random() * 21) + 20
            };

            return {
              id: event.id,
              name: event.name,
              url: event.url,
              image: image?.url || event.images?.[0]?.url,
              date: event.dates?.start?.localDate,
              venue: event._embedded?.venues?.[0]?.name,
              city: event._embedded?.venues?.[0]?.city?.name,
              priceRange: priceRange,
              ticketLimit: event.ticketLimit
            };
          });

          setEvents(fetchedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold text-white mb-2'>
        All Events
      </h1>
      <p className='text-white/60 mb-8'>
        Browse all available events and find your next experience.
      </p>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {events.map(event => (
              <Card
                key={event.id}
                title={event.name}
                description={event.venue ? `${event.venue}${event.city ? `, ${event.city}` : ''}` : ''}
                date={event.date}
                location={event.city || 'Location TBA'}
                price={`${event.priceRange.min} - ${event.priceRange.max}`}
                image={event.image}
                onBookNow={() => handleBookNow(event)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className='flex justify-center items-center gap-4 py-8'>
            <button
              onClick={handlePrevPage}
              disabled={page === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                page === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary_important text-white hover:bg-primary_hint'
              }`}
            >
              Previous
            </button>
            <span className='text-white font-semibold'>
              Page {page + 1}
            </span>
            <button
              onClick={handleNextPage}
              className='px-6 py-3 bg-primary_important text-white hover:bg-primary_hint rounded-lg font-semibold transition duration-300'
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Events;

