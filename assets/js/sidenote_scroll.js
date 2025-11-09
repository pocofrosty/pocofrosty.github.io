window.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const number = entry.target.getAttribute('for').match(/\d+$/)[0];
            const sidenoteItem = document.querySelector(`.sidenote-item[number="${number}"]`);

            if (entry.intersectionRatio > 0) {
                // Find the corresponding sidenote-item div and add the visible class
                if (sidenoteItem) {
                    sidenoteItem.classList.add('visible');
                }
            } else {
                if (sidenoteItem) {
                    sidenoteItem.classList.remove('visible');
                }
            }
        });
    }, {
        root: document.querySelector('.content-container'), // Updated to use the content container
        rootMargin: `-${document.querySelector('.article-toc h4').getBoundingClientRect().top}px 0px 0px 0px`
    });

    const sidenoteLabels = document.querySelectorAll(".sidenote-label");
    sidenoteLabels.forEach(label => {
        observer.observe(label);
    });
});

