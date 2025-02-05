const mongoose = require("mongoose");

/*
 * Sample activities data to seed the database.
 * This dataset conforms to the validation rules defined in Schema.js.
 *
 * Each activity object includes the following fields:
 *  - name: A required string (3-100 characters) describing the activity title.
 *  - description: A required string (50-2000 characters) providing a detailed explanation.
 *  - images: An array (minimum 1, maximum 5) of image objects. Each image must have:
 *      • filename: A string ending with .jpg, .jpeg, or .png.
 *      • url: A valid URI.
 *  - difficulty: A string value that must be one of ["Beginner", "Intermediate", "Advanced", "Expert"].
 *  - price: A number between 0 and 10,000 (with two decimals).
 *  - location: A required string containing the location name (alphanumeric with allowed characters).
 *  - country: A required 2-letter uppercase country code (e.g., "NP" for Nepal, "IN" for India).
 *  - duration: A required string following the format: "<number> <unit>", where unit can be hour(s), day(s) or week(s).
 *  - guideRequired: A required boolean indicating if a guide is needed for the activity.
 *  - geometry: An object conforming to GeoJSON's Point type, including:
 *      • type: Always "Point".
 *      • coordinates: An array containing longitude and latitude (in that order).
 *  - createdAt: A Date object representing the time when the activity was created.
 *  - reviews: An empty array placeholder for storing review objects.
 *  - owner: A mongoose ObjectId referencing the user who owns this activity.
 */

// Reusable owner id for sample data. In a real application, this should come from the users collection.
const sampleOwnerId = new mongoose.Types.ObjectId("67962e7128a4be496cd9787d");

const activities = [
  {
    name: "Trekking to Everest Base Camp",
    description:
      "Experience the ultimate high-altitude adventure with our guided trek to Everest Base Camp. Witness breathtaking Himalayan views and immerse yourself in Sherpa culture, making it a journey of a lifetime.",
    images: [
      {
        filename: "everest1.jpg", // Must be .jpg, .jpeg, or .png
        url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
      }
    ],
    difficulty: "Expert", // One of: Beginner, Intermediate, Advanced, Expert
    price: 2500.00,
    location: "Khumbu", // Location name
    country: "NP", // 2-letter country code for Nepal
    duration: "14 days", // Format: number + space + (hour[s]|day[s]|week[s])
    guideRequired: true, // Indicates a guide is required
    geometry: {
      type: "Point",
      coordinates: [86.9250, 27.9881] // Approximate coordinates for Everest Base Camp (longitude, latitude)
    },
    createdAt: new Date(),
    reviews: [], // Placeholder for future review objects
    owner: sampleOwnerId,
  },
  {
    name: "Scuba Diving in Andaman",
    description:
      "Discover the vibrant coral reefs and exotic marine life in the crystal-clear waters of Andaman Islands, offering an unforgettable underwater experience.",
    images: [
      {
        filename: "andaman1.jpg",
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      }
    ],
    difficulty: "Intermediate",
    price: 150.00,
    location: "Havelock Island",
    country: "IN", // Country code for India
    duration: "3 hours", // Duration given in hours
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [92.87, 11.94] // Dummy coordinates for Havelock Island
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "River Rafting in Rishikesh",
    description:
      "Navigate through thrilling rapids on the sacred Ganges River with experienced guides, ensuring both adventure and safety.",
    images: [
      {
        filename: "rishikesh1.jpg",
        url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
      }
    ],
    difficulty: "Intermediate",
    price: 50.00,
    location: "Rishikesh",
    country: "IN",
    duration: "4 hours",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [78.30, 30.09] // Approximate coordinates for Rishikesh
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Desert Safari in Jaisalmer",
    description:
      "Experience the magic of Thar Desert with camel rides, camping under stars, and an immersive journey into traditional Rajasthani culture.",
    images: [
      {
        filename: "jaisalmer1.jpg",
        url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
      }
    ],
    difficulty: "Beginner",
    price: 80.00,
    location: "Jaisalmer",
    country: "IN",
    duration: "2 days",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [70.91, 26.92] // Coordinates for Jaisalmer
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Rock Climbing in Hampi",
    description:
      "Scale the unique boulder formations of Hampi with professional climbing instructors, perfect for those seeking an adrenaline-filled challenge.",
    images: [
      {
        filename: "hampi1.jpg",
        url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
      }
    ],
    difficulty: "Advanced",
    price: 70.00,
    location: "Hampi",
    country: "IN",
    duration: "6 hours",
    guideRequired: false, // A guide is not required for this activity
    geometry: {
      type: "Point",
      coordinates: [76.46, 15.34] // Approximate coordinates for Hampi
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Paragliding in Bir Billing",
    description:
      "Soar through the skies with panoramic views of the Dhauladhar range in the world's second-best paragliding site, offering an exhilarating airborne adventure.",
    images: [
      {
        filename: "billing1.jpg",
        url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
      }
    ],
    difficulty: "Intermediate",
    price: 90.00,
    location: "Bir Billing",
    country: "IN",
    duration: "1 hour", // Duration updated to conform with allowed format
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [77.23, 32.05] // Coordinates for Bir Billing
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Hot Air Balloon Ride in Cappadocia",
    description:
      "Experience the serene beauty of Cappadocia from above with our hot air balloon rides. Drift over the unique rock formations and fairy chimneys while enjoying a tranquil and unforgettable adventure.",
    images: [
      {
        filename: "cappadocia1.jpg",
        url: "https://images.unsplash.com/photo-1502920917128-1aa500764b1b",
      }
    ],
    difficulty: "Beginner",
    price: 300.00,
    location: "Cappadocia",
    country: "TR", // Country code for Turkey
    duration: "2 hours",
    guideRequired: false, // Guide is not required for this activity
    geometry: {
      type: "Point",
      coordinates: [34.83, 38.66] // Approximate coordinates for Cappadocia
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Safari Adventure in Kenya",
    description:
      "Embark on an unforgettable safari adventure in Kenya's Maasai Mara. Encounter majestic wildlife in their natural habitat and enjoy guided tours that bring you up close with nature.",
    images: [
      {
        filename: "safari1.jpg",
        url: "https://images.unsplash.com/photo-1573497165641-5c1a22e9b254",
      }
    ],
    difficulty: "Advanced",
    price: 1200.00,
    location: "Maasai Mara",
    country: "KE", // Country code for Kenya
    duration: "5 days",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [35.00, -1.50] // Dummy coordinates for Maasai Mara
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Skiing in the Alps",
    description:
      "Challenge yourself on the pristine slopes of the Alps. Our skiing package includes expert guidance, quality equipment, and breathtaking mountain views for an exhilarating winter adventure.",
    images: [
      {
        filename: "alps1.png", // Valid image file format: png
        url: "https://images.unsplash.com/photo-1516569427618-cbd2315f54d0",
      }
    ],
    difficulty: "Expert",
    price: 500.00,
    location: "Chamonix",
    country: "FR", // Country code for France
    duration: "7 days",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [6.87, 45.92] // Approximate coordinates for Chamonix
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Cultural Tour in Rome",
    description:
      "Discover the rich history and vibrant culture of Rome on our comprehensive tour. Visit ancient ruins, museums, and culinary hotspots while experiencing the heart of Italy.",
    images: [
      {
        filename: "rome1.jpeg", // Valid image file format: jpeg
        url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      }
    ],
    difficulty: "Intermediate",
    price: 200.00,
    location: "Rome",
    country: "IT", // Country code for Italy
    duration: "4 hours",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [12.50, 41.90] // Approximate coordinates for Rome
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
];

module.exports = activities;
