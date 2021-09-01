<script>
	import PrismicDom from 'prismic-dom';
	export let details;
</script>

<section>
	{@html PrismicDom.RichText.asHtml(details.title)}
	{@html PrismicDom.RichText.asHtml(details.text)}
</section>
