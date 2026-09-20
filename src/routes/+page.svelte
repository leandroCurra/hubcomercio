<script lang="ts">
	import './page.css';
	import type { Storefront, Product } from '$lib/types';
	import { SAMPLE_PRODUCTS } from '$lib/products';
	import Header from '$lib/components/Header.svelte';
	import ProductGallery from '$lib/components/ProductGallery.svelte';
	import ProductDetails from '$lib/components/ProductDetails.svelte';
	import ProductGrid from '$lib/components/ProductGrid.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CartDrawer from '$lib/components/CartDrawer.svelte';
	import Toast from '$lib/components/Toast.svelte';

	let { data } = $props();

	const demoStorefront: Storefront = {
		logoUrl: '/assets/logo.svg',
		faviconUrl: '/assets/logo.svg',
		heroImageUrl: '/assets/banner-desktop.jpg',
		primaryColor: '#111827',
		secondaryColor: '#374151',
		accentColor: '#e52024',
		backgroundColor: '#FFFFFF',
		textColor: '#111827',
		headingFontFamily: 'Work Sans',
		bodyFontFamily: 'Work Sans',
		contactEmail: 'contacto@corestore.com.ar',
		contactPhone: '+54 11 4000-0000',
		addressLine1: 'Av. Santa Fe 1234',
		city: 'Palermo',
		province: 'CABA',
		postalCode: 'C1425',
		countryCode: 'AR',
		allowPickup: true,
		allowDelivery: true,
		minimumOrderAmount: 0,
		currencyCode: 'ARS'
	};

	const store = $derived({ ...demoStorefront, ...(data.storefront ?? {}) } as Storefront);

	const storeName = $derived(
		data.subdomain
			? data.subdomain.replaceAll('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
			: 'Penguin Store'
	);

	let activeProduct = $state<Product>(SAMPLE_PRODUCTS[0]);

	function handleSelectProduct(product: Product) {
		activeProduct = product;
		const el = document.getElementById('producto-detalle');
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<svelte:head>
	<title>{storeName} | {activeProduct.name}</title>
	<meta name="description" content={`Comprá online ${activeProduct.name} en ${storeName}.`} />
	{#if store.faviconUrl}
		<link rel="icon" href={store.faviconUrl} />
	{/if}
</svelte:head>

<div
	class="store-wrapper"
	style={`
		--primary: ${store.primaryColor || '#111827'};
		--secondary: ${store.secondaryColor || '#374151'};
		--accent: ${store.accentColor || '#e52024'};
		--surface: ${store.backgroundColor || '#FFFFFF'};
		--text: ${store.textColor || '#111827'};
		--heading: '${store.headingFontFamily || 'Work Sans'}', sans-serif;
		--body: '${store.bodyFontFamily || 'Work Sans'}', sans-serif;
	`}
>
	<!-- Global Navigation Header -->
	<Header {store} {storeName} />

	<!-- Breadcrumb -->
	<nav class="breadcrumb" aria-label="Ruta de navegación">
		<a href="/">Home</a>
		<span>|</span>
		<a href="#catalogo">Productos</a>
		<span>|</span>
		<b>{activeProduct.name}</b>
	</nav>

	<!-- Main Product Detail View (PDP) -->
	<main id="producto-detalle" class="product-section">
		<ProductGallery images={activeProduct.images} name={activeProduct.name} />
		<ProductDetails product={activeProduct} {store} />
	</main>

	<!-- Product Catalog & Filters (PLP) -->
	<ProductGrid
		products={SAMPLE_PRODUCTS}
		{store}
		onSelectProduct={handleSelectProduct}
	/>

	<!-- Global Footer -->
	<Footer {store} {storeName} />

	<!-- Slide-over Cart Drawer -->
	<CartDrawer />

	<!-- Toast Notifications -->
	<Toast />
</div>

<style>
	.store-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #fff;
	}
</style>
