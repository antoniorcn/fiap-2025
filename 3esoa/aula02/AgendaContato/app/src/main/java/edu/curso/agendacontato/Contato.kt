package edu.curso.agendacontato

import kotlinx.serialization.Serializable

@Serializable
data class Contato (
    val nome : String,
    val email : String,
    val telefone : String )