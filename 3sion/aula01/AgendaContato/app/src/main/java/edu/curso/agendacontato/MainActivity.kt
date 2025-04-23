package edu.curso.agendacontato

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp


val nome : MutableState<String> = mutableStateOf("")
val telefone : MutableState<String> = mutableStateOf("")
val email = mutableStateOf("")

val lista =
        mutableStateOf<MutableList<Contato>>(mutableListOf())

data class Contato(
    val nome : String,
    val telefone : String,
    val email : String
)

fun gravarContato() {
    val contato = Contato( nome=nome.value, telefone=telefone.value, email=email.value)
    lista.value.add( contato )
}

fun pesquisarContato() {
    for ( contato in lista.value ) {
        if (contato.nome.contains( nome.value )) {
            nome.value = contato.nome
            telefone.value = contato.telefone
            email.value = contato.email
        }
    }
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Formulario( this )
        }
    }
}

@Composable
fun Formulario( contexto : Context) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(color = Color.LightGray)
            .padding(32.dp)
    ) {
        Text("Formulario de Contato",
            fontSize = 28.sp,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth())
        TextField(
            value = nome.value,
            onValueChange = { texto -> nome.value = texto },
            label = {Text("Nome")},
            placeholder = {Text("Nome Completo: ")}
        )
        TextField(
            value = telefone.value,
            onValueChange = {telefone.value = it},
            label = {Text("Telefone")},
            placeholder = {Text("Telefone: (DDD) NNNN-NNNN")}
        )
        TextField(
            value = email.value,
            onValueChange = {email.value = it},
            label = {Text("Email")},
            placeholder = {Text("Email: email@dominio ")}
        )
        Row(modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceAround) {
            Button(onClick = {
                gravarContato()
                // Log.i("AGENDA_CONTATO", "Lista: ${lista.value}")
                Toast.makeText(contexto, "Contato gravado com sucesso", Toast.LENGTH_LONG)
                    .show()
            }) {
                Text("Gravar")
            }
            Button(onClick = {
                pesquisarContato()
            }) {
                Text("Pesquisar")
            }
        }
    }
}

@Composable
@Preview
fun FormularioPreview() {
    // Formulario()
}


//@Composable
//@Preview
//fun TesteTelaPreview() {
//    TesteTela()
//}

@Composable
fun TesteTela() {
    Column(modifier = Modifier
        .background(color = Color.Blue)
        .fillMaxSize()
        ,
        verticalArrangement = Arrangement.SpaceAround
    ) {
        Row(modifier = Modifier
            .background(color = Color.Yellow)
            .fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween){
            Text("Texto 1")
            Text("Texto 2")
            Text("Texto 3")
        }
        Text(" Ola mundo Jet Pack Compose ")
        Button(
            onClick = {},
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.Green
            ),
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp)
        ) {
            Text("Botão 1")
        }
        Button(
            onClick = {},
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.Green
            ),
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp)
        ) {
            Text("Botão 2")
        }
        Button(
            onClick = {},
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.Green
            ),
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp)
        ) {
            Text("Botão 3")
        }
    }
}