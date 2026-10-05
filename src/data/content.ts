import heroParisEiffel from '@/images/hero-paris-eiffel.png';

export type DestinationId = 'paris' | 'riviera' | 'lafayette';

export type Tour = {
  id: string;
  destination: DestinationId;
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  duration: string;
  price: string;
  rating: string;
  meetingPoint: string;
  highlights: string[];
  included: string[];
  bookingUrl: string;
};

/** Builds a 1280px Wikimedia Commons thumbnail URL from its "a/ab/File.jpg" path. */
const commons = (rel: string) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${rel}/1280px-${rel.split('/').pop()}`;

// Every photo below was checked to show the place it is labelled as.
// Replace with your own images in /src/images/ whenever you're ready.
export const images = {
  heroParisEiffel, // your image
  eiffel: heroParisEiffel, // your image
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80', // Eiffel Tower over the Seine at sunset
  seineBridge: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&q=80', // Pont Alexandre III at dusk
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1400&q=80', // Wine glasses toast
  lafayette: 'https://images.pexels.com/photos/37392050/pexels-photo-37392050.jpeg?auto=compress&cs=tinysrgb&w=1600', // Galeries Lafayette dome
  riviera: 'https://images.pexels.com/photos/105950/pexels-photo-105950.jpeg?auto=compress&cs=tinysrgb&w=1600', // Villefranche-sur-Mer bay
  // Wikimedia Commons (CC BY-SA) — credited in the footer via photoCredits
  montmartre: commons('c/c5/Le_sacre_coeur.jpg'),
  louvre: commons('6/66/Louvre_Museum_Wikimedia_Commons.jpg'),
  versailles: commons('9/95/Vue_a%C3%A9rienne_du_domaine_de_Versailles_par_ToucanWings_-_Creative_Commons_By_Sa_3.0_-_081_%28cropped%29.jpg'),
  nice: commons('b/ba/Promenade_des_Anglais_Nice_IMG_1255.jpg'),
  monaco: commons('6/6a/Port_Hercules%2C_Monaco.jpg'),
};

/** Attribution required by the CC BY-SA licences of the Wikimedia photos. */
export const photoCredits = [
  { subject: 'Sacré-Cœur', author: 'Tonchino', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Le_sacre_coeur.jpg' },
  { subject: 'Louvre', author: 'Benh LIEU SONG', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Louvre_Museum_Wikimedia_Commons.jpg' },
  { subject: 'Versailles', author: 'ToucanWings', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Vue_a%C3%A9rienne_du_domaine_de_Versailles_par_ToucanWings_-_Creative_Commons_By_Sa_3.0_-_081_(cropped).jpg' },
  { subject: 'Nice', author: 'Alexander Migl', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', source: 'https://commons.wikimedia.org/wiki/File:Promenade_des_Anglais_Nice_IMG_1255.jpg' },
  { subject: 'Monaco', author: 'Uhooep', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', source: 'https://commons.wikimedia.org/wiki/File:Port_Hercules,_Monaco.jpg' },
];


export const tours: Tour[] = [
  {
    id: '1',
    destination: 'paris',
    title: 'The Grand Wine & Cheese Experience', 
    slug: 'wine-cheese-experience', 
    category: 'Food Tours', 
    image: images.wine,
    description: 'Indulge in an exquisite journey through Paris\'s finest wines and artisan cheeses, guided by expert sommeliers who reveal the secrets behind perfect pairings.', 
    duration: '2.5 hours', 
    price: 'From £60', 
    rating: '4.9', 
    meetingPoint: 'Central Paris - Marais District',
    highlights: ['Premium selection of 5 French wines', 'Expert sommelier with 10+ years experience', 'Handcrafted artisan cheese from local producers', 'Intimate small groups (max 8 people)'], 
    included: ['5 wine tastings', 'Artisan cheese pairings', 'Expert sommelier guide', 'Tasting notes booklet', 'Water & palate cleansers'], 
    bookingUrl: 'https://www.paristopsightstours.com/',
  },
  {
    id: '2',
    destination: 'paris',
    title: 'Essential Paris Walking Discovery', 
    slug: 'essential-paris-walk', 
    category: 'Walking Tours', 
    image: images.eiffel,
    description: 'Uncover the enchanting secrets of Paris on foot through charming streets, iconic landmarks, and hidden courtyards only locals know about.', 
    duration: '3 hours', 
    price: 'From £45', 
    rating: '4.8', 
    meetingPoint: 'Notre-Dame Cathedral Square',
    highlights: ['Secret passages and hidden courtyards', 'Iconic landmarks & photo opportunities', 'Local stories from expert guide', 'Small intimate group experience'], 
    included: ['Professional local guide', 'Walking tour of 15+ sites', 'Historical insights & anecdotes', 'Photo opportunities', 'Paris map & recommendations'], 
    bookingUrl: 'https://www.paristopsightstours.com/',
  },
  {
    id: '3',
    destination: 'paris',
    title: 'Montmartre Artists & Breakfast Walk', 
    slug: 'montmartre-walking', 
    category: 'Walking Tours', 
    image: images.montmartre,
    description: 'Step into the artistic soul of Paris with a morning walk through Montmartre\'s cobblestone streets, followed by an authentic French breakfast.', 
    duration: '3 hours', 
    price: 'From £50', 
    rating: '4.9', 
    meetingPoint: 'Abbesses Metro Station',
    highlights: ['Sacré-Cœur Basilica visit', 'Artists\' square & local galleries', 'Authentic French breakfast included', 'Picasso & Van Gogh historical sites'], 
    included: ['Traditional French breakfast', 'Expert art historian guide', 'Small group (max 10)', 'Historical stories & legends'], 
    bookingUrl: 'https://www.paristopsightstours.com/',
  },
  {
    id: '4',
    destination: 'paris',
    title: 'Seine River Cruise & Eiffel Tower Access', 
    slug: 'seine-eiffel', 
    category: 'Sightseeing', 
    image: images.paris,
    description: 'Experience Paris from both water and sky - cruise the romantic Seine River, then ascend the iconic Eiffel Tower for breathtaking panoramic views.', 
    duration: '4 hours', 
    price: 'From £85', 
    rating: '5.0', 
    meetingPoint: 'Port de la Bourdonnais',
    highlights: ['1-hour scenic Seine River cruise', 'Priority access to Eiffel Tower', 'Second level viewing deck', 'Panoramic city views'], 
    included: ['River cruise ticket', 'Eiffel Tower priority entry', 'Professional tour guide', 'Audio commentary (8 languages)', 'Paris souvenir'], 
    bookingUrl: 'https://www.paristopsightstours.com/',
  },
  {
    id: '5',
    destination: 'paris',
    title: 'Louvre Masterpieces Guided Tour', 
    slug: 'louvre-museum', 
    category: 'Sightseeing', 
    image: images.louvre,
    description: 'Discover world-famous masterpieces including the Mona Lisa, Venus de Milo, and more with skip-the-line access and an expert art historian guide.', 
    duration: '3 hours', 
    price: 'From £70', 
    rating: '4.8', 
    meetingPoint: 'Louvre Pyramid Entrance',
    highlights: ['Skip-the-line VIP access', 'See the Mona Lisa up close', 'Venus de Milo & Winged Victory', 'Expert art historian commentary'], 
    included: ['Museum entry ticket', 'Art historian guide', 'Wireless headsets', 'Small group (max 15)', 'Extended viewing time'], 
    bookingUrl: 'https://www.paristopsightstours.com/',
  },
  {
    id: '6',
    destination: 'paris',
    title: 'Versailles Palace Private Day Trip', 
    slug: 'versailles-day-trip', 
    category: 'Private Tours', 
    image: images.versailles,
    description: 'Escape to the opulent Palace of Versailles on a private day trip featuring the Hall of Mirrors, royal apartments, and magnificent gardens.', 
    duration: '6 hours', 
    price: 'From £120', 
    rating: '4.9', 
    meetingPoint: 'Hotel pickup in central Paris',
    highlights: ['Hall of Mirrors grand gallery', 'Royal apartments tour', 'Landscaped gardens exploration', 'Skip-the-line private access'], 
    included: ['Round-trip luxury transport', 'Skip-the-line entry', 'Private expert guide', 'Free time in gardens', 'Lunch recommendations'], 
    bookingUrl: 'https://www.paristopsightstours.com/',
  },

  // ---------- DEMO TOURS (placeholder content — not real listings yet) ----------
  // bookingUrl '/contact' sends guests to the enquiry form instead of an external site.
  {
    id: '7',
    destination: 'riviera',
    title: 'Nice Old Town & Promenade Walk',
    slug: 'nice-old-town-walk',
    category: 'Walking Tours',
    image: images.nice,
    description: 'Wander the pastel lanes of Vieux Nice, taste socca at the Cours Saleya market and finish with a stroll along the Promenade des Anglais.',
    duration: '3 hours',
    price: 'From £55',
    rating: '4.8',
    meetingPoint: 'Place Masséna, Nice',
    highlights: ['Cours Saleya flower & food market', 'Socca and local street food tasting', 'Castle Hill panoramic viewpoint', 'Promenade des Anglais sunset stroll'],
    included: ['Local guide', 'Street food tastings', 'Small group (max 12)', 'Restaurant recommendations'],
    bookingUrl: '/contact',
  },
  {
    id: '8',
    destination: 'riviera',
    title: 'Monaco & Monte-Carlo Day Trip',
    slug: 'monaco-day-trip',
    category: 'Day Trips',
    image: images.monaco,
    description: 'Follow the coastal road to Monaco for the Prince’s Palace, the yachts of Port Hercule and an evening glimpse of the Monte-Carlo Casino.',
    duration: '8 hours',
    price: 'From £95',
    rating: '4.9',
    meetingPoint: 'Hotel pickup in Nice',
    highlights: ['Prince’s Palace & changing of the guard', 'Port Hercule superyacht harbour', 'Monte-Carlo Casino square', 'Stop at the medieval village of Èze'],
    included: ['Round-trip transport', 'Expert driver-guide', 'Free time in Monaco', 'Bottled water'],
    bookingUrl: '/contact',
  },
  {
    id: '9',
    destination: 'riviera',
    title: 'Villefranche Bay Sunset Cruise',
    slug: 'villefranche-sunset-cruise',
    category: 'Sightseeing',
    image: images.riviera,
    description: 'Sail the turquoise bay of Villefranche-sur-Mer as the sun sets over Cap Ferrat, with a glass of rosé in hand.',
    duration: '2 hours',
    price: 'From £70',
    rating: '5.0',
    meetingPoint: 'Port de la Santé, Villefranche-sur-Mer',
    highlights: ['Golden-hour views of Cap Ferrat', 'Swim stop in clear water (summer)', 'Glass of Provençal rosé', 'Small boat, max 10 guests'],
    included: ['Skippered boat', 'Rosé & soft drinks', 'Snorkel gear', 'Towels'],
    bookingUrl: '/contact',
  },
  {
    id: '10',
    destination: 'lafayette',
    title: 'Personal Shopper Experience',
    slug: 'lafayette-personal-shopper',
    category: 'Shopping',
    image: images.lafayette,
    description: 'Shop Galeries Lafayette with a personal stylist who knows every floor, brand and hidden corner of the store.',
    duration: '2 hours',
    price: 'From £120',
    rating: '4.9',
    meetingPoint: 'Galeries Lafayette Haussmann, main entrance',
    highlights: ['One-to-one personal stylist', 'Curated looks for your style and budget', 'Priority fitting rooms', 'Tax-free shopping help'],
    included: ['Personal stylist', 'Welcome drink', 'Tax refund guidance', 'Hotel delivery advice'],
    bookingUrl: '/contact',
  },
  {
    id: '11',
    destination: 'lafayette',
    title: 'Dome & Rooftop Highlights Tour',
    slug: 'lafayette-dome-rooftop',
    category: 'Sightseeing',
    image: images.paris,
    description: 'Discover the story of the art nouveau dome, walk the glass skywalk and finish on the rooftop with a view to the Eiffel Tower.',
    duration: '1.5 hours',
    price: 'From £35',
    rating: '4.8',
    meetingPoint: 'Under the dome, ground floor',
    highlights: ['History of the 1912 art nouveau dome', 'The glass skywalk', 'Rooftop terrace view over Paris', 'Photo stops along the way'],
    included: ['Expert guide', 'Skywalk access', 'Small group (max 15)', 'Paris shopping map'],
    bookingUrl: '/contact',
  },
  {
    id: '12',
    destination: 'lafayette',
    title: 'Lafayette Gourmet Tasting',
    slug: 'lafayette-gourmet-tasting',
    category: 'Food Tours',
    image: images.wine,
    description: 'Taste your way through the Lafayette Gourmet food hall: chocolate, cheese, macarons and a French wine pairing.',
    duration: '2 hours',
    price: 'From £65',
    rating: '4.9',
    meetingPoint: 'Lafayette Gourmet, Boulevard Haussmann',
    highlights: ['Artisan chocolate & macarons', 'Cheese and charcuterie', 'French wine pairing', 'Tips for edible souvenirs'],
    included: ['All tastings', 'Food-loving guide', 'Small group (max 10)', 'Shopping list to take home'],
    bookingUrl: '/contact',
  },
];

/** Page, label and copy for each destination, used for listings and back-links. */
export const destinationInfo: Record<DestinationId, { label: string; to: string; about: string }> = {
  paris: {
    label: 'Paris tours',
    to: '/paris-tours',
    about: 'Embark on an unforgettable journey through the heart of Paris with Paris Top Sights Tours. Our guides combine local knowledge with authentic encounters, whether you’re discovering hidden courtyards or iconic landmarks.',
  },
  riviera: {
    label: 'Côte d’Azur',
    to: '/cote-dazur',
    about: 'Slow down on the French Riviera. Our small-group experiences leave room for long lunches, sea views and the scenic route between Nice, Monaco and the villages in between.',
  },
  lafayette: {
    label: 'Galeries Lafayette',
    to: '/galeries-lafayette',
    about: 'See Galeries Lafayette beyond the shop floors: its history, its dome, its food hall and its rooftop, with a host who makes the visit feel personal.',
  },
};

export const toursFor = (destination: DestinationId) => tours.filter((tour) => tour.destination === destination);

/** All tours share one detail page. */
export const tourPath = (tour: Pick<Tour, 'slug'>) => `/tours/${tour.slug}`;

/** Unique categories for a list of tours, in first-seen order. */
export const categoriesOf = (list: Tour[]) => [...new Set(list.map((tour) => tour.category))];

export const destinations = [
  { 
    title: 'Paris Tours', 
    eyebrow: 'The City of Light', 
    description: 'Immerse yourself in the timeless beauty, rich history, and vibrant culture of Paris with our expertly curated experiences led by passionate local guides.', 
    image: images.eiffel, 
    to: '/paris-tours' 
  },
  { 
    title: "Côte d'Azur", 
    eyebrow: 'The French Riviera', 
    description: 'Experience the dazzling glamour, luxury, and breathtaking coastal charm of the French Riviera where azure waters meet Mediterranean elegance.', 
    image: images.riviera, 
    to: '/cote-dazur' 
  },
  { 
    title: 'Galeries Lafayette', 
    eyebrow: 'Parisian Icon', 
    description: "Shop the world's most prestigious luxury brands beneath the stunning art nouveau dome at Paris's legendary Galeries Lafayette department store.", 
    image: images.lafayette, 
    to: '/galeries-lafayette' 
  },
];

export const booking = {
  paris: 'https://www.paristopsightstours.com/',
  riviera: 'https://www.paristopsightstours.com/',
  rendzo: 'https://www.paristopsightstours.com/',
};
