package edu.curso.agendacontato

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

class AgendaContatoViewModel : ViewModel() {

    private val contatoDAO = AgendaApplication.db.contatoDAO()

    val nome : MutableState<String> = mutableStateOf("")
    val telefone : MutableState<String> = mutableStateOf("")
    val email : MutableState<String> = mutableStateOf("")

    val lista : MutableState<List<Contato>> = mutableStateOf(emptyList())

    init {
        lerTodos()
    }

    fun gravar() {
        val c = Contato( 0, nome.value, telefone.value, email.value )
        viewModelScope.launch {
            contatoDAO.insert(c)
            lerTodos()
        }
    }

    fun lerTodos() {
        viewModelScope.launch {
            lista.value = contatoDAO.findAll()
        }
    }

    fun apagar( contato : Contato ) {
        viewModelScope.launch {
            contatoDAO.delete( contato )
            lerTodos()
        }
    }

}