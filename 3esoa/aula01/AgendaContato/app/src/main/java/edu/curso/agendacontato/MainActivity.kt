package edu.curso.agendacontato

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import edu.curso.agendacontato.ui.theme.AgendaContatoTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val lista = mutableListOf<Contato>()

        fun procurar ( nome : String ) : Contato {
            for ( contato in lista ) {
                if (contato.nome.contains( nome )) {
                    return contato
                }
            }
            return Contato("", "", "")
        }

        setContent {
            AgendaContatoTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    ContatoFormulario(
                        modifier = Modifier.padding( innerPadding ),
                        onGravar = { nome, telefone, email ->
                            val contato = Contato(nome, telefone, email)
                            lista.add( contato )
                            Log.i("AGENDA_CONTATO", "Lista: $lista")
                        },
                        onPesquisar = { nome -> procurar(nome) }
                    )
                }
            }
        }
    }
}

@Composable
fun ContatoFormulario(
    modifier: Modifier = Modifier,
    onGravar: (String, String, String) -> Unit,
    onPesquisar: (String) -> Contato
) {

    var nome by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var telefone by remember { mutableStateOf("") }

    Column (modifier = modifier) {
        Text( text="Nome Completo:",
            modifier = Modifier
                .padding(5.dp)
                .background(Color.White)
        )
        OutlinedTextField(
            value = nome,
            onValueChange = { nome = it }
        )
        Text( text="Email:",
            modifier = Modifier
                .padding(5.dp)
                .background(Color.White)
        )
        OutlinedTextField(
            value = email,
            onValueChange = { email = it }
        )
        Text( text="Telefone:",
            modifier = Modifier
                .padding(5.dp)
                .background(Color.White)
        )
        OutlinedTextField(
            value = telefone,
            onValueChange = { telefone = it }
        )
        Row {
            Button(
                onClick = {
                    onGravar( nome, telefone, email )
                }
            ) {
                Text("Gravar")
            }
            Button(
                onClick = {
                    val contato = onPesquisar( nome )
                    nome = contato.nome
                    telefone = contato.telefone
                    email = contato.email
                }
            ) {
                Text("Pesquisar")
            }
        }
    }
}

//@Preview(showBackground = true)
//@Composable
//fun ContatoPreview() {
//    ContatoFormulario(onGravar = { n, t, e -> },
//        onPesquisar = { nome ->
//            return Contato("", "", "")
//        })
//}
