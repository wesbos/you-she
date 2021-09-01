<script context="module" lang="ts">
	import Client from '../client';
	import PrismicDom from 'prismic-dom';
	import { each } from 'svelte/internal';

	export async function load(props) {
		// const document = await Client.getByUID('page', 'homepage');
		const document = await Client.getByID('YS-nXRIAAC4Ah2hu');

		return {
			props: {
				document
			}
		};
	}
</script>

<script lang="ts">
	import Person from '$lib/Person.svelte';
	import Section from '$lib/Section.svelte';

	export const prerender = true;
	export let document: Document;
</script>

<svelte:head>
	<title>You She</title>
</svelte:head>

<section>
	{#each document.data.body as data, i}
		{#if data.slice_type === 'section'}
			<Section details={data.primary} />
		{:else if data.slice_type === 'person'}
			<Person details={data.primary} />
		{/if}
	{/each}
</section>
