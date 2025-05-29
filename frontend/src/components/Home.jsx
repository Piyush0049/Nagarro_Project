import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Leaf, PackageIcon, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/src/assets/images/bg.jpg')" }}
      >
<div className="absolute inset-0 bg-black opacity-60"></div>
        <motion.div
          className="relative z-10 container mx-auto px-6 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-xl">
            Fresh & Sustainable
            <span className="text-yellow-400"> EcoBite Foods</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow">
            Handcrafted organic meals delivered with care—for your health and the planet.
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              to="/menu"
              className="flex items-center px-8 py-4 bg-yellow-400 text-green-800 font-semibold rounded-full shadow-2xl hover:bg-yellow-500 transform hover:scale-105 transition"
            >
              <Activity className="mr-2" size={24} />
              View Menu
            </Link>
            <Link
              to="/about"
              className="flex items-center px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full shadow hover:bg-yellow-400 hover:text-green-900 transform hover:scale-105 transition"
            >
              <Leaf className="mr-2" size={24} />
              Learn More
            </Link>
          </div>
        </motion.div>
        {/* Wave Divider */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-16 md:h-24" viewBox="0 0 1440 320">
            <path
              fill="#f3f4f6"
              d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,112C672,96,768,96,864,117.3C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-green-700 mb-16">
            Our Green Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                Icon: Leaf,
                title: 'Organic Ingredients',
                desc: 'Locally sourced, farm-fresh produce for maximum flavor and nutrition.',
              },
              {
                Icon: PackageIcon,
                title: 'Eco Packaging',
                desc: '100% compostable boxes and utensils to reduce environmental waste.',
              },
              {
                Icon: Truck,
                title: 'Green Delivery',
                desc: 'Carbon-neutral transport using electric vehicles and bike couriers.',
              },
            ].map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                className="bg-white rounded-2xl shadow-2xl p-10 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon className="mx-auto mb-6 text-green-600" size={48} />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-700 to-yellow-400 text-white py-24">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/3 -translate-y-1/2">
        <motion.div
          className="w-72 h-72 bg-green-500 opacity-30 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
      <div className="absolute bottom-0 right-1/3 transform translate-x-1/4 translate-y-1/2">
        <motion.div
          className="w-96 h-96 bg-yellow-300 opacity-25 rounded-full filter blur-4xl"
          animate={{ scale: [1, 0.9, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative container mx-auto px-6 text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-100">
            Ready to Eat Green?
          </span>
        </h2>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Link
            to="/menu"
            className="inline-flex items-center px-14 py-5 bg-white bg-opacity-90 text-green-800 font-semibold rounded-full shadow-2xl hover:bg-opacity-100 transition"
          >
            Explore Our Menu
            <svg
              className="ml-3 transform group-hover:translate-x-1 transition-transform"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
    </div>
  );
}
