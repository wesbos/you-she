<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		console.log('MOUNTED');
		if (typeof window !== undefined) {
			initPayPalButton();
		}
	});
	let items = [
		{ value: 'Listing', price: 5, id: 'listing' },
		{ value: 'ISO', price: 5, id: 'iso' },
		{ value: 'ISO+Reserve', price: 8, id: 'iso-plus-reserve' },
		{ value: 'Reserve', price: 3, id: 'reserve' }
	];

	let quantity = '1';
	let selected = items[0];
	let message;

	function initPayPalButton() {
		paypal
			.Buttons({
				style: {
					shape: 'rect',
					color: 'blue',
					layout: 'vertical',
					label: 'paypal'
				},
				createOrder: function (data, actions) {
					console.log('Creating Order');
					const total = selected.price * parseInt(quantity);

					const order = {
						purchase_units: [
							{
								description: `You She - Instagram ${selected.value}`,
								amount: {
									currency_code: 'USD',
									value: total,
									breakdown: {
										item_total: {
											currency_code: 'USD',
											value: total
										}
									}
								},
								items: [
									{
										name: selected.value,
										unit_amount: {
											currency_code: 'USD',
											value: selected.price
										},
										quantity: quantity
									}
								]
							}
						]
					};
					console.log({ order });
					return actions.order.create(order);
				},
				onApprove: function (data, actions) {
					return actions.order.capture().then(function (orderData) {
						// Full available details
						console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
						message = '<h3>Thank you for your payment!</h3>';
					});
				},
				onError: function (err) {
					console.log(err);
					message = err.message;
				}
			})
			.render('#paypal-button-container');
	}
</script>

<svelte:head>
	<script
		src="https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=USD"
		data-sdk-integration-source="button-factory"></script>
</svelte:head>

<div class="checkout">
	<div id="smart-button-container">
		<div>
			<div>
				<p>You+She Items</p>

				{#if message}
					<p>{message}</p>
				{/if}

				<select bind:value={selected}>
					{#each items as item}
						<option value={item}>{item.value} - {item.price} USD</option>
					{/each}
				</select>
				<select id="quantitySelect" bind:value={quantity}>
					<option value="1" selected>1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</div>
			<div id="paypal-button-container" />
		</div>
	</div>
</div>
