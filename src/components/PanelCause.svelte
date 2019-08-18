<script>
	import { formatLatitude, formatLongitude } from 'latlon-formatter';
	export let data;
</script>

<div class="panel">
	<hr>
	<div class="name">
		{data.name} <span class="suffix">{data.suffix || ''}</span>
	</div>
	<div class="location">
		<div class="address">{data.city}</div>
		<div class="latlong">🌎 {formatLatitude(data.lat)}, {formatLongitude(data.long)}</div>
	</div>
	<hr>
		<div class="stocks">{data.stock_ticker}</div>
	<hr>
	<div class="info">
		<div class="figure market-cap">
			<div class="caption">Market<br>Cap</div>
			<div class="number">${data.market_cap}B</div>
		</div>
		<div class="figure emissions">
			<div class="caption">Yearly<br>Emissions</div>
			<div class="number">{data.sample_emissions}</div>
			<div class="units">MTCO<sub>2</sub></div>
		</div>
	</div>
	<hr>
</div>

<style>
	.name {
		font-size: 3rem;
		line-height: 0.8;
		padding-bottom: 1.5rem;
	}

	.name .suffix {
		color: var(--secondary);
	}

	.location {
		display: flex;
		align-items: baseline;
	}

	.address {
		font-size: 1.5rem;
		padding-right: 0.5rem
	}

	.info {
		display: flex;
	}

	.figure {
		width: 50%;
		display: flex;
		align-items: flex-start;
	}

	.caption {
		padding-right: 0.5rem;
		text-transform: uppercase;
	}

	.number {
		font-size: 3rem;
		line-height: 0.8;
		padding-right: 0.5rem;
	}

	hr {
		margin: 0.5rem 0;
		border: none;
		border-top: 2px solid var(--secondary);
	}
</style>