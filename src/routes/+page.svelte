<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { Map } from '$lib/types/Map';

	export let data: { maps: Map[] };

	let newMapName = '';
	let newMapDescription = '';
	let maps: Map[] = data.maps;
	let error: string | null = null;

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		const response = await fetch('/', {
			method: 'POST',
			body: formData
		});

		const result = await response.json();

		if (result.error) {
			error = result.error;
		} else {
			maps = [...maps, result.map];
			newMapName = '';
			newMapDescription = '';
			error = null;
			alert('Map created successfully');
			invalidate();
		}
	};
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
	<h2>Contribute</h2>
	<h3>Create your own comap</h3>
	<form on:submit|preventDefault={handleSubmit} method="post">
		<label for="mapName">Map Name:</label>
		<input id="mapName" name="name" bind:value={newMapName} placeholder="Enter map name" />

		<label for="mapDescription">Description:</label>
		<textarea
			id="mapDescription"
			name="description"
			bind:value={newMapDescription}
			placeholder="Enter map description"
		></textarea>

		<button type="submit">Create Map</button>
	</form>
	{#if error}
		<p style="color: red;">{error}</p>
	{/if}
	<h3>Submit data to an existing comap</h3>
	<p>
		You can collect and submit data through <a href="https://traces.radicaldata.org">Traces</a>.
	</p>
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

	form {
		margin-top: 1rem;
	}

	label {
		display: block;
		margin-top: 0.5rem;
	}

	input,
	textarea {
		width: 90%;
		padding: 0.5rem;
		margin-top: 0.25rem;
	}

	button {
		margin-top: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: #0070f3;
		color: white;
		border: none;
		cursor: pointer;
	}

	button:hover {
		background-color: #005bb5;
	}
</style>
