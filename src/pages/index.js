import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import Chatbot from '../components/chatbot';

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
    link: "/docs/book/chapter-3",
    image: "/img/chapter3.png",
    progress: 0,
  },
  {
    title: "Chapter 4: Robot Mechanical Design",
    description: "Explore mechanical structures, joints, and design considerations.",
    link: "/docs/book/chapter-4",
    image: "/img/chapter4.png",
    progress: 0,
  },
  {
    title: "Chapter 5: Control Systems (PID + Advanced Control)",
    description: "Introduction to PID control and advanced control strategies.",
    link: "/docs/book/chapter-5",
    image: "/img/chapter5.png",
    progress: 0,
  },
  {
    title: "Chapter 6: Embedded Systems & Electronics",
    description: "Study microcontrollers, circuits, and embedded robotics systems.",
    link: "/docs/book/chapter-6",
    image: "/img/chapter6.png",
    progress: 0,
  },
  {
    title: "Chapter 7: Software Architecture & ROS",
    description: "Understand software frameworks, ROS, and robot programming.",
    link: "/docs/book/chapter-7",
    image: "/img/chapter7.png",
    progress: 0,
  },
  {
    title: "Chapter 8: Robot Perception (Computer Vision, SLAM, Sensors Fusion)",
    description: "Learn perception, mapping, and sensor fusion techniques.",
    link: "/docs/book/chapter-8",
    image: "/img/chapter8.png",
    progress: 0,
  },
  {
    title: "Chapter 9: AI for Motion Planning & Decision Making",
    description: "Explore AI algorithms for planning and decision-making in robots.",
    link: "/docs/book/chapter-9",
    image: "/img/chapter9.png",
    progress: 0,
  },
  {
    title: "Chapter 10: Humanoid Robotics (Biped Locomotion, Balance)",
    description: "Dive into humanoid robot design, walking, and balancing.",
    link: "/docs/book/chapter-10",
    image: "/img/chapter10.png",
    progress: 0,
  },
  {
    title: "Chapter 11: Human–Robot Interaction",
    description: "Study HRI principles, user interfaces, and interaction models.",
    link: "/docs/book/chapter-11",
    image: "/img/chapter11.png",
    progress: 0,
  },
  {
    title: "Chapter 12: Case Studies of Existing Humanoids",
    description: "Review real-world humanoid robots and their applications.",
    link: "/docs/book/chapter-12",
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

  // animate progress
  useEffect(() => {
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

  return (
    <Layout title="AI & Humanite Robotics">
      <HomepageHeader />
      <main className={styles.cardsContainer}>
        
        {/* LEFT EMOJI ARROW */}
        <button className={styles.arrowLeft} onClick={() => scroll('left')}>
          ◀
        </button>
        
        <div className={styles.scrollContainer} ref={scrollRef}>
          {chapters.map((chapter, idx) => (
            <Link to={chapter.link} key={idx} style={{ textDecoration: 'none' }}>
              <div className={styles.card}>
                <img src={chapter.image} alt={chapter.title} />
                <h3>{chapter.title}</h3>
                <p>{chapter.description}</p>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: `${chapter.progress}%` }} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* RIGHT EMOJI ARROW */}
        <button className={styles.arrowRight} onClick={() => scroll('right')}>
          ►
        </button>
      </main>

        <div>
        <Chatbot />
      </div>

    </Layout>
  );
}
