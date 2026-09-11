import { Destination, TourPackage, OperationalPillar, VideoPlaceholder } from './types';

export const OPERATIONAL_PILLARS: OperationalPillar[] = [
  {
    title: "Seamless Travel Experience",
    text: "Every detail is carefully planned to create a smooth, comfortable, and stress-free travel experience.",
    imageUrl: "https://lh3.googleusercontent.com/d/1QpiBpROtDHbMrGarBeGfRCwDKOzTrcuj"
  },
  {
    title: "Expert Local Guides",
    text: "Discover each destination with local experts who share its history, culture, and hidden stories.",
    imageUrl: "https://lh3.googleusercontent.com/d/1Ey7YxJfCjEMw2H2uVM1tYCMFLvqiPWSe"
  },
  {
    title: "Personalized Journey Planning",
    text: "Customized itineraries designed around your interests, travel style, and expectations.",
    imageUrl: "https://lh3.googleusercontent.com/d/18zxOIHsDrrqLXuuhK4PrQtxzh43c74Es"
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: "afar",
    name: "Afar Expedition",
    vibeText: "Afar Depression • Erta Ale • Dallol • Lake Afdera",
    keyDetails: "Discover the raw beauty of the Danakil Depression and experience a destination unlike anywhere else in the world.",
    imageUrl: "https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc",
    highlights: [
      "Witness the powerful beauty of Erta Ale’s active volcanic landscape",
      "Explore the colorful geothermal formations of Dallol",
      "Discover the vast salt flats of the Danakil Depression",
      "Experience the unique culture and environment of Afar",
      "Capture unforgettable desert landscapes and natural wonders"
    ],
    journeyHighlights: [
      "Witness the glowing lava lake of Erta Ale",
      "Explore Dallol’s colorful geothermal landscapes",
      "Walk across ancient salt flats and salt mining areas",
      "Experience dramatic desert landscapes and sunsets",
      "Discover the unique beauty of the Afar Depression"
    ],
    journeyDescription: "Stand at the edge of Erta Ale’s active lava lake, explore the surreal landscapes of Dallol, and journey through one of the world’s most extreme and fascinating environments. Every stop reveals a side of Ethiopia that few travelers ever experience.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc",
      "https://lh3.googleusercontent.com/d/15x5Zr5KWAS-A_1HXrznonDHtTW99yC8I",
      "https://lh3.googleusercontent.com/d/1WFneeMLMxmO6lA5qp6uC0IS45CSzKNmh",
      "https://lh3.googleusercontent.com/d/1Ukz5_YnoAx7GhfQPSmK-RhS7XCHUlxOI"
    ]
  },
  {
    id: "harar",
    name: "Historic Harar Discovery",
    vibeText: "Harar Jugol • Cultural Heritage • Ancient City",
    keyDetails: "Experience the unique heritage of Harar through authentic encounters, local traditions, and unforgettable moments.",
    imageUrl: "https://lh3.googleusercontent.com/d/1XT4E0bnzH8NAerzhh4593m5_iT2z2evn",
    highlights: [
      "Explore the historic streets of Harar Jugol",
      "Discover traditional Harari homes and architecture",
      "Experience local culture, traditions, and hospitality",
      "Taste authentic Harari cuisine and coffee culture",
      "Connect with the living heritage of one of Ethiopia’s oldest cities"
    ],
    journeyHighlights: [
      "Explore Harar’s ancient streets and historic walls",
      "Discover traditional culture and local life",
      "Experience authentic food and traditions",
      "Visit important heritage locations"
    ],
    journeyDescription: "Discover the historic city of Harar through a cultural journey filled with heritage, traditions, local experiences, and unforgettable encounters.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1XT4E0bnzH8NAerzhh4593m5_iT2z2evn",
      "https://lh3.googleusercontent.com/d/15PvAHELKJpIOiuInEAdwF0vBrU5wcg93",
      "https://lh3.googleusercontent.com/d/12c9JJ7mEen6vQt8rGCjGZweOBqqHMkCp",
      "https://lh3.googleusercontent.com/d/1jg8ZqnitMj850NcGyrQchJ4rj0I2p7uu"
    ]
  },
  {
    id: "langano",
    name: "Lake Langano Escape",
    vibeText: "Lake Langano • Rift Valley • Lakeside Relaxation",
    keyDetails: "Enjoy a refreshing journey surrounded by nature, tranquility, and the beauty of Ethiopia’s Rift Valley.",
    imageUrl: "https://lh3.googleusercontent.com/d/1F8bLbL2KSswLCM597_0x0Bbf4s_FYszQ",
    highlights: [
      "Relax beside the peaceful waters of Lake Langano",
      "Enjoy beautiful Rift Valley landscapes",
      "Experience stunning lakeside sunsets",
      "Discover nature and peaceful surroundings",
      "Create memorable moments away from the city"
    ],
    journeyHighlights: [
      "Relax beside the beautiful Lake Langano",
      "Enjoy peaceful lakeside activities",
      "Experience nature and scenic views",
      "Discover a calm and refreshing environment"
    ],
    journeyDescription: "Enjoy a peaceful lakeside escape surrounded by beautiful scenery, comfortable accommodation, and relaxing experiences designed to help you reconnect with nature.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1F8bLbL2KSswLCM597_0x0Bbf4s_FYszQ",
      "https://lh3.googleusercontent.com/d/1ZD4IW_GvEOJeaJCyWm0R48FGr1kZxQzt",
      "https://lh3.googleusercontent.com/d/1jnxbq08i2-BNoVpQSKe6DMeuAwVap17T",
      "https://lh3.googleusercontent.com/d/1IsenFRNWb4Eaba_Rgii1olM2ZAsk_AND"
    ]
  },
  {
    id: "wenchi",
    name: "Wenchi Crater Escape",
    vibeText: "Wenchi Crater Lake • Nature • Scenic Landscapes",
    keyDetails: "A perfect escape for travelers seeking nature, relaxation, and authentic countryside experiences.",
    imageUrl: "https://lh3.googleusercontent.com/d/1xYKpCVh4qtLJtg6NAeFsEVXxrDy_Za5R",
    highlights: [
      "Discover the beauty of Wenchi Crater Lake",
      "Enjoy peaceful boat experiences across the lake",
      "Walk through beautiful countryside landscapes",
      "Experience traditional village life",
      "Capture unforgettable natural scenery"
    ],
    journeyHighlights: [
      "Explore the volcanic crater landscape",
      "Enjoy a peaceful boat excursion",
      "Walk through beautiful natural surroundings",
      "Experience Ethiopian countryside life"
    ],
    journeyDescription: "Spend an unforgettable day exploring Wenchi Crater Lake, surrounded by peaceful landscapes, scenic views, and natural beauty.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1xYKpCVh4qtLJtg6NAeFsEVXxrDy_Za5R",
      "https://lh3.googleusercontent.com/d/1tgdukFA7AMQ1MwMUOsUZ_vBDCJqBlST4",
      "https://lh3.googleusercontent.com/d/1Zpo4ZkDQyu5CCl7JyaCWbY8g58jJM6C0"
    ]
  },
  {
    id: "bale",
    name: "Chebera Churchura & Bale Mountains",
    vibeText: "Bale Mountains National Park • Wildlife • Highlands",
    keyDetails: "Experience the beauty of Bale Mountains through adventure, nature, and unforgettable exploration.",
    imageUrl: "https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN",
    highlights: [
      "Explore the breathtaking Bale Mountains landscape",
      "Discover rare wildlife and endemic species",
      "Experience the beauty of the Sanetti Plateau",
      "Walk through unique Afro-alpine environments",
      "Enjoy unforgettable mountain adventures"
    ],
    journeyHighlights: [
      "Explore Bale Mountains National Park",
      "Discover rare wildlife species",
      "Experience highland landscapes",
      "Explore Afro-alpine environments"
    ],
    journeyDescription: "Experience Ethiopia’s incredible mountain wilderness through a guided adventure exploring wildlife, landscapes, and unique natural ecosystems.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN",
      "https://lh3.googleusercontent.com/d/1aeuGsU-4ZtKBXZ0bVWetl3lBmmxVvA65",
      "https://lh3.googleusercontent.com/d/1G-wuj-FFVK1aDTr8QA4-nObbgJJXhzBM",
      "https://lh3.googleusercontent.com/d/1Z95HuwiHjhHTv5VuYaxxg19RRqtRIH82"
    ]
  },
  {
    id: "mombasa",
    name: "Kenya & Mombasa Escape",
    vibeText: "Mombasa Coast • Indian Ocean • Beach Experience",
    keyDetails: "A carefully designed escape combining adventure, relaxation, and unforgettable coastal memories.",
    imageUrl: "https://lh3.googleusercontent.com/d/1A3RpQL7R1gQtAvHlTp1Vj2e_BDpP7rvL",
    highlights: [
      "Experience the beautiful beaches of Mombasa",
      "Enjoy Indian Ocean views and coastal scenery",
      "Discover local culture and coastal traditions",
      "Relax in beachfront surroundings",
      "Create unforgettable international travel memories"
    ],
    journeyHighlights: [
      "Enjoy Mombasa’s beautiful beaches",
      "Experience coastal culture",
      "Relax in beachfront locations",
      "Explore unforgettable ocean landscapes"
    ],
    journeyDescription: "Discover the beauty of Kenya’s coastline through a carefully planned journey combining beach relaxation, cultural experiences, and ocean adventures.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1A3RpQL7R1gQtAvHlTp1Vj2e_BDpP7rvL",
      "https://lh3.googleusercontent.com/d/1N0PgYlrqyqZa-3as_UlON4hgjEy-DG88",
      "https://lh3.googleusercontent.com/d/18Pw-UV7-rZoAj9ITgX5Ow_XI5_9nwZbO"
    ]
  },
  {
    id: "sof-omar",
    name: "Sof Omar Cave Adventure",
    vibeText: "Sof Omar Cave • Underground River • Natural Wonder",
    keyDetails: "Journey beneath the surface to discover one of Africa's largest cave systems, where dramatic limestone formations and the underground Weyib River create an unforgettable natural adventure.",
    imageUrl: "https://lh3.googleusercontent.com/d/1ynQTvZTqGwGk60lpHOfP3XBNzAq56hUU",
    highlights: [
      "Explore Ethiopia's spectacular cave network",
      "Walk through breathtaking limestone formations",
      "Discover the underground Weyib River",
      "Experience one of Ethiopia's greatest natural wonders",
      "Capture extraordinary underground landscapes"
    ],
    journeyHighlights: [
      "Explore the famous cave passages",
      "Walk beside the underground river",
      "Discover impressive rock formations",
      "Experience Ethiopia's hidden natural wonder"
    ],
    journeyDescription: "Journey beneath the surface to discover one of Africa's largest cave systems, where dramatic limestone formations and the underground Weyib River create an unforgettable natural adventure.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1ynQTvZTqGwGk60lpHOfP3XBNzAq56hUU",
      "https://lh3.googleusercontent.com/d/1mz8Mu1X7jUmO-OKsFsFg0_eINnNB7dNM",
      "https://lh3.googleusercontent.com/d/1lMBXL5eJWDLOalSzaBHDxklrjySPA6v_",
      "https://lh3.googleusercontent.com/d/1c1ALM8yUeRcJYw_OQ9G0PKNlN3hdIqtd",
      "https://lh3.googleusercontent.com/d/1Zw5czOOwU0KxHRFT2rd09zFsxAB4gbDl",
      "https://lh3.googleusercontent.com/d/19-5QV8ZlI0sHqj-EqQhKBOOtrs5lMYXS"
    ]
  },
  {
    id: "doho-awash",
    name: "Doho Lodge & Awash National Park",
    vibeText: "Doho Lodge • Awash National Park • Wildlife & Safari",
    keyDetails: "Experience the perfect combination of luxury lodge accommodation, unforgettable wildlife encounters, scenic Rift Valley landscapes, and the natural beauty of Ethiopia's oldest national park.",
    imageUrl: "https://lh3.googleusercontent.com/d/1efUrY3v-K7sSQkCA53rwsq8v43E52RvV",
    highlights: [
      "Discover Ethiopia's incredible wildlife",
      "Visit the spectacular Awash Waterfall",
      "Enjoy scenic safari drives",
      "Experience the comfort of Doho Lodge",
      "Observe diverse birdlife and native animals"
    ],
    journeyHighlights: [
      "Safari through Awash National Park",
      "Visit the famous Awash Falls",
      "Observe wildlife in natural habitats",
      "Relax at Doho Lodge"
    ],
    journeyDescription: "Experience the perfect combination of luxury lodge accommodation, unforgettable wildlife encounters, scenic Rift Valley landscapes, and the natural beauty of Ethiopia's oldest national park.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1efUrY3v-K7sSQkCA53rwsq8v43E52RvV",
      "https://lh3.googleusercontent.com/d/1ZacqiQyeurQRCpjZTrapGpIv9F_DlVCQ",
      "https://lh3.googleusercontent.com/d/19XYuAWQqk1WYUk-axj1V9BUIJSKUFtBM",
      "https://lh3.googleusercontent.com/d/1B5boSFLZnlLQvm--BmU0mfZ0WCfANb26",
      "https://lh3.googleusercontent.com/d/1-AC3KAuTiVGRvgEFfew4BGmGmJQM8B8c"
    ]
  },
  {
    id: "lalibela",
    name: "Lalibela Spiritual Journey",
    vibeText: "Lalibela • Rock-Hewn Churches • UNESCO Heritage",
    keyDetails: "Discover one of the world's greatest religious treasures through Ethiopia's extraordinary rock-hewn churches, where history, faith, and remarkable architecture have stood together for centuries.",
    imageUrl: "https://lh3.googleusercontent.com/d/1wObvCNhod1hHq8UgVyIm3rDfFHG0mzVX",
    highlights: [
      "Explore the world-famous rock-hewn churches",
      "Visit UNESCO World Heritage monuments",
      "Experience authentic Ethiopian Orthodox traditions",
      "Witness remarkable ancient architecture carved from stone",
      "Enjoy breathtaking mountain landscapes and local culture"
    ],
    journeyHighlights: [
      "Explore Lalibela's eleven rock-hewn churches",
      "Visit the iconic Church of Saint George",
      "Experience authentic local traditions",
      "Enjoy panoramic highland scenery"
    ],
    journeyDescription: "Discover one of the world's greatest religious treasures through Ethiopia's extraordinary rock-hewn churches, where history, faith, and remarkable architecture have stood together for centuries.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1wObvCNhod1hHq8UgVyIm3rDfFHG0mzVX",
      "https://lh3.googleusercontent.com/d/1qPPxwz8_xMyBAvSSfiXcDnn4MXkk56zb",
      "https://lh3.googleusercontent.com/d/12EhOn_mfpnP2o_HTiZch5mgH9sgYRf26",
      "https://lh3.googleusercontent.com/d/1mUhti1r4oHc3xUafIkNqdohPkSINFruQ",
      "https://lh3.googleusercontent.com/d/1Rrg7YcxyUWHaW-RwV-5BFXljk2PARrFP"
    ]
  },
  {
    id: "gondar",
    name: "Gondar Royal Discovery",
    vibeText: "Gondar • Fasil Ghebbi • Royal Castles",
    keyDetails: "Step into Ethiopia's imperial past as you explore the magnificent castles of Fasil Ghebbi, centuries-old churches, and vibrant cultural traditions that continue to define the historic city of Gondar.",
    imageUrl: "https://lh3.googleusercontent.com/d/1Wanv6CGUUaxF_gFSw_Gc6U397ns_WkPZ",
    highlights: [
      "Explore the UNESCO World Heritage Fasil Ghebbi castle complex",
      "Visit the historic Fasilides Bath and royal compounds",
      "Discover centuries of Ethiopian imperial history",
      "Experience Gondar's rich traditions, cuisine, and local culture",
      "Capture breathtaking architecture and timeless landscapes"
    ],
    journeyHighlights: [
      "Explore the magnificent royal castle complex",
      "Visit the famous Debre Berhan Selassie Church",
      "Discover Ethiopia's imperial history and traditions",
      "Experience Gondar's authentic cultural atmosphere"
    ],
    journeyDescription: "Step into Ethiopia's imperial past as you explore the magnificent castles of Fasil Ghebbi, centuries-old churches, and vibrant cultural traditions that continue to define the historic city of Gondar.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1Wanv6CGUUaxF_gFSw_Gc6U397ns_WkPZ",
      "https://lh3.googleusercontent.com/d/1rA_m_QXSZsOpcc4l_wNohTkWqeEdEV8i",
      "https://lh3.googleusercontent.com/d/1ntVPYOlXUb7vuOD9pgkpRTmrjJX_aCli",
      "https://lh3.googleusercontent.com/d/1zfxJa-m7_aRxX--WzlErhJNgGap7tjjG",
      "https://lh3.googleusercontent.com/d/17tzBEKbfXnB9K1NRYDB14Od-DNxS6avO",
      "https://lh3.googleusercontent.com/d/14KIu7YavkfIeFdOB0nXAQoYhWLMlB_Oj"
    ]
  },
  {
    id: "simien",
    name: "Simien Mountains Expedition",
    vibeText: "Simien Mountains National Park • Highland Peaks • Wildlife",
    keyDetails: "Journey through Ethiopia's most spectacular mountain landscapes, where dramatic cliffs, deep valleys, and rare wildlife create one of Africa's greatest natural wonders and trekking destinations.",
    imageUrl: "https://lh3.googleusercontent.com/d/1B4_cVm5V8xWx4jjJ1y64GM1TLvifv38f",
    highlights: [
      "Trek through the UNESCO World Heritage Simien Mountains National Park",
      "Observe the famous Gelada baboons in their natural habitat",
      "Discover breathtaking escarpments, valleys, and towering peaks",
      "Experience Ethiopia's unique Afro-alpine ecosystem",
      "Capture unforgettable panoramic views and dramatic landscapes"
    ],
    journeyHighlights: [
      "Trek along spectacular mountain trails",
      "Encounter Gelada baboons and endemic wildlife",
      "Visit breathtaking viewpoints overlooking dramatic escarpments",
      "Experience Ethiopia's pristine highland wilderness"
    ],
    journeyDescription: "Journey through Ethiopia's most spectacular mountain landscapes, where dramatic cliffs, deep valleys, and rare wildlife create one of Africa's greatest natural wonders and trekking destinations.",
    gallery: [
      "https://lh3.googleusercontent.com/d/1B4_cVm5V8xWx4jjJ1y64GM1TLvifv38f",
      "https://lh3.googleusercontent.com/d/1UOiuIK9NN26qtujtpE7SnJbjb29BWnpn",
      "https://lh3.googleusercontent.com/d/1yEYX2EUXg6kSSOs_74ewJXlJh50XuTz8",
      "https://lh3.googleusercontent.com/d/1s3F2uFTPpZWnBTSo5idIlN6DgiD_nR_u",
      "https://lh3.googleusercontent.com/d/1wuMuWf-OXcLUGd_pHyyNL7OeGCpDlmKe"
    ]
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "pkg-1",
    title: "The Afar Expedition",
    highlights: "Every stop reveals a side of Ethiopia that few travelers ever experience.",
    imageUrl: "https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc",
    destinationValue: "Erta Ale • Dallol • Lake Afdera",
    priceTag: "Premium Experience",
    description: "Stand at the edge of Erta Ale’s active lava lake, explore the surreal landscapes of Dallol, and journey through one of the world’s most extreme and fascinating environments.",
    journeyHighlights: [
      "Witness the glowing lava lake of Erta Ale",
      "Explore Dallol’s colorful geothermal landscapes",
      "Walk across ancient salt flats and salt mining areas",
      "Experience dramatic desert landscapes and sunsets",
      "Discover the unique beauty of the Afar Depression"
    ],
    includedItems: [
      "Comfortable accommodation where available",
      "Experienced local guide",
      "Transportation throughout the journey",
      "Park permits and entrance fees",
      "Selected meals during the tour",
      "24/7 travel assistance"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc",
      "https://lh3.googleusercontent.com/d/15x5Zr5KWAS-A_1HXrznonDHtTW99yC8I",
      "https://lh3.googleusercontent.com/d/1WFneeMLMxmO6lA5qp6uC0IS45CSzKNmh",
      "https://lh3.googleusercontent.com/d/1Ukz5_YnoAx7GhfQPSmK-RhS7XCHUlxOI"
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
  {
    id: "pkg-2",
    title: "Lake Langano Escape",
    highlights: "Relaxation Experience",
    imageUrl: "https://lh3.googleusercontent.com/d/1F8bLbL2KSswLCM597_0x0Bbf4s_FYszQ",
    destinationValue: "Lake Langano • Rift Valley • Lakeside Escape",
    priceTag: "Relaxation Experience",
    description: "Enjoy a peaceful lakeside escape surrounded by beautiful scenery, comfortable accommodation, and relaxing experiences designed to help you reconnect with nature.",
    journeyHighlights: [
      "Relax beside the beautiful Lake Langano",
      "Enjoy peaceful lakeside activities",
      "Experience nature and scenic views",
      "Discover a calm and refreshing environment"
    ],
    includedItems: [
      "Resort accommodation",
      "Guided activities",
      "Lakeside experiences",
      "Transportation",
      "Breakfast",
      "Travel support"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1F8bLbL2KSswLCM597_0x0Bbf4s_FYszQ",
      "https://lh3.googleusercontent.com/d/1ZD4IW_GvEOJeaJCyWm0R48FGr1kZxQzt",
      "https://lh3.googleusercontent.com/d/1jnxbq08i2-BNoVpQSKe6DMeuAwVap17T",
      "https://lh3.googleusercontent.com/d/1IsenFRNWb4Eaba_Rgii1olM2ZAsk_AND"
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
  {
    id: "pkg-3",
    title: "Historic Harar Discovery",
    highlights: "Cultural Experience",
    imageUrl: "https://lh3.googleusercontent.com/d/1XT4E0bnzH8NAerzhh4593m5_iT2z2evn",
    destinationValue: "Harar Jugol • Historic Landmarks • Living Heritage",
    priceTag: "Cultural Experience",
    description: "Discover the historic city of Harar through a cultural journey filled with heritage, traditions, local experiences, and unforgettable encounters.",
    journeyHighlights: [
      "Explore Harar’s ancient streets and historic walls",
      "Discover traditional culture and local life",
      "Experience authentic food and traditions",
      "Visit important heritage locations"
    ],
    includedItems: [
      "Heritage tours",
      "Local cultural guide",
      "Accommodation",
      "Traditional dining experience",
      "Entry fees",
      "Travel coordination"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1XT4E0bnzH8NAerzhh4593m5_iT2z2evn",
      "https://lh3.googleusercontent.com/d/15PvAHELKJpIOiuInEAdwF0vBrU5wcg93",
      "https://lh3.googleusercontent.com/d/12c9JJ7mEen6vQt8rGCjGZweOBqqHMkCp",
      "https://lh3.googleusercontent.com/d/1jg8ZqnitMj850NcGyrQchJ4rj0I2p7uu"
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
  {
    id: "pkg-4",
    title: "Wenchi Crater Escape",
    highlights: "Nature Experience",
    imageUrl: "https://lh3.googleusercontent.com/d/1xYKpCVh4qtLJtg6NAeFsEVXxrDy_Za5R",
    destinationValue: "Wenchi Crater Lake • Scenic Trails • Countryside",
    priceTag: "Nature Experience",
    description: "Spend an unforgettable day exploring Wenchi Crater Lake, surrounded by peaceful landscapes, scenic views, and natural beauty.",
    journeyHighlights: [
      "Explore the volcanic crater landscape",
      "Enjoy a peaceful boat excursion",
      "Walk through beautiful natural surroundings",
      "Experience Ethiopian countryside life"
    ],
    includedItems: [
      "Private transportation",
      "Boat excursion",
      "Local guide",
      "Traditional lunch",
      "Activity coordination"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1xYKpCVh4qtLJtg6NAeFsEVXxrDy_Za5R",
      "https://lh3.googleusercontent.com/d/1tgdukFA7AMQ1MwMUOsUZ_vBDCJqBlST4",
      "https://lh3.googleusercontent.com/d/1Zpo4ZkDQyu5CCl7JyaCWbY8g58jJM6C0"
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
  {
    id: "pkg-5",
    title: "Chebera Churchura & Bale Mountains",
    highlights: "Wildlife Experience",
    imageUrl: "https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN",
    destinationValue: "Bale Mountains • Sanetti Plateau • Wildlife",
    priceTag: "Wildlife Experience",
    description: "Experience Ethiopia’s incredible mountain wilderness through a guided adventure exploring wildlife, landscapes, and unique natural ecosystems.",
    journeyHighlights: [
      "Explore Bale Mountains National Park",
      "Discover rare wildlife species",
      "Experience highland landscapes",
      "Explore Afro-alpine environments"
    ],
    includedItems: [
      "National park access",
      "Wildlife guide",
      "Camping equipment",
      "Meals during the expedition",
      "Transportation"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1lPneimMnO3ELOjLv-zMcqYX4mBGtJ1IN",
      "https://lh3.googleusercontent.com/d/1aeuGsU-4ZtKBXZ0bVWetl3lBmmxVvA65",
      "https://lh3.googleusercontent.com/d/1G-wuj-FFVK1aDTr8QA4-nObbgJJXhzBM"
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
  {
    id: "pkg-6",
    title: "Kenya & Mombasa Escape",
    highlights: "Cross-Border Experience",
    imageUrl: "https://lh3.googleusercontent.com/d/1A3RpQL7R1gQtAvHlTp1Vj2e_BDpP7rvL",
    destinationValue: "Mombasa • Indian Ocean • Coastal Discovery",
    priceTag: "Cross-Border Experience",
    description: "Discover the beauty of Kenya’s coastline through a carefully planned journey combining beach relaxation, cultural experiences, and ocean adventures.",
    journeyHighlights: [
      "Enjoy Mombasa’s beautiful beaches",
      "Experience coastal culture",
      "Relax in beachfront locations",
      "Explore unforgettable ocean landscapes"
    ],
    includedItems: [
      "Beachfront accommodation",
      "Cross-border travel support",
      "Daily breakfast",
      "Guided excursions",
      "Visa assistance",
      "Travel coordination"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1A3RpQL7R1gQtAvHlTp1Vj2e_BDpP7rvL",
      "https://lh3.googleusercontent.com/d/1N0PgYlrqyqZa-3as_UlON4hgjEy-DG88",
      "https://lh3.googleusercontent.com/d/18Pw-UV7-rZoAj9ITgX5Ow_XI5_9nwZbO"
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
  {
    id: "pkg-7",
    title: "Sof Omar Explorer",
    highlights: "Adventure Experience",
    imageUrl: "https://lh3.googleusercontent.com/d/1ynQTvZTqGwGk60lpHOfP3XBNzAq56hUU",
    destinationValue: "Sof Omar Cave • Limestone Passages • Underground Adventure",
    priceTag: "Adventure Experience",
    description: "Experience the mystery and beauty of Ethiopia's legendary cave system while exploring underground rivers, dramatic chambers, and remarkable geological formations.",
    journeyHighlights: [
      "Explore the famous cave passages",
      "Walk beside the underground river",
      "Discover impressive rock formations",
      "Experience Ethiopia's hidden natural wonder"
    ],
    includedItems: [
      "Professional adventure guide",
      "Cave entrance permits",
      "Transportation",
      "Safety equipment",
      "Refreshments",
      "Travel support"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1ynQTvZTqGwGk60lpHOfP3XBNzAq56hUU",
      "https://lh3.googleusercontent.com/d/1mz8Mu1X7jUmO-OKsFsFg0_eINnNB7dNM",
      "https://lh3.googleusercontent.com/d/1lMBXL5eJWDLOalSzaBHDxklrjySPA6v_",
      "https://lh3.googleusercontent.com/d/1c1ALM8yUeRcJYw_OQ9G0PKNlN3hdIqtd",
      "https://lh3.googleusercontent.com/d/1Zw5czOOwU0KxHRFT2rd09zFsxAB4gbDl",
      "https://lh3.googleusercontent.com/d/19-5QV8ZlI0sHqj-EqQhKBOOtrs5lMYXS"
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
  {
    id: "pkg-8",
    title: "Doho Lodge Safari Experience",
    highlights: "Luxury Wildlife Experience",
    imageUrl: "https://lh3.googleusercontent.com/d/1efUrY3v-K7sSQkCA53rwsq8v43E52RvV",
    destinationValue: "Awash National Park • Doho Lodge • Rift Valley",
    priceTag: "Luxury Wildlife Experience",
    description: "Enjoy an unforgettable safari experience combining luxury accommodation, wildlife exploration, scenic landscapes, and authentic Ethiopian hospitality.",
    journeyHighlights: [
      "Safari through Awash National Park",
      "Visit the famous Awash Falls",
      "Observe wildlife in natural habitats",
      "Relax at Doho Lodge"
    ],
    includedItems: [
      "Luxury lodge accommodation",
      "Professional safari guide",
      "National park entrance fees",
      "Private transportation",
      "Selected meals",
      "Travel coordination"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1efUrY3v-K7sSQkCA53rwsq8v43E52RvV",
      "https://lh3.googleusercontent.com/d/1ZacqiQyeurQRCpjZTrapGpIv9F_DlVCQ",
      "https://lh3.googleusercontent.com/d/19XYuAWQqk1WYUk-axj1V9BUIJSKUFtBM",
      "https://lh3.googleusercontent.com/d/1B5boSFLZnlLQvm--BmU0mfZ0WCfANb26",
      "https://lh3.googleusercontent.com/d/1-AC3KAuTiVGRvgEFfew4BGmGmJQM8B8c"
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
  {
    id: "pkg-9",
    title: "Lalibela Heritage Experience",
    highlights: "Heritage Experience",
    imageUrl: "https://lh3.googleusercontent.com/d/1wObvCNhod1hHq8UgVyIm3rDfFHG0mzVX",
    destinationValue: "Rock-Hewn Churches • Sacred Pilgrimage • Highland Culture",
    priceTag: "Heritage Experience",
    description: "Experience Ethiopia's spiritual heart through centuries-old churches, vibrant religious traditions, and unforgettable encounters with one of Africa's greatest historical treasures.",
    journeyHighlights: [
      "Explore Lalibela's eleven rock-hewn churches",
      "Visit the iconic Church of Saint George",
      "Experience authentic local traditions",
      "Enjoy panoramic highland scenery"
    ],
    includedItems: [
      "Professional heritage guide",
      "Accommodation",
      "Church entrance fees",
      "Local transportation",
      "Traditional meals",
      "Travel assistance"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1wObvCNhod1hHq8UgVyIm3rDfFHG0mzVX",
      "https://lh3.googleusercontent.com/d/1qPPxwz8_xMyBAvSSfiXcDnn4MXkk56zb",
      "https://lh3.googleusercontent.com/d/12EhOn_mfpnP2o_HTiZch5mgH9sgYRf26",
      "https://lh3.googleusercontent.com/d/1mUhti1r4oHc3xUafIkNqdohPkSINFruQ",
      "https://lh3.googleusercontent.com/d/1Rrg7YcxyUWHaW-RwV-5BFXljk2PARrFP"
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
  {
    id: "pkg-10",
    title: "Royal Gondar Experience",
    highlights: "Royal Heritage Experience",
    imageUrl: "https://lh3.googleusercontent.com/d/1Wanv6CGUUaxF_gFSw_Gc6U397ns_WkPZ",
    destinationValue: "Fasil Ghebbi • Debre Berhan Selassie • Historic Gondar",
    priceTag: "Royal Heritage Experience",
    description: "Travel through Ethiopia's former imperial capital where magnificent castles, remarkable churches, and centuries of royal history create one of Africa's most unforgettable cultural experiences.",
    journeyHighlights: [
      "Explore the magnificent royal castle complex",
      "Visit the famous Debre Berhan Selassie Church",
      "Discover Ethiopia's imperial history and traditions",
      "Experience Gondar's authentic cultural atmosphere"
    ],
    includedItems: [
      "Professional cultural guide",
      "Private transportation",
      "Heritage site entrance fees",
      "Comfortable accommodation",
      "Traditional Ethiopian lunch",
      "Travel coordination"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1Wanv6CGUUaxF_gFSw_Gc6U397ns_WkPZ",
      "https://lh3.googleusercontent.com/d/1rA_m_QXSZsOpcc4l_wNohTkWqeEdEV8i",
      "https://lh3.googleusercontent.com/d/1ntVPYOlXUb7vuOD9pgkpRTmrjJX_aCli",
      "https://lh3.googleusercontent.com/d/1zfxJa-m7_aRxX--WzlErhJNgGap7tjjG",
      "https://lh3.googleusercontent.com/d/17tzBEKbfXnB9K1NRYDB14Od-DNxS6avO",
      "https://lh3.googleusercontent.com/d/14KIu7YavkfIeFdOB0nXAQoYhWLMlB_Oj"
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
  {
    id: "pkg-11",
    title: "Simien Highlands Experience",
    highlights: "Mountain Adventure Experience",
    imageUrl: "https://lh3.googleusercontent.com/d/1UOiuIK9NN26qtujtpE7SnJbjb29BWnpn",
    destinationValue: "Simien Mountains • Gelada Baboons • Scenic Trekking",
    priceTag: "Mountain Adventure Experience",
    description: "Explore the breathtaking beauty of Ethiopia's northern highlands through guided trekking adventures, incredible wildlife encounters, and unforgettable mountain landscapes that inspire every traveler.",
    journeyHighlights: [
      "Trek along spectacular mountain trails",
      "Encounter Gelada baboons and endemic wildlife",
      "Visit breathtaking viewpoints overlooking dramatic escarpments",
      "Experience Ethiopia's pristine highland wilderness"
    ],
    includedItems: [
      "Professional mountain guide",
      "National park entrance fees",
      "Comfortable accommodation",
      "Private transportation",
      "Selected meals during the journey",
      "Complete travel coordination"
    ],
    gallery: [
      "https://lh3.googleusercontent.com/d/1UOiuIK9NN26qtujtpE7SnJbjb29BWnpn",
      "https://lh3.googleusercontent.com/d/1B4_cVm5V8xWx4jjJ1y64GM1TLvifv38f",
      "https://lh3.googleusercontent.com/d/1yEYX2EUXg6kSSOs_74ewJXlJh50XuTz8",
      "https://lh3.googleusercontent.com/d/1s3F2uFTPpZWnBTSo5idIlN6DgiD_nR_u",
      "https://lh3.googleusercontent.com/d/1wuMuWf-OXcLUGd_pHyyNL7OeGCpDlmKe"
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
];

export const VIDEO_COLLABORATIONS: VideoPlaceholder[] = [
  {
    id: "vid-1",
    title: "Chasing the Fire: Inside Erta Ale Volcano",
    duration: "18:45",
    creator: "EBS TV 'Explore Ethiopia' Special",
    thumbnailUrl: "https://lh3.googleusercontent.com/d/1x7xuMTuHyHDydK-D7oCxHw07VcZ8w_Zc"
  },
  {
    id: "vid-2",
    title: "Walking with Giants: The Hyena Feeders of Harar",
    duration: "12:10",
    creator: "Explore Ethiopia Travel & Influencer Highlight",
    thumbnailUrl: "https://lh3.googleusercontent.com/d/1XT4E0bnzH8NAerzhh4593m5_iT2z2evn"
  },
  {
    id: "vid-3",
    title: "The Mombasa Overland Road Trip Experience",
    duration: "24:30",
    creator: "East Africa Vlogger Diaries",
    thumbnailUrl: "https://lh3.googleusercontent.com/d/1A3RpQL7R1gQtAvHlTp1Vj2e_BDpP7rvL"
  }
];

export const CONTACT_INFO = {
  phone1: "0910503969",
  phone2: "0923270659",
  phoneFormatted1: "+251 910 503 969",
  phoneFormatted2: "+251 923 270 659",
  email: "tibebuablsh@gmail.com",
  office: "Addis Ababa, Ethiopia",
  whatsAppUrl: "https://wa.me/251910503969",
  telegramUrl: "https://t.me/+251910503969",
  tiktokUrl: "https://www.tiktok.com/@exploreethiopia0?_r=1&_d=f396k840bjif98&sec_uid=MS4wLjABAAAAFQ7GBl_islDddYW0y10cbTEIeVg-qfbgiXN9HdHM_Z6JWsSE67DCemBFaOx20-Xn&share_author_id=6905336161188103169&sharer_language=en&source=h5_m&u_code=ehfj7h5m3g4499&timestamp=1784110046&user_id=7444150892196791351&sec_user_id=MS4wLjABAAAAg0dMHtwb5Ew7JGrXhYCE4vh2g33L8YrQEJHQ2j_BkK9O789ba-MJH-h7Xvr5PQNf&item_author_type=2&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7661212889777555221&share_link_id=61977a71-1a39-475c-a74a-1b7fdce3b50e&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b6880%2Cb5836&social_share_type=5&share_enter_from=others_homepage&item_author_type=2&enable_checksum=1",
  instagramUrl: "https://www.instagram.com/explore.ethiopia.tourandtravel?igsh=bXFzdzk2eHI5NHRv",
  facebookUrl: "https://www.facebook.com/100083193549568/?locale=is_IS"
};
