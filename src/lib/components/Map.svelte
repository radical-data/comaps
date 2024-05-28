<script lang="ts">
	import { PUBLIC_MAPTILER_API_KEY } from '$env/static/public';
	import pkg from 'maplibre-gl';
	const { GeolocateControl, Map, NavigationControl } = pkg;
	import { onMount } from 'svelte';

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
	});
</script>

<div class="map" data-testid="map" bind:this={mapContainer} />

<style>
	@import 'maplibre-gl/dist/maplibre-gl.css';

	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 1;
	}
</style>
