import React from 'react';
import { MessageCircle, Facebook, MapPin, Send } from 'lucide-react';
import { t } from '../lib/i18n';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 pb-16 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Contact Information */}
              <div className="bg-primary-600 text-white p-8 md:w-1/2">
                <h2 className="text-2xl font-bold mb-6">
                  {t('contact.title')}
                </h2>
                <p className="mb-8 opacity-90">
                  {t('contact.subtitle')}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MessageCircle className="w-6 h-6 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{t('contact.whatsApp')}</h3>
                      <a
                        href="https://wa.me/237683998930"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-90 hover:opacity-100 transition-opacity underline"
                      >
                        +237 683 998 930
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Facebook className="w-6 h-6 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{t('contact.facebook')}</h3>
                      <a
                        href="https://facebook.com/UmmulUmar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-90 hover:opacity-100 transition-opacity underline"
                      >
                        Ummul Umar
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <svg className="w-6 h-6 mt-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <div>
                      <h3 className="font-semibold text-lg">{t('contact.tiktok')}</h3>
                      <a
                        href="https://tiktok.com/@ummie45"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-90 hover:opacity-100 transition-opacity underline"
                      >
                        ummie45
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{t('contact.location')}</h3>
                      <p className="opacity-90">
                        {t('contact.locationDetail')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map and Direct Message */}
              <div className="p-8 md:w-1/2">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('contact.location')}
                </h2>
                
                <div className="mb-8 aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.630425684095!2d9.751417048029!3d4.050648341279258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128e0249e2b9%3A0xd948d018f864075b!2sKm%205%2C%20Douala%2C%20Cameroon!5e0!3m2!1sen!2s!4v1693513898056!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="Ummi's Collection Location"
                  ></iframe>
                </div>

                <div>
                  <a 
                    href="https://wa.me/237683998930" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('products.orderViaWhatsApp')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;