import React, { Component } from 'react'
import { FormCurso } from './form'
import { ListCurso } from './list'
import axios from 'axios'

const URL = "http://localhost:3200/api/cursos"

export class CadastroCurso extends Component {

    initialState = {
        _id: null,
        codigo: '123',
        descricao: '',
        cargaHoraria: '',
        preco: '',
        categoria: 'ENGENHARIA',
        cursos: []
    }

    state = { ...this.initialState, cursos: [] }

    limpar() {
        this.setState(this.initialState)
    }

    constructor(props) {
        super(props)
        this.listar()
    }

    codigoChange(e) {
        console.log(e)
        this.setState({ codigo: e.target.value })
    }

    descricaoChange(e) {
        console.log(e)
        this.setState({ descricao: e.target.value })
    }

    cargaHorariaChange(e) {
        console.log(e)
        this.setState({ cargaHoraria: e.target.value })
    }

    precoChange(e) {
        console.log(e)
        this.setState({ preco: e.target.value })
    }

    categoriaChange(e) {
        console.log(e)
        this.setState({ categoria: e.target.value })
    }

    listar() {
        axios.get(URL).then(response => {
            this.setState({ cursos: response.data })
        })
    }

    adicionar(evento) {
        evento.persist()

        const { _id, codigo, descricao, cargaHoraria, categoria, preco } = this.state

        const body = {
            codigo,
            descricao,
            cargaHoraria,
            categoria,
            preco
        }

        if (_id) {

            axios.put(`${URL}/${_id}`, body)
                .then(_ => {
                    this.trataSucesso(evento, 'Atualizado com sucesso!')

                }).catch(error => {
                    this.trataErro(error, 'Ocorreu erro ao atualizar o curso')
                })
        } else {

            axios.post(URL, this.state).then(_ => {
                this.trataSucesso(evento, 'Adicionado!')
            })
                .catch(error => {
                    this.trataErro(error, 'Ocorreu erro ao adicionar o curso')
                })
        }
    }


    remover(curso) {

        if (window.confirm(`Deseja realmente deletar o curso? - ${curso.descricao}`)) {
            axios.delete(`${URL}/${curso._id}`)
                .then(_ => {
                    this.trataSucesso(null, 'Curso deletado com sucesso!')
                }).catch(error => {
                    this.trataErro(error, 'Ocorreu erro ao deletar o curso')
                })
        }

    }

    trataErro(error, msg) {
        console.log(error)
        alert(msg)
    }

    trataSucesso(evento, msg) {
        this.limpar(evento)
        this.listar()
        alert(msg)
    }

    consultar(curso) {
        this.setState({
            _id: curso._id,
            codigo: curso.codigo,
            descricao: curso.descricao,
            cargaHoraria: curso.cargaHoraria,
            preco: curso.preco,
            categoria: curso.categoria
        })
        console.log(curso)
    }

    limpar(evento) {
        if (evento) {
            evento.preventDefault()
        }

        this.setState(this.initialState)
    }

    render() {
        return (
            <div className="row border-bottom">
                <div className="col-md-6">
                    <FormCurso
                        codigo={this.state.codigo}
                        descricao={this.state.decricao}
                        cargaHoraria={this.state.cargaHoraria}
                        preco={this.state.preco}
                        categoria={this.state.categoria}

                        codigoChange={this.codigoChange.bind(this)}
                        descricaoChange={this.descricaoChange.bind(this)}
                        cargaHorariaChange={this.cargaHorariaChange.bind(this)}
                        precoChange={this.precoChange.bind(this)}
                        categoriaChange={this.categoriaChange.bind(this)}

                        adicionar={this.adicionar.bind(this)}
                        isAtualizar={this.state._id ? true : false}
                    />
                </div>
                <div className="col-md-6">
                    <ListCurso
                        cursos={this.state.cursos}

                        removerCurso={this.remover.bind(this)}
                        consultarCurso={this.consultar.bind(this)}
                    />
                </div>
            </div>
        )
    }
}