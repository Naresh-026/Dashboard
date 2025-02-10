'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CameraIcon, PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function ProfileSection() {
  const [profileImage, setProfileImage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('profileImage') || '/images/default-avatar.png';
    }
    return '/images/default-avatar.png';
  });
  const [name, setName] = useState(() => localStorage.getItem('userName') || 'Your Name');
  const [username, setUsername] = useState(() => localStorage.getItem('userHandle') || '@username');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('profileImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userHandle', username);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="relative group w-32 h-32">
        <div className="profile-ring rounded-full overflow-hidden w-full h-full">
          <Image
            src={profileImage}
            alt="Profile"
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 flex items-center justify-center bg-black/50 
            opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
        >
          <CameraIcon className="w-8 h-8 text-white" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {isEditing ? (
        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-lg font-semibold text-center bg-transparent border-b border-gray-300 
              dark:border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-sm text-center bg-transparent border-b border-gray-300 
              dark:border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSave}
            className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-full"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="text-center group relative">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {username}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
              transition-opacity duration-200"
          >
            <PencilIcon className="w-4 h-4 text-blue-500" />
          </button>
        </div>
      )}
    </div>
  );
} 