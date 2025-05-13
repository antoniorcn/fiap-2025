package edu.curso.agendacontato

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query

@Dao
interface ContatoDAO {

    @Query("Select * from Contato")
    suspend fun findAll() : List<Contato>

    @Insert
    suspend fun insert( contato : Contato )

    @Delete
    suspend fun delete( contato : Contato )

}