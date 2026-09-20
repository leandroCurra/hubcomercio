<script lang="ts">
	import { cart } from '$lib/cart.svelte';
</script>

<div class="toast" class:show={Boolean(cart.toastMessage)} role="status">
	{cart.toastMessage ?? ''}
</div>

<style>
	.toast {
		position: fixed;
		z-index: 50;
		bottom: 25px;
		left: 50%;
		transform: translate(-50%, 30px);
		opacity: 0;
		background: #111;
		color: #fff;
		padding: 13px 24px;
		font-size: 12px;
		border-radius: 4px;
		letter-spacing: 0.3px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		pointer-events: none;
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.toast.show {
		opacity: 1;
		transform: translate(-50%, 0);
	}
</style>
