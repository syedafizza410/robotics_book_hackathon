import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import Chatbot from '../components/chatbot';
import { API } from '../utils/auth'; // <- auth utils

const chapters = [
  {
    title: "Chapter 1: Introduction to Physical AI",
    description: "Define Physical AI and distinguish it from traditional AI.",
    link: "/docs/chapters/ch1-introduction-to-physical-ai",
    image: "/img/chapter1.png",
    progress: 0,
  },
  {
    title: "Chapter 2: Fundamentals of Robotics (Kinematics & Dynamics)",
    description: "Understand kinematics, dynamics, and core robotics principles.",
    link: "/docs/chapters/ch2-robotics-fundamentals",
    image: "/img/chapter2.png",
    progress: 0,
  },
  {
    title: "Chapter 3: Actuators & Sensors",
    description: "Learn about actuators, sensors, and their roles in robotics.",
    link: "/docs/chapters/ch3-actuators-and-sensors",
    image: "/img/chapter3.png",
    progress: 0,
  },
  {
    title: "Chapter 4: Robot Mechanical Design",
    description: "Explore mechanical structures, joints, and design considerations.",
    link: "/docs/chapters/ch4-robot-mechanical-design",
    image: "/img/chapter4.png",
    progress: 0,
  },
  {
    title: "Chapter 5: Control Systems (PID + Advanced Control)",
    description: "Introduction to PID control and advanced control strategies.",
    link: "/docs/chapters/ch5-control-systems",
    image: "/img/chapter5.png",
    progress: 0,
  },
  {
    title: "Chapter 6: Embedded Systems & Electronics",
    description: "Study microcontrollers, circuits, and embedded robotics systems.",
    link: "/docs/chapters/ch6-embedded-systems",
    image: "/img/chapter6.png",
    progress: 0,
  },
  {
    title: "Chapter 7: Software Architecture & ROS",
    description: "Understand software frameworks, ROS, and robot programming.",
    link: "/docs/chapters/ch7-software-and-ros",
    image: "/img/chapter7.png",
    progress: 0,
  },
  {
    title: "Chapter 8: Robot Perception (Computer Vision, SLAM, Sensors Fusion)",
    description: "Learn perception, mapping, and sensor fusion techniques.",
    link: "/docs/chapters/ch8-perception-computer-vision-slam",
    image: "/img/chapter8.png",
    progress: 0,
  },
  {
    title: "Chapter 9: AI for Motion Planning & Decision Making",
    description: "Explore AI algorithms for planning and decision-making in robots.",
    link: "/docs/chapters/ch9-ai-motion-planning",
    image: "/img/chapter9.png",
    progress: 0,
  },
  {
    title: "Chapter 10: Humanoid Robotics (Biped Locomotion, Balance)",
    description: "Dive into humanoid robot design, walking, and balancing.",
    link: "/docs/chapters/ch10-humanoid-robotics",
    image: "/img/chapter10.png",
    progress: 0,
  },
  {
    title: "Chapter 11: Human–Robot Interaction",
    description: "Study HRI principles, user interfaces, and interaction models.",
    link: "/docs/chapters/ch11-human-robot-interaction",
    image: "/img/chapter11.png",
    progress: 0,
  },
  {
    title: "Chapter 12: Case Studies of Existing Humanoids",
    description: "Review real-world humanoid robots and their applications.",
    link: "/docs/chapters/ch12-humanoid-case-studies",
    image: "/img/chapter12.png",
    progress: 0,
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1">{siteConfig.title}</Heading>
        <p>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const scrollRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // check if user is logged in
    fetch(`${API}/auth/me`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));

    const bars = document.querySelectorAll(`.${styles.progressBarFill}`);
    bars.forEach((bar, idx) => {
      setTimeout(() => {
        bar.style.width = chapters[idx].progress + '%';
      }, 500 + idx * 200);
    });
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleCardClick = (link) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    window.location.href = link;
  };

  return (
    <Layout title="AI & Humanite Robotics">
      <HomepageHeader />
      <main className={styles.cardsContainer}>

        <button className={styles.arrowLeft} onClick={() => scroll('left')}>◀</button>

        <div className={styles.scrollContainer} ref={scrollRef}>
          {chapters.map((chapter, idx) => (
            <div
              key={idx}
              className={styles.card}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(chapter.link)}
            >
              <img src={chapter.image} alt={chapter.title} />
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
              <div className={styles.progressBarContainer}>
                <div className={styles.progressBarFill} style={{ width: `${chapter.progress}%` }} />
              </div>
            </div>
          ))}
        </div>

        <button className={styles.arrowRight} onClick={() => scroll('right')}>►</button>
      </main>

      <div>
        <Chatbot />
      </div>
    </Layout>
  );
}
