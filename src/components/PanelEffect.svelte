<script>
	import { formatLatitude, formatLongitude } from 'latlon-formatter';
	export let data;
</script>

<div class="panel">
	<hr>
	<div class="name">
		{data.name}
	</div>
	<div class="location">
		<div class="address">{data.address}</div>
		<div class="latlong">🌎 {formatLatitude(data.lat)}, {formatLongitude(data.long)}</div>
	</div>
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

	hr {
		margin: 0.5rem 0;
		border: none;
		border-top: 2px solid var(--secondary);
	}
</style>