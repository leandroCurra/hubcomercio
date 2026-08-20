import { error, type Handle } from '@sveltejs/kit';

const ROOT_DOMAIN = 'hubcomercio.com';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

function getSubdomain(hostname: string): string | null {
	const normalizedHostname = hostname.toLowerCase().replace(/\.$/, '');

	if (LOCAL_HOSTS.has(normalizedHostname)) {
		return null;
	}

	if (normalizedHostname.endsWith('.localhost')) {
		const subdomain = normalizedHostname.slice(0, -'.localhost'.length);

		if (subdomain && !subdomain.includes('.')) {
			return subdomain;
		}

		error(404, 'Subdominio no válido');
	}

	if (normalizedHostname === ROOT_DOMAIN || normalizedHostname === `www.${ROOT_DOMAIN}`) {
		return null;
	}

	const domainSuffix = `.${ROOT_DOMAIN}`;

	if (!normalizedHostname.endsWith(domainSuffix)) {
		error(404, 'Dominio no reconocido');
	}

	const subdomain = normalizedHostname.slice(0, -domainSuffix.length);

	if (!subdomain || subdomain.includes('.')) {
		error(404, 'Subdominio no válido');
	}

	return subdomain;
}

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.subdomain = getSubdomain(event.url.hostname);

	return resolve(event);
};
