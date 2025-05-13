package edu.curso.agendacontato

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(entities = [Contato::class], version = 1)
abstract class AgendaDatabase : RoomDatabase() {

    abstract fun contatoDAO() : ContatoDAO
}