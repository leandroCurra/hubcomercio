import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const API_BASE_URL = (env.API_BASE_URL ?? 'http://localhost:8080/api/web').replace(/\/$/, '');
const LOG_PREFIX = '[HubComercio][LayoutServer]';

export const load: LayoutServerLoad = async ({ fetch, locals }) => {
	const { subdomain } = locals;
	console.info(`${LOG_PREFIX} Iniciando carga`, { subdomain });

	if (!subdomain) {
		console.info(`${LOG_PREFIX} Solicitud sin subdominio`);
		return {
			subdomain,
			storefront: null
		};
	}

	let response: Response;

	try {
		const storefrontUrl = `${API_BASE_URL}/${encodeURIComponent(subdomain)}/storefront`;
		console.info(`${LOG_PREFIX} Consultando storefront`, { subdomain, storefrontUrl });
		response = await fetch(storefrontUrl, {
			headers: {
				'ngrok-skip-browser-warning': 'true'
			}
		});
	} catch (cause) {
		console.error(`${LOG_PREFIX} Error de conexión con storefront`, { subdomain, cause });
		error(502, 'No se pudo conectar con el servicio de tiendas');
	}

	if (!response.ok) {
		console.error(`${LOG_PREFIX} Storefront respondió con error`, {
			subdomain,
			status: response.status,
			statusText: response.statusText
		});
		error(response.status, `No se pudo obtener la tienda ${subdomain}`);
	}

	console.info(`${LOG_PREFIX} Storefront cargado correctamente`, {
		subdomain,
		status: response.status
	});

	return {
		subdomain,
		storefront: await response.json()
	};
};
