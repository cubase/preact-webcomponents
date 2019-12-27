import registerCustomElement from 'preact-custom-element'
import { MarsWeather } from './preact-components'

registerCustomElement(MarsWeather, 'x-marsweather', ['key'])
