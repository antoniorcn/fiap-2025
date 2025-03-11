package edu.curso.agendacontato

import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.android.Android
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logger
import io.ktor.client.plugins.logging.Logging
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json

class CustomHttpLogger : Logger {
    override fun log( message : String ) {
        Log.d("AGENDA_CONTATO", message)
    }
}

class ContatoViewModel : ViewModel() {

    private val URL_BASE = "https://agenda-contato-a968f-default-rtdb.firebaseio.com"
    private val lista = mutableListOf<Contato>()

    private val cliente = HttpClient(Android) {
        install(ContentNegotiation) {
            json( Json{
                prettyPrint = true
                isLenient = true
            })
        }

        install(Logging) {
            logger = CustomHttpLogger()
            level = LogLevel.ALL
        }
    }

    var nome = mutableStateOf("")
    var email = mutableStateOf("")
    var telefone = mutableStateOf("")

    fun adicionar() {
        val contato = Contato(nome.value, telefone.value, email.value)
        lista.add( contato )
        Log.i("AGENDA_CONTATO", "Lista: $lista")
        viewModelScope.launch {
            cliente.post(URL_BASE + "/contatos.json") {
                setBody(contato)
                contentType(ContentType.Application.Json)
            }
        }
    }

    fun procurar() {
        viewModelScope.launch {
            val contatos : Map<String, Contato> = cliente.get(URL_BASE + "/contatos.json").body()
            lista.clear()
            for ( contatoEntry in contatos ) {
                val contato = contatoEntry.value
                lista.add( contato )
                if (contato.nome.contains( nome.value )) {
                    nome.value = contato.nome
                    email.value = contato.email
                    telefone.value = contato.telefone
                }
            }
        }
    }
}