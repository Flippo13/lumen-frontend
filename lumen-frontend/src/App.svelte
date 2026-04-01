<script>
    const awaiter = fetch('/api/hello')
        .then(res => res.json())
        .then(data => data.message);
</script>

<main>
    <h1>{awaiter}</h1>
</main>

