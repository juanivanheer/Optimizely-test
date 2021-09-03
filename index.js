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
    //let userId = Math.floor(Math.random() * (10000 - 1000) + 1000).toString();
    let userId = new DeviceUUID().get();
    let user = optimizelyClient.createUserContext(userId);

    /*  
      decision es un objeto que trae los siguientes atributos:

      1) enabled: true/false si la feature flag está habilitada

      2) flagKey: el nombre de la key de la feature flag

      3) reasons: un arreglo con datos (razones??)

      4) ruleKey: el nombre de la key establecida en el experimento de A/B testing

      5) userContext: un objeto que contiene datos del usuario (ID, instancia de optimizely, objeto con atributos)

      6) variables: es un objeto que contiene a las variables definidas en optimizely con los valores definidos dependiendo de la variación elegida por optimizely

      7) variationKey: define el nombre de la variación que eleigió optimizely
    */
    let decision = user.decide('virtual_assistant_routes');

    /* 
      optimizelyClient.activate(...) va a devolver un string de la variación que ha escogido optimizely 
    */
    const variation = optimizelyClient.activate('experiment', userId);

    console.log('Decision: ' + decision);
    console.log('Variation: ' + variation);

    let variation_html = document.getElementById('variation');
    variation_html.innerHTML =
      'OPTIMIZELY VARIATION NAME: ' + decision.variationKey;

    document.getElementById('account_overview').innerHTML =
      decision.variables['account_overview'];

    document.getElementById('faqs').innerHTML = decision.variables['faqs'];

    if (!decision.variables['account_overview']) {
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
              customStyles: {
                chatInputIcon:
                  'http://assets.stickpng.com/thumbs/5847f9cbcef1014c0b5e48c8.png'
              }
            }
          }
        })
      );
    }

    console.log(userId);
    console.log(new DeviceUUID().parse());
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
