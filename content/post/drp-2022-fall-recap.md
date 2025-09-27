+++
date = '2025-09-26T23:08:47-04:00'
draft = false
title = 'DRP 2022 Fall Recap'
+++
In this first post (in a planned series of 6), I want to revisit some of the topics of the semesters I spent as part of the Directed Reading Program during my time at Penn. For those unfamiliar, a DRP pairs undergraduate students with graduate students to undergo a semester-long supervised study. These programs have a plethora of benefits for all parties involved:

Undergraduates get to learn about math topics that are not covered in core mathematics classes and have a self-guided experience
Graduate students can gain valuable teaching experience, reinforce previous knowledge, and practice mathematical communication
Math departments benefit from increased interaction between graduate and undergraduate populations, contributing to a stronger culture.
My first DRP occurred during the fall of my sophomore year and focused on knot theory under my mentor Yi Wang [Link to blog here]. In retrospect, knot theory was a great complement to the topology courses I was taking at the time. Knot theory is an interesting subject - simultaneously easy to explain using pieces of string to a elementary schooler, while extremely difficult when delving into the technical details. My study mainly followed the wonderful, albeit slightly outdated, book [The Knot Book by Colin Adams]. Published in [YEAR], the book is very conversational, but does a great job of covering the essentials. Let's begin our reflection by defining our titular object of study - knots.

Mathematically, a knot is a map $f: [0, 1] \to \R^{3}$ with $f(0) = f(1)$. This function $f(t)$ is a parameterization of the path ("string") of the knot; the second condition says that a knot must begin and end in the same point. Our smoothness assumption prevents cusps along our knot, or it to intersect itself. Note that this does not perfectly coincide with our real-world knots. Square knots, or the knots for tying your shoe, are not mathematical knots as the string has two distinct ends. Below is an image listing some examples of mathematical knots.

[Image of knots]

Notice that we might be able to draw the same physical knot in two different ways. For example, the "unknot" ($S^{1}$) is the same if we add a twist [insert image in line]. Formally, we call any 2-D representation a knot presentation. To prevent ambiguity, a knot presentation should not contain any triple "intersections" in the drawing. For topologists, this doesn't pose much restriction as we usually only care about topological objects up to homeomorphism. However, if we care about classifying knots up to homeomorphism, all knots are equivalent!

Theorem 1.1 - All knots are homeomorphic.

Proof: Since being homeomorphic is an equivalence relation, it is sufficient to show that $S^{1}$ and any arbitrary knot $K$ are homeomorphic. Let $f: [0, 1] \to \text{Im} (f)$ and $g: [0, 1] \to S^{1}$.