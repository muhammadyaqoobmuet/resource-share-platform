import { GlareCard } from "./ui/GlareCard";

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
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

                    {/* Developers Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Developers</h3>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <a
                                    href="https://www.linkedin.com/in/muhammad-yaqoob-59971625b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                                >
                                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    <div>
                                        <div className="font-medium">Muhammad Yaqoob</div>
                                        <div className="text-xs text-neutral-500">Frontend Developer</div>
                                    </div>
                                </a>
                            </div>
                            <div className="space-y-1">
                                <a
                                    href="https://www.linkedin.com/in/muzammilodho/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                                >
                                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    <div>
                                        <div className="font-medium">Muzamil Odho</div>
                                        <div className="text-xs text-neutral-500">Backend Developer</div>
                                    </div>
                                </a>
                            </div>
                        </div>
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