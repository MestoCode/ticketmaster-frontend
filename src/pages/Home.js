import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import homepageImage from '../assets/homepage-main.jpg';
import Card from '../components/Card';
import Spinner from '../components/Spinner';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBookNow = (event) => {
    navigate('/tickets', { state: { eventData: event } });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          'https://app.ticketmaster.com/discovery/v2/events',
          {
            params: {
              apikey: process.env.REACT_APP_TICKETMASTER_API_KEY,
              locale: '*',
              size: 15
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
  }, []);

  return (
    <>
      <div className='w-full relative'>
        <img
          src={homepageImage}
          alt="Homepage"
          className='w-full h-screen object-cover'
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center -mt-20 md:-mt-32 '>
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-primary_hint text-sm font-medium mb-6 border border-white/30">
            Your Gateway to Live Entertainment
          </span>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4 drop-shadow-2xl mb-6'>
            Experience the Magic of <span className='text-primary_hint'>Live Events</span>
          </h1>
          <p className='text-lg md:text-xl text-white/90 text-center px-4 max-w-3xl mb-8'>
            Discover and book tickets for the hottest concerts, festivals, and events worldwide. Unforgettable moments await.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 px-4'>
            <button onClick={() => navigate('/events')} className='px-8 py-3 bg-primary_important text-white font-semibold rounded-lg hover:bg-primary_hint transition duration-300 shadow-lg'>
              Explore Events
            </button>
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div id='featured-events' className='container mx-auto px-4 py-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-8 text-center'>
          Featured Events
        </h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {events.slice(0, 12).map(event => (
              <Card
                key={event.id}
                title={event.name}
                description={event.venue ? `${event.venue}${event.city ? `, ${event.city}` : ''}` : ''}
                date={event.date}
                location={event.city || 'Location TBA'}
                price={`${event.priceRange.min} - ${event.priceRange.max}`}
                image={event.image}
                info={event.info}
                onBookNow={() => handleBookNow(event)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;

