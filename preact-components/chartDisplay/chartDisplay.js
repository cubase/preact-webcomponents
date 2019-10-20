import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { RadarChart } from '../../utils/functions'
import * as d3 from 'd3'
import { chartStyles } from './styles'

const ChartDisplay = ({ name, width, height, apikey = 'DEMO_KEY' }) => {
  const chartOptions = {
    w: width,
    h: height,
    maxValue: 100,
    levels: 5,
    ExtraWidthX: 300
  }

  const data = [
    [
      { area: 'Central ', value: 80 },
      { area: 'Kirkdale', value: 40 },
      { area: 'Kensington ', value: 40 },
      { area: 'Everton ', value: 90 },
      { area: 'Picton ', value: 60 },
      { area: 'Riverside ', value: 80 }
    ]
  ]

  useEffect(() => {
    const drawData = data => {
      d3.json('./preact-components/chartDisplay/data.json', function(data) {
        RadarChart.draw(`#${name}-chart`, data, chartOptions, d3)
      })
    }

    drawData(data)
  }, [])

  return <div className={chartStyles.wrapper} id={`${name}-chart`} />
}

export default ChartDisplay
