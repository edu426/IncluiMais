import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './assets/pages/Home.tsx'
import MainHeader from "./assets/layouts/MainHeader.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainHeader />}>
            <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
  )
