import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const WelcomeStep2 = () => {
  return (
    <motion.div 
      className="text-center flex flex-col items-center max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-48 h-48 mb-8 bg-welcome-accent rounded-full flex items-center justify-center">
        <MapPin color="#075eec" size={120} strokeWidth={1.5} />
      </div>
      <h1 className="text-3xl font-bold mb-3 text-gray-800">Travel Anywhere</h1>
      <p className="text-gray-600 mb-4">Discover routes to your favorite destinations with just a few taps.</p>
    </motion.div>
  );
};

export default WelcomeStep2;
