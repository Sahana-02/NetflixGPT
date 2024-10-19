export const ProfilePhoto =
  'https://avatars.githubusercontent.com/u/148085700?v=4'

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.REACT_APP_API_OPTIONS
  }
}

export const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500'

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY
export const SUPPORTED_LANGUAGES = [
  {
    langIdentifier: 'en',
    name: 'English'
  },
  {
    langIdentifier: 'hi',
    name: 'Hindi'
  },
  {
    langIdentifier: 'sp',
    name: 'Spanish'
  }
]
