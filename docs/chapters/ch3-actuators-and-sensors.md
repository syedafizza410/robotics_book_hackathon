---
id: ch3-actuators-and-sensors
title: Chapter 3 - Actuators & Sensors
---

# Chapter 3: Actuators & Sensors

## Learning Outcomes
Upon completing this chapter, you will be able to:
*   Identify different types of actuators and their applications in robotics.
*   Understand the working principles of common robotic sensors.
*   Select appropriate actuators and sensors for specific robotic tasks.
*   Analyze the characteristics and limitations of various robotic transducers.

## Introduction
Actuators and sensors are the muscles and senses of a robot, respectively. Actuators enable robots to move and interact with the physical world by converting energy into mechanical force, while sensors allow robots to perceive their environment by converting physical phenomena into measurable electrical signals. This chapter will delve into the diverse world of these essential robotic components, explaining their operating principles, characteristics, and practical considerations for their selection and integration in Physical AI systems.

## Core Concepts

### Actuators
Actuators are devices that convert a control signal (often electrical) into mechanical motion. They are responsible for a robot's ability to perform physical tasks.

#### Electric Motors
*   **DC Motors:** Simple, robust, and widely used for continuous rotation. Brushed and brushless (BLDC) variants.
*   **Stepper Motors:** Provide precise angular positioning without feedback, ideal for open-loop control.
*   **Servo Motors:** DC motors combined with a gearbox and a feedback control loop for precise position control.

#### Hydraulic & Pneumatic Actuators
*   **Hydraulic:** Use incompressible fluid to generate high forces, common in heavy-duty applications.
*   **Pneumatic:** Use compressed air, typically for simple ON/OFF movements, faster and cleaner than hydraulics but lower force.

#### Other Actuators
*   **Piezoelectric Actuators:** Generate small, precise movements with high force, often used in micro-robotics.
*   **Shape Memory Alloys (SMAs):** Materials that change shape upon heating, offering compact, lightweight actuation.

### Sensors
Sensors are devices that detect events or changes in their environment and send the information to the robot's control system.

#### Proprioceptive Sensors
These sensors provide information about the robot's internal state.
*   **Encoders:** Measure angular position or velocity (rotary) and linear position (linear).
*   **Potentiometers:** Measure linear or angular displacement.
*   **Force/Torque Sensors:** Measure forces and torques applied at joints or end-effectors.
*   **IMUs (Inertial Measurement Units):** Combine accelerometers, gyroscopes, and magnetometers to measure orientation and acceleration.

#### Exteroceptive Sensors
These sensors provide information about the robot's external environment.
*   **Range Sensors:**
    *   **Lidar:** Uses laser pulses to measure distances and create 3D maps.
    *   **Sonar:** Uses sound waves to detect objects and measure distances.
    *   **Infrared (IR) Sensors:** Detect presence/absence of objects and measure short distances.
*   **Vision Sensors:**
    *   **Cameras (2D/3D):** Capture visual information for object recognition, navigation, and mapping. Stereo cameras and depth cameras (e.g., structured light, time-of-flight) provide 3D data.
*   **Contact Sensors:**
    *   **Tactile Sensors:** Detect physical contact and pressure.
    *   **Bump Sensors:** Simple switches to detect collisions.

## Real-world Examples
*   **Humanoid Robot Joints:** Often use high-torque servo motors combined with encoders for precise and strong movements.
*   **Autonomous Driving:** Lidar and cameras are critical for perceiving the road, obstacles, and other vehicles.
*   **Robotic Grippers:** Integrate force/torque sensors and tactile sensors to grasp objects with appropriate force without damaging them.
*   **Industrial Robots:** Employ a variety of sensors for safety (e.g., proximity sensors) and precision (e.g., vision systems for part inspection).

## Diagrams

![diagram-placeholder](../../static/img/placeholder.png)
*Figure 3.1: Overview of different actuator types and their working principles.*

![diagram-placeholder](../../static/img/placeholder.png)
*Figure 3.2: Classification of robotic sensors based on their function.*

## Summary
Actuators and sensors are fundamental to the operation of any physical AI system, acting as the bridge between the robot's intelligence and its interaction with the real world. This chapter explored various types of actuators, including electric motors, hydraulics, and pneumatics, highlighting their unique strengths and applications. We also delved into the realm of sensors, categorizing them into proprioceptive (internal state) and exteroceptive (external environment) types, such as encoders, IMUs, lidar, cameras, and force sensors. The judicious selection and integration of these components are paramount for building effective and capable robotic systems.
