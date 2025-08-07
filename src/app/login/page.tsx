"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


import { Eye, EyeOff } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Enhanced Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-white relative overflow-hidden">  
        {/* Decorative elements */}
        <div className="absolute -top-28 -left-28 w-64 h-64 rounded-full bg-primary bg-opacity-10"></div>

        <div className="w-full max-w-md z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-primary mb-3">
              Admin Dashboard
            </h1>
            <p className="text-secondary text-lg">Sign in to continue</p>
          </div>

          <form className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-primary" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-primary" />
                  )}
                </button>
              </div>
            </div>

           <div>
          <Link href="/dashboard">
            <button
              type="button"
              className={`cursor-pointer w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-md text-lg font-medium text-white ${
                isHovered ? 'bg-secondary' : 'bg-primary'
              } transition-all duration-300`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Sign in
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
        </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2  bg-secondary flex items-center justify-center relative overflow-hidden">
        {/* Decorative elements for right side */}
             <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-white bg-opacity-10"></div>
        
        <div className="text-center p-12 z-10">
          <div className="mb-8">
            <div className="w-32 h-32 bg-white border-2 border-white rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
              <Image
                src="/logo.png"
                alt="Logo"
                width={128}
                height={128}
                className="object-contain p-2"
              />
            </div>
            <h2 className="text-4xl font-bold text-whit text-white mb-2">Welcome Back</h2>
            <p className="text-whit text-white text-lg opacity-90">
              Manage your mosques and visitors efficiently
            </p>
          </div>
          <div className="w-full max-w-md mx-auto h-60 relative rounded-xl overflow-hidden ">
            <Image
              src="/loginPng.png"
              alt="Login Illustration"
             fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}