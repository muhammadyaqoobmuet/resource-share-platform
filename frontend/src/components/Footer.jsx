import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#171717] text-gray-300 py-8  tracking-widest   ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
                        <p className="text-sm text-gray-400">
                            A platform to connect students, share resources, and exchange
                            knowledge for empowered learning and collaboration.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition">
                                    Resources
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition">
                                    Knowledge Hub
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                Email:{" "}
                                <a
                                    href="mailto:support@example.com"
                                    className="hover:text-white transition"
                                >
                                    support@example.com
                                </a>
                            </li>
                            <li>
                                Phone:{" "}
                                <a
                                    href="tel:+1234567890"
                                    className="hover:text-white transition"
                                >
                                    +123 456 7890
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.012 3.676 9.128 8.438 9.88v-6.986H7.914v-2.894h2.524V9.74c0-2.5 1.492-3.89 3.773-3.89 1.094 0 2.238.197 2.238.197v2.462h-1.26c-1.243 0-1.63.772-1.63 1.561v1.872h2.773l-.443 2.894h-2.33v6.986C18.324 21.128 22 17.012 22 12z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-white transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M22 12.003c0-5.506-4.486-10-10-10C6.488 2.003 2 6.497 2 12.003c0 4.991 3.657 9.13 8.438 9.88v-6.986h-2.54v-2.894h2.54V9.74c0-2.504 1.492-3.894 3.773-3.894 1.094 0 2.238.197 2.238.197v2.462h-1.26c-1.243 0-1.63.772-1.63 1.561v1.872h2.773l-.443 2.894h-2.33v6.986c4.781-.75 8.438-4.889 8.438-9.88z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                    © 2024 ResourceShare. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
