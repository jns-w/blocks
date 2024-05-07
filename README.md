# Blocks: The Real-time Timer App for Focused Flow

Github: [https://github.com/jns-w/blocks](https://github.com/jns-w/blocks)\
Demo site: [https://blocks.jonaswong.dev](https://blocks.jonaswong.dev)\

![](https://res.cloudinary.com/ds1s8ilcc/image/upload/v1706939451/Devsite/blocks/Blocks-main_x9qoss.png)

> #### Frontend Stack:
>
> - React, Nextjs
> - Styled-components
> - Jotai
>
> #### Backend Stack:
>
> - Nodejs
> - Express
> - MongoDB
> - JWT
>
> #### Real-time stack:
>
> - Socket.IO

In today's world, where countless corporations and people are vying for our attention, staying focused on our work can be a daunting task. That's why having a reliable time-tracking tool at our disposal is crucial to keep track of our focused hours and monitor our daily progress.

While the market offers numerous time-tracking apps, I realized that very few of them, especially the free-to-use ones, offer real-time multi-device features. Consequently, I decided to create my own solution: Blocks.

## Goals

The primary goal of this project is straightforward: to develop a time-tracker app that can track activities categorized into projects, provide an overview of how you've spent your time so far, and enable real-time synchronization across multiple devices and browsers. With Blocks, you can seamlessly move away from your computer and continue tracking your time on your mobile devices.

## Socket.IO

To implement the real-time feature of the app, I chose to use [Socket.IO](https://socket.io), a well-developed, well-documented library with a large community of users. Socket.IO ensures seamless communication between the client and server, enabling real-time updates and synchronization across multiple devices.

## Key Features

Timer Input and Project Management
With Blocks, you can easily create and manage projects, as well as start and stop timers for specific tasks. The intuitive interface allows you to effortlessly switch between projects and track your time accurately.

## Real-time Overview

Blocks provides a comprehensive overview of how you've spent your time, updated in real-time. This feature ensures that you always have access to the latest data, regardless of the device you're using.

Thank you for reading, if you'd like to see more of my projects, check out [NotGPT](https://github.com/jns-w/notgpt) to see my implementation of Google Search's autocompletion feature, done in Rustlang.
