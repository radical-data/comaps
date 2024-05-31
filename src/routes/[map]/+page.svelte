<script lang="ts">
	import MapComponent from '$lib/components/Map.svelte';

	export let data;

	const { map, submissions } = data;
</script>

<!-- <main> -->
	<!-- <h1>{map.name}</h1>
	<p>{map.description}</p> -->

	<MapComponent {map} {submissions} />
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
