const mongoose = require("mongoose");

// Reusable owner id for sample data. In a real application, this should come from the users collection.
const sampleOwnerId = new mongoose.Types.ObjectId("67afabebaed97282998561c3");

const activities = [
  {
    name: "Scuba Diving in Andaman",
    description:
      "Discover the vibrant coral reefs and exotic marine life in the crystal-clear waters of the Andaman Islands, offering an unforgettable underwater experience.",
    images: [
      // Note: Only the first image will be visible on the website after initialization.
      {
        filename: "andaman_scuba.jpg",
        url: "https://blog.thomascook.in/wp-content/uploads/2017/07/shutterstock_107769851-Large.jpg",
      },
      {
        filename: "andaman_scuba2.jpg",
        url: "https://blog.thomascook.in/wp-content/uploads/2017/07/shutterstock_177442700-Large.jpg",
      },
      {
        filename: "andaman_scuba3.jpg",
        url: "https://www.andamantourism.org/wp-content/uploads/2023/07/Scuba-Diving-in-Andaman.jpg",
      },
      {
        filename: "andaman_scuba4.png",
        url: "https://i0.wp.com/andamanvenustravels.com/wp-content/uploads/2019/03/scuba-diving-in-andaman.png?resize=800%2C800",
      },
      {
        filename: "andaman_scuba5.jpg",
        url: "https://www.go2andaman.com/wp-content/uploads/2021/01/pexels-walter-torres-11533702-scaled.jpg",
      },
    ],
    difficulty: "Intermediate",
    price: 3500.0,
    location: "Havelock Island",
    country: "India",
    duration: "3 hours",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [92.98, 11.98],
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
        filename: "rishikesh_rafting.jpg",
        url: "https://vl-prod-static.b-cdn.net/system/images/000/505/570/9a95614b64b77fbecdb2f0c6bef91f5f/x1000gt/Rishikesh-river-rafting.jpg?1621514097=",
      },
      {
        filename: "rishikesh_rafting2.jpg",
        url: "https://www.easemytrip.com/travel/img/rafting-in-rishikesh.jpg",
      },
      {
        filename: "rishikesh_rafting3.jpg",
        url: "https://indiathrills.com/wp-content/uploads/2020/01/Rishikesh-River-Rafting_3.jpg",
      },
      {
        filename: "rishikesh_rafting4.jpg",
        url: "https://www.river-rafting-rishikesh.in/wp-content/uploads/2021/12/river-rafting-rishikesh.jpg",
      },
    ],
    difficulty: "Intermediate",
    price: 1000.0,
    location: "Rishikesh",
    country: "India",
    duration: "4 hours",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [78.2676, 30.1033],
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Desert Safari in Jaisalmer",
    description:
      "Experience the magic of the Thar Desert with camel rides, camping under the stars, and an immersive journey into traditional Rajasthani culture.",
    images: [
      {
        filename: "jaisalmer_desert_safari.jpg",
        url: "https://thirdeyetraveller.com/wp-content/uploads/2018/01/jaisalmerdesert2-689x517.jpg",
      },
      {
        filename: "jaisalmer_desert_safari2.jpg",
        url: "https://rajasthanroyalsholidays.com/wp-content/uploads/2020/12/Chetram-Voyages-Jaisalmer-desert-safari-tours-2048x2048.jpg",
      },
      {
        filename: "jaisalmer_desert_safari3.jpg",
        url: "https://shamadesertcamp.com/wp-content/uploads/2022/03/camel.jpg",
      },
      {
        filename: "jaisalmer_desert_safari4.jpg",
        url: "https://www.exoticmiles.com/wp-content/uploads/2020/07/Desert-Safari-In-Jaisalmer.jpg",
      },
      {
        filename: "jaisalmer_desert_safari5.png",
        url: "https://www.tourpackagejaisalmer.com/images/sam-sand-dunes-packages.png",
      },
    ],
    difficulty: "Beginner",
    price: 3500.0,
    location: "Jaisalmer",
    country: "India",
    duration: "2 days",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [70.9167, 26.9157],
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
        filename: "hampi_rock_climbing.jpg",
        url: "https://www.xtremespots.com/wp-content/uploads/2013/10/Bouldering-in-Hampi-Rocks1.jpg",
      },
      {
        filename: "hampi_rock_climbing2.jpg",
        url: "https://c8.alamy.com/comp/TABJH9/tourists-rock-climbing-in-hampi-india-TABJH9.jpg",
      },
      {
        filename: "hampi_rock_climbing3.jpg",
        url: "https://theplanetd.com/images/Climbing-Hampi-10.jpg",
      },
      {
        filename: "hampi_rock_climbing4.jpg",
        url: "https://c8.alamy.com/comp/GXA4K1/a-tourist-trying-out-rock-climbing-in-hampi-india-with-a-bouldering-GXA4K1.jpg",
      },
      {
        filename: "hampi_rock_climbing5.jpg",
        url: "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/2/2017/03/17192633/Hampibouldering.jpg",
      },
    ],
    difficulty: "Advanced",
    price: 800.0,
    location: "Hampi",
    country: "India",
    duration: "6 hours",
    guideRequired: false,
    geometry: {
      type: "Point",
      coordinates: [76.4600, 15.3350],
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Paragliding in Bir Billing",
    description:
      "Soar through the skies with panoramic views of the Dhauladhar range in one of the world's best paragliding sites, offering an exhilarating airborne adventure.",
    images: [
      {
        filename: "bir_billing_paragliding.jpg",
        url: "https://www.travelbirbilling.com/wp-content/uploads/2015/08/paraglidingBirBilling.jpg",
      },
      {
        filename: "bir_billing_paragliding2.jpg",
        url: "https://devilonwheels.com/wp-content/uploads/2018/08/Paragliding-at-Bir-Billing.-Picture-Courtesy-Sayantan-Mandal.jpg",
      },
      {
        filename: "bir_billing_paragliding3.jpg",
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/02/6a/16/bir-billing-paragliding.jpg",
      },
      {
        filename: "bir_billing_paragliding4.jpg",
        url: "https://www.hpparagliding.com/wp-content/uploads/2017/01/paragliding.jpg",
      },
      {
        filename: "bir_billing_paragliding5.jpg",
        url: "https://imgcld.yatra.com/ytimages/image/upload/v1517481370/AdvNation/ANN_TRP513/Paragliding-in-India_1438933021_5FIJFm.jpg",
      },
    ],
    difficulty: "Intermediate",
    price: 1500.0,
    location: "Bir Billing",
    country: "India",
    duration: "1 hour",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [76.7167, 32.0422],
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Bungee Jumping in Rishikesh",
    description:
      "Experience the thrill of free-falling from a height of 83 meters over the stunning landscape of Rishikesh. Our bungee jumping platform, operated by experienced professionals, ensures both safety and an adrenaline rush like no other.",
    images: [
      {
        filename: "bungee_rishikesh.jpg",
        url: "https://1.bp.blogspot.com/-TPivqE2yAUc/YRVY2IBXp6I/AAAAAAAABgY/g1JIIKuPLqkytFYz80MipFmAoHLgSoUcQCLcBGAsYHQ/s1200/Bungee660-1.jpg",
      },
      {
        filename: "rishikesh_bungee2.jpg",
        url: "https://viewuttarakhand.com/wp-content/uploads/jumpin-heights-bungee-jumping-rishikesh-tourism-entry-fee-timings-holidays-reviews-header-min.jpg",
      },
      {
        filename: "rishikesh_bungee3.jpg",
        url: "https://indiathrills.com/wp-content/uploads/2020/02/bunjee_rishikesh-1024x680-1.jpg",
      },
      {
        filename: "rishikesh_bungee4.jpg",
        url: "https://i.ytimg.com/vi/_2LNIIjd7Zo/maxresdefault.jpg",
      },
    ],
    difficulty: "Advanced",
    price: 1500.0,
    location: "Rishikesh",
    country: "India",
    duration: "1 hour",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [78.2676, 30.1035],
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Skiing in Gulmarg",
    description:
      "Glide down the snow-covered slopes of Gulmarg, one of Asia's premier skiing destinations. With runs suitable for both beginners and seasoned skiers, our packages include equipment rental and professional instruction.",
    images: [
      {
        filename: "skiing_gulmarg.jpg",
        url: "https://ekaxp.in/wp-content/uploads/2022/09/Chadar-Trek-Ladakh-India_Eka-Experiences3.jpg",
      },
      {
        filename: "gulmarg_skiing2.jpg",
        url: "https://sumabeachlifestyle.com/wp-content/uploads/2016/11/Kangdoor_Ski_slopes_of_Gulmarg.jpg",
      },
      {
        filename: "gulmarg_skiing3.jpg",
        url: "https://imgcld.yatra.com/ytimages/image/upload/v1448273275/Skiing2.jpg",
      },
      {
        filename: "gulmarg_skiing4.jpg",
        url: "https://static.toiimg.com/photo/66273382/Skiing-kashmir.jpg?resize=4&width=748",
      },
    ],
    difficulty: "Intermediate",
    price: 15000.0,
    location: "Gulmarg",
    country: "India",
    duration: "3 days",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [74.3800, 34.0500],
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Caving in Meghalaya",
    description:
      "Explore the mysterious underground world of Meghalaya's caves. Guided spelunking tours take you through intricate limestone formations, subterranean rivers, and awe-inspiring natural chambers.",
    images: [
      {
        filename: "caving_meghalaya.jpg",
        url: "https://chalohoppo.com/wp-content/uploads/2022/12/spelunking-in-krem-mawpun-meghalaya-a-cave-in-mawsynram.jpg",
      },
      {
        filename: "meghalaya_caving2.jpg",
        url: "https://www.kipepeo.in/wp-content/uploads/meghalaya-caving-02.jpg",
      },
      {
        filename: "meghalaya_caving3.jpg",
        url: "https://static2.tripoto.com/media/filter/tst/img/OgData/1495458559_02.jpg",
      },
      {
        filename: "meghalaya_caving4.jpg",
        url: "https://assamholidays.com/wp-content/uploads/2018/10/Expedition_is_in_progress_in_Meghalayan_Caves-1080x675.jpg",
      },
    ],
    difficulty: "Advanced",
    price: 1500.0,
    location: "Meghalaya",
    country: "India",
    duration: "5 hours",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [91.3662, 25.4670],
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Snorkeling in Lakshadweep",
    description:
      "Dive into the crystal-clear waters of Lakshadweep and discover vibrant coral reefs teeming with marine life. Our snorkeling excursions are perfect for both novices and experienced enthusiasts.",
    images: [
      {
        filename: "snorkeling_lakshadweep.jpg",
        url: "https://www.travelviewpoint.com/wp-content/uploads/2024/01/Snorkeling-in-Lakshadweep-1024x683.jpg",
      },
      {
        filename: "lakshadweep_snorkeling2.jpg",
        url: "https://www.tourmyindia.com/blog/wp-content/uploads/2014/04/scuba-diving-bangaram-island.jpg",
      },
      {
        filename: "lakshadweep_snorkeling3.jpg",
        url: "https://i.ytimg.com/vi/F8sxIaEVNOw/maxresdefault.jpg",
      },
      {
        filename: "lakshadweep_snorkeling4.jpg",
        url: "https://www.trawell.in/blog/wp-content/uploads/2022/06/Snorkeling_Lakshadweep_Main.jpg",
      },
    ],
    difficulty: "Beginner",
    price: 2000.0,
    location: "Lakshadweep",
    country: "India",
    duration: "2 hours",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [72.6420, 10.5667],
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Chadar Trek in Ladakh",
    description:
      "Embark on the challenging Chadar Trek over the frozen Zanskar River in Ladakh. This winter trek offers a unique experience of walking on ice amidst stunning Himalayan landscapes.",
    images: [
      {
        filename: "chadar_trek_ladakh.jpg",
        url: "https://www.ladakh-tourism.net/wp-content/uploads/2021/04/Chadar-trek-1.png",
      },
      {
        filename: "ladakh_chadar_trek3.jpg",
        url: "https://www.bontravelindia.com/wp-content/uploads/2022/05/Chadar-Trek.jpg",
      },
      {
        filename: "ladakh_chadar_trek4.jpg",
        url: "https://www.bikatadventures.com/images/Gallery/IMG1000X548/img-chadar-trek2248-Bikat-Adventures.jpg",
      },
      {
        filename: "ladakh_chadar_trek5.jpg",
        url: "https://res.cloudinary.com/purnesh/image/upload/w_1080%2Cf_auto/chadar-trek-ladakhheader.jpg",
      },
    ],
    difficulty: "Expert",
    price: 25000.0,
    location: "Ladakh",
    country: "India",
    duration: "9 days",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [77.5693, 34.1700],
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Hot Air Ballooning in Jaipur",
    description:
      "Soar above the Pink City and witness the architectural marvels and vibrant landscapes of Jaipur from a unique aerial perspective.",
    images: [
      {
        filename: "jaipur_hot_air_balloon.jpg",
        url: "https://indiathrills.com/wp-content/uploads/2020/06/WhatsApp-Image-2020-06-21-at-1.38.28-AM.jpeg",
      },
      {
        filename: "jaipur_balloon2.jpg",
        url: "https://travelsntrips.com/wp-content/uploads/2015/12/Jaipur-Fort-Flight-min-2.jpg",
      },
      {
        filename: "jaipur_balloon3.jpg",
        url: "https://i0.wp.com/ercotravels.com/blog/wp-content/uploads/2015/03/hot-air-balloon-safari-jaipur-fort-large.jpg",
      },
      {
        filename: "jaipur_balloon4.jpg",
        url: "https://i.ytimg.com/vi/r9vp5TS06Z8/maxresdefault.jpg",
      },
    ],
    difficulty: "Beginner",
    price: 4000.0,
    location: "Jaipur",
    country: "India",
    duration: "1 hour",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124],
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
  {
    name: "Mountain Biking in Leh",
    description:
      "Challenge yourself with mountain biking trails in Leh, offering rugged terrains and breathtaking views of the Himalayas.",
    images: [
      {
        filename: "leh_mountain_biking.jpg",
        url: "https://www.ju-lehadventure.com/photos/860x574/860x574_biking_hemis_national_park.jpg",
      },
      {
        filename: "leh_biking2.jpg",
        url: "https://www.shikhar.com/images/gallery/tours/128/1.jpg",
      },
      {
        filename: "leh_biking3.jpg",
        url: "https://discoverlehladakh.in/wp-content/uploads/2021/02/Ladakh-bike-tour-package-banner.jpg",
      },
      {
        filename: "leh_biking4.jpg",
        url: "https://gomissing.in/wp-content/uploads/2015/12/manali-leh-mountain-biking.jpg",
      },
    ],
    difficulty: "Advanced",
    price: 6000.0,
    location: "Leh",
    country: "India",
    duration: "2 days",
    guideRequired: true,
    geometry: {
      type: "Point",
      coordinates: [77.5771, 34.1526],
    },
    createdAt: new Date(),
    reviews: [],
    owner: sampleOwnerId,
  },
];

module.exports = activities;
