"use client"

import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  instructor: string;
  level: string;
  thumbnail: string;
  features: string[];
}

const martialArtsCourses: Course[] = [
  {
    id: 'ma-101',
    title: 'Self-Defense Fundamentals',
    description: 'Master the basics of personal protection and build confidence',
    duration: '8 weeks',
    price: 2999,
    instructor: 'Master Priya Singh',
    level: 'Beginner',
    thumbnail: '/Courses/selfdefence.jpeg',
    features: [
      'Basic striking techniques',
      'Escape maneuvers',
      'Situational awareness training',
      'Weekly live sessions',
      'Practice materials'
    ]
  },
  {
    id: 'ma-102',
    title: 'Advanced Combat Training',
    description: 'Take your self-defense skills to the next level',
    duration: '12 weeks',
    price: 4999,
    instructor: 'Sensei Ritu Sharma',
    level: 'Intermediate',
    thumbnail: '/courses/advanced-combat.jpg',
    features: [
      'Advanced striking combinations',
      'Ground defense techniques',
      'Weapon defense basics',
      'Bi-weekly sparring sessions',
      'Certification upon completion'
    ]
  },
  {
    id: 'ma-103',
    title: 'ध्यान योग और मार्शल आर्ट्स',
    description: 'Combine ancient Dhyan Yoga practices with modern martial arts',
    duration: '10 weeks',
    price: 3999,
    instructor: 'Guru Meera Devi',
    level: 'Intermediate',
    thumbnail: '/courses/kundalini-martial.jpg',
    features: [
      'Energy channeling techniques',
      'Advanced breathing methods',
      'Spiritual self-defense',
      'Weekly meditation sessions',
      'Ancient warrior wisdom'
    ]
  },
  {
    id: 'ma-104',
    title: 'Kalaripayattu Training',
    description: 'Learn the ancient Indian martial art form of Kalaripayattu',
    duration: '8 weeks',
    price: 3499,
    instructor: 'Guru Arjun Menon',
    level: 'All Levels',
    thumbnail: '/courses/kalaripayattu.jpg',
    features: [
      'Traditional Kalaripayattu techniques',
      'Weapon training basics',
      'Flexibility and agility exercises',
      'Meditative movements',
      'Cultural and historical insights'
    ]
  },
  {
    id: 'ma-105',
    title: 'Urban Self-Defense Mastery',
    description: 'Real-world self-defense techniques for urban environments',
    duration: '6 weeks',
    price: 2499,
    instructor: 'Captain Neha Sharma',
    level: 'Beginner',
    thumbnail: '/courses/urban-defense.jpg',
    features: [
      'Practical defense scenarios',
      'Quick response training',
      'Everyday object defense',
      'Group attack prevention',
      'Emergency protocols'
    ]
  }
];

const upcomingCourses: Course[] = [
  {
    id: 'uc-101',
    title: 'Mission Mardini: Mental Resilience Training',
    description: 'Combine psychological strength with physical techniques',
    duration: '10 weeks',
    price: 3499,
    instructor: 'Dr. Maya Patel',
    level: 'All Levels',
    thumbnail: '/courses/mental-resilience.jpg',
    features: [
      'Mind-body connection',
      'Stress management techniques',
      'Combat psychology',
      'Meditation practices',
      'Personal development modules'
    ]
  },
  {
    id: 'uc-102',
    title: 'वीरांगना: The Warrior Women Program',
    description: 'Complete transformation program combining martial arts, yoga, and leadership',
    duration: '16 weeks',
    price: 5999,
    instructor: 'Team Shakti Sabha',
    level: 'All Levels',
    thumbnail: '/courses/virangana.jpg',
    features: [
      'Traditional martial arts',
      'Leadership development',
      'Spiritual growth',
      'Physical conditioning',
      'Community building'
    ]
  },
  {
    id: 'uc-103',
    title: 'Digital Age Self Protection',
    description: 'Modern self-defense including cyber security and social awareness',
    duration: '8 weeks',
    price: 2999,
    instructor: 'Dr. Radhika Kumar',
    level: 'Beginner',
    thumbnail: '/selfdefence.jpeg',
    features: [
      'Cyber security basics',
      'Social media safety',
      'Digital privacy',
      'Online threat assessment',
      'Emergency response'
    ]
  }
];

const OnlineCoursesPage = () => {
  

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-red-400 to-pink-600 mb-6">
            Online Courses
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform yourself with our professional online training programs
          </p>
        </div>

        {/* Martial Arts Courses */}
        <section className="mb-20">
          <h2 className="text-3xl text-center font-bold text-red-300 mb-8">
            Martial Arts Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {martialArtsCourses.map((course) => (
              <div key={course.id} className="bg-white/10 backdrop-blur-lg rounded-xl 
                overflow-hidden border border-red-500/20 hover:border-red-500/40 
                transition-all duration-300 group">
                <div className="relative h-48">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {course.title}
                    </h3>
                    <span className="px-3 py-1 bg-red-500/20 text-red-300 
                      rounded-full text-sm">
                      {course.level}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{course.description}</p>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Duration: {course.duration}</span>
                      {/* <span>Price: ₹{course.price}</span> */}
                    </div>
                    <ul className="space-y-2">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-300">
                          <span className="mr-2">✦</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-red-500 
                      to-pink-600 text-white rounded-lg hover:from-red-600 
                      hover:to-pink-700 transition-all duration-300 transform 
                      hover:scale-[1.02]">
                      Comming Soon..!
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Courses */}
        <section>
          <h2 className="text-3xl font-bold text-red-300 mb-8">
            Upcoming Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingCourses.map((course) => (
              <div key={course.id} className="bg-white/10 backdrop-blur-lg rounded-xl 
                overflow-hidden border border-pink-500/20 hover:border-pink-500/40 
                transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{course.description}</p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>Coming Soon</p>
                    <p>Expected Duration: {course.duration}</p>
                  </div>
                  <button className="mt-4 w-full py-2 px-4 bg-pink-500/20 text-pink-300 
                    rounded-lg hover:bg-pink-500/30 transition-all duration-300">
                    Comming Soon..!
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OnlineCoursesPage;