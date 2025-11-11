---
title: Setting up a Personal Website with Hugo
date: 2025-06-19T16:52:25+00:00
draft: false
---

Lately, I have been reorganizing some of my past work scattered across many paper notebooks, computer folders, and OneNote. I wanted to create a minimalist, academic site to showcase some of my projects and general mathematical thoughts. At the same time, establishing an internet presence beyond a LinkedIn profile seemed to be a good investment for the modern era. This blog post details part of my journey into setting up this website. While this post may lack certain details, it is useful to check out the following sources for more information.

[Hugo Discourse Forums]
[GitHub Notes on Hugo]
[Hugo Themes]

# Why Hugo?

Static site generators are generally very popular options for personal websites in recent years. Their low floor and high ceiling let those with a range of programming experience customize easily. I choose Hugo due to its build speed (sporting build time in the milliseconds!) and theme ecosystem. I felt that writing articles in markdown was also very natural, coming from a LaTeX background.

For a semi-advanced introduction to Hugo, see [this note](https://gist.github.com/janert/4e22671044ffb06ee970b04709dd7d81).

# Choosing a Theme

Part of the strengths of any well-developed static site generator is the community support. Thankfully, Hugo has been around for a number of years, meaning users have a bunch of open-source themes. I selected the Poison theme as a professional template, but below are some other ones worth checking out in my opinion.

[Other Hugo Themes]

It's important when selecting a theme to look at the config file; this will usually tell you how much control you have over the styling of the site and how you can organize your content. 

# Implementing LaTeX support

As a mathematician, LaTeX typesetting was a must for writing some future posts. Luckily, there are two major libraries that support math rendering (See MathJax and KaTeX). I ended up choosing KaTeX for no particular reason. Implementing this server-side was as simple as including a couple of lines of HTML and a custom render hook. 

# Comments System using Giscus
Hugo Documentation notes that it comes shipped with Disqus, a javascript-based commenting system. However, I'd recommend not using it since:

1. Disqus, while free-to-use, shows ads to viewers of your website.
2. There are privacy concerns regarding the third-party service.
3. I didn't like the default design. 

I settled on Giscus, itself heavily inspired by the earlier utterances package. Comments are stored as part of the GitHub Repository's discussions page. The biggest con is that it requires an account to post. Since I don't expect much traffic on my site or GitHub repo, I thought this was fair trade-off. Anyways, for those without an account, they could reach me through my email.
