import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import ShinyText from '../components/FooterCom/ShinyText';
import Logo from '../assets/images/logo.png'
import KILogo from '../assets/images/KI.png'
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16"
        >
          {/* LEFT COLUMN: BRANDING */}
          <div className="flex flex-col space-y-8">
            <div className="flex items-center gap-6">
              <Link to='https://kumaraguru.in/'>
                <img src={KILogo} alt="KI Logo" className="h-12 w-auto object-contain" />
              </Link>
              

              <div className="h-10 w-[1px] bg-white/20" /> {/* Vertical Divider */}
              <img src={Logo} alt="React Logo" className="h-10 w-22 object-contain" />
            </div>

            <div className="max-w-md">
              <ShinyText
                text="Real-world Engineering & Application for Collaborative Transformation."
                speed={2}
                color="#b5b5b5"
                shineColor="#ffffff"
                spread={120}
              />
            </div>

            <div className="text-gray-400 text-sm space-y-1">
              <p>Email: <span className="text-white">react@kct.ac.in</span></p>
              <p>Phone: <span className="text-white">+91 93856 95977</span></p>
            </div>
          </div>

          {/* RIGHT COLUMN: LINKS & SOCIAL BOX */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 bg-white/5 p-8 rounded-2xl border border-white/10">
            {/* NAVIGATION */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Explore</h4>
              <ul className="space-y-3 text-gray-400">
                  {[
                    { name: "About", path: "/about" },
                    { name: "People", path: "/people" },
                    { name: "Programmes", path: "/programmes-&-projects" },
                    { name: "Why India?", path: "/why-india?" },
                    { name: "Explore Us", path: "/explore-us" },
                    { name: "Work With Us", path: "/work" },
                    { name: "Contact", path: "/contact" },
                  ].map((item) => (
                    <li key={item.name} className="text-sm">
                      <Link
                        to={item.path}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

            </div>

            {/* SOCIAL MEDIA */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Follow the Journey</h4>
              <div className="flex gap-4 mb-6">
                <a href="https://www.linkedin.com/company/react-ki/posts/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <FaLinkedinIn size={18} />
                </a>
                <a href="https://www.instagram.com/react.tribe/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <FaInstagram size={18} />
                </a>
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-widest">
                @react.tribe
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* BOTTOM BAR: LOGO SET 2 */}

          
          <div className="text-gray-500 text-xs text-center p-10 ">
            © 2026 <span className="text-white font-medium  ">REACT</span> Kumaraguru Institutions. 
            <span className="ml-2">All rights reserved.</span>
          </div>

      </div>
    </footer>
  );
};

export default Footer;