import bcryptjs from 'bcryptjs'

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcryptjs.hashSync('123456'),
      isAdmin: true,
    },

    {
      name: 'Din',
      email: 'din@example.com',
      password: bcryptjs.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Latte',
      slug: 'latte',
      category: 'Coffee',
      image: '/images/latte.jpg',
      price: 4,
      brand: 'Starbucks',
      rating: 4.5,
      numReviews: 5,
      description: 'Lazzatdan bahra oling',
    },
    {
      name: 'Cappuccino',
      slug: 'starbucks',
      category: 'Coffee',
      image: '/images/cappuccino.jpg',
      price: 5,
      brand: 'Starbucks',
      rating: 3.2,
      numReviews: 5,
      description: 'Lazzatdan bahra oling',
    },
    {
      name: 'Americano',
      slug: 'starbucks1',
      category: 'Coffee',
      image: '/images/americano.jpg',
      price: 3.5,
      brand: 'Starbucks',
      rating: 4.5,
      numReviews: 5,
      description: 'Lazzatdan bahra oling',
    },
    {
      name: 'Vanilla',
      slug: 'starbucks2',
      category: 'Coffee',
      image: '/images/vanil la.jpg',
      price: 5,
      brand: 'Starbucks',
      rating: 2.9,
      numReviews: 5,
      description: 'Smart looking pants',
    },
    {
      name: 'Vanilla Latte',
      slug: 'Starbucks3',
      category: 'Coffee',
      image: '/images/vanilla latte.jpg',
      price: 6,
      brand: 'Starbucks',
      rating: 3.5,
      numReviews: 5,
      description: 'Lazzatdan bahra oling',
    },
  ],
}

export default data
