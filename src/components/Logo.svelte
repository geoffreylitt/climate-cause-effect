<div class="logo">
	<img class="logotype" src="/logo-hq.svg" alt="HQ logo">
	<div class="arrow">
		<img class="bar" src="/logo-bar.svg" alt="Arrow part">
		<img class="end" src="/logo-end.svg" alt="Arrow part">
	</div>
	<img class="logotype" src="/logo-co2.svg" alt="CO2 logo">
</div>

<style>
	.logotype, .end {
		flex-grow: 0;
		flex-shrink: 0;
	}

	.bar {
		flex-grow: 1;
		flex-shrink: 1;
		margin-right: -1px;
		width: 0; /* grow up from zero space */
	}

	.logo {
		height: 4rem;
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

	/* mobile */
	@media only screen and (max-width: 480px) {
		.logo {
			height: 3rem;
		}
  }
</style>