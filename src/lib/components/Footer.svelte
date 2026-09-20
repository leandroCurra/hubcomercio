<script lang="ts">
	import { cart } from '$lib/cart.svelte';
	import type { Storefront } from '$lib/types';

	let { store, storeName }: { store: Storefront; storeName: string } = $props();

	let email = $state('');

	function handleNewsletter(e: SubmitEvent) {
		e.preventDefault();
		if (!email || !email.includes('@')) {
			cart.showToast('Ingresá un email válido');
			return;
		}
		cart.showToast('¡Gracias por suscribirte!');
		email = '';
	}
</script>

<footer class="site-footer" id="contacto">
	<!-- Benefits / Highlights -->
	<div class="benefits-grid" id="beneficios">
		<div class="benefit-col">
			<h3>ENVÍO GRATIS</h3>
			<p>En compras superiores a $150.000</p>
			<a href="#contacto" onclick={(e) => { e.preventDefault(); cart.showToast('Envíos a todo el país'); }}>Conocer más</a>
		</div>
		<div class="benefit-col">
			<h3>CUOTAS SIN INTERÉS</h3>
			<p>Hasta 3 cuotas sin interés con todas las tarjetas</p>
			<a href="#contacto" onclick={(e) => { e.preventDefault(); cart.showToast('Promociones bancarias activas'); }}>Conocer más</a>
		</div>
		<div class="benefit-col">
			<h3>CAMBIOS SIN CARGO</h3>
			<p>El primer cambio o devolución es gratis</p>
			<a href="#contacto" onclick={(e) => { e.preventDefault(); cart.showToast('30 días para cambios'); }}>Conocer más</a>
		</div>
		<div class="benefit-col newsletter">
			<h3>NEWSLETTER</h3>
			<form onsubmit={handleNewsletter}>
				<input
					type="email"
					placeholder="Ingresá tu email"
					bind:value={email}
				/>
			</form>
			<p class="newsletter-sub">Enterate primero que nadie de todas las novedades</p>
		</div>
	</div>

	<!-- Store Information and Links -->
	<div class="store-meta">
		<div class="brand-block">
			{#if store?.logoUrl && store.logoUrl !== 'http://localhost:4200/images/logo/logo.svg'}
				<img src={store.logoUrl} alt={storeName} />
			{:else}
				<img src="/assets/logo.svg" alt={storeName} />
			{/if}
			<p>Moda y estilo contemporáneo. Calidad y diseño para tu día a día.</p>
		</div>

		<div class="info-block">
			<h4>Contacto</h4>
			{#if store?.contactEmail}
				<a href={`mailto:${store.contactEmail}`}>{store.contactEmail}</a>
			{/if}
			{#if store?.contactPhone}
				<a href={`tel:${store.contactPhone}`}>{store.contactPhone}</a>
			{/if}
		</div>

		<div class="info-block">
			<h4>Ubicación</h4>
			<span>{store?.addressLine1 ?? 'Buenos Aires, Argentina'}</span>
			<span>{store?.city ? `${store.city}, ${store.province}` : ''}</span>
		</div>

		<div class="info-block">
			<h4>Entregas</h4>
			<span>{store?.allowPickup ? '✓ Retiro en local habilitado' : 'Retiro no disponible'}</span>
			<span>{store?.allowDelivery ? '✓ Envíos a domicilio activos' : 'Consultar opciones de envío'}</span>
		</div>
	</div>

	<div class="copyright">
		© {new Date().getFullYear()} {storeName}. Todos los derechos reservados.
	</div>
</footer>

<style>
	.site-footer {
		background: #f3f3f3;
		border-top: 1px solid #e5e5e5;
	}

	.benefits-grid {
		padding: 45px 4vw;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 25px;
		text-align: center;
		border-bottom: 1px solid #e0e0e0;
	}

	.benefit-col h3 {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.5px;
		margin: 0 0 6px;
	}

	.benefit-col p {
		font-size: 11px;
		color: #555;
		margin: 0 0 8px;
	}

	.benefit-col a {
		font-size: 10px;
		color: #111;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.newsletter input {
		width: 100%;
		max-width: 230px;
		border: 0;
		border-bottom: 1px solid #111;
		padding: 8px 4px;
		background: transparent;
		font-size: 11px;
		font-family: inherit;
		outline: 0;
		text-align: center;
	}

	.newsletter-sub {
		font-size: 10px !important;
		color: #777 !important;
		margin-top: 6px !important;
	}

	.store-meta {
		padding: 40px 4vw 30px;
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr 1fr;
		gap: 30px;
		font-size: 12px;
		color: #555;
	}

	.brand-block img {
		width: 140px;
		max-height: 45px;
		object-fit: contain;
		margin-bottom: 12px;
	}

	.brand-block p {
		margin: 0;
		font-size: 11px;
		color: #777;
		max-width: 280px;
	}

	.info-block {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.info-block h4 {
		margin: 0 0 8px;
		color: #111;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.info-block a {
		color: inherit;
		text-decoration: none;
	}

	.info-block a:hover {
		color: #111;
		text-decoration: underline;
	}

	.copyright {
		text-align: center;
		padding: 20px;
		font-size: 10px;
		color: #888;
		border-top: 1px solid #e5e5e5;
	}

	@media (max-width: 980px) {
		.benefits-grid {
			grid-template-columns: 1fr;
			gap: 25px;
			padding: 35px 20px;
		}

		.store-meta {
			grid-template-columns: 1fr;
			gap: 25px;
			padding: 30px 20px;
		}
	}
</style>
