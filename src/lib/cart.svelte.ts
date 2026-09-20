import type { CartItem, Product } from './types';

class CartState {
	items = $state<CartItem[]>([]);
	isDrawerOpen = $state(false);
	isMenuOpen = $state(false);
	isFiltersOpen = $state(false);
	toastMessage = $state<string | null>(null);

	get totalCount() {
		return this.items.reduce((sum, item) => sum + item.quantity, 0);
	}

	get totalAmount() {
		return this.items.reduce((sum, item) => sum + item.product.special * item.quantity, 0);
	}

	addToCart(product: Product, size: string) {
		const existing = this.items.find(
			(item) => item.product.id === product.id && item.size === size
		);
		if (existing) {
			existing.quantity += 1;
		} else {
			this.items.push({ product, size, quantity: 1 });
		}
		this.isDrawerOpen = true;
	}

	removeFromCart(index: number) {
		this.items.splice(index, 1);
	}

	showToast(msg: string) {
		this.toastMessage = msg;
		setTimeout(() => {
			if (this.toastMessage === msg) {
				this.toastMessage = null;
			}
		}, 2200);
	}

	closeAll() {
		this.isDrawerOpen = false;
		this.isMenuOpen = false;
		this.isFiltersOpen = false;
	}
}

export const cart = new CartState();
