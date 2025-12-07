/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'index', // Home page
    {
      type: 'category',
      label: 'Chapters',
      items: [
        'chapters/ch1-introduction-to-physical-ai',
        'chapters/ch2-robotics-fundamentals',
        'chapters/ch3-actuators-and-sensors',
        'chapters/ch4-robot-mechanical-design',
        'chapters/ch5-control-systems',
        'chapters/ch6-embedded-systems',
        'chapters/ch7-software-and-ros',
        'chapters/ch8-perception-computer-vision-slam',
        'chapters/ch9-ai-motion-planning',
        'chapters/ch10-humanoid-robotics',
        'chapters/ch11-human-robot-interaction',
        'chapters/ch12-humanoid-case-studies',
      ],
    },
  ],
};

module.exports = sidebars;
