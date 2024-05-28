import { supabase } from '$lib/clients/supabaseClient';
import type { PageServerLoad } from './$types';
import type { Map } from '$lib/types/Map';

export const load: PageServerLoad = async () => {
	const { data, error } = await supabase.from('maps').select('*');

	if (error) {
		console.error('Error fetching maps:', error);
		return { maps: [] };
	}

	const maps = data as Map[];
	maps.sort((a, b) => new Date(b.last_modified).getTime() - new Date(a.last_modified).getTime());

	return {
		maps
	};
};
