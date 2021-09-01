<script>
	import PrismicDom from 'prismic-dom';
	export let details;
</script>

<div class="person">
	{@html PrismicDom.RichText.asHtml(details.name)}
	{@html PrismicDom.RichText.asHtml(details.description)}
</div>
