package edu.curso.agendacontato

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.Button
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import edu.curso.agendacontato.ui.theme.AgendaContatoRoomTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val agendaViewModel by viewModels<AgendaContatoViewModel>()
        setContent {
            AgendaContatoRoomTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    AgendaFormulario(agendaViewModel,
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun AgendaFormulario(model : AgendaContatoViewModel,
                     modifier: Modifier = Modifier) {
    Column(
        modifier = Modifier
            .fillMaxSize()
    ) {
        // Formulario
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight(0.5f)
                .background(Color.Yellow)
        ) {
            OutlinedTextField(
                value = model.nome.value,
                onValueChange = { model.nome.value = it },
                label = { Text("Nome") },
                placeholder = { Text("Nome Completo:") }
            )
            OutlinedTextField(
                value = model.telefone.value,
                onValueChange = { model.telefone.value = it },
                label = { Text("Telefone") },
                placeholder = { Text("Telefone com DDD:") }
            )
            OutlinedTextField(
                value = model.email.value,
                onValueChange = { model.email.value = it },
                label = { Text("Email") },
                placeholder = { Text("Email Valido:") }
            )
            Button(onClick = { model.gravar() }) {
                Text("Gravar")
            }
            Button(onClick = { model.lerTodos() }) {
                Text("Carregar")
            }
        }

        // Listagem
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight(0.5f)
                .background(Color.Cyan)
        ) {
            LazyColumn() {
                items( model.lista.value ) {
                    Column(modifier = Modifier.padding(vertical = 10.dp)) {
                        Text(it.nome)
                        Text(it.telefone)
                        Text(it.email)
                        Button( onClick = {model.apagar( it )}) {
                            Text("Apagar")
                        }
                    }
                }
            }
        }
    }
}