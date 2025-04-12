import React from "react";
import { useAuth } from "./AuthContext";

const Videos = () => {
  const { user } = useAuth();

  // Free videos for all users
  const freeVideos = [
    {
      id: 1,
      title: "إنعاش القلب الرئوي (CPR)",
      youtubeId: "ye3IJWHaVEo",
      description:
        "تعلم التقنيات الأساسية لإنعاش القلب الرئوي في حالات الطوارئ",
    },
    {
      id: 2,
      title: "كيفية التعامل مع الجروح",
      youtubeId: "YOUTUBE_ID_2", // Replace with your second video ID
      description: "طرق التعامل مع مختلف أنواع الجروح",
    },
  ];

  // Premium videos for paid users
  const premiumVideos = [
    {
      id: 3,
      title: "التعامل مع الحروق الخطيرة",
      youtubeId: "YOUTUBE_ID_3", // Replace with actual YouTube ID
      description: "إجراءات التعامل مع الحروق من الدرجة الثانية والثالثة",
    },
  ];

  return (
    <div className="videos-page" style={{ direction: "rtl" }}>
      <h1 className="page-title">فيديوهات الإسعافات الأولية</h1>

      <div className="video-section">
        <h2 className="section-title">الفيديوهات المجانية</h2>
        <div className="videos-grid">
          {freeVideos.map((video) => (
            <div key={video.id} className="video-card">
              <h3>{video.title}</h3>
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="video-description">{video.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ... rest of the component remains the same ... */}
    </div>
  );
};

export default Videos;
