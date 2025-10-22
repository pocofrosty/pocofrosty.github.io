(async function() {
    // Get the search query from the URL
    function getQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('q') || '';
    }

    const query = getQuery();
    if (!query) return;

    const pagefind = await import("/pagefind/pagefind.js");
    const search = await pagefind.debouncedSearch(query);
    const TotalResults = await Promise.all(search.results.map(r => r.data()));

    const resultsContainer = document.getElementById('search-results');
    if (TotalResults.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    resultsContainer.innerHTML = TotalResults.map(r => `
        <div class="search-result">
            <a href="${r.raw_url}">${r.meta.title}</a>
        </div>
    `).join('');
})();