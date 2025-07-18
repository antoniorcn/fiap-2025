package edu.curso.agendacontato

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import edu.curso.agendacontato.ui.theme.AgendaContatoTheme

data class Contato(
    val nome : String,
    val email : String,
    val telefone : String
)

class MainActivity : ComponentActivity() {

    private val nome = mutableStateOf("")
    private val telefone = mutableStateOf("")
    private val email = mutableStateOf("")

    private val lista = mutableStateListOf<Contato>()

    override fun onCreate(bundle : Bundle?) {
        super.onCreate( bundle )

        setContent {
            AgendaContatoTheme {
                Scaffold { paddingValues ->
                    Column {
                        Formulario(paddingValues)
                        LazyColumn {
                            items(lista) { item ->
                                MostrarContato(item)
                            }
                        }
                    }
                }
            }
        }
    }

    @Composable
    fun MostrarContato( contato : Contato ) {
        Column{
            Text(contato.nome)
            Text(contato.telefone)
            Text(contato.email)
        }
    }

    @Composable
    fun Formulario(paddingValues : PaddingValues) {
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .background(Color.Yellow)
        ) {
            Text("Agenda de Contato")
            Text("Nome: ")
            OutlinedTextField(value = nome.value , onValueChange = { texto ->
                nome.value = texto
            })
            Text("Telefone: ")
            OutlinedTextField(value = telefone.value , onValueChange = { texto ->
                telefone.value = texto
            })
            Text("Email: ")
            OutlinedTextField(value = email.value , onValueChange = { texto ->
                email.value = texto
            })
            Button( onClick = {

                val contato = Contato(nome.value, email.value, telefone.value)
                lista.add( contato )
                Log.i("AGENDACONTATO", "Lista: $lista")

            } ) {
                Text("Gravar")
            }
        }
    }
}