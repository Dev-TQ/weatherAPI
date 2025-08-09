import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../index.css'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Container } from '@mui/material'

//   نخصص الخط ليكون Cairo
const theme = createTheme({
  typography: {
    fontFamily: '"Cairo", sans-serif',
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
  maxWidth="sm"
  sx={{
    display: "flex",
    flexDirection: "column",
    padding:2, // ✅ هذا يجعل العناصر تظهر عموديًا
    height:"100vh",
    minwidth:"100%",
    justifyContent:"center",
    alignItems:'center',
    
  }}>

      <App />
  </Container>
    </ThemeProvider>
  </React.StrictMode>
)
