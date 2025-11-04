(async function() {
    // Get the search query from the URL
    function getQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('q') || '';
    }

    const query = getQuery();
    if (!query) return;

    const pagefind = await import("/pagefind/pagefind.js");
    await pagefind.options({
        highlightParam: "highlight",
        excerptLength: 50,
    });
    const search = await pagefind.debouncedSearch(query);
    const TotalResults = await Promise.all(search.results.map(r => r.data()));

    console.log("Search results for query:", query);

    const resultsContainer = document.getElementById('search-results');

    // Filter out results linking to the default "/" URL
    const filteredResults = TotalResults.filter(r => r.raw_url !== "/");

    // Modify the excerpt to remove Title, Date, and Read Time information
    filteredResults.forEach(r => {
        const readIndex = r.excerpt.indexOf("read");
        if (readIndex !== -1) {
            r.excerpt = r.excerpt.substring(readIndex + 4).trim();
        }
    });

    if (filteredResults.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    resultsContainer.innerHTML = filteredResults.map(r => `
        <div class="search-result">
            <a href="${r.raw_url}">${r.meta.title}</a>
            <p>${r.excerpt}</p>
        </div>
    `).join('');
})();