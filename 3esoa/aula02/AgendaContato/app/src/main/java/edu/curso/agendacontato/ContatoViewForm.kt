package edu.curso.agendacontato

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ContatoViewForm(
    modifier: Modifier = Modifier,
    viewModel: ContatoViewModel
) {
    Column (modifier = modifier) {
        Text( text="Nome Completo:",
            modifier = Modifier
                .padding(5.dp)
                .background(Color.White)
        )
        OutlinedTextField(
            value = viewModel.nome.value,
            onValueChange = { viewModel.nome.value = it }
        )
        Text( text="Email:",
            modifier = Modifier
                .padding(5.dp)
                .background(Color.White)
        )
        OutlinedTextField(
            value = viewModel.email.value,
            onValueChange = { viewModel.email.value = it }
        )
        Text( text="Telefone:",
            modifier = Modifier
                .padding(5.dp)
                .background(Color.White)
        )
        OutlinedTextField(
            value = viewModel.telefone.value,
            onValueChange = { viewModel.telefone.value = it }
        )
        Row {
            Button(
                onClick = {
                    viewModel.adicionar()
                }
            ) {
                Text("Gravar")
            }
            Button(
                onClick = {
                    viewModel.procurar()
                }
            ) {
                Text("Pesquisar")
            }
        }
    }
}
