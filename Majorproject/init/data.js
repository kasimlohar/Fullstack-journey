const mongoose = require("mongoose");

const activities = [
  {
    name: "Trekking to Everest Base Camp",
    description:
      "Experience the ultimate high-altitude adventure with our guided trek to Everest Base Camp. Witness breathtaking Himalayan views and immerse yourself in Sherpa culture.",
    image: {
      filename: "everest1.jpg",
      url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
    },
    difficulty: "Extreme",
    price: 2500,
    location: "Khumbu",
    country: "Nepal",
    duration: "14 days",
    createdAt: new Date(),
    reviews: [],
    owner: new mongoose.Types.ObjectId("67962e7128a4be496cd9787d"),
  },
  {
    name: "Scuba Diving in Andaman",
    description:
      "Discover the vibrant coral reefs and exotic marine life in the crystal-clear waters of Andaman Islands.",
    image: {
      filename: "andaman1.jpg",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    },
    difficulty: "Medium",
    price: 150,
    location: "Havelock Island",
    country: "India",
    duration: "3 hours",
    createdAt: new Date(),
    reviews: [],
    owner: new mongoose.Types.ObjectId("67962e7128a4be496cd9787d"),
  },
  {
    name: "River Rafting in Rishikesh",
    description:
      "Navigate through thrilling rapids on the sacred Ganges River with experienced guides.",
    image: {
      filename: "rishikesh1.jpg",
      url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
    },
    difficulty: "Medium",
    price: 50,
    location: "Rishikesh",
    country: "India",
    duration: "4 hours",
    createdAt: new Date(),
    reviews: [],
    owner: new mongoose.Types.ObjectId("67962e7128a4be496cd9787d"),
  },
  {
    name: "Desert Safari in Jaisalmer",
    description:
      "Experience the magic of Thar Desert with camel rides, camping under stars, and traditional Rajasthani culture.",
    image: {
      filename: "jaisalmer1.jpg",
      url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
    },
    difficulty: "Easy",
    price: 80,
    location: "Jaisalmer",
    country: "India",
    duration: "2 days",
    createdAt: new Date(),
    reviews: [],
    owner: new mongoose.Types.ObjectId("67962e7128a4be496cd9787d"),
  },
  {
    name: "Rock Climbing in Hampi",
    description:
      "Scale the unique boulder formations of Hampi with professional climbing instructors.",
    image: {
      filename: "hampi1.jpg",
      url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
    },
    difficulty: "Hard",
    price: 70,
    location: "Hampi",
    country: "India",
    duration: "6 hours",
    createdAt: new Date(),
    reviews: [],
    owner: new mongoose.Types.ObjectId("67962e7128a4be496cd9787d"),
  },
  {
    name: "Paragliding in Bir Billing",
    description:
      "Soar through the skies with panoramic views of the Dhauladhar range in the world's second-best paragliding site.",
    image: {
      filename: "billing1.jpg",
      url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
    },
    difficulty: "Medium",
    price: 90,
    location: "Bir Billing",
    country: "India",
    duration: "30 minutes",
    createdAt: new Date(),
    reviews: [],
    owner: new mongoose.Types.ObjectId("67962e7128a4be496cd9787d"),
  },
];

module.exports = activities;
