---
title: Setting up a Personal Website with Hugo
description: ""
date: 2025-06-19T16:52:25.355Z
preview: ""
draft: false
tags: []
categories: []
---
Lately, I have been reorganizing some of my past work scattered across many paper notebooks, computer folders, and OneNote. I wanted to create a minimalist, academic site to showcase some of my projects and general mathematical thoughts. At the same time, establishing an internet presence beyond a LinkedIn profile seemed to be a good investment for the modern era. This blog post details part of my journey into setting up this website. While the below explanation may lack certain details, it is useful to check out the following sources for more information.

[Hugo Discourse Forums]
[GitHub Notes on Hugo]
[Hugo Themes]

##### Why Hugo?

Static site generators are generally very popular options for personal websites in recent years. Their low floor and high ceiling let those with a range of programming experience customize easily. I choose Hugo due to its build speed (sporting build time in the milliseconds!) and themes. I felt that writing articles in markdown was also very natural. 

##### Choosing a Theme

Part of the strengths of any well-developed static site generator is the community support. Thankfully, Hugo has been around for a number of years, meaning users have a bunch of open-source themes. I selected the Poison theme as a professional template, but below are some other ones worth checking out in my opinion.

[Other Hugo Themes]

###### Implementing LaTeX support

As a mathematician, LaTeX typesetting was a must for writing some future posts. Luckily, there are two major libraries that support math rendering (See MathJax and KaTeX). I ended up choosing KaTeX for no particular reason. Implementing this server-side was as simple as including a couple of lines of CSS in the beginning. 

##### Comments System using Giscus
