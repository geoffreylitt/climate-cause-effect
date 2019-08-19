<script>
  import PanelName from './PanelName.svelte'
	export let data;
</script>

<div class="panel">
	<hr>
		<PanelName {data} />
	<hr>
</div>