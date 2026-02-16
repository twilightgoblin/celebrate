'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowLeft, Send, Calendar, Users, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Grainient from '../../components/Grainient';

export default function ContactPage() {
  const formRef = useRef(null);
  const formInView = useInView(formRef, { amount: 0.2, once: true });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    location: '',
    budget: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you! We will get back to you soon.');
  };

  return (
    <>
      <Navbar />
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <Grainient
          color1="#FFD9C7"
          color2="#FFB199"
          color3="#F38B75"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.08}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1.05}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', paddingTop: '100px' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 text-base sm:text-lg hover:gap-3 transition-all"
            style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-body)' }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-heading)' }}
            >
              Let's Plan Your Event
            </h1>
            <p 
              className="text-lg sm:text-xl"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}
            >
              Share your requirements and we'll make it happen
            </p>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(245, 230, 220, 0.7)',
              border: '1px solid rgba(255, 177, 153, 0.25)',
              boxShadow: '0 8px 32px rgba(90, 74, 69, 0.1)'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-body)' }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(138, 107, 99, 0.2)',
                    fontFamily: 'var(--font-body)'
                  }}
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-body)' }}
                >
                  <Mail className="inline mr-1" size={16} />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(138, 107, 99, 0.2)',
                    fontFamily: 'var(--font-body)'
                  }}
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-body)' }}
                >
                  <Phone className="inline mr-1" size={16} />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(138, 107, 99, 0.2)',
                    fontFamily: 'var(--font-body)'
                  }}
                  placeholder="+91 9876543210"
                />
              </div>

              {/* Event Type */}
              <div>
                <label 
                  htmlFor="eventType" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-body)' }}
                >
                  Event Type *
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(138, 107, 99, 0.2)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Event Date */}
              <div>
                <label 
                  htmlFor="eventDate" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-body)' }}
                >
                  <Calendar className="inline mr-1" size={16} />
                  Event Date *
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  required
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(138, 107, 99, 0.2)',
                    fontFamily: 'var(--font-body)'
                  }}
                />
              </div>

              {/* Guest Count */}
              <div>
                <label 
                  htmlFor="guestCount" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-body)' }}
                >
                  <Users className="inline mr-1" size={16} />
                  Number of Guests *
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  required
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(138, 107, 99, 0.2)',
                    fontFamily: 'var(--font-body)'
                  }}
                  placeholder="50"
                  min="1"
                />
              </div>

              {/* Location */}
              <div>
                <label 
                  htmlFor="location" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-body)' }}
                >
                  <MapPin className="inline mr-1" size={16} />
                  Event Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(138, 107, 99, 0.2)',
                    fontFamily: 'var(--font-body)'
                  }}
                  placeholder="City or Venue"
                />
              </div>

              {/* Budget */}
              <div>
                <label 
                  htmlFor="budget" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-body)' }}
                >
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(138, 107, 99, 0.2)',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  <option value="">Select budget range</option>
                  <option value="under-50k">Under ₹50,000</option>
                  <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                  <option value="1l-3l">₹1,00,000 - ₹3,00,000</option>
                  <option value="3l-5l">₹3,00,000 - ₹5,00,000</option>
                  <option value="above-5l">Above ₹5,00,000</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <label 
                htmlFor="message" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-heading)', fontFamily: 'var(--font-body)' }}
              >
                <MessageSquare className="inline mr-1" size={16} />
                Additional Requirements
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all resize-none"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderColor: 'rgba(138, 107, 99, 0.2)',
                  fontFamily: 'var(--font-body)'
                }}
                placeholder="Tell us more about your event requirements..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 inline-flex items-center justify-center gap-2.5 px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-medium transition-all"
              style={{ 
                backgroundColor: 'var(--btn-primary)',
                color: 'white',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 16px rgba(243, 139, 117, 0.3)'
              }}
            >
              Submit Request
              <Send size={20} strokeWidth={2.5} />
            </motion.button>
          </motion.form>
        </div>
        <Footer />
      </div>
    </>
  );
}
