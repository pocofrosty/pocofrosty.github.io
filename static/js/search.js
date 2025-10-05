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
    if (flatResults.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
        return;
    }
    container.innerHTML = flatResults.map(item => `
        <div class="search-result">
            <a href="${item.doc.url}"><strong>${item.doc.title}</strong></a>
            <p>${item.doc.summary || ''}</p>
        </div>
    `).join('');
})();
