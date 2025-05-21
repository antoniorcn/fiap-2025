package edu.curso.agendacontato

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import edu.curso.agendacontato.ui.theme.AgendaContatoTheme
import kotlin.random.Random

class MainActivity : ComponentActivity() {

    val mensagensTriviais = listOf(
        "Oi, tudo bem?",
        "Como foi seu dia?",
        "O que você anda fazendo?",
        "Tá assistindo alguma série legal?",
        "Você viu a previsão do tempo pra hoje?",
        "Bom dia! Dormiu bem?",
        "Boa noite, até amanhã!",
        "Vamos marcar algo esse fim de semana?",
        "Tô morrendo de sono hoje!",
        "Você já almoçou?",
        "Que dia corrido hoje, né?",
        "Feriado chegando! Já tem planos?",
        "Essa semana tá passando rápido demais.",
        "Qual foi a última música que você ouviu?",
        "Tá frio aí também?",
        "Bora pedir uma pizza hoje?",
        "Preciso de férias urgente!",
        "Você viu aquele meme que te mandei?",
        "Tô entediado, me distrai aí.",
        "Mais um dia, mais um café!"
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val texto : MutableState<String> = mutableStateOf("")
        val lista : MutableState<List<String>> = mutableStateOf( emptyList() )
        setContent {
            AgendaContatoTheme {
                // A surface container using the 'background' color from the theme
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    Column() {
                        Column(
                            modifier = Modifier
                                .fillMaxSize(0.90f)
                        ) {
                            Text("Chat Fiapzap")
                            for ( i in 0 ..< lista.value.size) {
                                val txt = lista.value.get(i)
                                val autor = i % 2 == 0
                                Mensagem(txt, autor)
                            }
                        }
                        Row (
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(90.dp)
                        ) {
                            OutlinedTextField(
                                value = texto.value,
                                onValueChange = {
                                    texto.value = it
                                },
                                modifier = Modifier
                                    .fillMaxWidth(0.8f)
                                    .fillMaxHeight()
                            )
                            IconButton(
                                onClick = {
                                    val novalista =
                                            lista.value.toMutableList()
                                    novalista.add( texto.value )


                                    val msgNum = Random.nextInt(0, mensagensTriviais.size)
                                    val outraMensagem = mensagensTriviais.get( msgNum )
                                    novalista.add( outraMensagem )
                                    texto.value = ""
                                    lista.value = novalista.toList()
                                },
                                modifier = Modifier.size(50.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Filled.ArrowForward,
                                    contentDescription = "Enviar",
                                    tint = Color.Green,
                                    modifier = Modifier.size(50.dp)
                                )
                            }
                        }
                    }

                }
            }
        }
    }
}

@Composable
fun Mensagem( texto : String, autor : Boolean = false ) {
    var paddingLeft = 0.dp
    if (autor) {
        paddingLeft = 200.dp
    }
    Box(
        modifier = Modifier
            .padding(vertical = 20.dp)
            .padding(start = paddingLeft)
            .width(200.dp)
            .height(60.dp)
            .border(2.dp, color = Color.Red, shape = RoundedCornerShape(10.dp))
            .background(Color.Yellow)
            .padding(10.dp)
    ) {
        Text(texto )
    }
}