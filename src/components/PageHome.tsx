import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, MessageSquare, Shield, Users, Map, Award, Sparkles, Phone, Mail, MapPin, ChevronRight, ChevronLeft, Camera, Compass, X, ExternalLink, Tv, Check, Clock, Sun, Cloud, HelpCircle, Calculator, Luggage, Lock, FileText, Globe, RefreshCw, Search, ChevronDown, DollarSign, Send } from 'lucide-react';
import { 
  OPERATIONAL_PILLARS as fallbackOPERATIONAL_PILLARS, 
  DESTINATIONS as fallbackDESTINATIONS, 
  TOUR_PACKAGES as fallbackTOUR_PACKAGES, 
  CONTACT_INFO as fallbackCONTACT_INFO 
} from '../data';
import { useWebsiteContent } from '../context/WebsiteContentContext';
import { AfarImageCarousel } from './AfarImageCarousel';
import { LazyImage, preloadImage } from './LazyImage';
import { preloadAllExploreJourneyImages } from '../services/imagePreloader';

const AFAR_DESTINATION_IMAGES = [
  "https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc",
  "https://lh3.googleusercontent.com/d/15x5Zr5KWAS-A_1HXrznonDHtTW99yC8I",
  "https://lh3.googleusercontent.com/d/1WFneeMLMxmO6lA5qp6uC0IS45CSzKNmh",
  "https://lh3.googleusercontent.com/d/1Ukz5_YnoAx7GhfQPSmK-RhS7XCHUlxOI"
];

const AFAR_JOURNEY_IMAGES = [
  "https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc",
  "https://lh3.googleusercontent.com/d/15x5Zr5KWAS-A_1HXrznonDHtTW99yC8I",
  "https://lh3.googleusercontent.com/d/1WFneeMLMxmO6lA5qp6uC0IS45CSzKNmh",
  "https://lh3.googleusercontent.com/d/1Ukz5_YnoAx7GhfQPSmK-RhS7XCHUlxOI"
];

const HARAR_DESTINATION_IMAGES = [
  "https://lh3.googleusercontent.com/d/1XT4E0bnzH8NAerzhh4593m5_iT2z2evn", // harar3
  "https://lh3.googleusercontent.com/d/15PvAHELKJpIOiuInEAdwF0vBrU5wcg93", // harar5
  "https://lh3.googleusercontent.com/d/12c9JJ7mEen6vQt8rGCjGZweOBqqHMkCp", // harar2
  "https://lh3.googleusercontent.com/d/1jg8ZqnitMj850NcGyrQchJ4rj0I2p7uu", // harar1 updated
  "https://lh3.googleusercontent.com/d/1qA3AoFTcEPSP8oXjUT38flpbcNZW8CTo"  // harar8 new
];

const HARAR_JOURNEY_IMAGES = [
  "https://lh3.googleusercontent.com/d/1XT4E0bnzH8NAerzhh4593m5_iT2z2evn", // harar3
  "https://lh3.googleusercontent.com/d/15PvAHELKJpIOiuInEAdwF0vBrU5wcg93", // harar5
  "https://lh3.googleusercontent.com/d/12c9JJ7mEen6vQt8rGCjGZweOBqqHMkCp", // harar2
  "https://lh3.googleusercontent.com/d/1jg8ZqnitMj850NcGyrQchJ4rj0I2p7uu", // harar1 updated
  "https://lh3.googleusercontent.com/d/1Aipp2Y0lFByhTblnjBgbRAbEuhVce8Lo", // harar7
  "https://lh3.googleusercontent.com/d/1JnO87d_FUvW1cGPStcJLeSVyhfy7G4bR", // harar6
  "https://lh3.googleusercontent.com/d/1qA3AoFTcEPSP8oXjUT38flpbcNZW8CTo"  // harar8 new
];

const LANGANO_DESTINATION_IMAGES = [
  "https://lh3.googleusercontent.com/d/1F8bLbL2KSswLCM597_0x0Bbf4s_FYszQ", // langano1
  "https://lh3.googleusercontent.com/d/1ZD4IW_GvEOJeaJCyWm0R48FGr1kZxQzt"  // langano2
];

const LANGANO_JOURNEY_IMAGES = [
  "https://lh3.googleusercontent.com/d/1F8bLbL2KSswLCM597_0x0Bbf4s_FYszQ", // langano1
  "https://lh3.googleusercontent.com/d/1ZD4IW_GvEOJeaJCyWm0R48FGr1kZxQzt", // langano2
  "https://lh3.googleusercontent.com/d/1jnxbq08i2-BNoVpQSKe6DMeuAwVap17T", // langano3
  "https://lh3.googleusercontent.com/d/1IsenFRNWb4Eaba_Rgii1olM2ZAsk_AND"  // langano4
];

const KENYA_DESTINATION_IMAGES = [
  "https://lh3.googleusercontent.com/d/1A3RpQL7R1gQtAvHlTp1Vj2e_BDpP7rvL", // Kenya1
  "https://lh3.googleusercontent.com/d/1N0PgYlrqyqZa-3as_UlON4hgjEy-DG88", // Kenya2
  "https://lh3.googleusercontent.com/d/18Pw-UV7-rZoAj9ITgX5Ow_XI5_9nwZbO"  // Kenya3
];

const KENYA_JOURNEY_IMAGES = [
  "https://lh3.googleusercontent.com/d/1A3RpQL7R1gQtAvHlTp1Vj2e_BDpP7rvL", // Kenya1
  "https://lh3.googleusercontent.com/d/1N0PgYlrqyqZa-3as_UlON4hgjEy-DG88", // Kenya2
  "https://lh3.googleusercontent.com/d/18Pw-UV7-rZoAj9ITgX5Ow_XI5_9nwZbO", // Kenya3
  "https://lh3.googleusercontent.com/d/1uQAjIiZbmCk0VyejyjQQR1whzCXo0E9d", // Kenya4
  "https://lh3.googleusercontent.com/d/1bKL9boUVa9y7EE0CZIcqD_JDtd4XdqR1", // Kenya5
  "https://lh3.googleusercontent.com/d/1x4c6dHZ6qNa-YswIHxGq07dJDBDUH_JC"  // Kenya6
];

const WENCHI_DESTINATION_IMAGES = [
  "https://lh3.googleusercontent.com/d/1xYKpCVh4qtLJtg6NAeFsEVXxrDy_Za5R", // Wenchi1
  "https://lh3.googleusercontent.com/d/1tgdukFA7AMQ1MwMUOsUZ_vBDCJqBlST4", // Wenchi2
  "https://lh3.googleusercontent.com/d/1Zpo4ZkDQyu5CCl7JyaCWbY8g58jJM6C0"  // Wenchi3
];

const WENCHI_JOURNEY_IMAGES = [
  "https://lh3.googleusercontent.com/d/1xYKpCVh4qtLJtg6NAeFsEVXxrDy_Za5R", // Wenchi1
  "https://lh3.googleusercontent.com/d/1tgdukFA7AMQ1MwMUOsUZ_vBDCJqBlST4", // Wenchi2
  "https://lh3.googleusercontent.com/d/1Zpo4ZkDQyu5CCl7JyaCWbY8g58jJM6C0", // Wenchi3
  "https://lh3.googleusercontent.com/d/1fl1Yr6o-En260pc3_eHtuyh5EaeLY0T3", // Wenchi4
  "https://lh3.googleusercontent.com/d/1_qc4NrTLbvW0dAiAxMmVG5Q50uFwt3Bs"  // Wenchi5
];

const CHEBERA_DESTINATION_IMAGES = [
  "https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN",
  "https://lh3.googleusercontent.com/d/1aeuGsU-4ZtKBXZ0bVWetl3lBmmxVvA65",
  "https://lh3.googleusercontent.com/d/1G-wuj-FFVK1aDTr8QA4-nObbgJJXhzBM",
  "https://lh3.googleusercontent.com/d/1Z95HuwiHjhHTv5VuYaxxg19RRqtRIH82"
];

const CHEBERA_JOURNEY_IMAGES = [
  "https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN",
  "https://lh3.googleusercontent.com/d/1aeuGsU-4ZtKBXZ0bVWetl3lBmmxVvA65",
  "https://lh3.googleusercontent.com/d/1G-wuj-FFVK1aDTr8QA4-nObbgJJXhzBM",
  "https://lh3.googleusercontent.com/d/1Z95HuwiHjhHTv5VuYaxxg19RRqtRIH82"
];

const fallbackFEATURED_STORIES = [
  {
    id: "story-1",
    personality: "Abraham Kibrab",
    role: "Respected Presenter & Explorer",
    destination: "Kenya & Mombasa Beach Escape",
    moment: "Exploring the beautiful coast of Mombasa and its rich coastal culture.",
    quote: "“Exploring the beautiful coast of Mombasa was an unforgettable experience. From the stunning beaches to the rich coastal culture, every moment was carefully planned and beautifully delivered. This journey reminded me that travel is not only about places, but the memories we create along the way.”",
    description: "Abraham's tropical coastal escape to Mombasa perfectly combined leisure and cultural discovery. His journey highlighted the breathtaking beauty of the East African coast, curated beachfront experiences, and the meticulous personal touch that defines all our signature retreats.",
    imageUrl: "https://lh3.googleusercontent.com/d/1GudVIwjUPYoASqQI9j9sFr29fsmdoWzj",
    destinationName: "Kenya Mombasa Expedition",
    layoutType: "wide-left"
  },
  {
    id: "story-2",
    personality: "Yuti Nass",
    role: "Digital Creator & Cultural Advocate",
    destination: "Historic Harar Discovery",
    moment: "Walking through ancient labyrinthine streets and experiencing Harari traditions.",
    quote: "“Harar is a destination full of history, culture, and human connection. Walking through its ancient streets and experiencing its traditions was a journey beyond sightseeing — it was a true connection with Ethiopia’s heritage and the people who make it special.”",
    description: "Yuti Nass's exploration of Harar Jugol immersed them deep into the living heritage of this UNESCO-listed 16th-century walled city. From smelling fresh local spices to connecting with master artisans, their story captures the absolute magic of human connection and historical preservation.",
    imageUrl: "https://lh3.googleusercontent.com/d/1LB99SET0Z-YWtGUp8LBALcOXRzFw5z0f",
    destinationName: "Harar Tour",
    layoutType: "portrait-right"
  },
  {
    id: "story-3",
    personality: "Love & Shared Moments",
    role: "Shared Experiences",
    destination: "The Joy of Shared Discovery",
    moment: "Sharing beautiful landscapes and quiet moments together with the people we love.",
    quote: "“The most meaningful journeys are the ones we share with the people we love. Every destination becomes more special when experienced together, creating memories that remain long after the journey ends.”",
    description: "Whether standing on the edge of a volcanic caldera, strolling along copper lakeside sands, or walking ancient stone alleys, sharing the world with someone close elevates every horizon. We design every collaborative travel package with seamless details to make your shared connections completely unforgettable.",
    imageUrl: "https://lh3.googleusercontent.com/d/1_OLjbPw2-2lY8uGXILt4eNF0_hmj8BfB",
    destinationName: "Lake Langano",
    layoutType: "wide-right"
  },
  {
    id: "story-4",
    personality: "Memories Beyond the Journey",
    role: "Lifelong Memories",
    destination: "The Spirit of True Adventure",
    moment: "Sharing stories, laughter, and unforgettable moments together under starry skies.",
    quote: "“Travel is more than reaching a destination. It is about the laughter, the stories, and the unforgettable moments shared with the people beside us. These are the memories that make every adventure truly meaningful.”",
    description: "The core of every true expedition isn't merely the places we see, but the lasting footprints left in our hearts. By eliminating all the stress of travel logistics, park entries, and cross-border transport, we free your mind to focus entirely on what truly matters: living in the moment and gathering stories to tell for a lifetime.",
    imageUrl: "https://lh3.googleusercontent.com/d/1qRKF1rdTlLcKfmgL1ZMHf5GRCdwWqdt_",
    destinationName: "Afar Expedition",
    layoutType: "portrait-left"
  }
];
import { Destination, TourPackage, JourneyLocation, formatImageUrl } from '../types';

interface PageHomeProps {
  onBookPackage: (destinationName: string) => void;
}

const EDITORIAL_DESTINATIONS = [
  {
    id: "afar",
    title: "Afar Expedition",
    subtitle: "Afar Depression • Erta Ale • Dallol • Lake Afdera",
    intro: "Discover the raw beauty of the Danakil Depression and experience a destination unlike anywhere else in the world.",
    highlights: [
      "Witness the powerful beauty of Erta Ale’s active volcanic landscape",
      "Explore the colorful geothermal formations of Dallol",
      "Discover the vast salt flats of the Danakil Depression",
      "Experience the unique culture and environment of Afar",
      "Capture unforgettable desert landscapes and natural wonders"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc",
    bookingValue: "Afar Expedition",
    layoutType: "wide-left"
  },
  {
    id: "harar",
    title: "Historic Harar Discovery",
    subtitle: "Harar Jugol • Cultural Heritage • Ancient City",
    intro: "Experience the unique heritage of Harar through authentic encounters, local traditions, and unforgettable moments.",
    highlights: [
      "Explore the historic streets of Harar Jugol",
      "Discover traditional Harari homes and architecture",
      "Experience local culture, traditions, and hospitality",
      "Taste authentic Harari cuisine and coffee culture",
      "Connect with the living heritage of one of Ethiopia’s oldest cities"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1XT4E0bnzH8NAerzhh4593m5_iT2z2evn",
    bookingValue: "Historic Harar Discovery",
    layoutType: "portrait-right"
  },
  {
    id: "langano",
    title: "Lake Langano Escape",
    subtitle: "Lake Langano • Rift Valley • Lakeside Relaxation",
    intro: "Enjoy a refreshing journey surrounded by nature, tranquility, and the beauty of Ethiopia’s Rift Valley.",
    highlights: [
      "Relax beside the peaceful waters of Lake Langano",
      "Enjoy beautiful Rift Valley landscapes",
      "Experience stunning lakeside sunsets",
      "Discover nature and peaceful surroundings",
      "Create memorable moments away from the city"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1F8bLbL2KSswLCM597_0x0Bbf4s_FYszQ",
    bookingValue: "Lake Langano Escape",
    layoutType: "wide-left"
  },
  {
    id: "wenchi",
    title: "Wenchi Crater Escape",
    subtitle: "Wenchi Crater Lake • Nature • Scenic Landscapes",
    intro: "A perfect escape for travelers seeking nature, relaxation, and authentic countryside experiences.",
    highlights: [
      "Discover the beauty of Wenchi Crater Lake",
      "Enjoy peaceful boat experiences across the lake",
      "Walk through beautiful countryside landscapes",
      "Experience traditional village life",
      "Capture unforgettable natural scenery"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1xYKpCVh4qtLJtg6NAeFsEVXxrDy_Za5R",
    bookingValue: "Wenchi Crater Escape",
    layoutType: "portrait-right"
  },
  {
    id: "bale",
    title: "Bale Mountains Adventure",
    subtitle: "Bale Mountains National Park • Wildlife • Highlands",
    intro: "Experience the beauty of Bale Mountains through adventure, nature, and unforgettable exploration.",
    highlights: [
      "Explore the breathtaking Bale Mountains landscape",
      "Discover rare wildlife and endemic species",
      "Experience the beauty of the Sanetti Plateau",
      "Walk through unique Afro-alpine environments",
      "Enjoy unforgettable mountain adventures"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN",
    bookingValue: "Bale Mountains Adventure",
    layoutType: "wide-left"
  },
  {
    id: "mombasa",
    title: "Kenya & Mombasa Escape",
    subtitle: "Mombasa Coast • Indian Ocean • Beach Experience",
    intro: "A carefully designed escape combining adventure, relaxation, and unforgettable coastal memories.",
    highlights: [
      "Experience the beautiful beaches of Mombasa",
      "Enjoy Indian Ocean views and coastal scenery",
      "Discover local culture and coastal traditions",
      "Relax in beachfront surroundings",
      "Create unforgettable international travel memories"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1A3RpQL7R1gQtAvHlTp1Vj2e_BDpP7rvL",
    bookingValue: "Kenya & Mombasa Escape",
    layoutType: "portrait-right"
  },
  {
    id: "sof-omar",
    title: "Sof Omar Cave Adventure",
    subtitle: "Sof Omar Cave • Underground River • Natural Wonder",
    intro: "Journey beneath the surface to discover one of Africa's largest cave systems, where dramatic limestone formations and the underground Weyib River create an unforgettable natural adventure.",
    highlights: [
      "Explore Ethiopia's spectacular cave network",
      "Walk through breathtaking limestone formations",
      "Discover the underground Weyib River",
      "Experience one of Ethiopia's greatest natural wonders",
      "Capture extraordinary underground landscapes"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1ynQTvZTqGwGk60lpHOfP3XBNzAq56hUU",
    bookingValue: "Sof Omar Cave Adventure",
    layoutType: "wide-left"
  },
  {
    id: "doho-awash",
    title: "Doho Lodge & Awash National Park",
    subtitle: "Doho Lodge • Awash National Park • Wildlife & Safari",
    intro: "Experience the perfect combination of luxury lodge accommodation, unforgettable wildlife encounters, scenic Rift Valley landscapes, and the natural beauty of Ethiopia's oldest national park.",
    highlights: [
      "Discover Ethiopia's incredible wildlife",
      "Visit the spectacular Awash Waterfall",
      "Enjoy scenic safari drives",
      "Experience the comfort of Doho Lodge",
      "Observe diverse birdlife and native animals"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1efUrY3v-K7sSQkCA53rwsq8v43E52RvV",
    bookingValue: "Doho Lodge & Awash National Park",
    layoutType: "portrait-right"
  },
  {
    id: "lalibela",
    title: "Lalibela Spiritual Journey",
    subtitle: "Lalibela • Rock-Hewn Churches • UNESCO Heritage",
    intro: "Discover one of the world's greatest religious treasures through Ethiopia's extraordinary rock-hewn churches, where history, faith, and remarkable architecture have stood together for centuries.",
    highlights: [
      "Explore the world-famous rock-hewn churches",
      "Visit UNESCO World Heritage monuments",
      "Experience authentic Ethiopian Orthodox traditions",
      "Witness remarkable ancient architecture carved from stone",
      "Enjoy breathtaking mountain landscapes and local culture"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1wObvCNhod1hHq8UgVyIm3rDfFHG0mzVX",
    bookingValue: "Lalibela Spiritual Journey",
    layoutType: "wide-left"
  },
  {
    id: "gondar",
    title: "Gondar Royal Discovery",
    subtitle: "Gondar • Fasil Ghebbi • Royal Castles",
    intro: "Step into Ethiopia's imperial past as you explore the magnificent castles of Fasil Ghebbi, centuries-old churches, and vibrant cultural traditions that continue to define the historic city of Gondar.",
    highlights: [
      "Explore the UNESCO World Heritage Fasil Ghebbi castle complex",
      "Visit the historic Fasilides Bath and royal compounds",
      "Discover centuries of Ethiopian imperial history",
      "Experience Gondar's rich traditions, cuisine, and local culture",
      "Capture breathtaking architecture and timeless landscapes"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1Wanv6CGUUaxF_gFSw_Gc6U397ns_WkPZ",
    bookingValue: "Gondar Royal Discovery",
    layoutType: "portrait-right"
  },
  {
    id: "simien",
    title: "Simien Mountains Expedition",
    subtitle: "Simien Mountains National Park • Highland Peaks • Wildlife",
    intro: "Journey through Ethiopia's most spectacular mountain landscapes, where dramatic cliffs, deep valleys, and rare wildlife create one of Africa's greatest natural wonders and trekking destinations.",
    highlights: [
      "Trek through the UNESCO World Heritage Simien Mountains National Park",
      "Observe the famous Gelada baboons in their natural habitat",
      "Discover breathtaking escarpments, valleys, and towering peaks",
      "Experience Ethiopia's unique Afro-alpine ecosystem",
      "Capture unforgettable panoramic views and dramatic landscapes"
    ],
    imageUrl: "https://lh3.googleusercontent.com/d/1B4_cVm5V8xWx4jjJ1y64GM1TLvifv38f",
    bookingValue: "Simien Mountains Expedition",
    layoutType: "wide-left"
  }
];

const ENRICHED_PACKAGES = {
  "pkg-1": {
    title: "The Afar Expedition",
    badge: "Premium Experience",
    bestFor: "Erta Ale • Dallol • Lake Afdera",
    intro: "Stand at the edge of Erta Ale’s active lava lake, explore the surreal landscapes of Dallol, and journey through one of the world’s most extreme and fascinating environments.",
    journeyHighlights: [
      "Witness the glowing lava lake of Erta Ale",
      "Explore Dallol’s colorful geothermal landscapes",
      "Walk across ancient salt flats and salt mining areas",
      "Experience dramatic desert landscapes and sunsets",
      "Discover the unique beauty of the Afar Depression"
    ],
    included: [
      "Comfortable accommodation where available",
      "Experienced local guide",
      "Transportation throughout the journey",
      "Park permits and entrance fees",
      "Selected meals during the tour",
      "24/7 travel assistance"
    ],
    exploreJourney: [
      {
        id: "loc-dallol",
        title: "Dallol",
        description: "Colorful geothermal formations",
        images: [
          "https://drive.google.com/file/d/1Tl6QWQ3t5gqd_36CX0Gg6LonhW4nEtGx/view?usp=drivesdk",
          "https://drive.google.com/file/d/1XZ93Uliyik3-Hu89TrjmW_o9GbMdr9zw/view?usp=drivesdk"
        ]
      },
      {
        id: "loc-danakil",
        title: "Danakil Salt Flats",
        description: "Vast salt plains",
        images: [
          "https://drive.google.com/file/d/1WFPcpNY_eVt3mlk9-m59RiQ9QSDzWg3Z/view?usp=drivesdk",
          "https://drive.google.com/file/d/1BTNzG6Wp9Z-pghW8aY_fK6byDmsjQUlo/view?usp=drivesdk"
        ]
      },
      {
        id: "loc-erta-ale",
        title: "Erta Ale",
        description: "Active volcanic landscape",
        images: [
          "https://drive.google.com/file/d/1RSmxE7Tlk4Ebd42eJe8fwYpQ2Ry0rfxx/view?usp=drivesdk",
          "https://drive.google.com/file/d/1KIEjG80Y-62bWGofI2yR443zEITE-CiV/view?usp=drivesdk"
        ]
      },
      {
        id: "loc-lake-afdera",
        title: "Lake Afdera",
        description: "Salt lake & desert landscape",
        images: [
          "https://drive.google.com/file/d/1PzpFCF185B9ax7dR8oX64MQ8bOpoVfM8/view?usp=drivesdk",
          "https://drive.google.com/file/d/1I1t4yTysBYIT2_91rNBvbyKj8g2s3jF6/view?usp=drivesdk"
        ]
      }
    ]
  },
  "pkg-2": {
    title: "Lake Langano Escape",
    badge: "Relaxation Experience",
    bestFor: "Lake Langano • Rift Valley • Lakeside Escape",
    intro: "Enjoy a peaceful lakeside escape surrounded by beautiful scenery, comfortable accommodation, and relaxing experiences designed to help you reconnect with nature.",
    journeyHighlights: [
      "Relax beside the beautiful Lake Langano",
      "Enjoy peaceful lakeside activities",
      "Experience nature and scenic views",
      "Discover a calm and refreshing environment"
    ],
    included: [
      "Resort accommodation",
      "Guided activities",
      "Lakeside experiences",
      "Transportation",
      "Breakfast",
      "Travel support"
    ],
    exploreJourney: [
      {
        id: "loc-tent-camping-experience",
        title: "Tent Camping Experience",
        description: "Relaxation beside the lake",
        images: [
          "https://lh3.googleusercontent.com/d/1U9kGLX7cUxMC2pvRNtTaJwrsEGpsXyl6"
        ]
      },
      {
        id: "loc-lakeside-sunset",
        title: "Lakeside Sunset",
        description: "Golden evening views",
        images: [
          "https://lh3.googleusercontent.com/d/1mBRD-L8hwWvRbCnL-4dIx_a1ryK8rJx_",
          "https://lh3.googleusercontent.com/d/1ieg1wD5gSfyoMVYdr0tYOvQK0XiSipIx"
        ]
      },
      {
        id: "loc-lake-langano",
        title: "Lake Langano",
        description: "Lakeside relaxation",
        images: [
          "https://lh3.googleusercontent.com/d/1Hdw9r4JRCeAZO-eTqgEtPQ_gEmxXguGr",
          "https://lh3.googleusercontent.com/d/1O1ji8Vc-t1-FkXZ_1XSUCR0OXQuD3WD6"
        ]
      }
    ]
  },
  "pkg-3": {
    title: "Historic Harar Discovery",
    badge: "Cultural Experience",
    bestFor: "Harar Jugol • Historic Landmarks • Living Heritage",
    intro: "Discover the historic city of Harar through a cultural journey filled with heritage, traditions, local experiences, and unforgettable encounters.",
    journeyHighlights: [
      "Explore Harar’s ancient streets and historic walls",
      "Discover traditional culture and local life",
      "Experience authentic food and traditions",
      "Visit important heritage locations"
    ],
    included: [
      "Heritage tours",
      "Local cultural guide",
      "Accommodation",
      "Traditional dining experience",
      "Entry fees",
      "Travel coordination"
    ],
    exploreJourney: [
      {
        id: "loc-harari-market",
        title: "Harari Market",
        description: "Local life & culture",
        images: [
          "https://lh3.googleusercontent.com/d/1nWDOYtXlx-naIYIAJqfiZluXbRxXT7L7",
          "https://lh3.googleusercontent.com/d/1syW31zqfCleXRt2WFvVF3O31u56YcjCw"
        ]
      },
      {
        id: "loc-harari-traditional-houses",
        title: "Harari Traditional Houses",
        description: "Unique local architecture",
        images: [
          "https://lh3.googleusercontent.com/d/1jUx_Bbg1SsbDkD2Z9U0zTmWgfxl51BHK",
          "https://lh3.googleusercontent.com/d/1whjHlXNhjbxFl_8C-5StN70V5KfEk6rm"
        ]
      },
      {
        id: "loc-hyena-feeding",
        title: "Hyena Feeding",
        description: "Harar's famous night tradition",
        images: [
          "https://lh3.googleusercontent.com/d/1NvGr74N-_XHMBlEVvGheqWD9R9i3I2gy",
          "https://lh3.googleusercontent.com/d/1ci7smhhA6ByJXyVK7DcWXBYkR93vmrCl"
        ]
      },
      {
        id: "loc-traditional-coffee-ceremony",
        title: "Traditional Coffee Ceremony",
        description: "Ethiopian hospitality",
        images: [
          "https://lh3.googleusercontent.com/d/1og9E_Ao3IvWnnHqBM5r7RL5kT4seK_w_",
          "https://lh3.googleusercontent.com/d/1dzx4pCevuH729KNyyA7lS4ZQ_Xu90d_d",
          "https://lh3.googleusercontent.com/d/1F9hthSVtRiHk4TQOJtUamcBPbbMHF8v9"
        ]
      }
    ]
  },
  "pkg-4": {
    title: "Wenchi Crater Escape",
    badge: "Nature Experience",
    bestFor: "Wenchi Crater Lake • Scenic Trails • Countryside",
    intro: "Spend an unforgettable day exploring Wenchi Crater Lake, surrounded by peaceful landscapes, scenic views, and natural beauty.",
    journeyHighlights: [
      "Explore the volcanic crater landscape",
      "Enjoy a peaceful boat excursion",
      "Walk through beautiful natural surroundings",
      "Experience Ethiopian countryside life"
    ],
    included: [
      "Private transportation",
      "Boat excursion",
      "Local guide",
      "Traditional lunch",
      "Activity coordination"
    ],
    exploreJourney: [
      {
        id: "loc-wenchi-crater-lake",
        title: "Wenchi Crater Lake",
        description: "Volcanic lake landscape",
        images: [
          "https://lh3.googleusercontent.com/d/1W4-9ksrgr2kDvT-xmT1M5hzCHRPSsdN0",
          "https://lh3.googleusercontent.com/d/1bhTx3C_SGvp3dQqnyq7qSRIvos5jVGS9"
        ]
      },
      {
        id: "loc-boat-ride",
        title: "Boat Ride",
        description: "Exploring the crater waters",
        images: [
          "https://lh3.googleusercontent.com/d/11BPfc7BHfq_OC_oSqcM5_DTViIh8AbQN"
        ]
      },
      {
        id: "loc-mud-bath",
        title: "Mud Bath",
        description: "Natural relaxation experience",
        images: [
          "https://lh3.googleusercontent.com/d/1lFlXu_aTA0TYdM6FARr639Rf6ARtdNcz"
        ]
      },
      {
        id: "loc-wenchi-highlands",
        title: "Wenchi Highlands",
        description: "Green mountain scenery",
        images: [
          "https://lh3.googleusercontent.com/d/1H-C5mE9A01iy-AZ1wTiYjUs8Ujdss07x"
        ]
      },
      {
        id: "loc-countryside-trails",
        title: "Countryside Trails",
        description: "Scenic walking experience",
        images: [
          "https://lh3.googleusercontent.com/d/1JwWqkSBVZxci8MSK7s8n9M6kTOcNxsmc",
          "https://lh3.googleusercontent.com/d/1mLHKLP3UetMC8XdsDX4rLMRIZdol1kDg"
        ]
      },
      {
        id: "loc-local-villages",
        title: "Local Villages",
        description: "Rural Ethiopian life",
        images: [
          "https://lh3.googleusercontent.com/d/1W_BzFRViFPPhr5zWUv10xBVOE_N4_Nan"
        ]
      }
    ]
  },
  "pkg-5": {
    title: "Chebera Churchura & Bale Mountains",
    badge: "Wildlife Experience",
    bestFor: "Bale Mountains • Sanetti Plateau • Wildlife",
    intro: "Experience Ethiopia’s incredible mountain wilderness through a guided adventure exploring wildlife, landscapes, and unique natural ecosystems.",
    journeyHighlights: [
      "Explore Bale Mountains National Park",
      "Discover rare wildlife species",
      "Experience highland landscapes",
      "Explore Afro-alpine environments"
    ],
    included: [
      "National park access",
      "Wildlife guide",
      "Camping equipment",
      "Meals during the expedition",
      "Transportation"
    ],
    exploreJourney: [
      {
        id: "loc-chebera-churchura",
        title: "Chebera Churchura",
        description: "Forest & wildlife",
        images: [
          "https://lh3.googleusercontent.com/d/1KOpU2vZA4JU6N9UFRr3UFsKNeqkLE6wg",
          "https://lh3.googleusercontent.com/d/1I4TX8UrGc62i2aKBAKQ50pRjrG0UL3nZ"
        ]
      },
      {
        id: "loc-african-elephant",
        title: "African Elephant",
        description: "Wildlife encounter",
        images: [
          "https://lh3.googleusercontent.com/d/1uHG1Agifdi-YDHc1Hl4DJmYoCnElXLII",
          "https://lh3.googleusercontent.com/d/18mqdtHWlxxREotpfvEwLr_96PXFb47BX"
        ]
      },
      {
        id: "loc-sanetti-plateau",
        title: "Sanetti Plateau",
        description: "Afro-alpine landscape",
        images: [
          "https://lh3.googleusercontent.com/d/1Uooq1QkKt-vYmrHCGtVzwQ-ZD3NKcv_Y",
          "https://lh3.googleusercontent.com/d/1sQcY0AwaUNLq0i88kFcgtoncOhUkSg6Q",
          "https://lh3.googleusercontent.com/d/1EXEgatTD5TaonxxsvQDHVJ1MSeofZvyB"
        ]
      },
      {
        id: "loc-ethiopian-wolf",
        title: "Ethiopian Wolf",
        description: "Endemic wildlife",
        images: [
          "https://lh3.googleusercontent.com/d/1t56ObM4_fTzVvqAitwfxw8YKl1PGZDhr",
          "https://lh3.googleusercontent.com/d/1QLzfbHsluvRLvuy9UsGRWmP64QRSNfFW"
        ]
      },
      {
        id: "loc-bale-mountains",
        title: "Bale Mountains",
        description: "Highland wilderness",
        images: [
          "https://lh3.googleusercontent.com/d/1-x9HrDfGi67v9su2Ek60kiIbB81Ek2He",
          "https://lh3.googleusercontent.com/d/1YnEePLt2DzAmhe4cckYCx37rY-Crm5lW"
        ]
      }
    ]
  },
  "pkg-6": {
    title: "Kenya & Mombasa Escape",
    badge: "Cross-Border Experience",
    bestFor: "Mombasa • Indian Ocean • Coastal Discovery",
    intro: "Discover the beauty of Kenya’s coastline through a carefully planned journey combining beach relaxation, cultural experiences, and ocean adventures.",
    journeyHighlights: [
      "Enjoy Mombasa’s beautiful beaches",
      "Experience coastal culture",
      "Relax in beachfront locations",
      "Explore unforgettable ocean landscapes"
    ],
    included: [
      "Beachfront accommodation",
      "Cross-border travel support",
      "Daily breakfast",
      "Guided excursions",
      "Visa assistance",
      "Travel coordination"
    ],
    exploreJourney: [
      {
        id: "loc-mombasa-old-town",
        title: "Mombasa Old Town",
        description: "Swahili culture & heritage",
        images: [
          "https://lh3.googleusercontent.com/d/1bUBXZolHDV0IjMiFRpTl9nl1UAGmYtuf",
          "https://lh3.googleusercontent.com/d/1pbo6mWDLs5nBHYFG9DnF8GnkLbauo9SY"
        ]
      },
      {
        id: "loc-giraffe-experience",
        title: "Giraffe Experience",
        description: "Close encounters with giraffes",
        images: [
          "https://lh3.googleusercontent.com/d/116twjymsfKuZwIgL5graNfq4xiGoVVtF",
          "https://lh3.googleusercontent.com/d/1irJkkHH84YPn4h_AkIxJrqYkLNBF9OxF"
        ]
      },
      {
        id: "loc-diani-beach",
        title: "Diani Beach",
        description: "White sands & Indian Ocean",
        images: [
          "https://lh3.googleusercontent.com/d/1SIpBbiaYkCBo0rZqsvsTQ5WkzYEDimD9",
          "https://lh3.googleusercontent.com/d/1VYk_EZot6bODdFz598AkDKduOe5NGzXp"
        ]
      },
      {
        id: "loc-fort-jesus",
        title: "Fort Jesus",
        description: "Coastal history",
        images: [
          "https://lh3.googleusercontent.com/d/1CV8xnw7uCoRCqqxFVTR6-j5EHmFpHhVz",
          "https://lh3.googleusercontent.com/d/1qPnnQuBx4AWnPRYQGTiCeBNxqBx3uSyy"
        ]
      },
      {
        id: "loc-mombasa-coast",
        title: "Mombasa Coast",
        description: "Ocean views & tropical sunsets",
        images: [
          "https://lh3.googleusercontent.com/d/1md5pFBFit4xwr-UKPXe5z-Udn6cV2Ry5",
          "https://lh3.googleusercontent.com/d/1SvAJ3z23EJxMWV72xCAD6_41bZZDVw2N"
        ]
      }
    ]
  },
  "pkg-7": {
    title: "Sof Omar Explorer",
    badge: "Adventure Experience",
    bestFor: "Sof Omar Cave • Limestone Passages • Underground Adventure",
    intro: "Experience the mystery and beauty of Ethiopia's legendary cave system while exploring underground rivers, dramatic chambers, and remarkable geological formations.",
    journeyHighlights: [
      "Explore the famous cave passages",
      "Walk beside the underground river",
      "Discover impressive rock formations",
      "Experience Ethiopia's hidden natural wonder"
    ],
    included: [
      "Professional adventure guide",
      "Cave entrance permits",
      "Transportation",
      "Safety equipment",
      "Refreshments",
      "Travel support"
    ],
    exploreJourney: [
      {
        id: "loc-sof-omar-cave-entrance",
        title: "Sof Omar Cave Entrance",
        description: "Gateway to the underground world",
        images: [
          "https://lh3.googleusercontent.com/d/1xvE7LtTIYXyC9Glk6PBfMcYTVioCZd4h",
          "https://lh3.googleusercontent.com/d/1s-h4WUVAdVjLOg7v45Os9dCd_P9qzvPm"
        ]
      },
      {
        id: "loc-underground-river",
        title: "Underground River",
        description: "The Web River",
        images: [
          "https://lh3.googleusercontent.com/d/1PkP3QkMWYaKeYHyc9xPkj_7_qmAt0yjV",
          "https://lh3.googleusercontent.com/d/1WV1gEIwhib4YFMj8KsDmWr-BukNdUiP_"
        ]
      },
      {
        id: "loc-limestone-passages",
        title: "Limestone Passages",
        description: "Natural cave formations",
        images: [
          "https://lh3.googleusercontent.com/d/1hu9SE5GnX4Y_kQTMwA8PeswGnldFqeTS",
          "https://lh3.googleusercontent.com/d/1VuC7qiFAr_FO1DsqGA4C9wzpNSah3Bxv"
        ]
      },
      {
        id: "loc-cave-exploration",
        title: "Cave Exploration",
        description: "Ethiopia's hidden natural wonder",
        images: [
          "https://lh3.googleusercontent.com/d/1Ey9w8D_9ZgVCJ2hhzjHqtqhAiOj5X3gy",
          "https://lh3.googleusercontent.com/d/1poaUMg16gNpITjh5VNLszNwoyHZ1bDkj"
        ]
      },
      {
        id: "loc-grand-chambers",
        title: "Grand Chambers",
        description: "Vast underground formations",
        images: [
          "https://lh3.googleusercontent.com/d/1BmA0wHSqYf4aGRulyH2ryxHFdOlMmOlP",
          "https://lh3.googleusercontent.com/d/1SRgJbymTjx2AF7D3T0A8k0FTOX8Rjdfy"
        ]
      }
    ]
  },
  "pkg-8": {
    title: "Doho Lodge Safari Experience",
    badge: "Luxury Wildlife Experience",
    bestFor: "Awash National Park • Doho Lodge • Rift Valley",
    intro: "Enjoy an unforgettable safari experience combining luxury accommodation, wildlife exploration, scenic landscapes, and authentic Ethiopian hospitality.",
    journeyHighlights: [
      "Safari through Awash National Park",
      "Visit the famous Awash Falls",
      "Observe wildlife in natural habitats",
      "Relax at Doho Lodge"
    ],
    included: [
      "Luxury lodge accommodation",
      "Professional safari guide",
      "National park entrance fees",
      "Private transportation",
      "Selected meals",
      "Travel coordination"
    ],
    exploreJourney: [
      {
        id: "loc-awash-national-park",
        title: "Awash National Park",
        description: "Wildlife & savanna",
        images: [
          "https://lh3.googleusercontent.com/d/1JIGlyJHfjuoK0-QIF1VyJdHrGd1Mvmgy",
          "https://lh3.googleusercontent.com/d/1VI_gh9KSyRPuMLKynvw1CeSpa59hVE3s"
        ]
      },
      {
        id: "loc-awash-falls",
        title: "Awash Falls",
        description: "Dramatic waterfall landscape",
        images: [
          "https://lh3.googleusercontent.com/d/1jHmhtQ8vnFguIUqImPZdM8NdTiPcpLh8",
          "https://lh3.googleusercontent.com/d/1GHGn8_0EnCdlxEpr4_G9fvjL3ToRBJh3"
        ]
      },
      {
        id: "loc-doho-lodge",
        title: "Doho Lodge",
        description: "Luxury lodge experience",
        images: [
          "https://lh3.googleusercontent.com/d/1IBpNakR5iDX7JKJ6NCKXb3mdT-POOX3B",
          "https://lh3.googleusercontent.com/d/1tqpSKNhoR0TNQmli0C6S3Z6grBdAuDnS"
        ]
      }
    ]
  },
  "pkg-9": {
    title: "Lalibela Heritage Experience",
    badge: "Heritage Experience",
    bestFor: "Rock-Hewn Churches • Sacred Pilgrimage • Highland Culture",
    intro: "Experience Ethiopia's spiritual heart through centuries-old churches, vibrant religious traditions, and unforgettable encounters with one of Africa's greatest historical treasures.",
    journeyHighlights: [
      "Explore Lalibela's eleven rock-hewn churches",
      "Visit the iconic Church of Saint George",
      "Experience authentic local traditions",
      "Enjoy panoramic highland scenery"
    ],
    included: [
      "Professional heritage guide",
      "Accommodation",
      "Church entrance fees",
      "Local transportation",
      "Traditional meals",
      "Travel assistance"
    ],
    exploreJourney: [
      {
        id: "loc-lalibela",
        title: "Lalibela",
        description: "Ancient rock-hewn churches",
        images: [
          "https://lh3.googleusercontent.com/d/1-cAe0hExBC_Ufl9vq3LJ9N7mj7yPCr-l",
          "https://lh3.googleusercontent.com/d/1qgrW6bEan7mb5d7Wmlyac6aNnFFyJyWW"
        ]
      },
      {
        id: "loc-lalibela-passageways",
        title: "Lalibela Passageways",
        description: "Underground pathways",
        images: [
          "https://lh3.googleusercontent.com/d/1lmkUA4ay4f0Lv-RTB0pZLe1XZozzY8sF",
          "https://lh3.googleusercontent.com/d/1MQHVhhua7pl4QdpsfdHWbDO1t47pC9J9"
        ]
      },
      {
        id: "loc-pilgrimage-experience",
        title: "Pilgrimage Experience",
        description: "Living Ethiopian Orthodox tradition",
        images: [
          "https://lh3.googleusercontent.com/d/1uS3Nddi9Zb27gswNuj7BYvuZCFTbAQGd",
          "https://lh3.googleusercontent.com/d/1svznL5Nqy2p9SDQhVSqrLfh3kW-BS7fY"
        ]
      },
      {
        id: "loc-lalibela-highlands",
        title: "Lalibela Highlands",
        description: "Mountain scenery & culture",
        images: [
          "https://lh3.googleusercontent.com/d/1NlJ8AKo7lvQM8D-kaP1ky-1hOmX1Hvrc",
          "https://lh3.googleusercontent.com/d/1IKqpx20DG6QrL96_BWOGy1HJBk1OHT_e"
        ]
      },
      {
        id: "loc-rock-hewn-churches",
        title: "Rock-Hewn Churches",
        description: "Ancient sacred architecture",
        images: [
          "https://lh3.googleusercontent.com/d/1rhgGnQnMmnp_UPYKQpkK0OfWoWlc9hZj",
          "https://lh3.googleusercontent.com/d/14an9lGjzBI4tOV8gpjBYNTltMludIx7c"
        ]
      }
    ]
  },
  "pkg-10": {
    title: "Royal Gondar Experience",
    badge: "Royal Heritage Experience",
    bestFor: "Fasil Ghebbi • Debre Berhan Selassie • Historic Gondar",
    intro: "Travel through Ethiopia's former imperial capital where magnificent castles, remarkable churches, and centuries of royal history create one of Africa's most unforgettable cultural experiences.",
    journeyHighlights: [
      "Explore the magnificent royal castle complex",
      "Visit the famous Debre Berhan Selassie Church",
      "Discover Ethiopia's imperial history and traditions",
      "Experience Gondar's authentic cultural atmosphere"
    ],
    included: [
      "Professional cultural guide",
      "Private transportation",
      "Heritage site entrance fees",
      "Comfortable accommodation",
      "Traditional Ethiopian lunch",
      "Travel coordination"
    ],
    exploreJourney: [
      {
        id: "loc-fasil-ghebbi",
        title: "Fasil Ghebbi",
        description: "Royal castle complex",
        images: [
          "https://lh3.googleusercontent.com/d/1B3s2t_EfjKqwzzvOY4sz5QsPrR8BGt5l",
          "https://lh3.googleusercontent.com/d/19SEM2A6kpj4BbR_e-zxWY077iYSBBl0S"
        ]
      },
      {
        id: "loc-debre-berhan-selassie",
        title: "Debre Berhan Selassie",
        description: "Historic church & ceiling paintings",
        images: [
          "https://lh3.googleusercontent.com/d/17BYk5bDY0ANZDviFSVZgp36rLLW3OyAw",
          "https://lh3.googleusercontent.com/d/1YeU4yPl3IMFsm5PNPK91RyYppgZ_uVaA"
        ]
      },
      {
        id: "loc-fasilides-bath",
        title: "Fasilides' Bath",
        description: "Royal bathing pool",
        images: [
          "https://lh3.googleusercontent.com/d/1tgt7Xq2JxAhBmB98t-aDEdyzRXuLcRM3",
          "https://lh3.googleusercontent.com/d/1Pxgd5XJS-HaX-n7rYqztGTx_ra2xiQ11"
        ]
      }
    ]
  },
  "pkg-11": {
    title: "Simien Highlands Experience",
    badge: "Mountain Adventure Experience",
    bestFor: "Simien Mountains • Gelada Baboons • Scenic Trekking",
    intro: "Explore the breathtaking beauty of Ethiopia's northern highlands through guided trekking adventures, incredible wildlife encounters, and unforgettable mountain landscapes that inspire every traveler.",
    journeyHighlights: [
      "Trek along spectacular mountain trails",
      "Encounter Gelada baboons and endemic wildlife",
      "Visit breathtaking viewpoints overlooking dramatic escarpments",
      "Experience Ethiopia's pristine highland wilderness"
    ],
    included: [
      "Professional mountain guide",
      "National park entrance fees",
      "Comfortable accommodation",
      "Private transportation",
      "Selected meals during the journey",
      "Complete travel coordination"
    ],
    exploreJourney: [
      {
        id: "loc-simien-mountains",
        title: "Simien Mountains",
        description: "Dramatic mountain landscapes",
        images: [
          "https://lh3.googleusercontent.com/d/1klfz_ZvBjpJzxvyDkPWrEJ48HjFA7X3J",
          "https://lh3.googleusercontent.com/d/1gdh6eBQGL0lspmdATosQT2PDXjbPc6hR"
        ]
      },
      {
        id: "loc-simien-wildlife",
        title: "Wildlife",
        description: "Endemic wildlife",
        images: [
          "https://lh3.googleusercontent.com/d/1ebTIVb2Y_AEWVh_59zjso7WoDQVaiY_Y",
          "https://lh3.googleusercontent.com/d/1AN8assHQa9rOZECsKoLi5UPjQZqbfPZi"
        ]
      }
    ]
  }
};

const getBadgeStyles = (badge: string) => {
  switch (badge) {
    case "Premium Experience":
      return "bg-purple-950/70 text-purple-300 border-purple-500/40";
    case "Relaxation Experience":
      return "bg-teal-950/70 text-teal-300 border-teal-500/40";
    case "Cultural Experience":
      return "bg-amber-950/70 text-amber-300 border-amber-500/40";
    case "Day Experience":
      return "bg-emerald-950/70 text-emerald-300 border-emerald-500/40";
    case "Wildlife Experience":
      return "bg-blue-950/70 text-blue-300 border-blue-500/40";
    case "Cross-Border Experience":
      return "bg-indigo-950/70 text-indigo-300 border-indigo-500/40";
    case "Adventure Experience":
      return "bg-amber-950/70 text-amber-300 border-amber-500/40";
    case "Luxury Wildlife Experience":
      return "bg-emerald-950/70 text-emerald-300 border-emerald-500/40";
    case "Heritage Experience":
      return "bg-purple-950/70 text-purple-300 border-purple-500/40";
    case "Royal Heritage Experience":
      return "bg-amber-950/70 text-amber-300 border-amber-500/40";
    case "Mountain Adventure Experience":
      return "bg-teal-950/70 text-teal-300 border-teal-500/40";
    default:
      return "bg-solar/10 text-solar border-solar/30";
  }
};


interface ClientTravelPortalProps {
  onBookPackage: (destinationName: string) => void;
}

const PORTAL_FAQ_ITEMS = [
  {
    category: "visa",
    question: "Do I need a visa to visit Ethiopia?",
    answer: "Yes, most tourists need a entry visa. You can easily apply for an e-visa online via the official Ethiopian government portal (evisa.gov.et) before arrival. Alternatively, visa on arrival is available for nationals of many countries at Bole International Airport."
  },
  {
    category: "visa",
    question: "What passport validity is required?",
    answer: "Your passport must be valid for at least 6 months from your date of entry into Ethiopia, and must contain at least two blank pages for entry/exit stamps."
  },
  {
    category: "safety",
    question: "Is traveling in Ethiopia safe?",
    answer: "Yes, our guided routes (Afar, Harar, Langano, Bale, Wenchi) are highly secure and safe. We employ experienced professional drivers, partner with official national park scouts, and provide constant support. Your safety is our #1 operational pillar."
  },
  {
    category: "safety",
    question: "Do I need any special vaccinations?",
    answer: "Yellow Fever vaccine certificates are recommended. High-altitude spots like Addis Ababa and Bale have negligible malaria risk, but prophylaxis is recommended for lower-elevation regions like Mombasa or Lake Langano. Consult your travel doctor 4-6 weeks prior."
  },
  {
    category: "booking",
    question: "How do I secure my tour reservation?",
    answer: "Once we design your ideal itinerary, you can confirm via WhatsApp or Email. We then send you an official pro-forma invoice. Payment is secured via official international SWIFT bank wire transfer or trusted secure credit processing. A deposit secures your vehicles, local flights, and luxury lodges."
  },
  {
    category: "booking",
    question: "What is your refund/cancellation policy?",
    answer: "Cancellations made 30+ days prior to the trip qualify for a 100% refund of the deposit. Cancellations between 15-30 days are eligible for a 50% refund, while cancellations under 14 days are non-refundable but can be credited fully to a rescheduled trip within 12 months."
  },
  {
    category: "logistics",
    question: "What internet and mobile network is available?",
    answer: "We recommend purchasing a local Ethio Telecom tourist eSIM or SIM card upon landing at Addis Ababa Bole Airport (takes only 10 minutes). 4G/5G is widely available in main towns, while remote camps in Afar use our satellite systems or reliable radio equipment for operations."
  },
  {
    category: "logistics",
    question: "What is the best season to visit Ethiopia?",
    answer: "The dry season from October to March is the ideal time to travel, with pleasant daytime weather and cool evenings. The historic and trekking sites are beautifully green in October and November. The Dallol/Afar season runs from October to April."
  }
];

export function ClientTravelPortal({ onBookPackage }: ClientTravelPortalProps) {
  // FAQ search & expand state
  const [faqSearch, setFaqSearch] = useState("");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Weather & local time state
  const [localTime, setLocalTime] = useState<string>("");
  const [selectedWeatherLoc, setSelectedWeatherLoc] = useState<string>("addis");

  // Keep track of time offset in milliseconds relative to Client's system clock to bypass device clock discrepancies
  const timeOffsetRef = useRef<number>(0);

  // Sync with reliable server times to adjust offset on mount
  useEffect(() => {
    let active = true;
    const fetchTimeCorrection = async () => {
      try {
        // Try fetching same-origin first to get the server's HTTP Date header (100% free, no rate limits, highly accurate)
        const startTime = Date.now();
        const response = await fetch(window.location.origin + "/index.html", { method: 'HEAD', cache: 'no-store' });
        const endTime = Date.now();
        const serverDateStr = response.headers.get('Date');
        
        if (serverDateStr && active) {
          const serverTime = new Date(serverDateStr).getTime();
          const latency = (endTime - startTime) / 2;
          const correctedServerTime = serverTime + latency;
          timeOffsetRef.current = correctedServerTime - endTime;
          return;
        }
      } catch (err) {
        console.warn("Same-origin HEAD sync failed:", err);
      }

      // Fallback 1: WorldTimeAPI (free public server-independent time source)
      try {
        if (!active) return;
        const res = await fetch("https://worldtimeapi.org/api/timezone/Africa/Addis_Ababa");
        const data = await res.json();
        if (data && data.datetime && active) {
          const serverTime = new Date(data.datetime).getTime();
          timeOffsetRef.current = serverTime - Date.now();
          return;
        }
      } catch (err) {
        console.warn("WorldTimeAPI fallback failed:", err);
      }

      // Fallback 2: TimeAPI.io (another highly reliable free public source)
      try {
        if (!active) return;
        const res = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Africa/Addis_Ababa");
        const data = await res.json();
        if (data && data.dateTime && active) {
          const serverTime = new Date(data.dateTime).getTime();
          timeOffsetRef.current = serverTime - Date.now();
        }
      } catch (err) {
        console.warn("TimeAPI.io fallback failed:", err);
      }
    };

    fetchTimeCorrection();
    return () => { active = false; };
  }, []);

  // Ethiopian time calculation (UTC+3) - Robust across all devices, timezones, and incorrect device clocks
  useEffect(() => {
    const updateTime = () => {
      try {
        // Calculate the synchronized time based on client time + calculated server offset
        const syncedTime = new Date(Date.now() + timeOffsetRef.current);
        const timeString = syncedTime.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Addis_Ababa',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setLocalTime(timeString);
      } catch (error) {
        // Fallback for older environments
        const now = new Date(Date.now() + timeOffsetRef.current);
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const eatDate = new Date(utc + (3 * 3600000));
        const timeString = eatDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setLocalTime(timeString);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredFaqs = PORTAL_FAQ_ITEMS.filter(item => {
    const text = (item.question + " " + item.answer).toLowerCase();
    return text.includes(faqSearch.toLowerCase());
  });

  return (
    <section id="travel-portal-section" className="py-24 md:py-32 bg-slate-card border-t border-accent-border relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-solar/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-solar/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-solar text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-solar" />
            Traveler Console & Trust Hub
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight mb-6">
            Elite Client Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Your single access terminal for trip preparation, trusted answers, and local Ethiopian climate insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-4 bg-white border border-accent-border rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-sans font-semibold">Operations Headquarters</p>
              <h3 className="font-display font-bold text-lg text-slate-900 mt-1">Addis Ababa Time</h3>
              <p className="text-solar text-3xl sm:text-4xl font-mono font-bold tracking-wider mt-3 mb-1">
                {localTime || "12:00:00 PM"}
              </p>
              <p className="text-slate-500 text-xs font-mono">Timezone: EAT (UTC +3:00)</p>
            </div>
          </div>

          <div className="md:col-span-8 bg-white border border-accent-border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accent-border pb-4 mb-4">
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest font-sans font-semibold">Interactive Climate Tracker</p>
                <h3 className="font-display font-bold text-lg text-slate-900 mt-1">Destination Conditions</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'addis', label: 'Addis Ababa' },
                  { id: 'dallol', label: 'Dallol (Afar)' },
                  { id: 'bale', label: 'Bale Mts' },
                  { id: 'mombasa', label: 'Mombasa' }
                ].map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedWeatherLoc(loc.id)}
                    className={`px-3 py-1 text-xs rounded-full font-bold border transition-all cursor-pointer ${
                      selectedWeatherLoc === loc.id
                        ? 'bg-solar text-slate-900 border-transparent shadow-sm'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selectedWeatherLoc === 'addis' && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                      <Sun className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-2xl font-mono">21°C</p>
                      <p className="text-slate-600 text-xs mt-0.5">Mild & Sunny (Addis Highlands)</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-900">Travel Advice:</span> Comfortable spring-like days. A light sweater is recommended for cool high-altitude evenings. Perfect for historical site exploring.
                  </div>
                </>
              )}
              {selectedWeatherLoc === 'dallol' && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 animate-pulse">
                      <Sun className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-2xl font-mono">41°C</p>
                      <p className="text-slate-600 text-xs mt-0.5">Extreme Thermal Geothermal Desert</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-900">Travel Advice:</span> Extremely hot. Drink at least 4-5 liters of water daily. Protect skin and eyes with high UV filters. Best toured between Oct - Apr.
                  </div>
                </>
              )}
              {selectedWeatherLoc === 'bale' && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                      <Cloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-2xl font-mono">11°C</p>
                      <p className="text-slate-600 text-xs mt-0.5">Chilly Afro-Alpine Plateau</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-900">Travel Advice:</span> Cold winds and morning mists. Heavy thermal fleece base-layers are mandatory. Keep your camera lenses dry in Afro-alpine valleys.
                  </div>
                </>
              )}
              {selectedWeatherLoc === 'mombasa' && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                      <Sun className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-2xl font-mono">29°C</p>
                      <p className="text-slate-600 text-xs mt-0.5">Tropical Coastal Ocean Breeze</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-900">Travel Advice:</span> High humidity and warm ocean waters. Sun-hats and beachwear are perfect. Use natural botanical insect sprays during palm resort sunsets.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-accent-border rounded-3xl p-6 sm:p-10 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <HelpCircle className="text-solar w-5 h-5" />
                  Elite Traveler FAQ Hub
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Quickly find answers regarding logistics, safety, visa codes, and payments</p>
              </div>
              
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search client FAQs..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-solar rounded-xl py-2.5 pl-10 pr-4 text-slate-900 text-xs outline-none transition-colors animate-none"
                />
                {faqSearch && (
                  <button
                    onClick={() => setFaqSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredFaqs.map((item, idx) => {
                  const isExpanded = expandedFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                        className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none hover:bg-slate-100/60"
                      >
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[8px] font-mono tracking-widest uppercase mb-2">
                            {item.category}
                          </span>
                          <h4 className="font-sans font-bold text-sm text-slate-900 pr-2">{item.question}</h4>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-solar' : ''}`} />
                      </button>
                      
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[300px] border-t border-slate-200' : 'max-h-0'}`}>
                        <div className="p-5 text-xs text-slate-600 leading-relaxed font-sans bg-white">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-bold text-sm">No matched questions found</p>
                <p className="text-slate-400 text-xs mt-1">Try searching for keywords like "visa", "safety", "vaccine", or "cancel".</p>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

const GET_INCLUDED_SERVICES = (id: string): string[] => {
  const key = id.toLowerCase();
  if (key.includes("afar")) {
    return [
      "Private luxury 4x4 Land Cruiser with professional driver",
      "Premium expedition camping gear & designated local security escort",
      "Full board dining, mineral water, energy snacks & coffee ritual",
      "Professional English-speaking native Afar guide & local scouts",
      "National park permits, regional clearance fees & community dues"
    ];
  }
  if (key.includes("harar")) {
    return [
      "Luxury climate-controlled transfers with expert private driver",
      "Bespoke traditional Harari guest house stay (or premium hotel)",
      "Authentic local dining including specialized Harari dinners",
      "Expert private historian guide for Harar Jugol walled city",
      "Famous wild hyena feeding experience & all landmark entries"
    ];
  }
  if (key.includes("langano")) {
    return [
      "Private SUV transfers from Addis Ababa and return",
      "Lakeside boutique luxury lodge stay with Rift Valley views",
      "Gourmet full-board dining and fresh tropical refreshments",
      "Guided water activities, boat excursion & nature bird-watching walk",
      "All resort amenities access, local taxes & activity permits"
    ];
  }
  if (key.includes("wenchi")) {
    return [
      "Premium off-road vehicle transfers with professional driver",
      "High-end eco-lodge stay overlooking the dramatic caldera",
      "Organic farm-to-table lunch, picnic baskets & premium beverages",
      "Guided crater descent, private boat crossing & horseback trail rides",
      "Local community guides, conservation fees & monastery entry permits"
    ];
  }
  if (key.includes("bale") || key.includes("chebera")) {
    return [
      "Rugged off-road safari land cruiser & expert naturalist guide",
      "Exclusive boutique wildlife lodge & premium highland chalet stays",
      "Gourmet organic dining, safari field picnic hampers & hot teas",
      "Private game drives & wilderness tracking for rare endemic species",
      "National park entry permits, scout support & conservation fees"
    ];
  }
  if (key.includes("mombasa") || key.includes("kenya")) {
    return [
      "Roundtrip private executive airport transfers in Mombasa",
      "Luxury 5-star beachfront resort stay with Indian Ocean views",
      "Delectable half-board dining and beachside tropical refreshments",
      "Private guided tour of Fort Jesus & romantic dhow sunset cruise",
      "All marine park conservation fees & excursion tickets"
    ];
  }
  if (key.includes("sof") || key.includes("omar")) {
    return [
      "Luxury 4x4 land cruiser transport with professional drivers",
      "Premium eco-lodge or comfortable historic guest house stay",
      "Field-prepared organic lunch boxes, high-energy snacks & mineral water",
      "Certified expert speleologist guides & local pathfinders",
      "Full cave system entry permits, safety equipment & community fees"
    ];
  }
  if (key.includes("doho") || key.includes("awash")) {
    return [
      "Premium luxury SUV transfers from Addis Ababa",
      "Bespoke hot springs lodge bungalows with private therapeutic spring access",
      "Fine dining full-board packages & scenic sundowner refreshments",
      "Guided wildlife safari drives, Awash Falls visit & night safaris",
      "National park permits, professional local scouts & resort fees"
    ];
  }
  if (key.includes("simien")) {
    return [
      "Luxury 4x4 land cruiser transportation & professional mountain guide",
      "Premium high-altitude eco-lodge accommodation with panoramic vistas",
      "Full-board mountain dining, warm herbal teas & organic energy snacks",
      "Guided trekking to spot endemic Gelada monkeys and rare ibex",
      "National park permits, professional scouts & community conservation fees"
    ];
  }
  if (key.includes("gondar") || key.includes("fasil")) {
    return [
      "Bespoke premium transfers from Gondar Airport",
      "Luxury boutique hotel stay with stunning historic city views",
      "Gourmet dining showcasing authentic local and international options",
      "Private professional historian guide for Fasil Ghebbi castle complex",
      "All monument, Fasilides Bath, and historic museum entry tickets"
    ];
  }
  if (key.includes("lalibela")) {
    return [
      "Bespoke private airport transfers & luxury local shuttle",
      "Premium luxury boutique hotel with mountain valley views",
      "Traditional gourmet dining & authentic honey-wine tastings",
      "Private professional religious historian guide for all 11 churches",
      "Multi-day UNESCO World Heritage passes & church community fees"
    ];
  }
  return [
    "Private climate-controlled transport with expert drivers",
    "Premium boutique hotel or luxury lodge accommodations",
    "Delectable daily breakfast and curated dining experiences",
    "Professional English-speaking local guides at all landmarks",
    "All national park, museum, and community admission tickets"
  ];
};

interface DestinationCardShowcaseProps {
  key?: React.Key;
  dest: any;
  editorial: any;
  idx: number;
  isWideLeft: boolean;
  displayTitle: string;
  displaySubtitle: string;
  displayIntro: string;
  displayHighlights: string[];
  displayImages: string[];
  onBookPackage: (destinationName: string) => void;
}

const DestinationCardShowcase: React.FC<DestinationCardShowcaseProps> = ({
  dest,
  editorial,
  idx,
  isWideLeft,
  displayTitle,
  displaySubtitle,
  displayIntro,
  displayHighlights,
  displayImages,
  onBookPackage,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group/showcase bg-obsidian/45 border border-accent-border/40 hover:border-solar/30 rounded-2xl sm:rounded-[32px] shadow-lg transition-all duration-500 relative overflow-hidden flex flex-col p-4 xs:p-6 sm:p-10 lg:p-12 space-y-6 sm:space-y-8"
    >
      {/* 1. Destination Image Gallery Showcase ABOVE the text */}
      <div className="relative w-full h-[220px] xs:h-[280px] sm:h-[380px] lg:h-[420px] overflow-hidden rounded-xl sm:rounded-2xl border border-accent-border/30 bg-zinc-950">
        <AfarImageCarousel 
          images={displayImages} 
          showControls={false}
          aspectRatioClass="w-full h-full"
          imgClassName="w-full h-full object-cover block"
          useDefaultStyles={false}
          autoplayInterval={3500}
        />
      </div>

      {/* 2. Destination Title & Text Details BELOW the image */}
      <div className="space-y-3 sm:space-y-4">
        {displaySubtitle && (
          <span className="text-[9px] sm:text-xs text-solar font-bold uppercase tracking-[0.2em] mb-1 sm:mb-2 font-sans flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-solar animate-pulse" />
            {displaySubtitle}
          </span>
        )}

        <h3 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-off-white tracking-tight leading-tight">
          {displayTitle}
        </h3>
        
        <div className="w-12 sm:w-20 h-1 bg-solar/40 rounded-full mt-1 sm:mt-2 mb-3 sm:mb-4 group-hover/showcase:w-32 transition-all duration-500" />

        {displayIntro && (
          <p className="text-off-white/90 text-xs sm:text-base leading-relaxed font-sans font-light max-w-4xl">
            {displayIntro}
          </p>
        )}
      </div>

      {/* 3. Key Highlights Section */}
      {displayHighlights.length > 0 && (
        <div className="w-full pt-4 sm:pt-6 border-t border-accent-border/20">
          <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-solar mb-3 sm:mb-4 font-sans flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-solar animate-pulse" />
            Key Highlights
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 sm:gap-y-3 list-none">
            {displayHighlights.map((highlight: string, hIdx: number) => {
              const colonIndex = highlight.indexOf(':');
              if (colonIndex !== -1) {
                const title = highlight.substring(0, colonIndex);
                const description = highlight.substring(colonIndex + 1);
                return (
                  <li key={hIdx} className="flex items-start gap-2 text-off-white/80 text-xs sm:text-sm leading-relaxed font-normal">
                    <span className="text-solar shrink-0 font-bold mt-0.5">•</span>
                    <span>
                      <strong className="text-off-white font-bold">{title}:</strong>{description}
                    </span>
                  </li>
                );
              }
              return (
                <li key={hIdx} className="flex items-start gap-2 text-off-white/80 text-xs sm:text-sm leading-relaxed font-normal">
                  <span className="text-solar shrink-0 font-bold mt-0.5">•</span>
                  <span>{highlight}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default function PageHome({ onBookPackage }: PageHomeProps) {
  const { content } = useWebsiteContent();
  const CONTACT_INFO = content.contactInfo || fallbackCONTACT_INFO;
  const TOUR_PACKAGES = content.tourPackages || fallbackTOUR_PACKAGES;
  const FEATURED_STORIES = content.featuredStories || fallbackFEATURED_STORIES;
  const OPERATIONAL_PILLARS = content.about?.pillars || fallbackOPERATIONAL_PILLARS;
  const DESTINATIONS = content.destinations || fallbackDESTINATIONS;

  // Regional Explorer and Tour Details state definitions
  const [activeRegion, setActiveRegion] = useState<string>("north");
  const [expandedRegions, setExpandedRegions] = useState<string[]>([]);
  const [expandedTourIds, setExpandedTourIds] = useState<string[]>([]);

  const regions = [
    {
      id: "north",
      name: "North Ethiopia",
      tagline: "The Historical & Spiritual Heartland",
      description: "Home to ancient rock-hewn churches, medieval imperial castles, and the dramatic highland peaks of the Simien Mountains.",
      destIds: ["lalibela", "gondar", "simien"],
      images: [
        "https://lh3.googleusercontent.com/d/1wObvCNhod1hHq8UgVyIm3rDfFHG0mzVX", // Lalibela
        "https://lh3.googleusercontent.com/d/1Wanv6CGUUaxF_gFSw_Gc6U397ns_WkPZ", // Gondar
        "https://lh3.googleusercontent.com/d/1B4_cVm5V8xWx4jjJ1y64GM1TLvifv38f"  // Simien Mountains landscape & water
      ]
    },
    {
      id: "east",
      name: "East Ethiopia",
      tagline: "Active Volcanoes & Living Ancient Culture",
      description: "Where active lava lakes and geothermal salt flats meet ancient walled cities, spectacular cave systems, and savanna wildlife.",
      destIds: ["afar", "harar", "sof-omar"],
      images: [
        "https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc", // Afar
        "https://lh3.googleusercontent.com/d/1XT4E0bnzH8NAerzhh4593m5_iT2z2evn", // Harar
        "https://lh3.googleusercontent.com/d/1ynQTvZTqGwGk60lpHOfP3XBNzAq56hUU"  // Sof Omar
      ]
    },
    {
      id: "south",
      name: "South Ethiopia",
      tagline: "Rift Valley Lakes & Highland Wilderness",
      description: "A land of peaceful Rift Valley lakes, Afro-alpine mountain wilderness, rare endemic wildlife, and rich ecosystems.",
      destIds: ["langano", "bale"],
      images: [
        "https://lh3.googleusercontent.com/d/1F8bLbL2KSswLCM597_0x0Bbf4s_FYszQ", // Langano
        "https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN"  // Bale
      ]
    },
    {
      id: "central",
      name: "Central Ethiopia",
      tagline: "Lush Crater Lakes & Rift Valley Safaris",
      description: "Explore lush volcanic crater lakes, therapeutic hot springs, scenic highland trails, and magnificent savanna wildlife reserves within easy reach of Addis Ababa.",
      destIds: ["wenchi", "doho-awash"],
      images: [
        "https://lh3.googleusercontent.com/d/1xYKpCVh4qtLJtg6NAeFsEVXxrDy_Za5R", // Wenchi
        "https://lh3.googleusercontent.com/d/1efUrY3v-K7sSQkCA53rwsq8v43E52RvV"  // Doho Lodge
      ]
    },
    {
      id: "beyond",
      name: "Beyond Ethiopia",
      tagline: "Tropical Coast & Coastal Swahili Culture",
      description: "Unforgettable cross-border adventures to the beautiful beaches, coastal Swahili culture, and blue waters of Mombasa, Kenya.",
      destIds: ["mombasa"],
      images: [
        "https://lh3.googleusercontent.com/d/1A3RpQL7R1gQtAvHlTp1Vj2e_BDpP7rvL", // Mombasa
        "https://lh3.googleusercontent.com/d/1N0PgYlrqyqZa-3as_UlON4hgjEy-DG88"  // Mombasa 2
      ]
    }
  ];

  const destinationsScrollRef = useRef<HTMLDivElement>(null);
  const packagesScrollRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  // Set up isDesktop on mount & resize
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const DEFAULT_HERO_BG = "https://lh3.googleusercontent.com/d/1Z95HuwiHjhHTv5VuYaxxg19RRqtRIH82";
  const [heroImgSrc, setHeroImgSrc] = useState<string>(() => {
    return formatImageUrl(content.hero?.bgImage) || DEFAULT_HERO_BG;
  });

  // Preload and keep hero background image in sync with context
  useEffect(() => {
    const validSrc = formatImageUrl(content.hero?.bgImage) || DEFAULT_HERO_BG;
    setHeroImgSrc(validSrc);
    if (validSrc) {
      const img = new Image();
      img.src = validSrc;
    }
  }, [content.hero?.bgImage]);

  // Preload Our Foundations images immediately on mount so they are ready early before scroll
  useEffect(() => {
    const defaultFoundationImages = [
      "https://lh3.googleusercontent.com/d/1QpiBpROtDHbMrGarBeGfRCwDKOzTrcuj",
      "https://lh3.googleusercontent.com/d/1Ey7YxJfCjEMw2H2uVM1tYCMFLvqiPWSe",
      "https://lh3.googleusercontent.com/d/18zxOIHsDrrqLXuuhK4PrQtxzh43c74Es"
    ];
    OPERATIONAL_PILLARS.forEach((pillar, idx) => {
      const src = formatImageUrl(pillar.imageUrl || defaultFoundationImages[idx]);
      if (src) {
        const img = new Image();
        img.referrerPolicy = "no-referrer";
        img.src = src;
      }
    });
  }, [OPERATIONAL_PILLARS]);

  // Preload Featured Travelers images in background so they are ready before user scrolls down
  useEffect(() => {
    if (!FEATURED_STORIES || FEATURED_STORIES.length === 0) return;
    
    // Background preload shortly after mount (doesn't block hero)
    const timer = setTimeout(() => {
      FEATURED_STORIES.forEach((story) => {
        if (story.imageUrl) {
          preloadImage(story.imageUrl);
        }
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [FEATURED_STORIES]);

  // Preload all Explore the Journey image assets from all 11 packages globally on initial load
  useEffect(() => {
    preloadAllExploreJourneyImages(content.tourPackages || fallbackTOUR_PACKAGES);
  }, [content.tourPackages]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const header = document.getElementById('global-header');
    const headerHeight = header ? header.offsetHeight : 80;

    // If the visitor is already on the Contact section, do nothing.
    if (id === 'contact-desk-section') {
      const isAlreadyOnContact = rect.top >= -50 && rect.top <= headerHeight + 50;
      if (isAlreadyOnContact) {
        return;
      }
    }

    const elementPosition = rect.top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight - 24; // 24px clean offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div id="home-page-container" className="bg-obsidian text-off-white">
      
      {/* BLOCK 1: Hero Section (The Premium Gateway) */}
      <section id="hero-section" className="relative min-h-[100vh] flex items-center justify-center pt-36 pb-28 px-6 sm:px-12 lg:px-16 overflow-hidden bg-gradient-to-br from-amber-950/80 via-zinc-950 to-emerald-950/70">
        {/* Background Image Overlay - Showing the full-color majestic natural place beautifully with slow cinematic movement */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden bg-zinc-950">
          <motion.img
            src={heroImgSrc}
            alt="Majestic Ethiopian landscape"
            className="w-full h-full object-cover opacity-100 origin-center"
            loading="eager"
            onError={() => {
              if (heroImgSrc !== DEFAULT_HERO_BG) {
                setHeroImgSrc(DEFAULT_HERO_BG);
              }
            }}
            {...({ fetchPriority: "high" } as any)}
            animate={isDesktop ? {
              scale: [1.00, 1.03, 1.00],
              x: [0, 2, 0],
              y: [0, -1, 0]
            } : { 
              scale: [1.02, 1.08, 1.02],
              x: [0, 8, 0],
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 24, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            referrerPolicy="no-referrer"
          />
          {/* Subtle luminous overlay for maximum image vibrancy and crystal-clear readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
          <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%] pointer-events-none" />
        </div>

        {/* Clean container with positive stacking layer so the natural background is fully visible */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
              }
            }
          }}
          className="relative z-20 max-w-6xl mx-auto text-center flex flex-col items-center"
        >
          
          {/* Accent Tag */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="inline-flex items-center gap-2.5 bg-solar/20 border border-solar/70 rounded-full px-5 py-2 mb-8 text-solar text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xl"
          >
            <Award className="w-4 h-4" />
            <span>Official Travel Agency Partner</span>
          </motion.div>

          {/* Main Headline with a custom text shadow to ensure perfect legibility */}
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none mb-8 [text-shadow:_0_8px_36px_rgba(0,0,0,0.95)] capitalize"
          >
            {content.hero?.title ? (
              content.hero.title.includes("Beyond") ? (
                <>
                  {content.hero.title.split("Beyond")[0]} <span className="text-solar italic font-semibold font-display">Beyond</span>
                </>
              ) : content.hero.title
            ) : (
              <>
                Explore Ethiopia and <span className="text-solar italic font-semibold font-display">Beyond</span>
              </>
            )}
          </motion.h1>

          {/* Subheadline with text shadow */}
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-zinc-100 max-w-4xl mb-12 leading-relaxed [text-shadow:_0_3px_15px_rgba(0,0,0,0.98)]"
          >
            {content.hero?.subtitle || "Every Journey Tells a Story."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center px-4 sm:px-0 items-center"
          >
            <a
              href="#contact-desk-section"
              onClick={(e) => handleScrollTo(e, 'contact-desk-section')}
              className="w-full sm:w-auto px-10 py-5 bg-solar text-slate-900 font-display font-black tracking-widest rounded-xl transition-all duration-300 hover:shadow-[0_12px_24px_rgba(234,179,8,0.3)] hover:-translate-y-1 hover:scale-103 shadow-lg shadow-solar/10 text-center text-xs sm:text-sm uppercase cursor-pointer"
            >
              Book Custom
            </a>
            <a
              href="#tours-section"
              onClick={(e) => handleScrollTo(e, 'tours-section')}
              className="w-full sm:w-auto px-10 py-5 bg-black/40 border-2 border-solar/80 text-solar font-display font-black tracking-widest rounded-xl transition-all duration-300 hover:bg-solar hover:text-slate-900 text-center text-xs sm:text-sm uppercase cursor-pointer backdrop-blur-md shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore Trips
            </a>
            <a
              href={CONTACT_INFO.whatsAppUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full sm:w-auto px-10 py-5 bg-black/70 border border-[#25D366]/60 text-[#25D366] font-display font-black tracking-widest rounded-xl transition-all duration-300 hover:bg-[#25D366] hover:text-slate-900 flex items-center justify-center gap-2.5 text-xs sm:text-sm uppercase shadow-lg hover:-translate-y-1 hover:scale-103 hover:shadow-[0_12px_24px_rgba(37,211,102,0.3)]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>

        </motion.div>

        {/* Scroll down mouse animation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-70">
          <span className="text-[10px] uppercase tracking-widest text-white font-bold">Scroll down</span>
          <div className="w-5.5 h-10 border-2 border-white rounded-full p-1">
            <div className="w-1.5 h-1.5 bg-solar rounded-full animate-bounce mx-auto" />
          </div>
        </div>
      </section>

      {/* NEW BLOCK: Welcome & Adventure Ethos */}
      <section id="welcome-section" className="py-36 md:py-48 px-6 sm:px-12 lg:px-16 bg-obsidian border-b border-accent-border/50 relative overflow-hidden">
        {/* Subtle decorative warm background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(234,179,8,0.08),transparent_50%)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2.5 bg-solar/10 border border-solar/40 rounded-full px-5 py-2 mb-8 text-solar text-xs sm:text-sm font-bold uppercase tracking-widest">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Welcome to Explore Ethiopia Travel</span>
          </div>
          
          <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-off-white tracking-tight leading-tight mb-10">
            Creating Meaningful Travel Experiences <span className="italic font-semibold text-solar">Across Ethiopia and Beyond</span>
          </h2>
          
          <div className="space-y-6 text-base sm:text-lg lg:text-xl text-muted-silver leading-relaxed max-w-4xl mx-auto">
            <p className="font-sans font-medium text-off-white text-lg sm:text-xl lg:text-2xl leading-relaxed">
              Explore Ethiopia Travel provides organized trips, custom private tours, and breathtaking adventure experiences. From volcanic crater explorations to lakeside weekend getaways, we curate every detail seamlessly with premium vehicles and expert local guides.
            </p>
            
            <p className="font-sans font-normal text-muted-silver text-sm sm:text-base lg:text-lg italic leading-relaxed pt-4">
              We bridge the gap between untamed wilderness and high-end comfort. Traverse surreal landscapes, discover living traditions, and cross borders with complete safety and secure, reliable transport services.
            </p>
          </div>
        </motion.div>
      </section>

      {/* BLOCK 2: Operational Standards (Redesigned Luxury Pillars) */}
      <section id="standards-section" className="py-48 md:py-64 px-6 sm:px-12 lg:px-16 bg-slate-card border-y border-accent-border/50 overflow-hidden relative">
        {/* Subtle decorative grid lines for a touch of luxury travel architectural structure */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#EAB308_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-32"
          >
            <span className="text-solar text-xs sm:text-sm font-bold uppercase tracking-widest border-b-2 border-solar/30 pb-3 font-sans">
              Our Foundations
            </span>
            <h2 className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl text-off-white mt-10 mb-8 tracking-tight leading-tight max-w-5xl mx-auto">
              Why Travelers Choose <span className="italic text-solar">Explore Ethiopia</span>
            </h2>
            <div className="w-24 h-1 bg-solar/40 mx-auto rounded-full mb-8" />
            <p className="text-muted-silver max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl leading-relaxed font-sans font-light">
              Exceptional journeys thoughtfully designed with comfort, authenticity, and personalized service.
            </p>
          </motion.div>

          {/* Hidden preloader elements to force eager background downloading of Our Foundations images */}
          <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
            {OPERATIONAL_PILLARS.map((pillar, idx) => {
              const backgrounds = [
                "https://lh3.googleusercontent.com/d/1QpiBpROtDHbMrGarBeGfRCwDKOzTrcuj",
                "https://lh3.googleusercontent.com/d/1Ey7YxJfCjEMw2H2uVM1tYCMFLvqiPWSe",
                "https://lh3.googleusercontent.com/d/18zxOIHsDrrqLXuuhK4PrQtxzh43c74Es"
              ];
              return (
                <img
                  key={`foundation-preload-${idx}`}
                  src={formatImageUrl(pillar.imageUrl || backgrounds[idx])}
                  alt=""
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                />
              );
            })}
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.25
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 xl:gap-20"
          >
            {OPERATIONAL_PILLARS.map((pillar, idx) => {
              // High-end icons mapping
              const icons = [
                <Shield className="w-6 h-6 text-white" />,
                <Users className="w-6 h-6 text-white" />,
                <Map className="w-6 h-6 text-white" />
              ];

              // Authentic high-quality Ethiopian scenic backgrounds
              const backgrounds = [
                "https://lh3.googleusercontent.com/d/1QpiBpROtDHbMrGarBeGfRCwDKOzTrcuj", // Effortless Journeys (wy2)
                "https://lh3.googleusercontent.com/d/1Ey7YxJfCjEMw2H2uVM1tYCMFLvqiPWSe", // Authentic Connections (wy1)
                "https://lh3.googleusercontent.com/d/18zxOIHsDrrqLXuuhK4PrQtxzh43c74Es"  // Tailored Experiences (fm8)
              ];

              const RomanNumerals = ["I", "II", "III"];
              const targetSectionId = idx === 1 ? 'destinations-section' : 'tours-section';

              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 60 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  onClick={(e) => handleScrollTo(e as any, targetSectionId)}
                  className="group bg-obsidian border border-accent-border/60 hover:border-solar/40 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(234,179,8,0.08)] cursor-pointer relative overflow-hidden"
                >
                  {/* Subtle watermarked Roman Numeral for structural graphic design elegance */}
                  <span className="absolute bottom-6 right-8 font-display font-black text-8xl text-solar/5 pointer-events-none select-none transition-all duration-700 group-hover:scale-110 group-hover:text-solar/10">
                    {RomanNumerals[idx]}
                  </span>

                  <div>
                    {/* Visual Showcase (Adaptive, preserving the full native image composition) */}
                    <div className="w-full rounded-2xl overflow-hidden relative shadow-md group-hover:shadow-xl transition-all duration-500 bg-black/10 border border-accent-border/20">
                      <LazyImage 
                        src={formatImageUrl(pillar.imageUrl || backgrounds[idx])} 
                        alt={pillar.title}
                        className="w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/10]"
                        imgClassName="w-full h-full object-cover block transition-transform duration-[1.5s] ease-out group-hover:scale-103"
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Gradient Overlays for rich tone-mapping */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

                      {/* Icon overlay beautifully anchored at the bottom-right of the visual container */}
                      <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-solar/95 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                        {icons[idx] || <Sparkles className="w-5 h-5 text-white" />}
                      </div>
                    </div>

                    {/* Highly structured, clean typographic layout */}
                    <div className="pt-8 px-2">
                      <h3 className="font-display font-medium text-2xl sm:text-3xl lg:text-3xl text-off-white tracking-tight group-hover:text-solar transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <div className="w-8 h-0.5 bg-solar/40 group-hover:w-16 transition-all duration-500 mt-4 mb-5 rounded-full" />
                      <p className="text-muted-silver text-base sm:text-lg leading-relaxed font-sans font-light">
                        {pillar.text}
                      </p>
                    </div>
                  </div>

                  {/* Refined subtle travel action link at the bottom of the card */}
                  <a
                    href={`#${targetSectionId}`}
                    onClick={(e) => handleScrollTo(e, targetSectionId)}
                    className="pt-6 px-2 border-t border-accent-border/40 mt-8 flex items-center justify-between group/link"
                  >
                    <span className="text-xs font-extrabold uppercase tracking-widest text-solar group-hover:text-amber-300 transition-colors font-sans">
                      Explore Our Experience
                    </span>
                    <ChevronRight className="w-4 h-4 text-solar group-hover:text-amber-300 transition-all duration-300 transform group-hover:translate-x-1" />
                  </a>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>


      {/* Helper Component for NatGeo / Airbnb / Apple Luxury Destination Showcase */}
      {/* Defined inline for seamless scope */}


      {/* BLOCK 3: Regional Explorer (Luxury Editorial Organised into 5 Regions) */}
      <section id="destinations-section" className="py-28 sm:py-36 md:py-48 px-4 sm:px-8 lg:px-16 bg-obsidian border-b border-accent-border/30 scroll-mt-24 relative overflow-hidden">
        {/* Subtle decorative background ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#EAB308_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">

          <div className="text-center mb-20 sm:mb-28">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-extrabold uppercase tracking-[0.2em] font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Regional Explorer
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-off-white mt-6 mb-6 tracking-tight leading-tight max-w-5xl mx-auto">
              Discover Ethiopia by <span className="italic text-solar">Region</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-solar to-transparent mx-auto rounded-full mb-8" />
            <p className="text-off-white/90 max-w-4xl mx-auto text-lg sm:text-2xl lg:text-3xl leading-relaxed font-sans font-normal">
              Organized into five spectacular geographical and historical zones, explore the rich diversity of Ethiopia and East Africa. Click any region below to reveal its specific, hand-selected luxury destinations and attractions.
            </p>
          </div>

          {/* Region Grid Showcase */}
          <div className="grid grid-cols-1 gap-16 md:gap-24 max-w-6xl mx-auto">
            {regions.map((region) => {
              const isExpanded = expandedRegions.includes(region.id);
              const heroImage = region.images[0];
              
              return (
                <div key={region.id} className="w-full">
                  <motion.div
                    whileHover={isExpanded ? undefined : { y: -6 }}
                    className={`group bg-slate-card border rounded-[24px] sm:rounded-[40px] overflow-hidden transition-all duration-500 flex flex-col justify-between h-full ${
                      isExpanded 
                        ? 'border-solar shadow-[0_20px_50px_rgba(234,179,8,0.15)] ring-1 ring-solar/30' 
                        : 'border-accent-border/50 hover:border-solar/40 shadow-md hover:shadow-xl'
                    }`}
                  >
                    {/* Hero Image Gallery - Identical across all cards, landscape ratio, large, cinematic, edge-to-edge */}
                    <div className="relative w-full h-[320px] xs:h-[420px] sm:h-[580px] lg:h-[680px] xl:h-[760px] bg-black/25 overflow-hidden border-b border-accent-border/30">
                      <AfarImageCarousel 
                        images={region.images} 
                        autoplayInterval={3000 + regions.findIndex(r => r.id === region.id) * 300}
                        aspectRatioClass="w-full h-full"
                        imgClassName="w-full h-full object-cover block"
                        useDefaultStyles={false}
                      />
                      {/* Smooth bottom shadow fade */}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-20" />
                    </div>

                    {/* Card Info - Exactly requested content: hero image, region name, short description, destination count, explore region button, nothing else */}
                    <div className="p-4 xs:p-6 sm:p-10 lg:p-16 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="mb-2">
                          <span className="text-solar text-[10px] sm:text-xs uppercase tracking-[0.2em] font-extrabold font-sans">
                            {region.destIds.length} {region.destIds.length === 1 ? "Destination" : "Destinations"}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-off-white mb-3 group-hover:text-solar transition-colors duration-300">
                          {region.name}
                        </h3>
                        <p className="text-muted-silver text-xs sm:text-base leading-relaxed font-sans mb-6 max-w-4xl">
                          {region.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setExpandedRegions(prev => 
                            prev.includes(region.id)
                              ? prev.filter(id => id !== region.id)
                              : [...prev, region.id]
                          );
                        }}
                        className={`w-full sm:w-auto self-start py-3.5 sm:py-4 px-6 sm:px-9 rounded-xl sm:rounded-2xl font-display font-black text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                          isExpanded
                            ? 'bg-zinc-800/90 border border-zinc-600/80 text-zinc-100 hover:bg-zinc-700 hover:text-white shadow-md'
                            : 'bg-solar text-slate-900 hover:bg-amber-400 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                        }`}
                      >
                        <span>{isExpanded ? "Close Region" : "Explore Region"}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>

                      {/* Elegant Accordion Expansion INSIDE the card to toggle details within the existing container, optimizing for phone browsers */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            key={`region-expanded-${region.id}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden border-t border-accent-border/20 mt-6 pt-6 sm:mt-10 sm:pt-10 w-full"
                          >
                            {/* Staggered Alternating List of Editorial Destinations in Selected Region */}
                            <div className="space-y-8 sm:space-y-16" ref={destinationsScrollRef}>
                              {(() => {
                                const regionDests = DESTINATIONS.filter(d => region.destIds.includes(d.id));

                                return regionDests.map((dest, idx) => {
                                  const editorial = EDITORIAL_DESTINATIONS.find(
                                    e => e.id === dest.id || e.id.toLowerCase().includes(dest.id.toLowerCase()) || dest.id.toLowerCase().includes(e.id.toLowerCase())
                                  );

                                  const isWideLeft = editorial ? editorial.layoutType === "wide-left" : idx % 2 === 0;

                                  const displayTitle = dest.name || editorial?.title || 'Destination';
                                  const displaySubtitle = dest.vibeText || editorial?.subtitle || '';
                                  const displayIntro = dest.journeyDescription || dest.keyDetails || dest.vibeText || editorial?.intro || '';
                                  
                                  const displayHighlights = (dest.highlights && dest.highlights.length > 0)
                                    ? dest.highlights
                                    : (editorial?.highlights || []);

                                  let displayImages: string[] = [];
                                  if (dest.imageUrl) {
                                    const galleryItems = (dest.gallery || []).filter(g => g !== dest.imageUrl);
                                    displayImages = [dest.imageUrl, ...galleryItems];
                                  } else if (dest.gallery && dest.gallery.length > 0) {
                                    displayImages = dest.gallery;
                                  } else if (dest.id === "afar") {
                                    displayImages = AFAR_DESTINATION_IMAGES;
                                  } else if (dest.id === "harar") {
                                    displayImages = HARAR_DESTINATION_IMAGES;
                                  } else if (dest.id === "langano") {
                                    displayImages = LANGANO_DESTINATION_IMAGES;
                                  } else if (dest.id === "mombasa") {
                                    displayImages = KENYA_DESTINATION_IMAGES;
                                  } else if (dest.id === "wenchi") {
                                    displayImages = WENCHI_DESTINATION_IMAGES;
                                  } else if (dest.id === "bale") {
                                    displayImages = CHEBERA_DESTINATION_IMAGES;
                                  } else {
                                    displayImages = [editorial?.imageUrl || "https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc"];
                                  }

                                  return (
                                    <DestinationCardShowcase
                                      key={dest.id || idx}
                                      dest={dest}
                                      editorial={editorial}
                                      idx={idx}
                                      isWideLeft={isWideLeft}
                                      displayTitle={displayTitle}
                                      displaySubtitle={displaySubtitle}
                                      displayIntro={displayIntro}
                                      displayHighlights={displayHighlights}
                                      displayImages={displayImages}
                                      onBookPackage={onBookPackage}
                                    />
                                  );
                                });
                              })()}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* BLOCK 4: Curated Journeys (Luxury Editorial Alternating Layout) */}
      <section id="tours-section" className="py-28 sm:py-36 md:py-48 px-0 bg-slate-card border-y border-accent-border/50 scroll-mt-24 relative overflow-hidden">
        {/* Decorative architectural background graphics */}
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none bg-[radial-gradient(#EAB308_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="w-full relative z-10">

          <div className="text-center mb-20 sm:mb-28 px-6 sm:px-12 lg:px-16 max-w-[1400px] mx-auto">
            <span className="text-solar text-sm sm:text-base font-extrabold uppercase tracking-[0.15em] border-b-2 border-solar/30 pb-3 font-sans">
              Curated Tours
            </span>
            <h2 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl text-off-white mt-10 mb-8 tracking-tight leading-tight max-w-5xl mx-auto">
              Find Your <span className="italic text-solar">Perfect Adventure</span>
            </h2>
            <div className="w-24 h-1 bg-solar/40 mx-auto rounded-full mb-8" />
            <p className="text-off-white/90 max-w-4xl mx-auto text-xl sm:text-2xl lg:text-3xl leading-relaxed font-sans font-normal">
              Every tour is thoughtfully designed to combine comfort, authentic local experiences, and seamless planning. Whether you're seeking adventure, cultural discovery, nature, or a relaxing escape, our expertly curated itineraries ensure an unforgettable travel experience from beginning to end.
            </p>
          </div>

          {/* Beautiful Preview Grid of Tour Packages - Utilizing the loved tall aspect-[3/4] portrait image style but restoring clean text & package card style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start px-6 sm:px-12 lg:px-16 max-w-[1400px] mx-auto" ref={packagesScrollRef}>
            {TOUR_PACKAGES.map((pkg: TourPackage, idx: number) => {
              const enrichedOriginal = (ENRICHED_PACKAGES[pkg.id as keyof typeof ENRICHED_PACKAGES] || {
                title: pkg.title,
                badge: pkg.priceTag || "Signature Experience",
                bestFor: pkg.destinationValue || "",
                duration: "",
                intro: pkg.highlights,
                journeyHighlights: [] as string[],
                included: pkg.highlights ? [pkg.highlights] : []
              }) as any;

              const displayTitle = pkg.title || enrichedOriginal.title || 'Tour Package';
              const displayBadge = pkg.priceTag || enrichedOriginal.badge || "Signature Experience";
              const displayBestFor = pkg.destinationValue || enrichedOriginal.bestFor || "";
              
              const displayIntro = pkg.description || pkg.highlights || enrichedOriginal.intro || "";

              const displayJourneyHighlights = (pkg.journeyHighlights && pkg.journeyHighlights.length > 0)
                ? pkg.journeyHighlights
                : (enrichedOriginal.journeyHighlights || []);

              const displayIncluded = (pkg.includedItems && pkg.includedItems.length > 0)
                ? pkg.includedItems
                : (enrichedOriginal.included || (pkg.highlights ? [pkg.highlights] : []));

              const displayExploreJourney: JourneyLocation[] = (pkg.exploreJourney && pkg.exploreJourney.length > 0)
                ? pkg.exploreJourney
                : (enrichedOriginal.exploreJourney || []);

              let displayImages: string[] = [];
              if (pkg.imageUrl) {
                const galleryItems = (pkg.gallery || []).filter(g => g !== pkg.imageUrl);
                displayImages = [pkg.imageUrl, ...galleryItems];
              } else if (pkg.gallery && pkg.gallery.length > 0) {
                displayImages = pkg.gallery;
              } else if (pkg.id === "pkg-1") {
                displayImages = AFAR_JOURNEY_IMAGES;
              } else if (pkg.id === "pkg-3") {
                displayImages = HARAR_JOURNEY_IMAGES;
              } else if (pkg.id === "pkg-2") {
                displayImages = LANGANO_JOURNEY_IMAGES;
              } else if (pkg.id === "pkg-6") {
                displayImages = KENYA_JOURNEY_IMAGES;
              } else if (pkg.id === "pkg-4") {
                displayImages = WENCHI_JOURNEY_IMAGES;
              } else if (pkg.id === "pkg-5") {
                displayImages = CHEBERA_JOURNEY_IMAGES;
              } else {
                displayImages = ["https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc"];
              }

              const isExpanded = expandedTourIds.includes(pkg.id);

              return (
                <div key={pkg.id || idx} className="relative h-full group">
                  {/* Geometric Background Layer (Offset) */}
                  <div className="hidden lg:block absolute -bottom-5 -left-5 w-full h-full border border-solar/20 rounded-[36px] -z-10 pointer-events-none -translate-x-1.5 translate-y-1.5 transition-transform duration-500 group-hover:translate-x-[-12px] group-hover:translate-y-[12px]" />

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                    className={`bg-slate-card/60 border hover:border-solar/60 rounded-[32px] overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-500 h-full ${
                      isExpanded ? 'border-solar bg-slate-card/90 ring-1 ring-solar/20' : 'border-accent-border/50'
                    }`}
                  >
                    {/* Loved portrait aspect-[3/4] image style with bottom caption overlay */}
                    <div className="relative w-full overflow-hidden bg-slate-card/20 aspect-[3/4] shadow-2xl border-b border-accent-border/30">
                      <AfarImageCarousel 
                        images={displayImages} 
                        aspectRatioClass="absolute inset-0 w-full h-full"
                        imgClassName="w-full h-full object-cover block transition-transform duration-[2s] ease-out group-hover:scale-103"
                        useDefaultStyles={false}
                        showControls={false}
                        autoplayInterval={3200 + idx * 300}
                      />
                      {/* Elegant Bottom Banner Caption Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 sm:p-8 pt-20 flex flex-col justify-end z-20">
                        {displayBestFor && <p className="font-display italic text-sm text-solar">{displayBestFor}</p>}
                      </div>
                    </div>

                    {/* Restored Clean Text & Package Card Info Panel, Buttons, & Accordion */}
                    <div className="p-6 sm:p-10 flex-grow flex flex-col justify-between">
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-display font-bold text-xl sm:text-2xl text-off-white tracking-tight leading-snug mb-2 group-hover:text-solar transition-colors duration-300">
                            {displayTitle}
                          </h3>
                          {enrichedOriginal.duration && (
                            <span className="text-muted-silver text-xs font-semibold flex items-center gap-1.5 mb-3.5">
                              <Clock className="w-3.5 h-3.5 text-solar/80" />
                              Duration: {enrichedOriginal.duration}
                            </span>
                          )}
                          {/* Short Description */}
                          <p className="text-muted-silver text-xs leading-relaxed font-sans line-clamp-2 mb-5">
                            {displayIntro}
                          </p>
                        </div>
 
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExpandedTourIds(prev => 
                              prev.includes(pkg.id)
                                ? prev.filter(id => id !== pkg.id)
                                : [...prev, pkg.id]
                            );
                          }}
                          className={`w-full py-3.5 px-5 rounded-xl font-display font-black text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                            isExpanded
                              ? 'bg-zinc-800/90 border border-zinc-600/80 text-zinc-100 hover:bg-zinc-700 hover:text-white shadow-md'
                              : 'bg-solar text-slate-900 hover:bg-amber-400 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                          }`}
                        >
                          <span>{isExpanded ? "Close Details" : "Explore Tour"}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
 
                      {/* Inline Rich Details Accordion Expansion */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            key={`tour-expanded-${pkg.id}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden mt-6 border-t border-accent-border/30 pt-6 space-y-6"
                          >
                            <div>
                              <h4 className="text-solar text-xs font-extrabold uppercase tracking-widest mb-2 font-sans">Journey Overview</h4>
                              <p className="text-off-white/90 text-sm leading-relaxed font-sans font-normal">{displayIntro}</p>
                            </div>
 
                            {/* Grid of Highlights & What's Included */}
                            <div className="grid grid-cols-1 gap-4">
                              {displayJourneyHighlights.length > 0 && (
                                <div className="bg-slate-card/40 border border-accent-border/30 rounded-2xl p-4">
                                  <p className="text-xs font-extrabold uppercase tracking-widest text-solar mb-3 font-sans flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-solar animate-pulse" />
                                    Journey Highlights
                                  </p>
                                  <ul className="space-y-2">
                                    {displayJourneyHighlights.map((item: string, itemIdx: number) => (
                                      <li key={itemIdx} className="flex items-start gap-1.5 text-off-white/80 text-xs leading-relaxed font-normal">
                                        <span className="text-solar shrink-0 font-bold">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
 
                              {displayIncluded.length > 0 && (
                                <div className="bg-slate-card/40 border border-accent-border/30 rounded-2xl p-4">
                                  <p className="text-xs font-extrabold uppercase tracking-widest text-off-white mb-3 font-sans flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-silver" />
                                    What's Included
                                  </p>
                                  <ul className="space-y-2">
                                    {displayIncluded.map((item: string, itemIdx: number) => (
                                      <li key={itemIdx} className="flex items-start gap-1.5 text-off-white/80 text-xs leading-relaxed font-normal">
                                        <Check className="w-3.5 h-3.5 text-solar shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            {/* 4. Explore the Journey: Visual Slide Presentation */}
                            {displayExploreJourney && displayExploreJourney.length > 0 && (
                              <div className="pt-6 border-t border-accent-border/40 space-y-6">
                                <div className="text-center space-y-1">
                                  <span className="text-solar text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] font-sans block">
                                    Visual Experience
                                  </span>
                                  <h4 className="font-display font-bold text-lg sm:text-xl text-off-white tracking-tight">
                                    Explore the <span className="text-solar italic">Journey</span>
                                  </h4>
                                  <div className="w-12 h-0.5 bg-solar/40 mx-auto rounded-full mt-1.5" />
                                </div>

                                <div className="space-y-6 mt-4">
                                  {displayExploreJourney.map((loc: JourneyLocation, locIdx: number) => {
                                    const imageList = loc.images || [];
                                    return (
                                      <div 
                                        key={loc.id || `loc-${locIdx}`}
                                        className="space-y-3 group/loc"
                                      >
                                        {/* Image Slide - Exact aspect ratio (3/4) and slide style as main package image, without navigation controls */}
                                        <div className="relative w-full overflow-hidden rounded-2xl aspect-[3/4] border border-accent-border/40 group-hover/loc:border-solar/50 transition-colors shadow-lg">
                                          <AfarImageCarousel
                                            images={imageList}
                                            aspectRatioClass="absolute inset-0 w-full h-full"
                                            imgClassName="w-full h-full object-cover block transition-transform duration-[2s] ease-out group-hover/loc:scale-103"
                                            useDefaultStyles={false}
                                            showVignette={false}
                                            showControls={false}
                                            autoplayInterval={3200 + locIdx * 400}
                                          />
                                        </div>

                                        {/* Location Title & Description Below Outside Image */}
                                        <div className="px-1 space-y-1">
                                          <h5 className="font-display font-bold text-base sm:text-lg text-off-white tracking-tight group-hover/loc:text-solar transition-colors">
                                            {loc.title}
                                          </h5>
                                          <p className="text-muted-silver text-xs sm:text-sm font-sans font-normal leading-relaxed">
                                            {loc.description}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => onBookPackage(pkg.destinationValue || pkg.title)}
                              className="w-full py-3.5 px-6 rounded-xl bg-solar text-slate-900 font-display font-extrabold text-xs tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-2"
                            >
                              <span>Book This Tour</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* BLOCK 5: Journeys Shared With the World */}
      <section id="media-section" className="py-48 md:py-64 px-6 sm:px-12 lg:px-16 border-t border-accent-border/50 relative overflow-hidden bg-obsidian">
        {/* Subtle decorative background subtle grid */}
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none bg-[radial-gradient(#EAB308_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">

          {/* Hidden preloader elements to force background downloading of Featured Travelers images */}
          <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
            {FEATURED_STORIES.map((story, idx) => (
              <img
                key={`traveler-preload-${story.id || idx}`}
                src={formatImageUrl(story.imageUrl)}
                alt=""
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
              />
            ))}
          </div>

          <div className="text-center mb-32">
            <span className="text-solar text-xs sm:text-sm font-bold uppercase tracking-widest border-b-2 border-solar/30 pb-3 font-sans">
              Featured Travelers
            </span>
            <h2 className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl text-off-white mt-10 mb-8 tracking-tight leading-tight max-w-5xl mx-auto">
              Discover the Experiences <span className="italic text-solar">That Inspire Travelers</span>
            </h2>
            <div className="w-24 h-1 bg-solar/40 mx-auto rounded-full mb-8" />
            <div className="space-y-6 max-w-4xl mx-auto">
              <p className="text-muted-silver text-lg sm:text-xl lg:text-2xl leading-relaxed font-sans font-light">
                From respected television presenters to digital creators, our journeys have been experienced by people who share a passion for discovering Ethiopia’s breathtaking landscapes, rich culture, and unforgettable adventures.
              </p>
              <p className="text-solar font-display italic text-lg sm:text-xl lg:text-2xl leading-relaxed">
                Every journey tells a unique story — a story of exploration, connection, and memories worth sharing.
              </p>
            </div>
          </div>

          {/* Luxury Editorial Showcase (Dynamic Asymmetrical Magazine Layout) */}
          <div className="space-y-48 md:space-y-64 lg:space-y-80">
            {FEATURED_STORIES.map((story, idx) => {
              if (story.layoutType === "wide-left") {
                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                  >
                    {/* Left Column: Tall Elegant Portrait Image */}
                    <div className="lg:col-span-7 flex justify-center lg:justify-start relative w-full">
                      <div className="relative w-full max-w-[480px] overflow-hidden rounded-[36px] shadow-2xl border border-accent-border/30 bg-slate-card/20 aspect-[3/4]">
                        <LazyImage
                          src={story.imageUrl}
                          alt={story.personality}
                          className="absolute inset-0 w-full h-full"
                          imgClassName="w-full h-full object-cover block transition-transform duration-[2s] ease-out group-hover:scale-103"
                          loading="eager"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        {/* Elegant Bottom Banner Caption */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pt-20 flex flex-col justify-end rounded-b-[36px]">
                          <p className="text-solar text-[10px] font-bold uppercase tracking-widest mb-1">Featured Guest</p>
                          <p className="font-sans font-bold text-lg text-white mb-1">{story.personality}</p>
                          <p className="font-display italic text-sm text-zinc-300">{story.destination}</p>
                        </div>
                      </div>
                      {/* Geometric Background Layer (Offset) */}
                      <div className="hidden lg:block absolute -bottom-6 -left-6 w-full h-full border border-solar/20 rounded-[36px] -z-10 pointer-events-none -translate-x-2 translate-y-2" />
                    </div>

                    {/* Right Column: Narrative made transparent like Yuti Nass's section */}
                    <div className="lg:col-span-5 flex flex-col justify-center px-4 sm:px-6 lg:px-0 relative z-20">
                      <span className="text-solar text-xs font-bold uppercase tracking-widest mb-3 font-sans flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-solar animate-pulse" />
                        {story.role}
                      </span>
                      <h3 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-off-white tracking-tight leading-tight mb-4">
                        {story.personality} <span className="italic text-solar">on the Trail</span>
                      </h3>
                      <p className="text-xs text-muted-silver uppercase tracking-wider mb-6 pb-4 border-b border-accent-border/30">
                        Scene: {story.moment}
                      </p>
                      <blockquote className="font-display italic text-lg sm:text-xl text-off-white/90 border-l-2 border-solar/40 pl-5 mb-6 leading-relaxed">
                        {story.quote}
                      </blockquote>
                      <p className="text-muted-silver text-sm sm:text-base leading-relaxed font-sans font-light mb-8">
                        {story.description}
                      </p>
                      <button
                        onClick={() => onBookPackage(story.destinationName)}
                        className="inline-flex items-center justify-between py-4 px-6 rounded-xl bg-solar text-slate-900 font-display font-black text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group/btn self-start"
                      >
                        <span>Follow the Path</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                );
              }

              if (story.layoutType === "portrait-right") {
                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                  >
                    {/* Left Column: Story Content */}
                    <div className="lg:col-span-5 flex flex-col justify-center px-4 sm:px-6 lg:px-0 lg:order-first order-last">
                      <span className="text-solar text-xs font-bold uppercase tracking-widest mb-3 font-sans flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-solar animate-pulse" />
                        {story.role}
                      </span>
                      <h3 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-off-white tracking-tight leading-tight mb-4">
                        A Human <span className="italic text-solar">Connection</span>
                      </h3>
                      <p className="text-xs text-muted-silver uppercase tracking-wider mb-6 pb-4 border-b border-accent-border/30">
                        Scene: {story.moment}
                      </p>
                      <blockquote className="font-display italic text-lg sm:text-xl text-off-white/90 border-l-2 border-solar/40 pl-5 mb-6 leading-relaxed">
                        {story.quote}
                      </blockquote>
                      <p className="text-muted-silver text-sm sm:text-base leading-relaxed font-sans font-light mb-8">
                        {story.description}
                      </p>
                      <button
                        onClick={() => onBookPackage(story.destinationName)}
                        className="inline-flex items-center justify-between py-4 px-6 rounded-xl bg-solar text-slate-900 font-display font-black text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group/btn self-start"
                      >
                        <span>Discover the Magic</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>

                    {/* Right Column: Tall Elegant Portrait Image */}
                    <div className="lg:col-span-7 flex justify-center lg:justify-end relative lg:order-last order-first w-full">
                      <div className="relative w-full max-w-[480px] overflow-hidden rounded-[36px] shadow-2xl border border-accent-border/30 bg-slate-card/20 aspect-[3/4]">
                        <LazyImage
                          src={story.imageUrl}
                          alt={story.personality}
                          className="absolute inset-0 w-full h-full"
                          imgClassName="w-full h-full object-cover block transition-transform duration-[2s] ease-out group-hover:scale-103"
                          loading="eager"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        {/* Elegant Bottom Banner Caption */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pt-20 flex flex-col justify-end">
                          <p className="text-solar text-[10px] font-bold uppercase tracking-widest mb-1">Traveler & Storyteller</p>
                          <p className="font-sans font-bold text-lg text-white mb-1">{story.personality}</p>
                          <p className="font-display italic text-sm text-zinc-300">{story.destination}</p>
                        </div>
                      </div>
                      {/* Geometric Background Layer (Offset) */}
                      <div className="hidden lg:block absolute -bottom-6 -right-6 w-full h-full border border-solar/20 rounded-[36px] -z-10 pointer-events-none translate-x-2 translate-y-2" />
                    </div>
                  </motion.div>
                );
              }

              if (story.layoutType === "wide-right") {
                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                  >
                    {/* Left Column: Narrative made transparent like Yuti Nass's section */}
                    <div className="lg:col-span-5 flex flex-col justify-center px-4 sm:px-6 lg:px-0 relative z-20 lg:order-first order-last">
                      <span className="text-solar text-xs font-bold uppercase tracking-widest mb-3 font-sans flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-solar animate-pulse" />
                        {story.role}
                      </span>
                      <h3 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-off-white tracking-tight leading-tight mb-4">
                        The Quiet <span className="italic text-solar">Haven</span>
                      </h3>
                      <p className="text-xs text-muted-silver uppercase tracking-wider mb-6 pb-4 border-b border-accent-border/30">
                        Scene: {story.moment}
                      </p>
                      <blockquote className="font-display italic text-lg sm:text-xl text-off-white/90 border-l-2 border-solar/40 pl-5 mb-6 leading-relaxed">
                        {story.quote}
                      </blockquote>
                      <p className="text-muted-silver text-sm sm:text-base leading-relaxed font-sans font-light mb-8">
                        {story.description}
                      </p>
                      <button
                        onClick={() => onBookPackage(story.destinationName)}
                        className="inline-flex items-center justify-between py-4 px-6 rounded-xl bg-solar text-slate-900 font-display font-black text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group/btn self-start"
                      >
                        <span>Escape with Us</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>

                    {/* Right Column: Tall Elegant Portrait Image */}
                    <div className="lg:col-span-7 flex justify-center lg:justify-end relative lg:order-last order-first w-full">
                      <div className="relative w-full max-w-[480px] overflow-hidden rounded-[36px] shadow-2xl border border-accent-border/30 bg-slate-card/20 aspect-[3/4]">
                        <LazyImage
                          src={story.imageUrl}
                          alt={story.personality}
                          className="absolute inset-0 w-full h-full"
                          imgClassName="w-full h-full object-cover block transition-transform duration-[2s] ease-out group-hover:scale-103"
                          loading="eager"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        {/* Elegant Bottom Banner Caption */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pt-20 flex flex-col justify-end rounded-b-[36px]">
                          <p className="text-solar text-[10px] font-bold uppercase tracking-widest mb-1">Featured Guest</p>
                          <p className="font-sans font-bold text-lg text-white mb-1">{story.personality}</p>
                          <p className="font-display italic text-sm text-zinc-300">{story.destination}</p>
                        </div>
                      </div>
                      {/* Geometric Background Layer (Offset) */}
                      <div className="hidden lg:block absolute -bottom-6 -right-6 w-full h-full border border-solar/20 rounded-[36px] -z-10 pointer-events-none translate-x-2 translate-y-2" />
                    </div>
                  </motion.div>
                );
              }

              // Fallback / portrait-left
              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                >
                  {/* Left Column: Tall Elegant Portrait Image */}
                  <div className="lg:col-span-7 flex justify-center lg:justify-start relative w-full">
                    <div className="relative w-full max-w-[480px] overflow-hidden rounded-[36px] shadow-2xl border border-accent-border/30 bg-slate-card/20 aspect-[3/4]">
                      <LazyImage
                        src={story.imageUrl}
                        alt={story.personality}
                        className="absolute inset-0 w-full h-full"
                        imgClassName="w-full h-full object-cover block transition-transform duration-[2s] ease-out group-hover:scale-103"
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                      {/* Elegant Bottom Banner Caption */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pt-20 flex flex-col justify-end">
                        <p className="text-solar text-[10px] font-bold uppercase tracking-widest mb-1">Traveler & Storyteller</p>
                        <p className="font-sans font-bold text-lg text-white mb-1">{story.personality}</p>
                        <p className="font-display italic text-sm text-zinc-300">{story.destination}</p>
                      </div>
                    </div>
                    {/* Geometric Background Layer (Offset) */}
                    <div className="hidden lg:block absolute -bottom-6 -left-6 w-full h-full border border-solar/20 rounded-[36px] -z-10 pointer-events-none -translate-x-2 translate-y-2" />
                  </div>

                  {/* Right Column: Story Content */}
                  <div className="lg:col-span-5 flex flex-col justify-center px-4 sm:px-6 lg:px-0">
                    <span className="text-solar text-xs font-bold uppercase tracking-widest mb-3 font-sans flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-solar animate-pulse" />
                      {story.role}
                    </span>
                    <h3 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-off-white tracking-tight leading-tight mb-4">
                      Vast & <span className="italic text-solar">Untamed</span>
                    </h3>
                    <p className="text-xs text-muted-silver uppercase tracking-wider mb-6 pb-4 border-b border-accent-border/30">
                      Scene: {story.moment}
                    </p>
                    <blockquote className="font-display italic text-lg sm:text-xl text-off-white/90 border-l-2 border-solar/40 pl-5 mb-6 leading-relaxed">
                      {story.quote}
                    </blockquote>
                    <p className="text-muted-silver text-sm sm:text-base leading-relaxed font-sans font-light mb-8">
                      {story.description}
                    </p>
                    <button
                      onClick={() => onBookPackage(story.destinationName)}
                      className="inline-flex items-center justify-between py-4 px-6 rounded-xl bg-solar text-slate-900 font-display font-black text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group/btn self-start"
                    >
                      <span>Explore the Heights</span>
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
      
      {/* Interactive trust features & preparation portal */}
      <ClientTravelPortal onBookPackage={onBookPackage} />

      {/* BLOCK 7: Get In Touch & Contact Desk */}
      <section id="contact-desk-section" className="py-24 md:py-36 px-6 sm:px-12 lg:px-16 border-t border-accent-border bg-slate-card">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-accent-border rounded-2xl overflow-hidden p-8 sm:p-16 lg:p-20 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          >
            
            <div className="flex flex-col gap-10">
              <div>
                <span className="text-solar text-xs sm:text-sm font-bold uppercase tracking-widest">Addis Ababa Head Office</span>
                <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-slate-900 mt-4 mb-6 leading-tight">
                  Plan Your Tour
                </h2>
                <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed">
                  Ready to explore Ethiopia and beyond? Get in touch with our travel specialists, and we'll help you plan the perfect tour tailored to your interests, schedule, and budget.
                </p>
              </div>

              <div className="flex flex-col gap-6 text-slate-600">
                <a href={`tel:${CONTACT_INFO.phone1}`} className="flex items-center gap-5 hover:text-amber-700 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:border-solar transition-colors shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-semibold">Primary Operations Desk</p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">{CONTACT_INFO.phoneFormatted1}</p>
                  </div>
                </a>

                <a href={`tel:${CONTACT_INFO.phone2}`} className="flex items-center gap-5 hover:text-amber-700 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:border-solar transition-colors shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-semibold">Secondary Reservations</p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">{CONTACT_INFO.phoneFormatted2}</p>
                  </div>
                </a>

                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-5 hover:text-amber-700 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:border-solar transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-semibold">Official Support Email</p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 break-all mt-0.5">{CONTACT_INFO.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-semibold">Operations Base</p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">{CONTACT_INFO.office}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social profiles linking block */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 sm:p-12 flex flex-col gap-8 w-full lg:sticky lg:top-24">
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900">Official Social Media Profiles</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Stay updated with live dispatches from our active tours. See recent volcanic activities, Langano resort packages, and Mombasa expeditions posted daily on our official verified accounts:
              </p>
              
              <div className="flex flex-col gap-4">
                <a
                  href={CONTACT_INFO.telegramUrl || `https://t.me/+251${(CONTACT_INFO.phone1 || '0910503969').replace(/^0/, '')}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full py-4 rounded-lg bg-white border border-slate-300 hover:border-solar text-slate-900 hover:text-amber-700 font-display font-bold text-sm text-center tracking-widest uppercase transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#229ED9]" />
                  <span>Telegram Chat</span>
                </a>
                <a
                  href={CONTACT_INFO.tiktokUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full py-4 rounded-lg bg-white border border-slate-300 hover:border-solar text-slate-900 hover:text-amber-700 font-display font-bold text-sm text-center tracking-widest uppercase transition-all shadow-sm"
                >
                  TikTok Profile
                </a>
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full py-4 rounded-lg bg-white border border-slate-300 hover:border-solar text-slate-900 hover:text-amber-700 font-display font-bold text-sm text-center tracking-widest uppercase transition-all shadow-sm"
                >
                  Instagram Profile
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </section>


    </div>
  );
}
