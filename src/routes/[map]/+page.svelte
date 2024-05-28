<script>
	import Map from '../../lib/components/Map.svelte';

	export let data;
</script>

<!-- <main> -->
	<h1>{data.map.name}</h1>
	<p>{data.map.description}</p>

	<Map></Map>
<!-- </main> -->

<style>
	h1 {
		font-size: 2rem;
	}

	p {
		font-size: 1rem;
		margin-top: 0.5rem;
	}
</style>
