import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar2 from '../navbar/Navbar2';
import toast from 'react-hot-toast';

// Extract contact info item component for reuse
const ContactInfoItem = ({ icon, title, children }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <div className="p-3 bg-[#4CAF50]/10 rounded-full">
        <i className={`${icon} text-xl text-[#4CAF50]`}></i>
      </div>
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {children}
    </div>
  </div>
);

const Contact = () => {
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      toast.success('Message sent successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen">
        <div id="contact-section" className="bg-gradient-to-br from-slate-50 to-[#f0f7f0] relative overflow-hidden">
          {/* Decorative Elements - Updated with new color scheme */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#4CAF50]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5C9DFF]/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

          <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#4CAF50] uppercase bg-[#4CAF50]/10 rounded-full">Contact Us</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-3 sm:text-4xl lg:text-5xl">
                Send us a <span className="text-[#4CAF50] relative">Message
                  <svg className="absolute bottom-1 left-0 w-full h-3 -z-10 text-[#4CAF50]/10" viewBox="0 0 172 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 15.5C1 15.5 64 1 86 1C108 1 171.5 15.5 171.5 15.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                  </svg>
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#4CAF50]/20">
                  <div className="bg-gradient-to-br from-[#f8fdf8] to-white p-8 rounded-t-2xl border-b border-[#4CAF50]/10">
                    <h2 className="text-2xl font-semibold text-[#1a472a] mb-6">Contact Information</h2>
                    
                    <div className="space-y-6">
                      <ContactInfoItem icon="ri-map-pin-line" title="Our Location">
                        <p className="mt-1 text-gray-600">123 Healthcare Avenue, Mumbai, India 400001</p>
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#4CAF50] hover:underline inline-flex items-center mt-2">
                          <i className="ri-roadmap-line mr-1"></i> Get directions
                        </a>
                      </ContactInfoItem>

                      <ContactInfoItem icon="ri-phone-line" title="Phone">
                        <p className="mt-1 text-gray-600">+91 (800) 123-4567</p>
                        <p className="text-gray-600">Mon-Sat 9am to 6pm</p>
                      </ContactInfoItem>

                      <ContactInfoItem icon="ri-mail-line" title="Email">
                        <p className="mt-1 text-gray-600">support@childcare.com</p>
                        <p className="text-gray-600">info@childcare.com</p>
                      </ContactInfoItem>

                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                          {[
                            { name: 'facebook', color: 'bg-blue-100 text-blue-600' },
                            { name: 'twitter', color: 'bg-sky-100 text-sky-600' },
                            { name: 'instagram', color: 'bg-pink-100 text-pink-600' }
                          ].map((social) => (
                            <a
                              key={social.name}
                              href={`#${social.name}`}
                              className={`p-2 ${social.color} rounded-full hover:opacity-80 transition-all`}
                            >
                              <i className={`ri-${social.name}-fill text-xl`}></i>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Business hours with gradient background */}
                  <div className="p-6 bg-gradient-to-br from-white to-[#f8fdf8] rounded-b-2xl">
                    <h3 className="text-xl font-medium text-[#1a472a] mb-4 flex items-center">
                      <i className="ri-time-line mr-2 text-[#4CAF50]"></i> Business Hours
                    </h3>
                    
                    <div className="space-y-3">
                      {[
                        { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                        { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                        { day: 'Sunday', hours: 'Closed' }
                      ].map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium text-gray-700">{schedule.day}</span>
                          <span className={schedule.hours === 'Closed' ? 'text-red-500' : 'text-[#4CAF50]'}>
                            {schedule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form with improved styling */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-white to-[#f8fdf8] rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-all duration-300 hover:border-[#4CAF50]/20">
                  <h2 className="text-2xl font-semibold text-[#1a472a] mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Update all input fields with new focus styles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name*</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-gray-700 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4CAF50] placeholder-gray-400"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-gray-700 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4CAF50] placeholder-gray-400"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-gray-700 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4CAF50] placeholder-gray-400"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                        <select
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-gray-700 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4CAF50]"
                        >
                          <option value="">Select a subject</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Support Request">Support Request</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Feedback">Feedback</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                      <textarea
                        name="message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-gray-700 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4CAF50] placeholder-gray-400"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="privacy"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50]"
                      />
                      <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                        I agree to the <a href="/privacy" className="text-[#4CAF50] hover:underline">Privacy Policy</a>
                      </label>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white rounded-lg hover:from-[#45a049] hover:to-[#3d8b40] transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact alternatives with smoother styling */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Call Us Directly',
                  icon: 'ri-phone-line',
                  description: 'Speak with our support team',
                  action: 'Call Now',
                  link: 'tel:+918001234567',
                  bgColor: 'bg-blue-50',
                  iconColor: 'text-blue-600'
                },
                { 
                  title: 'Live Chat',
                  icon: 'ri-chat-1-line',
                  description: 'Chat with us online',
                  action: 'Start Chat',
                  link: '#chat',
                  bgColor: 'bg-green-50',
                  iconColor: 'text-green-600'
                },
                // { 
                //   title: 'Schedule Appointment',
                //   icon: 'ri-calendar-line',
                //   description: 'Book a consultation',
                //   action: 'Schedule',
                //   link: '/dashboard/consultations/schedule',
                //   bgColor: 'bg-purple-50',
                //   iconColor: 'text-purple-600'
                // }
              ].map((item, idx) => (
                <Link 
                  key={idx}
                  to={item.link}
                  className="bg-gradient-to-br from-white to-[#fcfcfc] rounded-xl p-6 shadow-md border border-gray-100 flex flex-col hover:shadow-lg transition-all duration-300 hover:border-[#4CAF50]/20 hover:-translate-y-1 group"
                >
                  <div className={`${item.bgColor} bg-opacity-80 group-hover:bg-opacity-100 transition-all duration-300 p-3 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    <i className={`${item.icon} text-xl ${item.iconColor}`}></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow">{item.description}</p>
                  <div className="mt-4 flex items-center font-medium text-[#4CAF50] group-hover:text-[#45a049] transition-colors">
                    {item.action}
                    <i className="ri-arrow-right-line ml-1 group-hover:translate-x-1 transition-transform duration-300"></i>
                  </div>
                </Link>
              ))}
            </div>

            {/* Map with improved styling */}
            <div className="mt-12 mb-16 bg-gradient-to-br from-white to-[#f8fdf8] rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#4CAF50]/20">
              <h2 className="text-2xl font-semibold text-[#1a472a] mb-4">Visit Our Location</h2>
              <div className="h-80 bg-gray-200 rounded-xl overflow-hidden shadow-inner">
                {/* Map component placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500">
                  <span>Map integration goes here</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-[#F8F9F4] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ...existing map component... */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
