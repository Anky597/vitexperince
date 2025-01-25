"use client"
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative h-10 w-10 flex items-center justify-center bg-white rounded-lg shadow-md">
        <div className="text-black font-bold text-xl tracking-tighter">
          VIT
        </div>
        <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
          <div className="h-3 w-3 border-2 border-white rounded-sm transform rotate-45"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-white leading-tight">
          VIT Interview
        </span>
        <span className="text-lg text-blue-400 font-semibold leading-tight">
          Experiences
        </span>
      </div>
    </div>
  );
};

export default Logo;

