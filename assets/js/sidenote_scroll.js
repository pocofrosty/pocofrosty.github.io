window.addEventListener('DOMContentLoaded', () => {
    observer = initializeObserver();
});

function initializeObserver() {
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
    });

    const sidenoteLabels = document.querySelectorAll(".sidenote-label");
    sidenoteLabels.forEach(label => {
        observer.observe(label);
        syncSidenoteLabel(label);
    });

    return observer;
}

function syncSidenoteLabel(label) {
    const number = label.getAttribute('for').match(/\d+$/)[0];
    const sidenoteItem = document.querySelector(`.sidenote-item[number="${number}"]`);

    const sidenoteTitle = document.querySelector('.article-toc > h4').getBoundingClientRect().top;
    if (sidenoteItem) {
        const topDistance = label.getBoundingClientRect().top;
        sidenoteItem.style.top = `${topDistance - sidenoteTitle - sidenoteItem.getBoundingClientRect().height}px`;
    } else {
        console.warn(`Sidenote item not found for label ${number}`);
    }
}

function ensureNoOverlap() {
    const sidenotes = Array.from(document.querySelectorAll('.sidenote-item.visible'));

    sidenotes.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

    for (let i = 1; i < sidenotes.length; i++) {
        const prev = sidenotes[i - 1];
        const current = sidenotes[i];

        const prevBottom = prev.getBoundingClientRect().bottom;
        const currentTop = current.getBoundingClientRect().top;

        if (currentTop < prevBottom) {
            const overlap = prevBottom - currentTop;
            current.style.top = `${parseFloat(current.style.top || 0) + overlap + 10}px`;
        }
    }
}

// Add scroll event listener to the content container
const container = document.querySelector('main.content.container');
if (container) {
  container.addEventListener('scroll', function () {
    const sidenoteLabels = document.querySelectorAll(".sidenote-label");
    sidenoteLabels.forEach(label => {
        syncSidenoteLabel(label);
    });
    ensureNoOverlap();
  });
}

document.querySelector('.toc-wrapper').addEventListener('click', function() {
    setTimeout(() => {
        const sidenoteLabels = document.querySelectorAll(".sidenote-label");
        sidenoteLabels.forEach(label => {
            syncSidenoteLabel(label);
        });
        ensureNoOverlap();
    }, 0);
});
