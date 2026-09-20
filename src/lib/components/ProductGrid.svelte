<script lang="ts">
	import { cart } from '$lib/cart.svelte';
	import type { Product } from '$lib/types';

	let {
		products = [],
		onSelectProduct
	}: {
		products: Product[];
		onSelectProduct?: (product: Product) => void;
	} = $props();

	let columns = $state<'four' | 'six'>('four');
	let sortBy = $state('featured');
	let selectedCategories = $state<string[]>([]);
	let selectedSizes = $state<string[]>([]);
	let likedProducts = $state<Set<string>>(new Set());

	const categories = ['Remera', 'Denim', 'Camisa', 'Campera', 'Pantalón'];
	const availableSizes = ['S', 'M', 'L', 'XL'];

	const money = (val: number) =>
		'$ ' + val.toLocaleString('es-AR', { maximumFractionDigits: 0 });

	function toggleFavorite(id: string, e: MouseEvent) {
		e.stopPropagation();
		const next = new Set(likedProducts);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
			cart.showToast('Agregado a favoritos');
		}
		likedProducts = next;
	}

	function toggleCategory(cat: string) {
		if (selectedCategories.includes(cat)) {
			selectedCategories = selectedCategories.filter((c) => c !== cat);
		} else {
			selectedCategories = [...selectedCategories, cat];
		}
	}

	function toggleSize(sz: string) {
		if (selectedSizes.includes(sz)) {
			selectedSizes = selectedSizes.filter((s) => s !== sz);
		} else {
			selectedSizes = [...selectedSizes, sz];
		}
	}

	function clearFilters() {
		selectedCategories = [];
		selectedSizes = [];
	}

	// Filter and Sort logic
	const filteredProducts = $derived.by(() => {
		let list = products.filter((p) => {
			if (
				selectedCategories.length > 0 &&
				!selectedCategories.includes(p.category)
			) {
				return false;
			}
			if (
				selectedSizes.length > 0 &&
				!p.sizes.some((s) => selectedSizes.includes(s))
			) {
				return false;
			}
			return true;
		});

		if (sortBy === 'low') {
			list.sort((a, b) => a.special - b.special);
		} else if (sortBy === 'high') {
			list.sort((a, b) => b.special - a.special);
		} else if (sortBy === 'name') {
			list.sort((a, b) => a.name.localeCompare(b.name));
		} else {
			list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
		}

		return list;
	});
</script>

<div class="catalog" id="catalogo">
	<!-- Hero Banner -->
	<picture class="hero-banner">
		<source media="(max-width: 700px)" srcset="/assets/banner-mobile.jpg" />
		<img src="/assets/banner-desktop.jpg" alt="Winter Sale hasta 60% off" />
	</picture>

	<section class="catalog-content">
		<div class="heading">
			<h1>SALE</h1>
			<p>{filteredProducts.length} productos disponibles</p>
		</div>

		<!-- Filter and View Bar -->
		<div class="filterbar">
			<button
				class="filter-open"
				onclick={() => (cart.isFiltersOpen = true)}
			>
				FILTRAR +
			</button>

			<div class="view-controls">
				<span>VER</span>
				<button
					class:on={columns === 'four'}
					onclick={() => (columns = 'four')}
					aria-label="4 columnas"
				>
					▦
				</button>
				<button
					class:on={columns === 'six'}
					onclick={() => (columns = 'six')}
					aria-label="6 columnas"
				>
					▦
				</button>
			</div>

			<label class="sort-label">
				ORDENAR POR
				<select bind:value={sortBy}>
					<option value="featured">Destacados</option>
					<option value="low">Menor precio</option>
					<option value="high">Mayor precio</option>
					<option value="name">Nombre</option>
				</select>
			</label>
		</div>

		<!-- Filter Drawer -->
		<aside class="filters-drawer" class:open={cart.isFiltersOpen}>
			<button
				class="filter-close"
				onclick={() => (cart.isFiltersOpen = false)}
				aria-label="Cerrar filtros"
			>
				×
			</button>
			<h2>FILTRAR</h2>

			<fieldset>
				<legend>Categoría</legend>
				{#each categories as cat}
					<label class="checkbox-label">
						<input
							type="checkbox"
							checked={selectedCategories.includes(cat)}
							onchange={() => toggleCategory(cat)}
						/>
						{cat}
					</label>
				{/each}
			</fieldset>

			<fieldset>
				<legend>Talle</legend>
				<div class="chips">
					{#each availableSizes as sz}
						<button
							class:on={selectedSizes.includes(sz)}
							onclick={() => toggleSize(sz)}
						>
							{sz}
						</button>
					{/each}
				</div>
			</fieldset>

			<button class="clear-btn" onclick={clearFilters}>
				LIMPIAR FILTROS
			</button>
		</aside>

		<!-- Product Grid -->
		<div class="grid" class:six={columns === 'six'}>
			{#each filteredProducts as product}
				<article
					class="card"
					onclick={() => onSelectProduct?.(product)}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && onSelectProduct?.(product)}
				>
					<div class="photo">
						<div class="labels">
							<b>Sale</b>
							<b>60% Off</b>
						</div>

						<button
							class="heart"
							class:liked={likedProducts.has(product.id)}
							onclick={(e) => toggleFavorite(product.id, e)}
							aria-label="Favorito"
						>
							{likedProducts.has(product.id) ? '♥' : '♡'}
						</button>

						<img src={product.image} alt={product.name} />
						{#if product.hover}
							<img class="hover-img" src={product.hover} alt={`${product.name} alternativa`} />
						{/if}
					</div>

					<div class="info">
						<h2>{product.name}</h2>
						<p class="color">{product.color}</p>
						<div class="prices">
							<strong>{money(product.special)}</strong>
							{#if product.price > product.special}
								<del>{money(product.price)}</del>
							{/if}
						</div>
						<p class="installment">
							3 cuotas sin interés de {money(Math.round(product.special / 3))}
						</p>
						<button
							class="buy-btn"
							onclick={(e) => {
								e.stopPropagation();
								onSelectProduct?.(product);
							}}
						>
							SELECCIONAR TALLE
						</button>
					</div>
				</article>
			{/each}
		</div>
	</section>
</div>

<style>
	.catalog {
		width: 100%;
	}

	.hero-banner {
		display: block;
		width: 100%;
	}

	.hero-banner img {
		display: block;
		width: 100%;
		height: auto;
	}

	.catalog-content {
		padding: 35px 2.6vw 80px;
	}

	.heading {
		text-align: center;
		margin-bottom: 25px;
	}

	.heading h1 {
		font-size: 26px;
		font-weight: 500;
		letter-spacing: 2px;
		margin: 4px 0;
	}

	.heading p {
		font-size: 11px;
		color: #777;
		margin: 0;
	}

	.filterbar {
		margin: 30px 0 25px;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 11px;
	}

	.filter-open {
		font-size: 11px;
		font-weight: 600;
		background: none;
		border: 0;
		cursor: pointer;
		color: #111;
		letter-spacing: 0.5px;
	}

	.view-controls {
		display: flex;
		gap: 12px;
		align-items: center;
		margin-left: auto;
		margin-right: 35px;
		color: #777;
	}

	.view-controls button {
		background: none;
		border: 0;
		cursor: pointer;
		opacity: 0.35;
		font-size: 19px;
		padding: 0;
		color: #111;
		transition: opacity 0.2s;
	}

	.view-controls button.on {
		opacity: 1;
	}

	.sort-label {
		display: flex;
		gap: 12px;
		align-items: center;
		color: #555;
	}

	.sort-label select {
		border: 0;
		border-bottom: 1px solid #aaa;
		background: #fff;
		font-size: 11px;
		padding: 6px 15px 6px 4px;
		font-family: inherit;
		outline: 0;
		cursor: pointer;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 46px 12px;
		transition: grid-template-columns 0.3s;
	}

	.grid.six {
		grid-template-columns: repeat(6, 1fr);
	}

	.card {
		min-width: 0;
		cursor: pointer;
		outline: 0;
	}

	.photo {
		position: relative;
		aspect-ratio: 0.755;
		background: #f5f5f5;
		overflow: hidden;
	}

	.photo img {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: opacity 0.3s ease;
	}

	.photo .hover-img {
		opacity: 0;
	}

	.photo:hover .hover-img {
		opacity: 1;
	}

	.labels {
		position: absolute;
		left: 8px;
		top: 8px;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.labels b {
		background: #e52024;
		color: #fff;
		font-size: 9px;
		font-weight: 600;
		padding: 6px 9px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		width: max-content;
	}

	.heart {
		position: absolute;
		right: 10px;
		top: 9px;
		z-index: 2;
		font-size: 20px;
		background: none;
		border: 0;
		cursor: pointer;
		color: #333;
		padding: 2px;
	}

	.heart.liked {
		color: #e52024;
	}

	.info {
		text-align: center;
		padding: 13px 4px;
	}

	.info h2 {
		font-weight: 400;
		font-size: 13px;
		margin: 0 0 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.color {
		font-size: 10px;
		color: #777;
		margin: 0 0 8px;
		text-transform: uppercase;
	}

	.prices {
		font-size: 12px;
	}

	.prices strong {
		font-weight: 600;
		margin-right: 6px;
	}

	.prices del {
		color: #888;
		font-size: 11px;
	}

	.installment {
		font-size: 10px;
		color: #777;
		margin: 4px 0 0;
	}

	.buy-btn {
		width: 100%;
		height: 36px;
		border: 1px solid #111;
		background: #fff;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.5px;
		margin-top: 10px;
		opacity: 0;
		cursor: pointer;
		transition: all 0.2s;
	}

	.card:hover .buy-btn {
		opacity: 1;
	}

	.buy-btn:hover {
		background: #111;
		color: #fff;
	}

	/* Filters Drawer */
	.filters-drawer {
		position: fixed;
		z-index: 45;
		left: 0;
		top: 0;
		bottom: 0;
		width: min(90vw, 380px);
		background: #fff;
		padding: 50px 30px;
		transform: translateX(-100%);
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 4px 0 25px rgba(0, 0, 0, 0.15);
	}

	.filters-drawer.open {
		transform: none;
	}

	.filter-close {
		position: absolute;
		right: 20px;
		top: 15px;
		font-size: 30px;
		border: 0;
		background: none;
		cursor: pointer;
	}

	.filters-drawer h2 {
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 1px;
		margin: 0 0 10px;
	}

	.filters-drawer fieldset {
		border: 0;
		border-top: 1px solid #eee;
		padding: 20px 0;
		margin: 0;
	}

	.filters-drawer legend {
		font-size: 12px;
		font-weight: 600;
		margin-bottom: 10px;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		margin: 10px 0;
		cursor: pointer;
	}

	.chips {
		display: flex;
		gap: 8px;
	}

	.chips button {
		border: 1px solid #ccc;
		padding: 8px 12px;
		font-size: 11px;
		background: #fff;
		cursor: pointer;
		transition: all 0.15s;
	}

	.chips button.on {
		background: #111;
		color: #fff;
		border-color: #111;
	}

	.clear-btn {
		font-size: 11px;
		text-decoration: underline;
		background: none;
		border: 0;
		cursor: pointer;
		color: #555;
		margin-top: 10px;
	}

	@media (max-width: 980px) {
		.catalog-content {
			padding: 20px 10px 55px;
		}

		.view-controls {
			display: none;
		}

		.grid,
		.grid.six {
			grid-template-columns: repeat(2, 1fr);
			gap: 30px 8px;
		}

		.buy-btn {
			opacity: 1;
			height: 34px;
		}
	}
</style>
