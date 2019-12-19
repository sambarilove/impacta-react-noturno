const INITIAL_STATE = {
    data: '2019-12-11',
    nome: 'Paulo',
    email: 'pauloromano@gmail.com',
    telefone: 11223344,
    assunto: 'informações sobre curso'
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'ATUALIZA_DATA' : return {...state, data : action.value};
        case 'ATUALIZA_NOME' : return {...state, nome : action.value};
        case 'ATUALIZA_EMAIL' : return {...state, email : action.value};
        case 'ATUALIZA_TELEFONE' : return {...state, telefone : action.value};
        case 'ATUALIZA_ASSUNTO' : return {...state, assunto : action.value};
        default : return state
    }
}