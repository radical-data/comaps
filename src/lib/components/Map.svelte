<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_MAPTILER_API_KEY } from '$env/static/public';
	import pkg from 'maplibre-gl';
	const { GeolocateControl, Map, NavigationControl, Marker, Popup } = pkg;
	import 'maplibre-gl/dist/maplibre-gl.css';

	export let map;
	export let submissions;

	console.log(submissions)

	const maptilerMapReference = 'toner-v2-lite';
	let mapContainer: HTMLDivElement;

	onMount(() => {
		const map = new Map({
			container: mapContainer,
			style: `https://api.maptiler.com/maps/${maptilerMapReference}/style.json?key=${PUBLIC_MAPTILER_API_KEY}`,
			center: [13.443364738583947, 52.504951831988215],
			zoom: 17,
			pitch: 65,
			attributionControl: false
		});
		map.addControl(new NavigationControl({ showCompass: false }), 'bottom-right');
		map.addControl(
			new GeolocateControl({
				positionOptions: { enableHighAccuracy: false }
			}),
			'bottom-right'
		);

		submissions.forEach(submission => {
			const el = document.createElement('div');
			el.className = 'marker';
			el.style.backgroundImage = `url(https://placekitten.com/g/30/30)`;
			el.style.width = '30px';
			el.style.height = '30px';
			el.style.backgroundSize = '100%';

			new Marker(el)
				.setLngLat([submission.location.coordinates[0], submission.location.coordinates[1]])
				.setPopup(new Popup().setHTML(`<p>${submission.data_content}</p>`))
				.addTo(map);
		});
	});
</script>

<div class="map" data-testid="map" bind:this={mapContainer} />

<style>
	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 1;
	}

	.marker {
		background-color: #3FB1CE;
		border: none;
		cursor: pointer;
	}
</style>
