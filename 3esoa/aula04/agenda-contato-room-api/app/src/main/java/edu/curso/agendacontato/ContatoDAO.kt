package edu.curso.agendacontato

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface ContatoDAO {

    @Query("Select * from Contato")
    fun findAll() : Flow<List<Contato>>

    @Insert
    suspend fun insert( contato : Contato )

    @Delete
    suspend fun delete( contato : Contato )

    @Query("Delete from Contato")
    suspend fun clear()

    @Insert
    suspend fun insertAll( contatos : List<Contato>)

}