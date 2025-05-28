import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?organic-food,meal')" }}>
      <div className="absolute inset-0 bg-green-900 opacity-50"></div>
      <div className="relative container mx-auto px-6 py-32 text-white text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Welcome to EcoBite Foods</h1>
        <p className="text-xl md:text-2xl mb-8">Delicious organic meals crafted with care for you and the planet.</p>
        <Link to="/products" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg">Explore Our Menu</Link>
      </div>
    </section>
  );
}

function About() {
  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-green-600 mb-6">About EcoBite</h2>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img src="https://source.unsplash.com/500x400/?farm,organic" alt="Organic Farm" className="rounded-lg shadow-lg w-full md:w-1/2 object-cover" />
        <p className="text-gray-700 text-lg leading-relaxed">
          EcoBite Foods is committed to sustainable, eco-friendly dining experiences. We partner with local organic farms, use compostable packaging, and aim for zero-waste operations. Our mission is to nourish communities while preserving our planet.
        </p>
      </div>
    </div>
  );
}

function Products() {
  const items = [
    { name: 'Fresh Salad Bowl', img: 'salad' },
    { name: 'Vegan Wrap', img: 'vegan-wrap' },
    { name: 'Fruit Smoothie', img: 'smoothie' },
  ];
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-600">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map(item => (
            <div key={item.name} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition">
              <img src={`https://source.unsplash.com/400x300/?${item.img}`} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">Healthy, organic, and bursting with flavor.</p>
                <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-full">Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sustainability() {
  const initiatives = [
    { icon: '🌱', title: 'Organic Farming', desc: 'Certified pesticide-free produce.' },
    { icon: '🚚', title: 'Green Delivery', desc: 'Carbon-neutral electric vehicles.' },
    { icon: '♻️', title: 'Zero Waste', desc: 'Compostable & reusable packaging.' },
  ];
  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-green-600 mb-10">Sustainability</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {initiatives.map(item => (
          <div key={item.title} className="text-center p-6 border rounded-xl hover:shadow-lg transition">
            <div className="text-6xl mb-4">{item.icon}</div>
            <h4 className="text-2xl font-semibold mb-2">{item.title}</h4>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="bg-green-500 text-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">Get in Touch</h2>
        <form className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Name" className="p-4 rounded-lg text-gray-800" />
          <input type="email" placeholder="Email" className="p-4 rounded-lg text-gray-800" />
          <textarea placeholder="Message" rows="4" className="p-4 rounded-lg text-gray-800 md:col-span-2"></textarea>
          <button type="submit" className="bg-white text-green-500 font-semibold px-6 py-3 rounded-full md:col-span-2 hover:bg-green-100">Send Message</button>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="bg-white shadow sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-600">EcoBite Foods</Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-green-500">Home</Link>
            <Link to="/about" className="hover:text-green-500">About</Link>
            <Link to="/products" className="hover:text-green-500">Products</Link>
            <Link to="/sustainability" className="hover:text-green-500">Sustainability</Link>
            <Link to="/contact" className="hover:text-green-500">Contact</Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        <p>© {new Date().getFullYear()} EcoBite Foods. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
