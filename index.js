const optimizelySdk = require('@optimizely/optimizely-sdk');

const optimizelyClient = optimizelySdk.createInstance({
  sdkKey: 'GD1YnswD17rAwke3qSy5q'
});

optimizelyClient.onReady().then(() => {
  for (let i = 0; i < 1; i++) {
    let userId = Math.floor(Math.random() * (10000 - 1000) + 1000).toString();

    let user = optimizelyClient.createUserContext(userId);
    let decision = user.decide('virtual_assistant_routes');

    let variation_html = document.getElementById('variation');
    variation_html.innerHTML = 'VARIATION NAME: ' + decision.variationKey;

    document.getElementById('login').innerHTML = decision.variables['login'];

    document.getElementById('accounts_account-overview').innerHTML =
      decision.variables['accounts_account-overview'];

    document.getElementById('enrollment').innerHTML =
      decision.variables['enrollment'];

    document.getElementById('help-and-support_faq').innerHTML =
      decision.variables['help-and-support_faq'];
  }
});

const table = document.getElementById('table');
document.addEventListener('VIRTUAL_ASSISTANT_CHATBOT', event => {
  console.log(event.detail);
  var cell_1 = `<tr><td>${event.detail.EventAction}</td>`;
  var cell_2 = `<td>${event.detail.EventCategory}</td>`;
  var cell_3 = `<td>${event.detail.EventLabel}</td>`;
  var cell_4 = `<td>${event.detail.EventName}</td></tr>`;
  var cells = cell_1 + cell_2 + cell_3 + cell_4;
  var tableRef = document
    .getElementById('table')
    .getElementsByTagName('tbody')[0];

  var newRow = tableRef.insertRow(tableRef.rows.length);
  newRow.innerHTML = cells;
});
