<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_MAPTILER_API_KEY } from '$env/static/public';
	import pkg from 'maplibre-gl';
	const { GeolocateControl, Map, NavigationControl, Marker, Popup, LngLatBounds } = pkg;
	import 'maplibre-gl/dist/maplibre-gl.css';
  
	export let map;
	export let submissions;
  
	const maptilerMapReference = 'toner-v2-lite';
	let mapContainer: HTMLDivElement;
  
	function createMarkerElement(submission) {
	  const el = document.createElement('div');
  
	  if (submission.data_type === 'photo') {
		el.className = 'marker photo-marker';
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
		};
	  } else {
		el.className = 'marker text-marker';
		el.textContent = submission.data_type === 'counter' ? submission.data_label : submission.data_content;
	  }
  
	  el.addEventListener('click', () => {
		window.alert(submission.data_content);
	  });
  
	  return el;
	}
  
	function calculateBounds(submissions) {
	  const bounds = new LngLatBounds();
  
	  submissions.forEach(submission => {
		const [lng, lat] = submission.location.coordinates;
		bounds.extend([lng, lat]);
	  });
  
	  return bounds;
	}
  
	onMount(() => {
	  const mapInstance = new Map({
		container: mapContainer,
		style: `https://api.maptiler.com/maps/${maptilerMapReference}/style.json?key=${PUBLIC_MAPTILER_API_KEY}`,
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
  
	  submissions.forEach((submission) => {
		const markerElement = createMarkerElement(submission);
		new Marker({ element: markerElement })
		  .setLngLat([submission.location.coordinates[0], submission.location.coordinates[1]])
		  .setPopup(new Popup().setHTML(`<p>${submission.data_content}</p>`))
		  .addTo(mapInstance);
	  });
  
	  const bounds = calculateBounds(submissions);
	  mapInstance.fitBounds(bounds, { padding: 100 });
	});
  </script>
  
  <nav>
	<a href="/">Comaps</a>
  </nav>
  <div class="map" data-testid="map" bind:this={mapContainer} />
  
  <style>
	.map {
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  width: 100%;
	  z-index: 1;
	}
  
	:global(.marker) {
	  background-color: #3fb1ce;
	  border: none;
	  cursor: pointer;
	}
  
	:global(.photo-marker) {
	  background-size: contain;
	  background-repeat: no-repeat;
	  background-position: center;
	  border-radius: 50%;
	  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
	}
  
	:global(.text-marker) {
	  aspect-ratio: 1;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  background-color: #ffffff;
	  border: 2px black solid;
	  color: black;
	  font-size: 12px;
	  text-align: center;
	  padding: 5px;
	  border-radius: 50%;
	  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
	}
  
	nav {
	  z-index: 2;
	  position: fixed;
	  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
	  padding: 10px;
	  margin: 10px;
	  background-color: #ffffff;
	  border-radius: 10px;
	}
  
	nav a {
	  color: black;
	  text-decoration: none;
	  font-weight: bold;
	}
  
	nav a:hover {
	  color: #ddd;
	}
  </style>
  