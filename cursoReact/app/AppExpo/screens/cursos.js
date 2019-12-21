import React from 'react';
import axios from 'axios';
import {View, StyleSheet, Text, FlatList, SafeAreaView, ScrollView} from 'react-native'

export default class Cursos extends React.Component{
    
    initialState = {
        data: [],
        refreshing: false
    }

    constructor(props){
        super(props)
        this.state = this.initialState;
    }

    componentDidMount(){
        this._getLista()
    }

    _getLista = async () => {
        this.setState({refreshing: true})
        axios.get('http://172.16.19.18:3200/api/cursos').then(response => {
            this.setState({data: response.data, refreshing: false})
        }).catch(error => {
            console.log(error)
            this.setState({refreshing: false})
        })
    }

    render(){
        return (
            <View>
                <Text style={styles.texto}>Lista de Cursos</Text>
                <ScrollView>
                    <SafeAreaView>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._getLista()}
                            renderItem={({ item }) => {
                                return (

                                    <View style={styles.item}>
                                        <Text style={styles.conteudo}>{item.codigo}</Text>
                                        <Text style={styles.conteudo}>{item.descricao}</Text>
                                        <Text style={styles.conteudo}>{item.cargaHoraria}</Text>
                                        <Text style={styles.conteudo}>{item.preco}</Text>
                                        <Text style={styles.conteudo}>{item.categoria}</Text>
                                    </View>
                                )
                            }}
                        />
                    </SafeAreaView>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteudo: {
        margin: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        fontSize: 20
    },
    texto: {
        alignItems: "center",
        fontSize: 30,
        margin: 20,
        color: '#FF0000',
    },
    item: {
        alignItems: "center",
        backgroundColor: "#dcda44",
        flexGrow: 1,
        margin: 4,
        padding: 20
    },
    conteudo: {
        color: "#333333"
    }
});
