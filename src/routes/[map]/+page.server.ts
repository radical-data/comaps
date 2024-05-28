// src/routes/[map]/+page.server.ts
import { supabase } from '$lib/clients/supabaseClient';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { data: mapData, error: mapError } = await supabase
		.from('maps')
		.select('*')
		.eq('domain', params.map)
		.single();

	if (mapError) {
		console.error('Error fetching map:', mapError);
		throw error(404, 'Map not found');
	}

	const { data: submissionsData, error: submissionsError } = await supabase
		.from('data_submissions')
		.select('*')
		.eq('map_id', mapData.id);

	if (submissionsError) {
		console.error('Error fetching data submissions:', submissionsError);
	}

	const map = mapData;
	const submissions = submissionsData;

	return {
		map,
		submissions
	};
};
