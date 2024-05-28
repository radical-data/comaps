import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    const response = await fetch('/maps.json');
    const maps = await response.json();

    const map = maps.find((map) => map.domain === params.map);
    if (!map) {
        throw error(404, 'Map not found');
    }

    return {
        map
    };
}
