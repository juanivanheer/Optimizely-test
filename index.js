const optimizelySdk = require('@optimizely/optimizely-sdk');
const VirtualAssistant = [
  'click chat close',
  'click chat minimize',
  'click chat open',
  'start typing',
  'error virtual assistant',
  'click feedback survey closed',
  'first interaction',
  'click dislike rate response',
  'start review',
  '[FAQ card] click read more',
  'send message',
  'click like rate response',
  'close read more'
];

const optimizelyClient = optimizelySdk.createInstance({
  sdkKey: 'GD1YnswD17rAwke3qSy5q'
});

optimizelyClient.onReady().then(() => {
  for (let i = 0; i < 1; i++) {
    let userId = Math.floor(Math.random() * (10000 - 1000) + 1000).toString();

    let user = optimizelyClient.createUserContext(userId);
    let decision = user.decide('virtual_assistant_routes');

    let variation_html = document.getElementById('variation');
    variation_html.innerHTML =
      'OPTIMIZELY VARIATION NAME: ' + decision.variationKey;

    document.getElementById('login').innerHTML = decision.variables['login'];

    document.getElementById('accounts_account-overview').innerHTML =
      decision.variables['accounts_account-overview'];

    document.getElementById('enrollment').innerHTML =
      decision.variables['enrollment'];

    document.getElementById('help-and-support_faq').innerHTML =
      decision.variables['help-and-support_faq'];

    if (!decision.variables['login']) {
      document.dispatchEvent(
        new CustomEvent('VIRTUAL_ASSISTANT_ACTION', {
          bubbles: true,
          detail: {
            action: 'updateConfig',
            newValues: { showEntryPoint: false }
          }
        })
      );
    } else {
      document.dispatchEvent(
        new CustomEvent('VIRTUAL_ASSISTANT_ACTION', { 
          bubbles: true,
          detail: {
            action: 'updateConfig',
            newValues: { 
              customStyles: { chatInputIcon: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Boca_escudo.png' }
            }
          }
        })
      );
    }
  }
});

document.addEventListener('VIRTUAL_ASSISTANT_CHATBOT', event => {
  if (VirtualAssistant.includes(event.detail.EventName)) {
    var tableRef = document
      .getElementById('table')
      .getElementsByTagName('tbody')[0];

    var cell_1 = `<tr><td>${tableRef.rows.length}</td>`;
    var cell_2 = `<td>${event.detail.EventAction}</td>`;
    var cell_3 = `<td>${event.detail.EventCategory}</td>`;
    var cell_4 = `<td>${event.detail.EventLabel}</td>`;
    var cell_5 = `<td>${event.detail.EventName}</td></tr>`;
    var cells = cell_1 + cell_2 + cell_3 + cell_4 + cell_5;

    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = cells;
  }
});
