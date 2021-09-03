// Show entry point
document.dispatchEvent(
  new CustomEvent('VIRTUAL_ASSISTANT_ACTION', {
    bubbles: true,
    detail: { action: 'updateConfig', newValues: { showEntryPoint: true } }
  })
);

// Hide entry point
document.dispatchEvent(
  new CustomEvent('VIRTUAL_ASSISTANT_ACTION', {
    bubbles: true,
    detail: { action: 'updateConfig', newValues: { showEntryPoint: false } }
  })
);

// Clear chatbot
document.dispatchEvent(
  new CustomEvent('VIRTUAL_ASSISTANT_ACTION', {
    bubbles: true,
    detail: { action: 'cleanChatbot' }
  })
);

// Change style
document.dispatchEvent(
  new CustomEvent('VIRTUAL_ASSISTANT_ACTION', {
    bubbles: true,
    detail: {
      action: 'updateConfig',
      newValues: {
        customStyles: {
          vaFrameworkContentBackgroundColor: '#F6F6F6',
          bubblesUserBackgroundColor: '#ECECEC',
          buttonSecondaryBackgroundColor: '#000000',
          buttonSecondaryBorderColor: '#000000',
          buttonSecondaryHoverFontColor: '#000000',
          buttonSecondaryHoverBorderColor: '#000000',
          entryPointIcon: 'http://assets.stickpng.com/thumbs/5847f9cbcef1014c0b5e48c8.png'
        }
      }
    }
  })
);
