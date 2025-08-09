import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import axios from 'axios';
import './App.css'
const API_KEY = '57816d20dfcfa8250b0b0d7b7cd65c7e'; // استبدل بمفتاحك

const today = new Date();
const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

function Weather({ lang, namecity }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!namecity) return;

    async function fetchWeather() {
      try {
        const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: namecity,       // هنا تمرير المتغير مباشرة
            appid: API_KEY,
            units: 'metric',
            lang: lang,
          },
        });
        setWeather(res.data);
      } catch (error) {
        console.error('حدث خطأ:', error.message);
        setWeather(null);
      }
    }
    fetchWeather();
  }, [lang, namecity]); // إعادة الجلب عند تغيير اللغة أو المدينة

  if (!weather) return <p style={{ color: 'white' }}>جاري التحميل...</p>;

  return (
    <Card sx={{ color: "white", p: 1, bgcolor: "rgba(33, 33, 92, 0.38)", minWidth: 385 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'start', alignItems: 'end' }}>
        <Typography fontSize={40} m={1} variant="h5">
          {weather.name}
        </Typography>
        <Typography variant="h5">
          {formattedDate}
        </Typography>
      </CardContent>
      <hr />
      <CardContent sx={{ display: "flex", justifyContent: 'space-between' }}>
        <Box sx={{ display: "flex", alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontSize: 50 }}>{Math.round(weather.main.temp)}</Typography>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </Box>
        <CloudIcon sx={{ fontSize: 170, color: "white" }} />
      </CardContent>
      <Typography display="flex" justifyContent={"start"} mr={2.1} mb={2} >
        {weather.weather[0].description}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "start", gap: 2, pr: 2 }}>
        <Typography>{lang === 'ar' ? 'الصغرى' : 'Min'} : {Math.round(weather.main.temp_min)}</Typography>
        <Typography> | </Typography>
        <Typography>{lang === 'ar' ? 'الكبرى' : 'Max'} : {Math.round(weather.main.temp_max)}</Typography>
      </Box>
    </Card>
  );
}

function App() {
  const [lang, setLang] = useState(document.body.dir === 'rtl' ? 'ar' : 'en');
  const [namecity, setNamecity] = useState('jeddah'); // حالة المدينة في App

  // ضبط اتجاه الصفحة بناءً على اللغة عند بداية التحميل أو تغييرها
  useEffect(() => {
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      
      }}
    >
      {/* تمرير اللغة والمدينة كمُدخلات */}
      <Weather lang={lang} namecity={namecity} />

<div style={{display:"flex"}}>
  

      <select
        value={namecity}
        onChange={(e) => setNamecity(e.target.value)}
        style={{ fontSize: 20, padding: 8, borderRadius: 5 }}
      >
        <option value="jeddah" > {lang === 'ar' ? 'جدة'     :'jeddah' }  </option> 
        <option value="Hail">  {lang === 'ar'   ? 'حائل'    :'Hail' }</option>
        <option value="Tabuk"> {lang === 'ar'   ? 'تبوك'    :'Tabuk' }</option>
        <option value="Abha">{lang === 'ar'     ? 'أبها'    :'Abha' }</option>
        <option value="Medina">{lang === 'ar'   ? 'المدينة' :'Medina'}</option>
        <option value="Mecca">{lang === 'ar'    ? 'مكة'      :'Mecca' }</option>
        <option value="Dammam">{lang === 'ar'   ? 'الدمام'   :'Dammam'}</option>
        <option value="Riyadh">{lang === 'ar'   ? 'الرياض'   :'Riyadh'}</option>
      </select>
      <Button sx={{ color: "white" }} variant="text" onClick={toggleLang}>
        {lang === 'ar' ? 'English' : 'عربي'}
      </Button>
</div>
    
    </Box>
  );
}

export default App;
