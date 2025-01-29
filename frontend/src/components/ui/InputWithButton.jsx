import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"

export function InputWithButton() {

    const [state, setState] = useState('')

    const handleSubmit = () => {
        if (state) {

            toast.success("create account and explore 🎉🎉")
        }
        setState("")
    }
    return (
        <div className="w-full flex  flex-col max-w-[60%] ">
            <div className="relative flex items-start">
                {/* Email Input */}
                <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    type="email"
                    autoFocus={false}
                    placeholder="Enter your email"
                    className="w-full h-12 pl-6 pr-36 
                             text-gray-900 placeholder:text-gray-500
                             bg-white/90 backdrop-blur-sm
                             border-2 border-gray-200/80
                             rounded-full outline-none
                             focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20
                             transition-all duration-300 ease-in-out
                             shadow-sm hover:shadow-md"
                />

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2
                             h-9 px-5
                             bg-gradient-to-r from-[#272E3F] to-blue-700
                             text-white font-medium text-sm
                             rounded-full
                             transition-all duration-300 ease-in-out
                             hover:shadow-lg hover:scale-[1.02]
                             active:scale-[0.98]
                             disabled:opacity-70 disabled:cursor-not-allowed
                             flex items-center gap-2"
                >
                    Get Started
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-3 px-2">
                <div className="flex items-center gap-1.5">
                    <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="text-sm text-gray-600">Free forever</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="text-sm text-gray-600">No credit card</span>
                </div>
            </div>
        </div>
    )
}
