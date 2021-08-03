const optimizelySdk = require('@optimizely/optimizely-sdk');

const optimizelyClient = optimizelySdk.createInstance({
  sdkKey: 'GD1YnswD17rAwke3qSy5q'
});

optimizelyClient.onReady().then(() => {
  for (let i = 0; i < 1; i++) {
    let userId = Math.floor(Math.random() * (10000 - 1000) + 1000).toString();

    console.log(optimizelyClient);

    let user = optimizelyClient.createUserContext(userId);
    let decision = user.decide('virtual_assistant_routes');
    console.log(decision);

    console.log(`\nVariation: ${decision.variationKey}`);
    console.log(`with values:       
    login = ${decision.variables['login']} 
    accounts_account-overview = ${
      decision.variables['accounts_account-overview']
    }
    enrollment = ${decision.variables['enrollment']}
    help-and-support_faq = ${decision.variables['help-and-support_faq']}`);

    optimizelyClient.track('test', userId);

    let variation_html = document.getElementById("variation")
    variation_html.innerHTML = 'VARIATION: ' + decision.variationKey

    document.getElementById("login").innerHTML = 'login: ' + decision.variables['login'];

    document.getElementById("accounts_account-overview").innerHTML = 'accounts_account-overview: ' + 
      decision.variables['accounts_account-overview']

    document.getElementById("enrollment").innerHTML = 'enrollment: ' + decision.variables['enrollment'];

    document.getElementById("help-and-support_faq").innerHTML = 'help-and-support_faq: ' + decision.variables['help-and-support_faq'];
  }
});
