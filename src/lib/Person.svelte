<script>
	import PrismicDom from 'prismic-dom';
	export let details;
	console.log(details);
</script>

<div class="person">
	{@html PrismicDom.RichText.asHtml(details.name)}
	{#if details.image?.url}
		<img width="200" src={details.image.url} alt={details.name[0].text} />
	{/if}
	{@html PrismicDom.RichText.asHtml(details.description)}
</div>

<style>
	.person {
		clear: both;
		padding: 20px 0;
	}
	img {
		float: left;
		margin-top: 20px;
		margin-right: 20px;
	}
</style>
