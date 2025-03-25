import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Calendar, User, AtSign, CheckCircle, AlertCircle, Scissors, Dog } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useScrollToTop } from '../hooks/useScrollToTop';
import SEO from '../components/SEO';

const ContactPage = () => {
  useScrollToTop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
    patchTested: false
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isColoringService, setIsColoringService] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Check if selected service is a colouring service
  useEffect(() => {
    const colouringServices = [
      'full-head-highlights',
      'partial-highlights',
      'half-highlights',
      'balayage',
      'full-head',
      'regrowth',
      'maintenance',
      'tint-highlight',
      'semi',
      'toner',
      'color-correction',
      'single-process'
    ];
    
    setIsColoringService(colouringServices.includes(formData.service));
  }, [formData.service]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', phone: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };

  const sendToMakeWebhook = async (appointmentData: any) => {
    const webhookUrl = 'https://hook.eu2.make.com/cx7030ccdoxpxhsyqsblkxxfbwdpmlao';
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      
      if (!response.ok) {
        console.warn('Webhook call failed but continuing...');
      }
    } catch (error) {
      console.warn('Error sending data to webhook but continuing:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Prepare the appointment data
      const appointmentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: formData.service,
        appointment_date: formData.date,
        appointment_time: formData.time,
        message: formData.message || null,
        status: 'pending',
        patch_tested: isColoringService ? formData.patchTested : null
      };
      
      // Insert the appointment data into Supabase - without .select() which can cause issues
      const { error } = await supabase
        .from('appointments')
        .insert([appointmentData]);
      
      if (error) {
        console.error('Error submitting appointment:', error);
        setSubmitError('There was an error submitting your appointment. Please try again.');
        setIsSubmitting(false);
        return;
      }
      
      // Send the data to Make.com webhook without blocking main flow
      try {
        sendToMakeWebhook({
          ...appointmentData,
          booking_source: 'website',
          timestamp: new Date().toISOString()
        });
      } catch (webhookError) {
        // Just log it, don't affect the success flow
        console.warn('Webhook notification failed, but appointment was created');
      }
      
      // Success
      setFormSubmitted(true);
      setIsSubmitting(false);
      
      // Scroll to the top of the page to show the success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: '',
        patchTested: false
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setSubmitError('There was an error submitting your appointment. Please try again.');
      setIsSubmitting(false);
    }
  };

  const availableTimeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  // Get tomorrow's date as the minimum date for booking
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Format the email subject and body
  const getEmailParams = () => {
    const subject = 'Appointment Inquiry - Poppy Hair';
    const body = 'Hi, I would like to schedule an appointment at Poppy Hair.';
    
    return {
      subject: encodeURIComponent(subject),
      body: encodeURIComponent(body)
    };
  };

  // Create the mailto link with subject and body
  const getMailtoLink = () => {
    const { subject, body } = getEmailParams();
    return `mailto:lucy_hairbuisness@outlook.com?subject=${subject}&body=${body}`;
  };

  // LocalBusiness schema for structured data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Poppy Hair",
    "image": "https://poppy-hair.com/src/Images/LucyPic_1.jpeg",
    "url": "https://poppy-hair.com",
    "telephone": "+447849474199",
    "email": "lucy_hairbusiness@outlook.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "25A Dundas St",
      "addressLocality": "Edinburgh",
      "postalCode": "EH3 6QQ",
      "addressCountry": "UK"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "17:00"
      }
    ]
  };

  return (
    <div className="bg-cream-light py-8 sm:py-12">
      <SEO 
        title="Contact & Book | Poppy Hair Edinburgh"
        description="Contact Poppy Hair in Edinburgh to schedule your appointment. Our convenient booking form makes it easy to request the perfect time for your haircut, colouring, or treatment."
        canonicalUrl="/contact"
        schema={[localBusinessSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800 mb-3 sm:mb-4">Contact for an appointment</h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base">
            Schedule your visit to Poppy Hair and let us help you achieve the look you've always wanted.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Booking Form */}
          <div className="bg-cream rounded-lg shadow-md p-5 sm:p-8 transform transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-800 mb-4 sm:mb-6 flex items-center">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Contact for an appointment
            </h2>
            
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 sm:px-6 py-3 sm:py-4 rounded-md mb-5 sm:mb-6 flex items-start animate-fadeIn">
                <CheckCircle className="h-5 w-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Booking Request Received!</p>
                  <p className="mt-1 text-sm sm:text-base">Thank you for scheduling with Poppy Hair. We'll confirm your appointment shortly via email or phone.</p>
                </div>
              </div>
            ) : null}
            
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 sm:px-6 py-3 sm:py-4 rounded-md mb-5 sm:mb-6 flex items-start animate-fadeIn">
                <AlertCircle className="h-5 w-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Error</p>
                  <p className="mt-1 text-sm sm:text-base">{submitError}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="bg-cream-dark/50 p-4 sm:p-5 rounded-md mb-5 sm:mb-6">
                <h3 className="text-base sm:text-lg font-medium text-stone-800 mb-3 sm:mb-4 flex items-center">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Personal information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="name" className="block text-stone-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-stone-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all duration-200 text-sm sm:text-base`}
                        placeholder="Jane Doe"
                      />
                      {formErrors.name && (
                        <div className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {formErrors.name}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="email" className="block text-stone-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-stone-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all duration-200 text-sm sm:text-base`}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && (
                        <div className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {formErrors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <label htmlFor="phone" className="block text-stone-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      Phone number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${formErrors.phone ? 'border-red-300 bg-red-50' : 'border-stone-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all duration-200 text-sm sm:text-base`}
                        placeholder="+44 7123 456789"
                      />
                      {formErrors.phone && (
                        <div className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {formErrors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-cream-dark/50 p-4 sm:p-5 rounded-md mb-5 sm:mb-6">
                <h3 className="text-base sm:text-lg font-medium text-stone-800 mb-3 sm:mb-4 flex items-center">
                  <Scissors className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Appointment details
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="service" className="block text-stone-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      Service interested in <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all duration-200 bg-white text-sm sm:text-base appearance-none bg-no-repeat"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: `right 0.5rem center`,
                        backgroundSize: `1.5em 1.5em`
                      }}
                    >
                      <option value="">Select a service</option>
                      <optgroup label="Haircuts & Styling">
                        <option value="women-haircut">Women's Haircut</option>
                        <option value="men-haircut">Men's Haircut</option>
                        <option value="children-haircut">Children's Haircut</option>
                        <option value="blowout">Wash and Blow Dry</option>
                        <option value="fringe-trim">Fringe Trim</option>
                      </optgroup>
                      <optgroup label="Colouring">
                        <option value="full-head-highlights">Full Head Highlights</option>
                        <option value="partial-highlights">T Line Highlights</option>
                        <option value="half-highlights">Half Head Highlights</option>
                        <option value="balayage">Full Head Bleach And Tone</option>
                        <option value="full-head">Full Head Tint</option>
                        <option value="regrowth">Regrowth Tint</option>
                        <option value="maintenance">Balayage Maintenance</option>
                        <option value="balayage">Balayage</option>
                        <option value="tint-highlight">Tint and Highlights</option>
                        <option value="semi">Semi Permanent All Over Colour</option>
                        <option value="toner">Toner</option>
                      </optgroup>
                      <optgroup label="Treatments">
                        <option value="k-18-treatment">K18 Treatment</option>
                        <option value="moisture-treatment">Moisture Treatment</option>
                      </optgroup>
                    </select>
                  </div>
                  
                  {isColoringService && (
                    <div className="col-span-2 bg-yellow-50 p-3 sm:p-4 rounded-md border border-yellow-200 animate-fadeIn">
                      <div className="flex items-start">
                        <div className="flex items-center h-5 mt-0.5 sm:mt-1">
                          <input
                            id="patchTested"
                            name="patchTested"
                            type="checkbox"
                            checked={formData.patchTested}
                            onChange={handleCheckboxChange}
                            className="focus:ring-stone-500 h-4 w-4 text-stone-700 border-stone-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-xs sm:text-sm">
                          <label htmlFor="patchTested" className="font-medium text-stone-800">
                            I have been patch tested at Poppy Hair within the last 12 months
                          </label>
                          <p className="text-stone-600 mt-1">
                            UK law requires a patch test 48 hours before any colour service if you haven't been tested in the last 12 months. 
                            If you haven't been patch tested, we'll need to schedule one before your colour appointment.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="date" className="block text-stone-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      Preferred date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={minDate}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all duration-200 text-sm sm:text-base appearance-none bg-white"
                    />
                  </div>
                  
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="time" className="block text-stone-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      Preferred time <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all duration-200 bg-white text-sm sm:text-base appearance-none bg-no-repeat"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: `right 0.5rem center`,
                        backgroundSize: `1.5em 1.5em`
                      }}
                    >
                      <option value="">Select a time</option>
                      {availableTimeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-stone-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                  Additional information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Tell us about your hair goals, concerns, or any special requests..."
                ></textarea>
              </div>
              
              <div className="text-xs sm:text-sm text-stone-500 italic">
                <p>Fields marked with <span className="text-red-500">*</span> are required</p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-stone-700 text-cream-light px-4 sm:px-6 py-3 sm:py-4 rounded-md font-medium hover:bg-stone-800 transition-all duration-200 flex items-center justify-center transform hover:translate-y-[-2px] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''} text-sm sm:text-base`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Send Appointment Details
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <div className="bg-stone-700 text-cream-light rounded-lg shadow-md p-5 sm:p-8 mb-6 sm:mb-8 transform transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl sm:text-2xl font-serif font-semibold mb-4 sm:mb-6 flex items-center">
                <AtSign className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                Contact information
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start group">
                  <div className="bg-stone-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-stone-500 transition-colors duration-200">
                    <Phone className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-sm sm:text-base">Phone</h3>
                    <p className="text-base sm:text-lg">+44 7849 474199</p>
                    <p className="text-xs sm:text-sm text-cream-light/70 mt-1">Feel free to call or text me</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-stone-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-stone-500 transition-colors duration-200">
                    <Mail className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-sm sm:text-base">Email</h3>
                    <p className="text-base sm:text-lg break-all">lucy_hairbusiness@outlook.com</p>
                    <p className="text-xs sm:text-sm text-cream-light/70 mt-1">I'll respond as soon as possible</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-stone-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-stone-500 transition-colors duration-200">
                    <MapPin className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-sm sm:text-base">Location</h3>
                    <p className="text-sm sm:text-base">25A Dundas St</p>
                    <p className="text-sm sm:text-base">Edinburgh EH3 6QQ</p>
                    <p className="text-xs sm:text-sm text-cream-light/70 mt-1">Paid parking available</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-stone-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-stone-500 transition-colors duration-200">
                    <Dog className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-sm sm:text-base">Pet friendly</h3>
                    <p className="text-xs sm:text-sm text-cream-light/70">I welcome your furry friends! Feel free to bring your well behaved pets along to your appointment.</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-stone-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-stone-500 transition-colors duration-200">
                    <Clock className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-sm sm:text-base">Hours</h3>
                    <p className="text-sm sm:text-base">Friday: 9:00 AM - 7:00 PM</p>
                    <p className="text-sm sm:text-base">Saturday: 9:00 AM - 5:00 PM</p>
                    <p className="text-sm sm:text-base">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-cream rounded-lg shadow-md p-5 sm:p-8 transform transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-800  mb-4 sm:mb-6">Quick contact</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <a 
                  href="tel:+447849474199" 
                  className="flex items-center justify-center bg-stone-700 text-cream-light p-3 sm:p-4 rounded-md hover:bg-stone-800 transition-all duration-200 transform hover:translate-y-[-2px] text-sm sm:text-base"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                  <span>Call Me Now</span>
                </a>
                
                <a 
                  href="https://wa.me/447849474199" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center bg-green-600 text-white p-3 sm:p-4 rounded-md hover:bg-green-700 transition-all duration-200 transform hover:translate-y-[-2px] text-sm sm:text-base"
                >
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                  <span>WhatsApp</span>
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;