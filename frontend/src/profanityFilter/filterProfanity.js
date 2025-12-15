import * as Profanity from 'leo-profanity'
import russianDict from './ru.js'

Profanity.add(russianDict)

export const filterProfanity = (text) => {
  if (Profanity.check(text)) {
    return Profanity.clean(text)
  }
  return text
}
