// Edit this file to change event details, the godparent list, or the RSVP endpoint.
// No other file needs to change for those updates.

const CONFIG = {
  // Paste the "Web app URL" you get after deploying rsvp-backend/Code.gs
  // (see rsvp-backend/README.md). Leave blank to disable RSVP recording.
  rsvpEndpoint: 'https://script.google.com/macros/s/AKfycbxg6xSXGSbejulcEg7UPTfnGftjB7X-kMgIhQT_DoTFvkG-3NTCUMdA9P4Wol6lBRvW/exec',

  event: {
    childName: 'John Eli Sebastian',
    eventDate: 'September 5, 2026',
    eventTime: '10:00 AM',
    venue: 'St. Jude Thaddeus Parish, Legazpi',
    accentColor: '#5A7B99',
    arriveNote: 'Please be at the Church 30 minutes before the said Christening for the seminar and orientation of Priest.',
    dressCode: 'We kindly encourage all guest to come in comfortable casual outfits.',
    colorCodes: [
      { label: 'Light Blue',   img: 'assets/color-light-blue.png' },
      { label: 'White',        img: 'assets/color-white.png' },
      { label: 'Dirty White',  img: 'assets/color-dirty-white.png' },
      { label: 'Powder Blue',  img: 'assets/color-powder-blue.png' },
    ],
    reception: {
      time: '11:00 AM - 3:00 PM',
      name: 'Lola Felings Restaurant',
      logo: 'assets/restaurant-logo.png',
      note: "Your presence means the world to us, see you at the reception!",
    },
  },

  // Each godparent gets her own link: i-have-a-question-for-you.html?to=<slug>
  recipients: {
    chloe:     'Ms. Chloe',
    france:    'Tita France',
    rhea:      'Tita Rhea',
    roshane:   'Tita Roshane',
    angie:     'Tita Angie',
    trisha:    'Tita Trisha',
    marithell: 'Tita Marithell',
    rianne:    'Tita Rianne',
    krisdel:   'Tita Krisdel',

    gemark:    'Tito Gemark',
    archie:    'Tito Archie',
    bien:      'Tito Bien',
    angelo:    'Tito Angelo',
    tyrone:    'Tito Tyrone',
    ar:        'Tito Ar',
    robert:    'Tito Robert',
    pongay:    'Boss Pongay',
    keanu:     'Tito Keanu',
    mak:       'Tito Mak',
    markie:    'Tito Markie',
    macky:     'Tito Macky',
  },

  giftIdeas: [
    { label: 'Millie Moon Diapers',      img: 'assets/gift-diapers.png' },
    { label: 'Monetary Gift',            img: 'assets/gift-monetary.png' },
    { label: 'Clothes',                  img: 'assets/gift-clothes.png' },
    { label: 'Wet Wipes (Moose Gear)',   img: 'assets/gift-wipes.png' },
    { label: 'LOVE',                     img: 'assets/gift-love.png' },
    { label: 'Toddler Toys',             img: 'assets/gift-toys.jpg' },
  ],
};
