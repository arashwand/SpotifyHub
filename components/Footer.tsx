import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants'; // NAV_LINKS is fine from constants
import { Paths } from '../types'; // Paths should come from types

const Footer: React.FC = () => {
  return (
    <footer className="bg-medium-dark text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h5 className="text-lg font-vazir font-semibold text-white mb-4">اسپورتيفای هاب</h5>
            <p className="text-sm leading-relaxed">
              پلتفرم جامع شما برای کشف و رزرو امکانات ورزشی، کلاس‌های تناسب اندام و مربیان حرفه‌ای. به جامعه ورزشی ما بپیوندید!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-vazir font-semibold text-white mb-4">لینک‌های مفید</h5>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0,4).map((link) => ( // Show first 4 links
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
               <li><Link to={Paths.PROFILE} className="text-sm hover:text-white transition-colors">حساب کاربری</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-vazir font-semibold text-white mb-4">تماس با ما</h5>
            <ul className="space-y-2 text-sm">
              <li>ایمیل: <a href="mailto:info@sportifyhub.example.com" className="hover:text-white">info@sportifyhub.example.com</a></li>
              <li>تلفن: <a href="tel:+982100000000" className="hover:text-white">۰۲۱-۱۲۳۴۵۶۷۸</a></li>
              <li>آدرس: تهران، خیابان ورزش، پلاک ۱۰</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h5 className="text-lg font-vazir font-semibold text-white mb-4">ما را دنبال کنید</h5>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" aria-label="اینستاگرام" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="w-6 h-6" /></a>
              <a href="#" aria-label="تلگرام" className="text-gray-400 hover:text-white transition-colors"><TelegramIcon className="w-6 h-6" /></a>
              <a href="#" aria-label="لینکدین" className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} اسپورتيفای هاب. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Placeholder Social Icons
const InstagramIcon: React.FC<{className?: string}> = ({className}) => (<svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.073 0-3.386.01-4.577.065-2.502.115-3.467 1.1-3.58 3.58-.055 1.19-.065 1.499-.065 4.382s.01 3.191.065 4.381c.113 2.482 1.079 3.466 3.58 3.58.96.046 1.499.06 4.577.06s3.618-.014 4.577-.06c2.502-.114 3.467-1.098 3.58-3.58.055-1.19.065-1.499.065-4.381s-.01-3.191-.065-4.381c-.113-2.481-1.079-3.465-3.58-3.58C15.386 3.975 15.073 3.965 12 3.965zm0 2.88c-2.41 0-4.363 1.954-4.363 4.363s1.954 4.363 4.363 4.363 4.363-1.953 4.363-4.363S14.41 6.845 12 6.845zm0 7.126c-1.523 0-2.763-1.24-2.763-2.763s1.24-2.763 2.763-2.763 2.763 1.24 2.763 2.763-1.24 2.763-2.763 2.763zm4.965-7.336c-.76 0-1.376-.615-1.376-1.376s.616-1.376 1.376-1.376 1.376.616 1.376 1.376-.615 1.376-1.376 1.376z"/></svg>);
const TelegramIcon: React.FC<{className?: string}> = ({className}) => (<svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.665 3.717a1.032 1.032 0 00-1.25-.371L3.085 9.892c-1.039.431-1.028 1.63.011 2.051l3.87 1.481L18.423 6.94c.39-.27.758-.113.468.17L9.36 15.118l-.24 4.015c.42.023.633-.146.896-.403l2.002-1.936 4.032 2.958c.743.49 1.296.237 1.503-.635l2.842-13.448c.19-.902-.337-1.336-1.066-1.05z"/></svg>);
const LinkedInIcon: React.FC<{className?: string}> = ({className}) => (<svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>);

export default Footer;