<script lang="ts">
	import './page.css';

	type Storefront = {
		logoUrl: string; faviconUrl: string; heroImageUrl: string; primaryColor: string;
		secondaryColor: string; accentColor: string; backgroundColor: string; textColor: string;
		headingFontFamily: string; bodyFontFamily: string; contactEmail: string; contactPhone: string;
		addressLine1: string; city: string; province: string; postalCode: string; countryCode: string;
		allowPickup: boolean; allowDelivery: boolean; minimumOrderAmount: number; currencyCode: string;
	};

	let { data } = $props();
	const demo: Storefront = {
		logoUrl: 'http://localhost:4200/images/logo/logo.svg', faviconUrl: 'http://localhost:4200/images/logo/logo.svg',
		heroImageUrl: 'http://localhost:4200/images/logo/logo.svg', primaryColor: '#111827', secondaryColor: '#374151',
		accentColor: '#2563EB', backgroundColor: '#FFFFFF', textColor: '#111827', headingFontFamily: 'Inter',
		bodyFontFamily: 'Inter', contactEmail: 'test@test.com', contactPhone: '123123123', addressLine1: 'test',
		city: 'test', province: 'test', postalCode: '18878', countryCode: 'AR', allowPickup: true,
		allowDelivery: false, minimumOrderAmount: 0, currencyCode: 'ARS'
	};
	const store = $derived({ ...demo, ...(data.storefront ?? {}) } as Storefront);
	const storeName = $derived(data.subdomain
		? data.subdomain.replaceAll('-', ' ').replace(/\b\w/g, (letter: string) => letter.toUpperCase())
		: 'Tienda Demo');
	const products = [
		{ name: 'Auriculares Pulse', category: 'Tecnología', price: 45990, icon: '🎧', tone: 'blue' },
		{ name: 'Mochila Urban', category: 'Accesorios', price: 38750, icon: '🎒', tone: 'sand' },
		{ name: 'Botella Térmica', category: 'Hogar', price: 24900, icon: '◒', tone: 'mint' }
	];
	const money = $derived(new Intl.NumberFormat('es-AR', { style: 'currency', currency: store.currencyCode, maximumFractionDigits: 0 }));
</script>

<svelte:head>
	<title>{storeName} | Tienda online</title>
	<meta name="description" content={`Comprá online en ${storeName}.`} />
	<link rel="icon" href={store.faviconUrl} />
</svelte:head>

<div class="storefront" style={`--primary:${store.primaryColor}; --secondary:${store.secondaryColor}; --accent:${store.accentColor}; --surface:${store.backgroundColor}; --text:${store.textColor}; --heading:${store.headingFontFamily}, sans-serif; --body:${store.bodyFontFamily}, sans-serif;`}>
	<div class="announcement">ENVÍOS SEGUROS · COMPRÁ FÁCIL Y RÁPIDO</div>
	<header>
		<a class="brand" href="/" aria-label={storeName}><img src={store.logoUrl} alt="" /><strong>{storeName}</strong></a>
		<nav aria-label="Navegación principal"><a href="#productos">Productos</a><a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a></nav>
		<button class="cart" aria-label="Abrir carrito"><span>Carrito</span> <b>0</b></button>
	</header>
	<main>
		<section class="hero">
			<div class="hero-copy"><span class="eyebrow">NUEVA COLECCIÓN</span><h1>Todo lo que buscás, en un solo lugar.</h1><p>Productos elegidos para acompañar tu día a día. Calidad, diseño y una compra simple.</p><a class="primary-button" href="#productos">Ver productos <span>→</span></a></div>
			<div class="hero-visual"><div class="glow"></div><img src={store.heroImageUrl} alt={`Presentación de ${storeName}`} /><div class="floating-card"><span>✓</span><div><b>Compra protegida</b><small>Pagá de forma segura</small></div></div></div>
		</section>
		<section class="benefits" aria-label="Beneficios">
			<div><span>⌁</span><p><b>Retiro sin cargo</b><small>{store.allowPickup ? 'Disponible en nuestro local' : 'Próximamente'}</small></p></div>
			<div><span>♢</span><p><b>Pago seguro</b><small>Tus datos siempre protegidos</small></p></div>
			<div><span>↗</span><p><b>Atención personalizada</b><small>Estamos para ayudarte</small></p></div>
		</section>
		<section class="products" id="productos">
			<div class="section-heading"><div><span class="eyebrow">DESTACADOS</span><h2>Elegidos para vos</h2></div><a href="#productos">Ver todos →</a></div>
			<div class="product-grid">{#each products as product}<article class="product-card"><div class={`product-image ${product.tone}`}><span>{product.icon}</span><button aria-label={`Agregar ${product.name} a favoritos`}>♡</button></div><small>{product.category}</small><h3>{product.name}</h3><div class="product-footer"><b>{money.format(product.price)}</b><button aria-label={`Agregar ${product.name} al carrito`}>+</button></div></article>{/each}</div>
		</section>
		<section class="story" id="nosotros"><div><span class="eyebrow">NUESTRA ESENCIA</span><h2>Elegimos cada detalle pensando en vos.</h2></div><p>Creemos que comprar online puede ser cercano, simple y transparente. Por eso seleccionamos productos que combinan calidad y diseño.</p></section>
	</main>
	<footer id="contacto">
		<div class="footer-brand"><div class="brand"><img src={store.logoUrl} alt="" /><strong>{storeName}</strong></div><p>Productos para disfrutar todos los días.</p></div>
		<div><b>Contacto</b><a href={`mailto:${store.contactEmail}`}>{store.contactEmail}</a><a href={`tel:${store.contactPhone}`}>{store.contactPhone}</a></div>
		<div><b>Encontranos</b><span>{store.addressLine1}</span><span>{store.city}, {store.province} ({store.postalCode})</span></div>
		<div><b>Entregas</b><span>{store.allowPickup ? 'Retiro en local' : 'Sin retiro en local'}</span><span>{store.allowDelivery ? 'Envíos disponibles' : 'Sin envíos por el momento'}</span></div>
	</footer>
	<div class="copyright">© {new Date().getFullYear()} {storeName}. Todos los derechos reservados.</div>
</div>
