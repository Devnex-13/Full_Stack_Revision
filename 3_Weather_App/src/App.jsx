import { useEffect, useRef, useState } from "react"
import Heading from "./Components/Heading"

function App() {

  const cityElement = useRef("");

  const API_KEY = "4a2f6be520e94106aa392435260708"

  const [city, setCity] = useState("Nagpur")

  const [weather, setWeather] = useState(null)

  const handleInputValue = (e) => {
    e.preventDefault()
    // console.log(cityElement.current.value)
    setCity(cityElement.current.value)
    cityElement.current.value="";
  }

  useEffect(() => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    fetch(url)
    .then((res) => res.json())
    .then(data => {
      console.log(data.location.name)
      setWeather(data)
  })
  },[city])

  console.log(weather)

  return (
    <>
    <Heading />
    <form onSubmit={handleInputValue}>
    <input type="text" ref={cityElement} name="city" placeholder="Enter The City..."></input>
    <button type="submit">Find</button>
    </form>
    { weather  && (
      <div>
      {weather.current.temp_c}
      </div>
    )}
    </>
  )
}

export default App
