---
title: Wolf-Erdoğan Theorem
summary: ""
date: 2025-11-05T05:57:13.256Z
preview: ""
draft: false
tags: []
series: ""
---

## The Problem Set-up
Falconer's Conjecture asks if
\[\dim{A} > \frac{n}{2} \text{ implies } \mathcal{L}^{1}(D(A)) > 0\]
From Theorem 4.6 in [Mattila][], we already have seen that for a Borel set $A \subset \R^{n}$, we get a positive Lebesgue measure of the distance set whenever $\dim{A} > \frac{n}{2} + \frac{1}{2}$[^1]. We can address the gap in the hypothesis via the following theorem.

**Theorem 15.1** (Wolf-Erdoğan Distance Set Theorem): Let $A \subset \R^{n}$ be a Borel set and $n \geq 2$. 

1. If $\dim A > \frac{n}{2} + \frac{1}{3}$, then $\mathcal{L}^{1}(D(A)) > 0$.
2. If we are in the intermediate case of $\frac{n}{2} \leq \dim{A} \leq \frac{n}{2} + \frac{1}{3}$, then $\dim{D(A)} \geq \frac{6\dim{A}+2-3n}{4}$. 

We aim to summarize the treatment given in Chapters 15 and 16 of [Mattila][]. Further details may be found there.

### Definitions
We can define the quadratic spherical averages of a measure $\mu \in \mathcal{M}(\R^{n})$ for $r > 0$ by
\[\sigma(\mu)(r) = \int_{S^{n-1}}{\abs{\hat{\mu}(r\nu)}^{2}\,d\sigma^{n-1}\nu} = r^{1-n}\int_{S^{n-1}(r)}{\abs{\hat{\mu}(\nu)}^{2} \,d\sigma_{r}^{n-1}\nu}\]

The energy integrals of a measure $\mu$ are
$$I_s(\mu)=\gamma(n, s) \int_0^{\infty} \sigma(\mu)(r) r^{s-1} d r, \quad 0<s<n$$
Recall that $\gamma(n, s)$ is a constant that relies on $n$ and $s$.

We have the induced distance measure $\delta(\mu)$ defined on all continuous functions $\varphi$ from
\[\int{\varphi \,d\delta(\mu)} = \int\int{\varphi(\abs{x-y})\,d\mu x \,d\mu y}\]

The weighted spherical averages $\Sigma(\mu)$ and distance measures $\Delta(\mu)$ are given respectively by $$\Sigma(\mu)(r) = r^{\frac{n-1}{2}}\sigma(\mu)(r)\text{ and }\int \varphi \,d \Delta(\mu)=\int u^{(1-n) / 2} \varphi(u) \,d \delta(\mu) u$$

## Some Initial Decomposition

Assume that $I_{\frac{n+1}{2}}(\mu) < \infty$. Then, we can calculate {{< sidenote "$\Sigma(\mu) \in L^{1}$">}} test {{< /sidenote >}}.

We can also get a relationship between the weighted distance measure and weighted spherical averages involving the Bessel function via spherical coordinates.
\[\Delta(\mu)(u) = c(n)\sqrt{u}\int_{0}^{\infty}{\sqrt{r} J_{\frac{n-2}{2}}(2\pi r u) \Sigma(\mu)(r) \,dr}\]

Using an {{< sidenote "asymptotic as $u \to \infty$" >}} $$\begin{align}
J_{m}(u) &= \frac{\sqrt{2}}{\sqrt{\pi u}}\cos(u - \frac{\pi m}{2} - \frac{\pi}{4}) + O(u^{-\frac{3}{2}}) \\
\implies c(n)J_{\frac{n-2}{2}}(2\pi u) &= \frac{\sqrt{2}}{\sqrt{ 2\pi^{2} u}}\cos(2\pi u - \frac{\pi n - 2 \pi}{4} - \frac{\pi}{4}) + O((2\pi u)^{-\frac{3}{2}}) \\
&= \frac{1}{\sqrt{u}}(a_{1}\cos(2\pi u) + b_{1} \sin(2\pi u)) + K(u) \\
\left| K(u) \right| &\lesssim \min\{u^{-\frac{3}{2}}, u^{-\frac{1}{2}}\} \\
\end{align}$$ 
Here $a_{1}, b_{1}$ are complex constants as the result of cosine difference identity. {{< /sidenote >}}, we get that $c(n)J_{\frac{n-2}{2}} = \frac{1}{\sqrt{u}}(a_{1}\cos(2\pi u) + b_{1} \sin(2\pi u)) + K(u)$.

For $u > 0$, we want to split our weighted distance measure $\Delta(\mu)(u)$ into the sum of two parts 
\[\begin{align}
S(\mu)(u) &= a_{2}\int_{0}^{\infty}{\cos(2\pi r u) \Sigma(\mu)(r)\,dr} + b_{2}\int_{0}^{\infty}{\sin(2\pi r u) \Sigma(\mu)(r) \,dr} \\
L(\mu)(u) &= \sqrt{u}\int_{0}^{\infty}{\sqrt{r} \Sigma(\mu)(r) K(ru) \,dr}
\end{align}\]

By doing some more calculation, we get to change this into
\[S(\mu) = \mathcal{F}(a_{3}[\Sigma_{1}(\mu) + \iu H(\Sigma_{1}(\mu))] + b_{3}[\Sigma_{2}(\mu) + \iu H(\Sigma_{2}(\mu))])\]
and
\[\abs{L(\mu)(u)} \lesssim \gamma(n, s)^{-1} u^{s-\frac{n+1}{2}}I_{s}(\mu)\]

### Bounding via Plancherel's

**Proposition 15.2** - Suppose that $\mu \in M(\R^{n})$, $n \geq 2$, $s > 0$ and $I_{s}(\mu) < \infty$. 
1. If $s > \frac{n}{2}$ and $\int_{1}^{\infty}{\sigma(\mu)(r)^{2}r^{n-1} \,dr} < \infty$, then $\Delta(\mu) \in L^{2}(\R)$. Furthermore, $\delta(\mu) \ll \mathcal{L}^{1}$.
2. If $0 < t < 1$, $s > \frac{n+t - 1}{2}$ and $\int_{1}^{\infty}{\sigma(\mu)(r)^{2}r^{n + t - 2} \,dr} < \infty$, then $I_{t}(\Delta(\mu)) < \infty$. 

{{< sidenote "Proof:" >}} {{< /sidenote >}}

### Strengthening the Result
This proposition directly follows as a result of Proposition 15.2.

**Proposition 15.3** - Suppose that $C$, $s$ and $t$ are positive numbers, $t \leq s$, and $\mu \in \mathcal{M}(\R^{n})$, $n \geq 2$, are chosen such that $I_{s}(\mu) < \infty$ and $\sigma(\mu)(r) \leq Cr^{-t}$ for all $r > 0$. Then,
1. If $s + t \geq n$, then $\mathcal{L^{1}(D(\text{spt}\mu))} > 0$. 
2. If $s + t < n$, then $\dim{D(\text{spt}\mu)} \geq s + t - n + 1$

[^2]

## Some Motivation for Next Steps

How can we improve the previous results to get Theorem 15.1? 

### The Missing Step

In the early 2000's, Wolff (in $n=2$) & Erdoğan (for $n \geq 2$) proved the following.
**Theorem 15.5** - For all $\frac{n-2}{2} \leq s < n$, $n \geq 2$, $\epsilon > 0$ and $\mu \in \mathcal{M}(\R^{n})$ with spt$\mu \subset B(0, 1)$, we have for $r > 1$
\[\sigma(\mu)(r) \leq C(n, s, \epsilon)r^{\epsilon - \frac{n + 2s - 2}{4}}I_{s}(\mu)\]

## Wrapping it all up

[Mattila]: https://www.cambridge.org/core/books/fourier-analysis-and-hausdorff-dimension/78A25BED2C6E4F9B911971305DC928B0

[^1]: Above, and for the rest of this blog post, $\dim{A}$ represents the Hausdorff measure of $A$ 

[^2]: Interestingly, this proves Falconer's Conjecture in the case of Borel Salem sets.