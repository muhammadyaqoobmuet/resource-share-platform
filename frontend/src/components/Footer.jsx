
import { GlareCard } from "./ui/GlareCard";

const Footer = () => {
    return (
        // <footer className="bg-[#333333] text-gray-300 py-8  tracking-widest  rounded-t-2xl ">
        //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        //             {/* About Section */}
        //             <div>
        //                 <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
        //                 <p className="text-sm text-gray-400">
        //                     A platform to connect students, share resources, and exchange
        //                     knowledge for empowered learning and collaboration.
        //                 </p>
        //             </div>

        //             {/* Quick Links */}
        //             <div>
        //                 <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
        //                 <ul className="space-y-2 text-sm">
        //                     <li>
        //                         <a href="/" className="hover:text-white transition">
        //                             Home
        //                         </a>
        //                     </li>
        //                     <li>
        //                         <a href="/dashboard" className="hover:text-white transition">
        //                             Resources
        //                         </a>
        //                     </li>


        //                 </ul>
        //             </div>

        //             {/* Contact Section */}
        //             <div>
        //                 <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
        //                 <ul className="space-y-2 text-sm">
        //                     <li>
        //                         Email:{" "}
        //                         <a
        //                             href="mailto:support@example.com"
        //                             className="hover:text-white transition"
        //                         >
        //                             yaqoobahmed45700@gmail.com
        //                         </a>
        //                     </li>
        //                     <li>
        //                         Phone:{" "}
        //                         <a
        //                             href="tel:+1234567890"
        //                             className="hover:text-white transition"
        //                         >
        //                             will share soon
        //                         </a>
        //                     </li>
        //                 </ul>
        //             </div>

        //             {/* Social Media */}
        //             <div>
        //                 <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
        //                 <div className="flex space-x-4">
        //                     <a href="/" className="hover:text-white transition">
        //                         <svg
        //                             xmlns="http://www.w3.org/2000/svg"
        //                             className="h-5 w-5"
        //                             viewBox="0 0 24 24"
        //                             fill="currentColor"
        //                         >
        //                             <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.012 3.676 9.128 8.438 9.88v-6.986H7.914v-2.894h2.524V9.74c0-2.5 1.492-3.89 3.773-3.89 1.094 0 2.238.197 2.238.197v2.462h-1.26c-1.243 0-1.63.772-1.63 1.561v1.872h2.773l-.443 2.894h-2.33v6.986C18.324 21.128 22 17.012 22 12z" />
        //                         </svg>
        //                     </a>

        //                 </div>
        //             </div>
        //         </div>
        //         <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        //             © 2024 ResourceShare. All rights reserved.
        //         </div>
        //     </div>
        // </footer>

       
            <footer className="bg-[#0a0a0a] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
                        {/* Branding Column */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    CampusHub
                                </span>
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Empowering student communities through shared knowledge and resources.
                            </p>
                            
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h3>
                            <nav className="space-y-2">
                                {['Blog', 'Documentation', 'Help Center', 'Community'].map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="group-hover:text-purple-400 transition-colors">↳</span>
                                        {link}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Legal */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
                            <nav className="space-y-2">
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Licenses'].map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="text-neutral-400 hover:text-white text-sm transition-colors"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
                                <p className="text-sm text-neutral-400">
                                    Get platform updates, feature releases, and community news.
                                </p>
                            </div>

                            <form className="space-y-4">
                                <div className="relative group">
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-neutral-500"
                                    />
                                    <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity mix-blend-lighten">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg" />
                                    </div>
                                </div>

                                
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all rounded-lg"
                                    >
                                        Subscribe Now
                                    </button>
                                
                            </form>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/10 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-neutral-500 text-sm text-center">
                                © 2024 CampusHub. All rights reserved.
                            </p>
                            <div className="flex gap-6">
                                <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">
                                    Accessibility
                                </a>
                                <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">
                                    GDPR
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }


export default Footer;
