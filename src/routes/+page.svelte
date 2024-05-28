<script lang="ts">
	import type { Map } from '$lib/types/Map';

	export let data: { maps: Map[] };

	$: maps = data.maps;
</script>

<main>
	<h1>Comaps</h1>
	<p>Create community + collaborative maps</p>
	<h2>Public Maps</h2>
	<ul>
		{#each maps as map}
			<li>
				<a href="/{map.domain}">
					<strong>{map.name}</strong>
				</a>
				<p>{map.description}</p>
				<p>Last modified: {new Date(map.last_modified).toLocaleDateString()}</p>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		padding: 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-bottom: 1rem;
	}

	a {
		text-decoration: none;
		color: #0070f3;
	}

	a:hover {
		text-decoration: underline;
	}

	p {
		margin: 0.5rem 0 0;
	}
</style>
