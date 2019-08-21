<script>
  import PanelName from './PanelName.svelte'
	export let data;
</script>

<div class="panel">
	<hr>
		<PanelName {data} />
	<hr>
		{#if data.story}
			<div class="info">
				{data.story}
				{#if data.link}
					<br />
					<br />
					<a href="{data.link}" target="_blank">Read more</a>
				{/if}
			</div>
			<hr/> 
		{/if}
</div>

<style>
	.info {
		font-size: 1.2rem;
	}

	@media only screen and (max-width: 480px) {
    .info {
			font-size: 0.8rem;
		}
  }
</style>