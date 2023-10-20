'use client'

import React, { useState } from 'react'
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { ExportHarmonizeCountriesPerYear, ExportHarmonizeCountriesResponse, ExportHarmonizeCountriesResponseList } from './types'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Box from '@mui/material/Box'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',  'November', 'December']

// hs_code=20098920&limit=30
async function getData(hsCode: string, month: number, year: number) {
  const res = await fetch(`https://dataapi.moc.go.th/export-harmonize-countries?year=${year}&month=${month}&hs_code=${hsCode}&limit=200`, )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json() as unknown as ExportHarmonizeCountriesResponseList
}

export default function Page() {
  const [hsCode, setHsCode] = useState<string>('')
  const [countries, setCountries] = useState<string[]>([])
  const [selectCountry, setSelectCountry] = useState<string>('')
  const [year1, setYear1] = useState<ExportHarmonizeCountriesResponseList[]>([]) // keep for all 12 month
  const [year2, setYear2] = useState<ExportHarmonizeCountriesResponseList[]>([]) // keep for all 12 month
  const [chartData, setChartData] = useState<any>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `FROM HS_CODE: ${hsCode} - ${selectCountry} : 2023 vs 2022`,
      },
    },
  };

  const handleOnClick = async () => {
    // Reset select country when click apply
    setSelectCountry('')
    setIsLoading(true)
    const data = await getData(hsCode,1, new Date().getFullYear())
    const country_list: string[] = data.map((item) => {
      return item.country_name_en
    })
    setCountries(country_list)

    for (let i = 1; i <= 12; i++){
      const data1 = await getData(hsCode,i, new Date().getFullYear())
      const data2 = await getData(hsCode,i, new Date().getFullYear()-1)
      year1.push(data1)
      year2.push(data2)
      setYear1([...year1])
      setYear2([...year2])
    }
    setIsLoading(false)
  }

  const handleOnblur = (e: { target: { value: React.SetStateAction<string> } }) => {
    setHsCode(e.target.value)
  }

  const handleSelectCountry = async (country: string) => {
    console.log(country)
    setSelectCountry(country)
    setChartData(undefined)

    // find index of country
    const CountryIndex = year1[0].findIndex((item) => item.country_name_en === country)
    const isNotInYear2 = year2[0].findIndex((item) => item.country_name_en === country) === -1

    const tempYear1 = {
      year: year1[0][CountryIndex].year,
      country_code: year1[0][CountryIndex].country_code,
      country_name_en: year1[0][CountryIndex].country_name_en,
      quantity: year1.map((item) => item[CountryIndex].quantity),
      acc_quantity: year1.map((item) => item[CountryIndex].acc_quantity),
      value_usd: year1.map((item) => item[CountryIndex].value_usd),
      acc_value_usd: year1.map((item) => item[CountryIndex].acc_value_usd),
      value_baht: year1.map((item) => item[CountryIndex].value_baht),
      acc_value_baht: year1.map((item) => item[CountryIndex].acc_value_baht),
    } as ExportHarmonizeCountriesPerYear


    const tempYear2 = {
      year: year1[0][0].year, // some countries is not have data for previous year
      country_code: year1[0][0].country_code,// some countries is not have data for previous year
      country_name_en: year2[0][0].country_name_en, // some countries is not have data for previous year
      quantity: isNotInYear2 ? Array(12).fill(0) : year2.map((item) => item[CountryIndex].quantity),
      acc_quantity: isNotInYear2 ? Array(12).fill(0) : year2.map((item) => item[CountryIndex].acc_quantity),
      value_usd: isNotInYear2 ? Array(12).fill(0) : year2.map((item) => item[CountryIndex].value_usd),
      acc_value_usd: isNotInYear2 ? Array(12).fill(0) : year2.map((item) => item[CountryIndex].acc_value_usd),
      value_baht: isNotInYear2 ? Array(12).fill(0) : year2.map((item) => item[CountryIndex].value_baht),
      acc_value_baht: isNotInYear2 ? Array(12).fill(0) : year2.map((item) => item[CountryIndex].acc_value_baht),
    } as ExportHarmonizeCountriesPerYear

    setChartData({
      labels,
      datasets: [
        {
          label: 'value_usd: 2023',
          data: tempYear1.value_usd,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'value_usd: 2022',
          data: tempYear2.value_usd,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    })
  }

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton onClick={() => handleSelectCountry(countries[index])}>
          <ListItemText primary={countries[index]}/>
        </ListItemButton>
      </ListItem>
    );
  }



  const renderChart = () => {
    console.log('render')
    if (selectCountry === '' || !chartData) return <></>

    return (
      <Bar
        options={options}
        data={chartData}
      />
    )
  }

  return (

    <div>
      <TextField id="hs-code" label="hs_code" variant="outlined" size="small" onBlur={handleOnblur}/>
      <Button variant="contained" size="medium" onClick={() => handleOnClick()}>Apply</Button>
      <p>Example: 20098920</p>
      <Box
        sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
      >
        <FixedSizeList
          height={400}
          width={360}
          itemSize={46}
          itemCount={countries.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
      {isLoading ?
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box> : renderChart()
      }
    </div>
  )
}
