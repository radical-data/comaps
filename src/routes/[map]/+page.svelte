<script>
	export let data;
</script>

<main>
	<h1>{data.map.name}</h1>
	<p>{data.map.description}</p>
	<!-- Add more fields as needed -->
</main>

<style>
	main {
		padding: 1rem;
	}

	h1 {
		font-size: 2rem;
	}

	p {
		font-size: 1rem;
		margin-top: 0.5rem;
	}
</style>
