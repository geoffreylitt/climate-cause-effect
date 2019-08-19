<script>
  import PanelName from './PanelName.svelte'
	export let data;
</script>

<div class="panel">
	<hr>
		<PanelName {data} />
	<hr>
</div>

<style>
	.name {
		font-size: 3rem;
		line-height: 0.8;
		padding-bottom: 1.5rem;
	}
	
	.location {
		display: flex;
		align-items: baseline;
	}

	.address {
		font-size: 1.5rem;
		padding-right: 0.5rem
	}
</style>