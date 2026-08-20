<script lang="ts">
	let { data } = $props();
</script>

{#if data.subdomain}
	<h1>Comercio: {data.subdomain}</h1>
{:else}
	<h1>Hub Comercio</h1>
{/if}
