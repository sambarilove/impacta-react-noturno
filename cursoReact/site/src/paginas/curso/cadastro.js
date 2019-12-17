import React, { Component } from 'react'
import { FormCurso } from './form'
import { ListCurso } from './list'
import axios from 'axios'

const URL = "http://localhost:3200/api/cursos"

export class CadastroCurso extends Component {

    initialState = {
        codigo: '123',
        descricao: '',
        cargaHoraria: '',
        preco: '',
        categoria: 'ENGENHARIA',
        cursos: []
    }

    state = { ...this.initialState, cursos : [] }

    limpar(){
        this.setState(this.initialState)
    }

    constructor(props) {
        super(props)
        this.listar()
    }
    
   listar() {
       axios.get(URL).then(response => {
           this.setState({cursos : response.data})
       })
    }

    codigoChange(e) {
        console.log(e)
        this.setState({codigo : e.target.value})
    }

    descricaoChange(e) {
        console.log(e)
        this.setState({descricao : e.target.value})
    }

    cargaHorariaChange(e) {
        console.log(e)
        this.setState({cargaHoraria : e.target.value})
    }

    precoChange(e) {
        console.log(e)
        this.setState({preco : e.target.value})
    }

    categoriaChange(e) {
        console.log(e)
        this.setState({categoria : e.target.value})
    }

    render() {
        return (
            <div className="row border-bottom">
                <div className="col-md-6">
                    <FormCurso 
                    codigo={this.state.codigo}
                    codigoChange={this.codigoChange.bind(this)}
                    descricao={this.state.decricao}
                    descricaoChange={this.descricaoChange.bind(this)}
                    cargaHoraria={this.state.cargaHoraria}
                    cargaHorariaChange={this.cargaHorariaChange.bind(this)}
                    preco={this.state.preco}
                    precoChange={this.precoChange.bind(this)}
                    categoria={this.state.categoria}
                    categoriaChange={this.categoriaChange.bind(this)}
                    />
                </div>
                <div className="col-md-6">
                    <ListCurso cursos={this.state.cursos}/>
                </div>
            </div>
        )
    }
}