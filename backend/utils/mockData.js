// In-memory data stores to mock database
const users = [];
const products = [];
const carts = [];
const orders = [];


const initializeMockData = () => {

  products.push(
    {
      product_id: 'p1',
      name: 'iPhone 13 Pro',
      description: 'Apple iPhone 13 Pro with A15 Bionic chip',
      price: 999.99,
      category: 'Smartphones',
      brand: 'Apple',
      image_url: 'https://example.com/iphone13pro.jpg',
      stock_quantity: 50,
      specifications: {
        display: '6.1-inch Super Retina XDR display',
        processor: 'A15 Bionic chip',
        ram: '6GB',
        storage: '128GB',
        camera: 'Pro 12MP camera system',
        battery: 'Up to 22 hours video playback',
        os: 'iOS 15'
      },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: 'p2',
      name: 'Samsung Galaxy S22 Ultra',
      description: 'Samsung Galaxy S22 Ultra with Snapdragon 8 Gen 1',
      price: 1199.99,
      category: 'Smartphones',
      brand: 'Samsung',
      image_url: 'https://example.com/s22ultra.jpg',
      stock_quantity: 40,
      specifications: {
        display: '6.8-inch Dynamic AMOLED 2X display',
        processor: 'Snapdragon 8 Gen 1',
        ram: '12GB',
        storage: '256GB',
        camera: '108MP wide camera',
        battery: '5000mAh',
        os: 'Android 12'
      },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: 'p3',
      name: 'Google Pixel 6 Pro',
      description: 'Google Pixel 6 Pro with Google Tensor chip',
      price: 899.99,
      category: 'Smartphones',
      brand: 'Google',
      image_url: 'https://example.com/pixel6pro.jpg',
      stock_quantity: 30,
      specifications: {
        display: '6.7-inch LTPO OLED display',
        processor: 'Google Tensor',
        ram: '12GB',
        storage: '128GB',
        camera: '50MP wide camera',
        battery: '5003mAh',
        os: 'Android 12'
      },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: 'p4',
      name: 'OnePlus 10 Pro',
      description: 'OnePlus 10 Pro with Snapdragon 8 Gen 1',
      price: 899.99,
      category: 'Smartphones',
      brand: 'OnePlus',
      image_url: 'https://example.com/oneplus10pro.jpg',
      stock_quantity: 25,
      specifications: {
        display: '6.7-inch Fluid AMOLED display',
        processor: 'Snapdragon 8 Gen 1',
        ram: '8GB',
        storage: '128GB',
        camera: '48MP wide camera',
        battery: '5000mAh',
        os: 'OxygenOS 12'
      },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_id: 'p5',
      name: 'Xiaomi 12 Pro',
      description: 'Xiaomi 12 Pro with Snapdragon 8 Gen 1',
      price: 999.99,
      category: 'Smartphones',
      brand: 'Xiaomi',
      image_url: 'https://example.com/xiaomi12pro.jpg',
      stock_quantity: 35,
      specifications: {
        display: '6.73-inch AMOLED display',
        processor: 'Snapdragon 8 Gen 1',
        ram: '12GB',
        storage: '256GB',
        camera: '50MP wide camera',
        battery: '4600mAh',
        os: 'MIUI 13'
      },
      created_at: new Date(),
      updated_at: new Date()
    }
  );
};


initializeMockData();

module.exports = {
  users,
  products,
  carts,
  orders
};