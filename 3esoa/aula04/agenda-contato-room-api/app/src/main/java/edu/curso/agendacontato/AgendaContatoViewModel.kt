package edu.curso.agendacontato

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class AgendaContatoViewModel : ViewModel() {

    private val httpClient = createHttpClient()
    private val api = ContatoAPI(httpClient)
    private val contatoDAO = AgendaApplication.db.contatoDAO()
    private val contatoRepository = ContatoRepository(contatoDAO, api)

    val nome : MutableState<String> = mutableStateOf("")
    val telefone : MutableState<String> = mutableStateOf("")
    val email : MutableState<String> = mutableStateOf("")

    val lista : StateFlow<List<Contato>> = contatoRepository
        .lerTodos()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    init {
        lerTodos()
    }

    fun gravar() {
        val c = Contato( 0, nome.value, telefone.value, email.value )
        viewModelScope.launch {
            contatoRepository.adicionar( c )
        }
    }

    fun lerTodos() {
        viewModelScope.launch {
            contatoRepository.atualizar()
        }
    }

    fun apagar( contato : Contato ) {
//        viewModelScope.launch {
//            contatoDAO.delete( contato )
//            lerTodos()
//        }
    }

}