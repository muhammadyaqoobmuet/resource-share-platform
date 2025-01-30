import React from "react";

const Select = ({ value, onValueChange, children, className = "", placeholder }) => {
    return (
        <select
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className={`w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                 text-gray-200 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                 outline-none appearance-none cursor-pointer ${className}`}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {children}
        </select>
    );
};

const SelectItem = ({ value, children, className = "" }) => {
    return (
        <option
            value={value}
            className={`bg-gray-800 text-gray-200 ${className}`}
        >
            {children}
        </option>
    );
};

export { Select, SelectItem }; 