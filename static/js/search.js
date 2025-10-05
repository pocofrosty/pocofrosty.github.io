(async function() {
    function getQuery() {
        const params = new URLSearchParams(window.location.search);
        return params.get('q') || '';
    }

    const query = getQuery();
    if (!query) return;

    const res = await fetch('/index.json');
    const data = await res.json();

    const index = new FlexSearch.Document({
        document: {
            id: 'id',
            index: ['title', 'summary', 'content'],
            store: ['title', 'summary', 'url']
        }
    });
    data.forEach(item => index.add(item));

    const results = index.search(query, { enrich: true });
    const flatResults = results.flatMap(r => r.result);

    const container = document.getElementById('search-results');
        // Filter out duplicate posts by URL
        const uniqueResults = [];
        const seenUrls = new Set();
        for (const item of flatResults) {
            if (!seenUrls.has(item.doc.url)) {
                uniqueResults.push(item);
                seenUrls.add(item.doc.url);
            }
        }
        if (uniqueResults.length === 0) {
            container.innerHTML = '<p>No results found.</p>';
            return;
        }
        // Function to highlight query matches
        function highlight(text, query) {
            if (!query) return text;
            // Escape special regex characters in query
            const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escaped, 'gi');
            return text.replace(regex, match => `<mark>${match}</mark>`);
        }

        container.innerHTML = uniqueResults.map(item => `
            <div class="search-result">
                <a href="${item.doc.url}"><strong>${highlight(item.doc.title, query)}</strong></a>
                <p>${highlight(item.doc.summary || '', query)}</p>
            </div>
        `).join('');
})();
