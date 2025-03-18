import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop - Shakti Sabha',
  description: 'Shop our collection of empowering merchandise, self-defense tools, and educational resources'
};

const products = [
  {
    category: "Warrior Wear",
    items: [
      { name: "Empowerment T-Shirt", price: "₹599", image: "/products/tshirt.jpg" },
      { name: "Strength Bracelet", price: "₹299", image: "/products/bracelet.jpg" },
      { name: "Power Hoodie", price: "₹999", image: "/products/hoodie.jpg" }
    ]
  },
  {
    category: "Self-Defense Tools",
    items: [
      { name: "Safety Alarm Keychain", price: "₹499", image: "/products/alarm.jpg" },
      { name: "Compact Pepper Spray", price: "₹399", image: "/products/spray.jpg" },
      { name: "Personal Safety Kit", price: "₹1499", image: "/products/kit.jpg" }
    ]
  },
  {
    category: "Digital Resources",
    items: [
      { name: "Self-Defense Basics Guide", price: "₹299", image: "/products/ebook1.jpg" },
      { name: "Mental Strength Handbook", price: "₹399", image: "/products/ebook2.jpg" },
      { name: "Women's Rights Guide", price: "₹299", image: "/products/ebook3.jpg" }
    ]
  }
];

const ShopPage = () => {
  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300 mt-20">
            Shakti Shop
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Empower yourself with our curated collection of products and resources
          </p>
        </div>

        {products.map((category, index) => (
          <div key={index} className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg 
                    hover:shadow-2xl hover:bg-white/20 hover:scale-105
                    transition-all duration-300 cursor-pointer border border-white/10"
                >
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="w-full h-48 bg-gray-800/50 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">🛍️</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{item.price}</span>
                    <button className="px-4 py-2 bg-white/10 text-white rounded-lg 
                      hover:bg-white/20 transition-all duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Shopping Cart Preview */}
        <div className="fixed bottom-8 right-8">
          <button className="p-4 bg-white/10 rounded-full shadow-lg 
            hover:bg-white/20 transition-all duration-300 group">
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-white text-gray-900 
              rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              0
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
