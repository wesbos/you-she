<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Paypal from '$lib/Paypal.svelte';
	import '../app.css';
</script>

<main>
	<Header />
	<slot />
	<Paypal />
</main>

<footer>
	<p>&copy; You She {new Date().getFullYear()}</p>
	<a href="mailto:hello@youshe.love">hello@youshe.love</a>
</footer>

<style>
	main {
		margin: 0 auto;
		max-width: 800px;
	}
	footer {
		text-align: center;
	}
</style>
