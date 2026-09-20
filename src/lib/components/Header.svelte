<script lang="ts">
	import { cart } from '$lib/cart.svelte';
	import type { Storefront } from '$lib/types';

	let { store, storeName }: { store: Storefront; storeName: string } = $props();

	let searchQuery = $state('');
</script>

<!-- Top Announcement Promo (Dynamic from Store Settings) -->
<div class="promo">
	<span>
		{#if store?.allowDelivery && store?.allowPickup}
			ENVÍOS A TODO EL PAÍS Y RETIRO EN LOCAL DISPONIBLE · {store?.city ? store.city.toUpperCase() : 'TIENDA OFICIAL'}
		{:else if store?.allowDelivery}
			ENVÍOS A DOMICILIO DISPONIBLES · {store?.city ? store.city.toUpperCase() : 'ARGENTINA'}
		{:else if store?.allowPickup}
			RETIRO POR NUESTRO LOCAL: {store?.addressLine1 ? store.addressLine1.toUpperCase() : ''}
		{:else}
			VENTA ONLINE · {storeName.toUpperCase()}
		{/if}
		{#if store?.minimumOrderAmount && store.minimumOrderAmount > 0}
			· COMPRA MÍNIMA ${store.minimumOrderAmount.toLocaleString('es-AR')}
		{/if}
	</span>
</div>

<!-- Main Header -->
<header class="header">
	<button
		class="icon-btn menu-btn"
		aria-label="Abrir menú"
		onclick={() => (cart.isMenuOpen = true)}
	>
		☰
	</button>

	<a href="/" class="brand">
		{#if store?.logoUrl && store.logoUrl !== 'http://localhost:4200/images/logo/logo.svg'}
			<img src={store.logoUrl} alt={storeName} />
		{:else}
			<img src="/assets/logo.svg" alt={storeName} />
		{/if}
	</a>

	<nav class="nav">
		<a href="/" class="active">SALE</a>
		<a href="/#catalogo">COLECCIÓN</a>
		<a href="/#beneficios">BENEFICIOS</a>
		<a href="/#contacto">CONTACTO</a>
	</nav>

	<div class="actions">
		<div class="search-box">
			<span class="search-icon">⌕</span>
			<input
				type="text"
				placeholder="¿Qué estás buscando?"
				bind:value={searchQuery}
			/>
		</div>

		{#if store?.contactPhone}
			<a
				href={`https://wa.me/${store.contactPhone.replace(/\D/g, '')}`}
				target="_blank"
				rel="noopener noreferrer"
				class="contact-link"
				title={`Contactar por WhatsApp al ${store.contactPhone}`}
			>
				WhatsApp
			</a>
		{/if}

		<button class="account-btn" aria-label="Mi cuenta">♙</button>

		<button
			class="cart-open"
			aria-label="Carrito"
			onclick={() => (cart.isDrawerOpen = true)}
		>
			<span class="cart-icon">▢</span>
			<sup class="cart-count">{cart.totalCount}</sup>
		</button>
	</div>
</header>

<!-- Mobile Navigation Drawer -->
<aside class="mobile-nav" class:open={cart.isMenuOpen} aria-hidden={!cart.isMenuOpen}>
	<button
		class="close-menu"
		onclick={() => (cart.isMenuOpen = false)}
		aria-label="Cerrar menú"
	>
		×
	</button>
	<div class="mobile-nav-content">
		<a href="/" onclick={() => (cart.isMenuOpen = false)}>SALE</a>
		<a href="/#catalogo" onclick={() => (cart.isMenuOpen = false)}>INVIERNO 26</a>
		<a href="/#catalogo" onclick={() => (cart.isMenuOpen = false)}>2X1</a>
		<a href="/#beneficios" onclick={() => (cart.isMenuOpen = false)}>BENEFICIOS</a>
		<a href="/#contacto" onclick={() => (cart.isMenuOpen = false)}>CONTACTO</a>
	</div>
</aside>

<style>
	.promo {
		height: 31px;
		background: #000;
		color: #fff;
		display: grid;
		place-items: center;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.5px;
	}

	.header {
		height: 92px;
		padding: 0 3.2vw;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		position: sticky;
		top: 0;
		background: #fff;
		z-index: 30;
	}

	.brand {
		width: 220px;
		display: flex;
		align-items: center;
	}

	.brand img {
		display: block;
		width: 170px;
		max-height: 58px;
		object-fit: contain;
	}

	.nav {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 40px;
		white-space: nowrap;
	}

	.nav a {
		text-decoration: none;
		font-size: 13px;
		font-weight: 500;
		color: #111;
		transition: border-bottom 0.15s;
		padding-bottom: 2px;
	}

	.nav a:hover,
	.nav a.active {
		border-bottom: 1px solid #111;
	}

	.actions {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.search-box {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #aaa;
		padding: 6px 0;
		width: 180px;
	}

	.search-icon {
		font-size: 19px;
		margin-right: 6px;
		color: #555;
	}

	.search-box input {
		border: 0;
		outline: 0;
		background: transparent;
		font-size: 11px;
		width: 100%;
		font-family: inherit;
		color: #333;
	}

	.contact-link {
		font-size: 11px;
		font-weight: 600;
		color: #25d366;
		text-decoration: none;
		border: 1px solid #25d366;
		padding: 5px 10px;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.contact-link:hover {
		background: #25d366;
		color: #fff;
	}

	.account-btn {
		background: none;
		border: 0;
		font-size: 19px;
		cursor: pointer;
		color: #111;
	}

	.cart-open {
		background: none;
		border: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 2px;
		color: #111;
		padding: 4px;
	}

	.cart-icon {
		font-size: 19px;
	}

	.cart-count {
		font-size: 10px;
		font-weight: 700;
		background: #111;
		color: #fff;
		border-radius: 50%;
		width: 17px;
		height: 17px;
		display: inline-grid;
		place-items: center;
		margin-left: 2px;
	}

	.menu-btn {
		display: none;
		background: none;
		border: 0;
		font-size: 22px;
		cursor: pointer;
		color: #111;
		padding: 0;
	}

	.mobile-nav {
		position: fixed;
		z-index: 45;
		top: 0;
		left: 0;
		bottom: 0;
		width: min(85vw, 360px);
		background: #fff;
		transform: translateX(-100%);
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		padding: 70px 30px;
		box-shadow: 4px 0 25px rgba(0, 0, 0, 0.15);
	}

	.mobile-nav.open {
		transform: translateX(0);
	}

	.close-menu {
		position: absolute;
		right: 20px;
		top: 15px;
		font-size: 32px;
		border: 0;
		background: none;
		cursor: pointer;
	}

	.mobile-nav-content a {
		display: block;
		padding: 18px 0;
		border-bottom: 1px solid #eee;
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		color: #111;
	}

	@media (max-width: 980px) {
		.header {
			height: 65px;
			padding: 0 16px;
			justify-content: space-between;
		}

		.menu-btn {
			display: block;
		}

		.brand {
			width: auto;
		}

		.brand img {
			width: 130px;
			max-height: 42px;
		}

		.nav,
		.search-box,
		.account-btn {
			display: none;
		}

		.actions {
			margin: 0;
			gap: 0;
		}
	}
</style>
