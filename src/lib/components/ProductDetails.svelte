<script lang="ts">
	import { cart } from '$lib/cart.svelte';
	import type { Product } from '$lib/types';

	let { product }: { product: Product } = $props();

	let selectedSize = $state('');

	const money = (val: number) =>
		'$ ' + val.toLocaleString('es-AR', { maximumFractionDigits: 0 });

	function handleAddToCart() {
		if (!selectedSize) {
			cart.showToast('Seleccioná un talle');
			return;
		}
		cart.addToCart(product, selectedSize);
	}
</script>

<aside class="details">
	<div class="title-row">
		<h1>{product.name}</h1>
		<button class="share-btn" aria-label="Compartir" onclick={() => cart.showToast('Enlace copiado')}>
			↗
		</button>
	</div>

	<div class="prices">
		<strong>{money(product.special)}</strong>
		{#if product.price > product.special}
			<del>{money(product.price)}</del>
		{/if}
	</div>

	<p class="tax">
		Precio sin impuestos nacionales {money(Math.round(product.special * 0.826))}
	</p>

	<p class="installments">
		Cuotas s/interés: <b>3 de {money(Math.round(product.special / 3))}</b>
	</p>

	<!-- Color Swatch -->
	<div class="option">
		<span class="option-label">Color: <span>{product.color}</span></span>
		<button class="swatch active" aria-label={product.color}></button>
	</div>

	<!-- Size Selector -->
	<div class="option sizes">
		<span class="option-label">Talle {#if selectedSize}<b>({selectedSize})</b>{/if}</span>
		<div class="size-buttons">
			{#each product.sizes as size}
				<button
					class:selected={selectedSize === size}
					onclick={() => (selectedSize = size)}
				>
					{size}
				</button>
			{/each}
		</div>
	</div>

	<div class="size-tools">
		<a href="#guia" onclick={(e) => { e.preventDefault(); cart.showToast('Guía de talles disponible pronto'); }}>Tabla de talles</a>
		<a href="#guia" onclick={(e) => { e.preventDefault(); cart.showToast('Conocé tu talle próximamente'); }}>Conocé tu talle</a>
	</div>

	<!-- Add to Cart Button -->
	<button class="add-btn" onclick={handleAddToCart}>
		AGREGAR AL CARRITO
	</button>

	<!-- Description & SKU -->
	{#if product.description}
		<p class="description">{product.description}</p>
	{/if}

	{#if product.sku}
		<p class="sku">SKU: {product.sku}</p>
	{/if}

	<!-- Collapsible Accordions -->
	<div class="accordions">
		<details>
			<summary>Composición</summary>
			<p>{product.composition ?? 'Materiales seleccionados de primera calidad. Ver etiqueta interior.'}</p>
		</details>
		<details>
			<summary>Disponibilidad en locales</summary>
			<p>Consultá disponibilidad seleccionando tu talle en las sucursales habilitadas.</p>
		</details>
		<details>
			<summary>Métodos de envío</summary>
			<p>Envío gratis en compras superiores a $150.000. Entrega a domicilio en todo el país y retiro en sucursales.</p>
		</details>
		<details>
			<summary>Medios de pago</summary>
			<p>Aceptamos todas las tarjetas de débito y crédito. Disfrutá de hasta 3 cuotas sin interés con bancos seleccionados.</p>
		</details>
	</div>
</aside>

<style>
	.details {
		padding: 30px 3.3vw 60px;
		align-self: start;
	}

	.title-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 15px;
		margin-bottom: 20px;
	}

	.title-row h1 {
		font-size: 21px;
		font-weight: 500;
		margin: 0;
		line-height: 1.25;
	}

	.share-btn {
		font-size: 20px;
		background: none;
		border: 0;
		cursor: pointer;
		color: #555;
		padding: 0;
	}

	.prices {
		display: flex;
		gap: 15px;
		align-items: baseline;
	}

	.prices strong {
		font-size: 20px;
		font-weight: 600;
	}

	.prices del {
		font-size: 15px;
		color: #777;
	}

	.tax {
		font-size: 11px;
		color: #666;
		margin: 8px 0 18px;
	}

	.installments {
		font-size: 12px;
		border-bottom: 1px solid #d7d7d7;
		padding-bottom: 22px;
		margin: 0;
	}

	.installments b {
		margin-left: 6px;
	}

	.option {
		padding-top: 22px;
	}

	.option-label {
		display: block;
		font-size: 12px;
		margin-bottom: 12px;
		color: #333;
	}

	.option-label span,
	.option-label b {
		color: #111;
		font-weight: 600;
	}

	.swatch {
		width: 28px;
		height: 28px;
		background: #070707;
		border-radius: 50%;
		outline: 1px solid #111;
		outline-offset: 3px;
		margin: 3px;
		border: 0;
		cursor: pointer;
	}

	.size-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.size-buttons button {
		width: 50px;
		height: 38px;
		border: 1px solid #bcbcbc;
		font-size: 12px;
		background: #fff;
		cursor: pointer;
		transition: all 0.15s;
	}

	.size-buttons button.selected {
		color: #fff;
		background: #111;
		border-color: #111;
	}

	.size-tools {
		display: flex;
		justify-content: space-between;
		margin: 18px 0;
	}

	.size-tools a {
		font-size: 11px;
		color: #111;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.add-btn {
		height: 49px;
		width: 100%;
		background: #111;
		color: white;
		text-transform: uppercase;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.6px;
		border: 0;
		cursor: pointer;
		transition: background 0.2s;
	}

	.add-btn:hover {
		background: #333;
	}

	.description,
	.sku {
		font-size: 11px;
		line-height: 1.65;
	}

	.description {
		margin: 24px 0 8px;
		color: #444;
	}

	.sku {
		color: #777;
		margin: 0;
	}

	.accordions {
		margin-top: 22px;
		border-top: 1px solid #d7d7d7;
	}

	details {
		border-bottom: 1px solid #d7d7d7;
	}

	summary {
		list-style: none;
		padding: 18px 0;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary::after {
		content: '+';
		font-size: 18px;
		line-height: 1;
	}

	details[open] summary::after {
		content: '−';
	}

	details p {
		font-size: 11px;
		line-height: 1.55;
		color: #555;
		margin: 0 0 18px;
	}

	@media (max-width: 980px) {
		.details {
			padding: 24px 18px 45px;
		}

		.add-btn {
			position: sticky;
			bottom: 10px;
			z-index: 10;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		}
	}
</style>
