export const user = {
  firstName: 'Emilian',
  id: 123,
  lastName: 'Radu',
  email: 'emiradu98@icloud.com',
  photo: 'https://i.stack.imgur.com/l60Hf.png',
  role: 'client',
  notifications: [
    {name: 'email', isReceiving: true},
    {name: 'phone', isReceiving: true},
  ],
  lastLocation: {
    name: 'Meru Iasi',
    hasReviewed: false,
    date: '25.05.2021 17:30',
  },
  reviews: [
    {
      id: 123,
      name: 'Meru Iasi',
      stars: 5,
      comment:
        'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
    },
    {
      id: 1234,
      name: 'Meru Iasi',
      stars: 5,
      comment:
        'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
    },
    {
      id: 1235,
      name: 'Meru Iasi',
      stars: 5,
      comment:
        'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
    },
  ],
};

export const pubs = [
  {
    id: 1234,
    currency: 'RON',
    name: 'Meru Iasi',
    tags: ['cozy', 'artsy', 'cheap'],
    price: 1,
    address: 'Soseaua Stefan cel Mare si Sfant 19B',
    waiters: [],
    ownerId: 123,
    stars: 4.7,
    totalEmptyTables: 32,
    reviews: [
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
    ],

    menu: [
      {
        id: 2,
        name: 'Coffee',
        price: 5,
        ingredients: ['coffee', 'water', 'sugar'],
      },
    ],
    photos: [
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
    ],
    locations: [
      {
        id: 169,
        name: 'Interior',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: true,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 12223,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
      {
        id: 167,
        name: 'Terasa',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
    ],
  },
  {
    id: 1234,
    currency: 'RON',
    name: 'Meru Iasi',
    tags: ['cozy', 'artsy', 'cheap'],
    price: 1,
    address: 'Soseaua Stefan cel Mare si Sfant 19B',
    waiters: [],
    ownerId: 123,
    stars: 4.7,
    totalEmptyTables: 32,
    reviews: [
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
    ],

    menu: [
      {
        id: 2,
        name: 'Coffee',
        price: 5,
        ingredients: ['coffee', 'water', 'sugar'],
      },
    ],
    photos: [
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
    ],
    locations: [
      {
        id: 169,
        name: 'Interior',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
      {
        id: 167,
        name: 'Terasa',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
    ],
  },
  {
    id: 1234,
    currency: 'RON',
    name: 'Meru Iasi',
    tags: ['cozy', 'artsy', 'cheap'],
    price: 1,
    address: 'Soseaua Stefan cel Mare si Sfant 19B',
    waiters: [],
    ownerId: 123,
    stars: 4.7,
    totalEmptyTables: 32,
    reviews: [
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
    ],

    menu: [
      {
        id: 2,
        name: 'Coffee',
        price: 5,
        ingredients: ['coffee', 'water', 'sugar'],
      },
    ],
    photos: [
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
    ],
    locations: [
      {
        id: 169,
        name: 'Interior',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
      {
        id: 167,
        name: 'Terasa',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
    ],
  },
  {
    id: 1234,
    currency: 'RON',
    name: 'Meru Iasi',
    tags: ['cozy', 'artsy', 'cheap'],
    price: 1,
    address: 'Soseaua Stefan cel Mare si Sfant 19B',
    waiters: [],
    ownerId: 123,
    stars: 4.7,
    totalEmptyTables: 32,
    reviews: [
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
    ],

    menu: [
      {
        id: 2,
        name: 'Coffee',
        price: 5,
        ingredients: ['coffee', 'water', 'sugar'],
      },
    ],
    photos: [
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
    ],
    locations: [
      {
        id: 169,
        name: 'Interior',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
      {
        id: 167,
        name: 'Terasa',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
    ],
  },
  {
    id: 1234,
    currency: 'RON',
    name: 'Meru Iasi',
    tags: ['cozy', 'artsy', 'cheap'],
    price: 1,
    address: 'Soseaua Stefan cel Mare si Sfant 19B',
    waiters: [],
    ownerId: 123,
    stars: 4.7,
    totalEmptyTables: 32,
    reviews: [
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
    ],

    menu: [
      {
        id: 2,
        name: 'Coffee',
        price: 5,
        ingredients: ['coffee', 'water', 'sugar'],
      },
    ],
    photos: [
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
    ],
    locations: [
      {
        id: 169,
        name: 'Interior',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
      {
        id: 167,
        name: 'Terasa',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
    ],
  },
  {
    id: 1234,
    currency: 'RON',
    name: 'Meru Iasi',
    tags: ['cozy', 'artsy', 'cheap'],
    price: 1,
    address: 'Soseaua Stefan cel Mare si Sfant 19B',
    waiters: [],
    ownerId: 123,
    stars: 4.7,
    totalEmptyTables: 32,
    reviews: [
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
    ],

    menu: [
      {
        id: 2,
        name: 'Coffee',
        price: 5,
        ingredients: ['coffee', 'water', 'sugar'],
      },
    ],
    photos: [
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
    ],
    locations: [
      {
        id: 169,
        name: 'Interior',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
      {
        id: 167,
        name: 'Terasa',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
    ],
  },
  {
    id: 1234,
    currency: 'RON',
    name: 'Meru Iasi',
    tags: ['cozy', 'artsy', 'cheap'],
    price: 1,
    address: 'Soseaua Stefan cel Mare si Sfant 19B',
    waiters: [],
    ownerId: 123,
    stars: 4.7,
    totalEmptyTables: 32,
    reviews: [
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
    ],

    menu: [
      {
        id: 2,
        name: 'Coffee',
        price: 5,
        ingredients: ['coffee', 'water', 'sugar'],
      },
    ],
    photos: [
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
    ],
    locations: [
      {
        id: 169,
        name: 'Interior',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
      {
        id: 167,
        name: 'Terasa',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
    ],
  },
  {
    id: 1234,
    currency: 'RON',
    name: 'Meru Iasi',
    tags: ['cozy', 'artsy', 'cheap'],
    price: 1,
    address: 'Soseaua Stefan cel Mare si Sfant 19B',
    waiters: [],
    ownerId: 123,
    stars: 4.7,
    totalEmptyTables: 32,
    reviews: [
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
    ],

    menu: [
      {
        id: 2,
        name: 'Coffee',
        price: 5,
        ingredients: ['coffee', 'water', 'sugar'],
      },
    ],
    photos: [
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
    ],
    locations: [
      {
        id: 169,
        name: 'Interior',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
      {
        id: 167,
        name: 'Terasa',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
    ],
  },
  {
    id: 1235,
    currency: 'RON',
    name: 'Meru Iasi',
    tags: ['cozy', 'artsy', 'cheap'],
    price: 1,
    stars: 4.7,
    address: 'Soseaua Stefan cel Mare si Sfant 19B',
    waiters: [],
    totalEmptyTables: 32,
    ownerId: 123,
    reviews: [
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
      {
        id: 123,
        name: 'Emilian Radu',
        photo:
          'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
        stars: 5,
        comment:
          'I very much enjoyed my stay and they have really good drinks. The waiter was also really kind and was quite receptive.',
      },
    ],

    menu: [
      {
        id: 2,
        name: 'Coffee',
        price: 5,
        ingredients: ['coffee', 'water', 'sugar'],
      },
    ],
    photos: [
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
      'https://www.7est.ro/wp-content/uploads/2017/09/cafenea-meru.jpg',
    ],
    locations: [
      {
        id: 169,
        name: 'Interior',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
      {
        id: 167,
        name: 'Terasa',
        tableCount: 16,
        emptyTables: 6,
        tables: [
          {
            id: 123,
            capacity: 6,
            blocked: false,
            occupied: false,
            xPos: 1,
            yPos: 1,
          },
          {
            id: 1234,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
          {
            id: 1254,
            capacity: 4,
            blocked: false,
            occupied: true,
            xPos: 2,
            yPos: 2,
          },
        ],
      },
    ],
  },
];
