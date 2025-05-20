package edu.curso.agendacontato

import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable

@Serializable
@Entity(tableName = "Contato")
data class Contato(
    @PrimaryKey(autoGenerate = true)
    var id : Long,
    val nome : String,
    val telefone : String,
    val email : String
)