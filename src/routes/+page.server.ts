import { supabase } from '$lib/clients/supabaseClient';
import type { PageServerLoad, Actions } from './$types';
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

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		if (!name) {
			return { error: 'Map name is required' };
		}

		const { data, error } = await supabase
			.from('maps')
			.insert([{ 
				name, 
				description,
				domain: name.toLowerCase().replace(/\s+/g, '-'),
				last_modified: new Date().toISOString()
			}])
			.select();

		if (error) {
			console.error('Error creating map:', error);
			return { error: 'Error creating map' };
		}

		return { map: data[0] };
	}
};