<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_MAPTILER_API_KEY } from '$env/static/public';
	import pkg from 'maplibre-gl';
	const { GeolocateControl, Map, NavigationControl, Marker, Popup } = pkg;
	import 'maplibre-gl/dist/maplibre-gl.css';

	export let map;
	export let submissions;

	const maptilerMapReference = 'toner-v2-lite';
	let mapContainer: HTMLDivElement;

	function createMarkerElement(submission) {
		const el = document.createElement('div');
		el.className = 'marker';

		if (submission.data_type === 'photo') {
			const img = new Image();
			img.src = submission.data_content;
			img.onload = () => {
				const aspectRatio = img.width / img.height;
				let width = 80; // Default width
				let height = width / aspectRatio;

				// Adjust size if the height is greater than the width
				if (height > 40) {
					height = 40;
					width = height * aspectRatio;
				}

				el.style.width = `${width}px`;
				el.style.height = `${height}px`;
				el.style.backgroundImage = `url(${submission.data_content})`;
				el.style.backgroundSize = 'contain';
				el.style.backgroundRepeat = 'no-repeat';
				el.style.backgroundPosition = 'center';
			};
		} else {
			el.style.aspectRatio = "1/1";
			el.style.display = 'flex';
			el.style.alignItems = 'center';
			el.style.justifyContent = 'center';
			el.style.backgroundColor = '#3FB1CE';
			el.style.color = 'black';
			el.style.fontSize = '12px';
			el.style.textAlign = 'center';
			el.style.padding = '5px';
			el.style.borderRadius = '50%';
			el.textContent = submission.data_content;
		}

		el.addEventListener('click', () => {
			window.alert(submission.data_content);
		});

		return el;
	}

	onMount(() => {
		const mapInstance = new Map({
			container: mapContainer,
			style: `https://api.maptiler.com/maps/${maptilerMapReference}/style.json?key=${PUBLIC_MAPTILER_API_KEY}`,
			center: [10, 17],
			zoom: 2,
			pitch: 0,
			attributionControl: false
		});

		mapInstance.addControl(new NavigationControl({ showCompass: false }), 'bottom-right');
		mapInstance.addControl(
			new GeolocateControl({
				positionOptions: { enableHighAccuracy: false }
			}),
			'bottom-right'
		);

		submissions.forEach(submission => {
			const markerElement = createMarkerElement(submission);
			new Marker({ element: markerElement })
				.setLngLat([submission.location.coordinates[0], submission.location.coordinates[1]])
				.setPopup(new Popup().setHTML(`<p>${submission.data_content}</p>`))
				.addTo(mapInstance);
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
