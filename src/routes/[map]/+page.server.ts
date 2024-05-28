import { error } from '@sveltejs/kit';
import type { Map } from '../../types/Map.js';

export async function load({ params, fetch }) {
    const response = await fetch('/maps.json');
    const maps = await response.json();

    const map = maps.find((map: Map) => map.domain === params.map);
    if (!map) {
        throw error(404, 'Map not found');
    }

    return {
        map
    };
}
