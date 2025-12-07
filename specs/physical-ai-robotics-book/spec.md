# Physical AI & Humanoid Robotics Book Specification

## Goal
Create a 15-chapter technical book on Physical AI & Humanoid Robotics.

## Audience
Advanced undergraduates, graduate students, robotics learners.

## Deliverables
- 15 chapters in MDX format
- Docusaurus website containing the full book
- Diagrams placeholders included within each chapter

## High-Level Structure

### Chapter List
1.  **Introduction to Physical AI**
2.  **Fundamentals of Robotics (Kinematics & Dynamics)**
3.  **Actuators & Sensors**
4.  **Robot Mechanical Design**
5.  **Control Systems (PID + advanced control)**
6.  **Embedded Systems & Electronics**
7.  **Software Architecture & ROS**
8.  **Robot Perception (CV, SLAM, sensors fusion)**
9.  **AI for Motion Planning & Decision Making**
10. **Humanoid Robotics (biped locomotion, balance)**
11. **Human–Robot Interaction**
12. **Case Studies of Existing Humanoids**
13. **Build Your Own Humanoid Robot (practical)**
14. **Future of Physical AI & Robotics**
15. **Glossary, References, Research Path**

## Success Criteria
- All chapters readable independently
- Each chapter minimum 800–1500 words
- Docusaurus website builds without error
- Clear navigation + search functionality on the Docusaurus website

## Project Constitution Adherence
This specification adheres to the project constitution outlined in `.specify/memory/constitution.md`:

**Writing Style Rules:**
- Clear technical writing, advanced student level
- Short paragraphs, diagrams placeholders allowed
- All chapters in Markdown/MDX
- Consistent terminology (Actuator, Joint, Kinematics, ROS, etc.)
- All images stored in /static/img folder
- Code blocks always fenced (```)

**Documentation Structure Rules:**
- Each chapter in /docs/chapters/chX-title.md
- Book home page: /docs/index.md
- Sidebar auto-generated via sidebars.js
- Versioning optional but supported
- Each chapter begins with “Learning Outcomes”

**File Naming Rules:**
- kebab-case (e.g., humanoid-locomotion.md)
- No spaces, no capitals

**Content Quality Rules:**
- Each chapter must contain:
  - Introduction
  - Core Concepts
  - Real-world Examples
  - Diagrams (placeholder)
  - Summary

**Collaboration Rules:**
- AI generates drafts, human reviews
- No chapter is final without human approval