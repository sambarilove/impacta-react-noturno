import React from 'react'
import {Cabecalho} from '../componentes/cabecalho'
import ContatoForm from './form'
import {connect} from 'react-redux'

class ContatoIndex extends React.Component {
    render() {
        return (

            <div className="container">
                <Cabecalho titulo="Contato" subtitulo={`Entre em contato conosco - ${this.props.nome}`}/>     
                <ContatoForm/>           
            </div>

        )
    }
}

const mapStoreToProps = store =>({
    nome : store.contato.nome
})

const Conectado = connect(mapStoreToProps, null) (ContatoIndex)

export {Conectado as ContatoIndex}