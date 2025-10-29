import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Logo from "../assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <img src={Logo} alt="Shell Entertainment" className="w-10 h-10 rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-mobile-base md:text-lg font-heading">Shell Entertainment</h3>
                <p className="text-mobile-xs md:text-xs text-blue-600 dark:text-blue-400 font-body">MSME Verified</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-mobile-xs md:text-sm leading-relaxed font-body">
              Shell Entertainment empowers creators, learners, and dreamers to grow through creativity and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white text-mobile-sm md:text-base font-heading">Quick Links</h4>
            <ul className="space-y-2 text-mobile-xs md:text-sm text-gray-600 dark:text-gray-300 font-body">
              <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</a></li>
              <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white text-mobile-sm md:text-base font-heading">Services</h4>
            <ul className="space-y-2 text-mobile-xs md:text-sm text-gray-600 dark:text-gray-300 font-body">
              <li>Social Media Strategy</li>
              <li>Digital Marketing</li>
              <li>Graphic Designing</li>
              <li>Influencer Management</li>
              <li>Branding & Campaigns</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white text-mobile-sm md:text-base font-heading">Contact</h4>
            <div className="space-y-3 text-mobile-xs md:text-sm text-gray-600 dark:text-gray-300 font-body">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <a href="mailto:shellentertainment30@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  shellentertainment30@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <a href="tel:+918003570024" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  +91 8003570024
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { icon: Instagram, url: "#", label: "Instagram" },
            { icon: Youtube, url: "#", label: "YouTube" },
            { icon: Linkedin, url: "#", label: "LinkedIn" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all group"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <p className="text-mobile-xs md:text-sm text-gray-500 dark:text-gray-400 font-body">
              © {currentYear} Shell Entertainment. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918003570024?text=Hi%20Shell%20Entertainment%20Team!%20I%20want%20to%20know%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all z-50 animate-float"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-white"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;