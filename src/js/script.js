document.addEventListener('DOMContentLoaded', () => {
  const params = (new URL(document.location)).searchParams;
  const currentLanguage = params.get("lang")
  const url = '../languages/'
  const listLanguage = ['en', 'de', 'es', 'fr', 'ja', 'pt']
  const isListLang = listLanguage.find(item => item === currentLanguage)

  const getLanguage = (lang = 'en') => {
    document.body.classList.add(`lang-${lang}`)

    fetch(`${url}${lang}.json`)
      .then(response => response.json())
      .then(data => {
        let allLanguageItems = document.querySelectorAll('.item-language')

        for(let languageItem of allLanguageItems) {
          let itemData = languageItem.dataset.language
          let currentString = data[itemData]

          if(currentString.includes('{{price}}')) {
            let price = languageItem.dataset.price
            languageItem.innerHTML = currentString.replace('{{price}}', price)
          } else {
            languageItem.innerHTML = currentString
          }
        }
      })
  }

  if(isListLang) {
    getLanguage(currentLanguage)
  } else {
    getLanguage()
  }

})
