<div class="logo">
	<img class="logotype" src="/logo-hq.svg">
	<div class="arrow">
		<img class="bar" src="/logo-bar.svg">
		<img class="end" src="/logo-end.svg">
	</div>
	<img class="logotype" src="/logo-co2.svg">
</div>

<style>
	.logotype, .end {
		flex-grow: 0;
		flex-shrink: 0;
	}

	.bar {
		flex-grow: 1;
		margin-right: -1px;
	}

	.logo {
		height: 3rem;
		display: flex;
		justify-content: space-between;
	}

	.arrow {
		flex-grow: 1;
		display: flex;
		justify-content: space-between;
	}

	img {
		height: 100%;
	}
</style>