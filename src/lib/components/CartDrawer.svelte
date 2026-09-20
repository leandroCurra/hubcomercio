<script lang="ts">
	import { cart } from '$lib/cart.svelte';

	const money = (val: number) =>
		'$ ' + val.toLocaleString('es-AR', { maximumFractionDigits: 0 });
</script>

<!-- Backdrop Overlay -->
<div
	class="overlay"
	class:open={cart.isDrawerOpen || cart.isMenuOpen || cart.isFiltersOpen}
	onclick={() => cart.closeAll()}
	onkeydown={(e) => e.key === 'Escape' && cart.closeAll()}
	role="button"
	tabindex="0"
	aria-label="Cerrar modal"
></div>

<!-- Cart Drawer -->
<aside
	class="cart-drawer"
	class:open={cart.isDrawerOpen}
	aria-hidden={!cart.isDrawerOpen}
>
	<button
		class="cart-close"
		onclick={() => (cart.isDrawerOpen = false)}
		aria-label="Cerrar carrito"
	>
		×
	</button>

	<h2>Mi Carrito ({cart.totalCount})</h2>

	{#if cart.items.length === 0}
		<div class="cart-empty">
			<span class="empty-icon">▢</span>
			<p>Tu carrito está vacío</p>
			<button class="continue-btn" onclick={() => (cart.isDrawerOpen = false)}>
				VER PRODUCTOS
			</button>
		</div>
	{:else}
		<div class="cart-items">
			{#each cart.items as item, index}
				<article class="cart-item">
					<img src={item.product.image} alt={item.product.name} />
					<div class="item-info">
						<h3>{item.product.name}</h3>
						<p class="item-meta">
							Talle: <b>{item.size}</b> · Cant: <b>{item.quantity}</b>
						</p>
						<p class="item-price">
							<strong>{money(item.product.special * item.quantity)}</strong>
							{#if item.product.price > item.product.special}
								<del>{money(item.product.price * item.quantity)}</del>
							{/if}
						</p>
					</div>
					<button
						class="item-remove"
						onclick={() => cart.removeFromCart(index)}
						aria-label="Eliminar ítem"
					>
						✕
					</button>
				</article>
			{/each}
		</div>

		<div class="cart-footer">
			<div class="subtotal-row">
				<span>Subtotal</span>
				<strong>{money(cart.totalAmount)}</strong>
			</div>
			<p class="installments-hint">
				Hasta 3 cuotas sin interés de {money(Math.round(cart.totalAmount / 3))}
			</p>
			<button class="checkout-btn">
				INICIAR COMPRA
			</button>
			<button class="keep-shopping" onclick={() => (cart.isDrawerOpen = false)}>
				Seguir comprando
			</button>
		</div>
	{/if}
</aside>

<style>
	.overlay {
		position: fixed;
		z-index: 40;
		inset: 0;
		background: rgba(0, 0, 0, 0.55);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.overlay.open {
		opacity: 1;
		pointer-events: auto;
	}

	.cart-drawer {
		position: fixed;
		z-index: 45;
		top: 0;
		right: 0;
		bottom: 0;
		width: min(92vw, 440px);
		background: #fff;
		transform: translateX(100%);
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		display: flex;
		flex-direction: column;
		padding: 30px 25px 25px;
		box-shadow: -4px 0 25px rgba(0, 0, 0, 0.15);
	}

	.cart-drawer.open {
		transform: translateX(0);
	}

	.cart-close {
		position: absolute;
		right: 20px;
		top: 18px;
		font-size: 32px;
		line-height: 1;
		border: 0;
		background: none;
		cursor: pointer;
		color: #111;
	}

	h2 {
		font-size: 17px;
		font-weight: 600;
		margin: 0 0 25px;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.cart-empty {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 15px;
		color: #666;
	}

	.empty-icon {
		font-size: 40px;
		opacity: 0.3;
	}

	.continue-btn {
		margin-top: 10px;
		padding: 12px 24px;
		background: #111;
		color: #fff;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 1px;
		border: 0;
		cursor: pointer;
	}

	.cart-items {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding-right: 5px;
	}

	.cart-item {
		display: flex;
		align-items: center;
		gap: 15px;
		padding-bottom: 16px;
		border-bottom: 1px solid #eee;
		position: relative;
	}

	.cart-item img {
		width: 70px;
		height: 88px;
		object-fit: cover;
		background: #f5f5f5;
	}

	.item-info {
		flex: 1;
	}

	.item-info h3 {
		font-size: 13px;
		font-weight: 500;
		margin: 0 0 4px;
	}

	.item-meta {
		font-size: 11px;
		color: #666;
		margin: 0 0 6px;
	}

	.item-price {
		margin: 0;
		font-size: 13px;
	}

	.item-price del {
		font-size: 11px;
		color: #888;
		margin-left: 6px;
	}

	.item-remove {
		background: none;
		border: 0;
		cursor: pointer;
		font-size: 14px;
		color: #999;
		padding: 6px;
	}

	.item-remove:hover {
		color: #111;
	}

	.cart-footer {
		border-top: 1px solid #ddd;
		padding-top: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.subtotal-row {
		display: flex;
		justify-content: space-between;
		font-size: 16px;
	}

	.installments-hint {
		font-size: 11px;
		color: #666;
		margin: 0;
	}

	.checkout-btn {
		height: 48px;
		background: #111;
		color: #fff;
		border: 0;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 1px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.checkout-btn:hover {
		background: #333;
	}

	.keep-shopping {
		background: none;
		border: 0;
		text-align: center;
		font-size: 11px;
		text-decoration: underline;
		cursor: pointer;
		color: #666;
		padding: 5px 0;
	}
</style>
