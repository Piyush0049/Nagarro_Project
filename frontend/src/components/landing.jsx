import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-600">EcoBite Foods</div>
          <nav className="space-x-6">
            <a href="#" className="hover:text-green-500">Home</a>
            <a href="#about" className="hover:text-green-500">About</a>
            <a href="#products" className="hover:text-green-500">Products</a>
            <a href="#sustainability" className="hover:text-green-500">Sustainability</a>
            <a href="#contact" className="hover:text-green-500">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?organic-food')" }}>
        <div className="absolute inset-0 bg-green-900 opacity-50"></div>
        <div className="relative container mx-auto px-6 py-32 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Natural Foods, Sustainable Future</h1>
          <p className="text-lg md:text-xl mb-8">Delicious organic meals crafted with care for you and the planet.</p>
          <a href="#products" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg">Explore Products</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-8">About EcoBite Foods</h2>
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <img src="https://source.unsplash.com/400x300/?farm" alt="Organic Farm" className="rounded-lg shadow-lg mb-8 md:mb-0" />
          <p className="text-gray-700 text-lg">
            At EcoBite Foods, we believe in healthy, sustainable eating. Our ingredients are sourced from local organic farms, and every step of our supply chain is optimized to minimize carbon footprint.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Salad Bowl', 'Vegan Wrap', 'Smoothie'].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img src={`https://source.unsplash.com/400x300/?${encodeURIComponent(item)}`} alt={item} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{item}</h3>
                  <p className="text-gray-600 mb-4">Fresh, organic, and packed with nutrients. Perfect for a healthy lifestyle.</p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded">Order Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-8">Our Sustainability Efforts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-green-500 text-5xl mb-4">🌱</div>
            <h4 className="font-semibold text-xl mb-2">Organic Farming</h4>
            <p>Partnering with certified organic farms for pesticide-free produce.</p>
          </div>
          <div className="p-6">
            <div className="text-green-500 text-5xl mb-4">🚚</div>
            <h4 className="font-semibold text-xl mb-2">Eco-Friendly Delivery</h4>
            <p>Carbon-neutral delivery using electric vehicles and bike couriers.</p>
          </div>
          <div className="p-6">
            <div className="text-green-500 text-5xl mb-4">♻️</div>
            <h4 className="font-semibold text-xl mb-2">Zero Waste</h4>
            <p>Compostable packaging and a take-back program for recycling.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-green-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-8">Have questions or custom requests? We'd love to hear from you.</p>
          <form className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name" className="p-3 rounded text-gray-800" />
            <input type="email" placeholder="Your Email" className="p-3 rounded text-gray-800" />
            <textarea placeholder="Message" rows="4" className="p-3 rounded text-gray-800 md:col-span-2"></textarea>
            <button type="submit" className="bg-white text-green-500 font-semibold px-6 py-3 rounded-md md:col-span-2 hover:bg-green-100">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} EcoBite Foods. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
