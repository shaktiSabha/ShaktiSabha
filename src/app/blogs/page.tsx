"use client"
import React, { useState } from 'react';

const BlogsPage: React.FC = () => {
  const [isShared, setIsShared] = useState<boolean>(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Our Mission - Shakti Sabha',
          text: 'Empowering Women to Rise, Lead, and Conquer',
          url: window.location.href,
        });
      } else {
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-rose-400 to-pink-600 mb-6">
            Blog & Media
          </h1>
          <p className="text-xl text-rose-100/80 max-w-3xl mx-auto">
            Discover stories of empowerment, knowledge, and transformation
          </p>
        </div>

        {/* Featured Article */}
        <article className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl 
          border border-rose-500/20 mb-16 hover:border-rose-500/30 
          transition-all duration-500 group">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 
              group-hover:text-rose-200 transition-colors duration-300">
              Our Mission: Empowering Women to Rise, Lead, and Conquer
            </h2>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-semibold text-rose-200 mb-4 flex items-center gap-2">
                  <span className="text-3xl" role="img" aria-label="sparkle">🌟</span>
                  Why We Exist: A Revolution for Women&apos;s Empowerment
                </h3>
                <div className="space-y-6 text-gray-200 leading-relaxed">
                  <p className="text-lg">
                    हमारा मिशन सिर्फ़ महिलाओं का उत्थान नहीं, बल्कि एक क्रांति है। हम एक ऐसा मंच बना रहे हैं 
                    जहाँ महिलाएँ न सिर्फ़ सीखें, बल्कि अपनी असली शक्ति को पहचाने, मानसिक और भावनात्मक रूप से 
                    सशक्त बने, और अपने जीवन को अपने नियमों पर जिएं।
                  </p>
                  <p className="text-lg">
                    यह केवल &quot;महिला सशक्तिकरण&quot; की बात नहीं है, यह एक आंदोलन है, जो महिलाओं को आत्मनिर्भर, 
                    आत्म-जागरूक और मानसिक रूप से शक्तिशाली बनाएगा।
                  </p>
                  <p className="text-lg">
                    हमारा समाज महिलाओं के मानसिक, भावनात्मक और बौद्धिक शोषण का गवाह रहा है। बचपन से ही उन्हें 
                    सीमाओं में बाँध दिया जाता है—&quot;ऐसे मत चलो, &quot;यह मत पहनो,&quot; &quot;यह करोगी तो लोग क्या कहेंगे?&quot;।
                  </p>
                  <p className="text-lg">
                    लेकिन हम इस सोच को चुनौती देने के लिए खड़े हैं। हम महिलाओं को वह मानसिक और भावनात्मक ताकत 
                    देना चाहते हैं, जिससे वे अपने फैसले खुद ले सकें, अपनी सीमाएँ खुद तय करें और अपनी शक्ति को पहचानें।
                  </p>
                </div>
              </section>
            </div>

            {/* Share and Read More Section */}
            <div className="mt-8 pt-8 border-t border-rose-500/20 flex justify-between items-center">
              <button 
                onClick={handleShare}
                className="px-6 py-2 bg-rose-500/10 text-rose-200 rounded-lg 
                  hover:bg-rose-500/20 transition-all duration-300 relative"
              >
                {isShared ? 'Copied!' : 'Share Article'}
              </button>
              <button 
                onClick={() => window.location.href = '/blog/mission-details'}
                className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-600 
                  text-white rounded-lg hover:from-rose-600 hover:to-pink-700 
                  transition-all duration-300"
              >
                Read More
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogsPage;