---
title: Setting up a Personal Website with Hugo
date: 2025-06-19T16:52:25+00:00
draft: false
---
Lately, I have been reorganizing some of my past work scattered across many paper notebooks, computer folders, and OneNote. I wanted to create a minimalist, academic site to showcase some of my projects and general mathematical thoughts. At the same time, establishing an internet presence beyond a LinkedIn profile seemed to be a good investment for the modern era. This blog post details part of my journey into setting up this website. While this post may lack certain details, it is useful to check out the following sources for more information.

- [Hugo Forums](https://discourse.gohugo.io/)
- [Collection of Hugo Themes](https://themes.gohugo.io/)
- [CloudCannon Beginner Tutorial](https://cloudcannon.com/tutorials/hugo-beginner-tutorial/)

# Why Hugo?

Static site generators (SSG) are very popular options for personal websites in recent years. Their low floor and high ceiling let those with a range of programming experience customize easily. I choose Hugo due to its build speed (sporting build time in the milliseconds!) and theme ecosystem. I felt that writing articles in markdown was also very natural, coming from a LaTeX background.

For those with some familiarity with other static site generators, I found this [note](https://gist.github.com/janert/4e22671044ffb06ee970b04709dd7d81) that described the way Hugo works really helpful.

# Choosing a Theme

Part of the strengths of any well-developed SSG is the community support. Thankfully, Hugo has been around for a number of years, meaning users have a bunch of open-source themes. I selected the Poison theme as a professional template, but below are some other ones worth checking out in my opinion.

- [Poison](https://github.com/lukeorth/poison)
- [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
- [Minimalist Academic](https://github.com/pmichaillat/hugo-website)
- [XMIN](https://github.com/yihui/hugo-xmin)
- [BearBlog](https://github.com/janraasch/hugo-bearblog)

It's important when selecting a theme to look at the config file; this will usually tell you how much control you have over the styling of the site and how you can organize your content.

# Implementing LaTeX support via KaTeX

As a mathematician, LaTeX typesetting was a must for writing some future posts. Luckily, there are two major libraries that support math rendering (See MathJax and KaTeX). I ended up choosing KaTeX for no particular reason. Implementing this server-side was as simple as including a couple of lines of HTML and a custom render hook.

```go{title = "layouts\_default\_markup\render-passthrough.html" verbatim = true}
{{ $opts := dict "output" "htmlAndMathml" }}
{{ if eq .Type "block" }}
  {{ $opts = merge $opts (dict "displayMode" true) }}
{{ end }}
{{ transform.ToMath .Inner $opts }}
{{ .Page.Store.Set "hasMath" true }}
```

Don't forget to include the following style-sheet in the head of your project!

```html{title="KaTeX Stylesheet" verbatim = false}
<link href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" rel="stylesheet">
```

# Comments System using Giscus

Hugo Documentation notes that it comes shipped with Disqus, a javascript-based commenting system. However, I'd recommend not using it since:

1. While free-to-use, Disqus shows ads to viewers of your website.
2. There are privacy concerns regarding the third-party service.
3. I didn't like the default design.

I settled on [Giscus](https://giscus.app/), itself heavily inspired by the earlier [utterances](https://github.com/utterance) package. Comments are stored as part of the GitHub Repository's discussions page. The biggest drawback is that it requires an account to post. Since I don't expect much traffic on my site/GitHub repo, I thought this was fair trade-off. In any case, for those without an account, they could reach me through my [e-mail](mailto:dzheng24@sas.upenn.edu).

For my page, I choose to use the Catppuccin Frappe and Catppuccin Latte themes for dark and light mode respectively.

# Light & Dark Mode

Speaking of which, the Poison theme already implements a Light/Dark mode switch. You can see how I overrode some of the behavior and synced it up with my Giscus theme in the `assets\js\light_dark.js` at my GitHub repository for this site.

# Pagefind Static Search

Pagefind is a static search package that builds an index after your static site is finished building. It was easy to set-up and customize. Pagefind comes a pre-designed search bar to easily drop into your site, but I choose to build my own using their API to have greater styling control and customization.

# GitHub-style Alerts (hugo-admonitions)

# Table of Contents

Hhugo comes with a built-in Table of Contents method. It works by detecting `<h1>`-`<h6>` elements and generating it based on that. The bolded entry in the table of contents represents the items that most recently entered the viewfinder. This leads to some finicky behavior using the ScrollSpy functionality.

# Sidenotes via Intersection Observer

Sidenotes are an alternative to footnotes. Since it may break up the reader's flow when it redirects their eyes to the bottom of the page, requiring another click to return. As an alternative to footnotes, I wanted sidenotes to be textual snippets that are located in horizontal alignment with the corresponding label in the text. We allow sidenotes to optionally accept 1 image and sidenotes disappear as the label is moved out of the viewport.

# Inline Notes

Inline notes are very similar to Sidenotes, except they can only generate, as their name suggests, inline. These are collapsible elements regardless of the window size. They replicate the mobile-view behavior of Sidenotes.

# GitJournal Mobile Publishing

Occasionally, I want to be able to edit content on my phone. I found that GitJournal was an okay option as an Android user.

# Daily Website Refresh via CRON Job

# Mobile View

# Faster Loading using InstantPage

# Caching using Google WorkBox + ServiceWorkers

Service Workers are attached to

# Favicons

# Deployment via GitHub Pages

# Content Management System (CMS)

For VSCode users, I'd recommend FrontmatterCMS, or DecapCMS. The first has a easy-to-use in-application GUI, although I found some customization options lacking. DecapCMS is incredibly popular, but the initial configuration can take a lot of time.
