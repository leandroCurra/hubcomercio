import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

const API_BASE_URL = 'http://localhost:8080/api/web';

export const load: LayoutServerLoad = async ({ fetch, locals }) => {
	const { subdomain } = locals;

	if (!subdomain) {
		return {
			subdomain,
			storefront: null
		};
	}

	let response: Response;

	try {
		console.log( 'trye' )
		response = await fetch(
			`${API_BASE_URL}/${encodeURIComponent(subdomain)}/storefront`
		);
	} catch {
		console.log(subdomain  );
		error(502, 'No se pudo conectar con el servicio de tiendas');
	}

	if (!response.ok) {
		error(response.status, `No se pudo obtener la tienda ${subdomain}`);
	}

	return {
		subdomain,
		storefront: await response.json()
	};
};
