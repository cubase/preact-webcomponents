import registerCustomElement from 'preact-custom-element'
import { MarsWeather, ChartDisplay } from './preact-components'

registerCustomElement(MarsWeather, 'x-marsweather', ['apikey'])
registerCustomElement(ChartDisplay, 'x-chartdisplay', ['name', 'data', 'width', 'heigth', 'apikey'])
