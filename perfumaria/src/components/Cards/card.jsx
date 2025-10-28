{/* Classe de Criação do Componente Card */} 

import React from 'react'

{ /* Futuros Icones a Serem Utilizados nos Cards
import { FaCar } from "react-icons/fa6"; Icone da Frota
import { HiShoppingBag } from "react-icons/hi2"; Icone de Produtos
import { BsCashCoin } from "react-icons/bs"; Icone das Vendas
import { IoPersonSharp } from "react-icons/io5"; Icone dos Clientes
 */}


{/* Import do CSS do Componente */}
import './card.module.css'

const card = () => {
  return (
    <div className="container-card">
      <h1>Tela</h1>
      <hr />
      <div className="icone-container">

      </div>
    </div>
  )
}

export default card