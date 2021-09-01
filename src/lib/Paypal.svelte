<div class="checkout">
	<div id="smart-button-container">
		<div style="text-align: center;">
			<div style="margin-bottom: 1.25rem;">
				<p>You+She Items</p>
				<select id="item-options">
					<option value="Listing" price="5">Listing - 5 USD</option>
					<option value="ISO" price="5">ISO - 5 USD</option>
					<option value="ISO+Reserve" price="8">ISO+Reserve - 8 USD</option>
					<option value="Reserve " price="3">Reserve - 3 USD</option>
				</select>
				<select style="visibility: hidden" id="quantitySelect">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</div>
			<div id="paypal-button-container" />
		</div>
	</div>
	<script
		src="https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=USD"
		data-sdk-integration-source="button-factory"></script>
	<script>
		function initPayPalButton() {
			var shipping = 0;
			var itemOptions = document.querySelector('#smart-button-container #item-options');
			var quantity = parseInt(5);
			var quantitySelect = document.querySelector('#smart-button-container #quantitySelect');
			if (!isNaN(quantity)) {
				quantitySelect.style.visibility = 'visible';
			}
			var orderDescription = 'You+She Items';
			if (orderDescription === '') {
				orderDescription = 'Item';
			}
			paypal
				.Buttons({
					style: {
						shape: 'rect',
						color: 'blue',
						layout: 'vertical',
						label: 'paypal'
					},
					createOrder: function (data, actions) {
						var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
						var selectedItemPrice = parseFloat(
							itemOptions.options[itemOptions.selectedIndex].getAttribute('price')
						);
						var tax = 0 === 0 || false ? 0 : selectedItemPrice * (parseFloat(0) / 100);
						if (quantitySelect.options.length > 0) {
							quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
						} else {
							quantity = 1;
						}

						tax *= quantity;
						tax = Math.round(tax * 100) / 100;
						var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
						priceTotal = Math.round(priceTotal * 100) / 100;
						var itemTotalValue = Math.round(selectedItemPrice * quantity * 100) / 100;

						return actions.order.create({
							purchase_units: [
								{
									description: orderDescription,
									amount: {
										currency_code: 'USD',
										value: priceTotal,
										breakdown: {
											item_total: {
												currency_code: 'USD',
												value: itemTotalValue
											},
											shipping: {
												currency_code: 'USD',
												value: shipping
											},
											tax_total: {
												currency_code: 'USD',
												value: tax
											}
										}
									},
									items: [
										{
											name: selectedItemDescription,
											unit_amount: {
												currency_code: 'USD',
												value: selectedItemPrice
											},
											quantity: quantity
										}
									]
								}
							]
						});
					},
					onApprove: function (data, actions) {
						return actions.order.capture().then(function (orderData) {
							// Full available details
							console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

							// Show a success message within this page, e.g.
							const element = document.getElementById('paypal-button-container');
							element.innerHTML = '';
							element.innerHTML = '<h3>Thank you for your payment!</h3>';

							// Or go to another URL:  actions.redirect('thank_you.html');
						});
					},
					onError: function (err) {
						console.log(err);
					}
				})
				.render('#paypal-button-container');
		}
		initPayPalButton();
	</script>
</div>
