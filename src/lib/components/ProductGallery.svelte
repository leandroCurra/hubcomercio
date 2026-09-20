<script lang="ts">
	let { images = [], name = 'Producto' }: { images: string[]; name: string } = $props();

	let current = $state(0);
	let startX = 0;

	function next() {
		current = (current + 1) % images.length;
	}

	function prev() {
		current = (current - 1 + images.length) % images.length;
	}

	function goTo(index: number) {
		current = index;
	}

	function handleTouchStart(e: TouchEvent) {
		startX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		const diff = e.changedTouches[0].clientX - startX;
		if (Math.abs(diff) > 40) {
			if (diff < 0) next();
			else prev();
		}
	}
</script>

<section class="gallery">
	<div class="badges">
		<b>Sale</b>
		<b>50% Off</b>
	</div>

	<div
		class="track"
		style={`transform: translateX(-${current * 100}%);`}
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
	>
		{#each images as img, i}
			<figure>
				<img src={img} alt={`${name} - imagen ${i + 1}`} />
			</figure>
		{/each}
	</div>

	{#if images.length > 1}
		<button class="arrow prev" onclick={prev} aria-label="Foto anterior">‹</button>
		<button class="arrow next" onclick={next} aria-label="Foto siguiente">›</button>

		<div class="dots">
			{#each images as _, i}
				<button
					class:active={current === i}
					onclick={() => goTo(i)}
					aria-label={`Ir a foto ${i + 1}`}
				></button>
			{/each}
		</div>
	{/if}
</section>

<style>
	.gallery {
		position: relative;
		overflow: hidden;
		background: #f5f5f5;
		width: 100%;
		height: 100%;
		min-height: 520px;
	}

	.track {
		height: 100%;
		display: flex;
		transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.track figure {
		margin: 0;
		min-width: 100%;
		height: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	.track img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.badges {
		position: absolute;
		z-index: 5;
		left: 20px;
		top: 20px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.badges b {
		background: #e52024;
		color: #fff;
		padding: 7px 13px;
		text-transform: uppercase;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.5px;
		width: max-content;
	}

	.arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-size: 40px;
		color: #333;
		padding: 15px 20px;
		background: rgba(255, 255, 255, 0.5);
		border: 0;
		cursor: pointer;
		z-index: 5;
		transition: background 0.2s;
	}

	.arrow:hover {
		background: rgba(255, 255, 255, 0.9);
	}

	.prev {
		left: 10px;
	}

	.next {
		right: 10px;
	}

	.dots {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 8px;
		z-index: 5;
	}

	.dots button {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #bbb;
		border: 0;
		padding: 0;
		cursor: pointer;
		transition: background 0.2s;
	}

	.dots button.active {
		background: #111;
		width: 20px;
		border-radius: 4px;
	}

	@media (max-width: 980px) {
		.gallery {
			min-height: 400px;
		}

		.badges {
			left: 12px;
			top: 12px;
		}

		.badges b {
			padding: 5px 10px;
			font-size: 9px;
		}

		.arrow {
			font-size: 30px;
			padding: 10px 14px;
		}
	}
</style>
