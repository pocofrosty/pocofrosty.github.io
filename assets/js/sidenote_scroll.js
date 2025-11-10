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

    if (sidenoteItem) {
        const topDistance = label.getBoundingClientRect().top;
        sidenoteItem.style.top = `${topDistance}px`;
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
  });
}