package edu.curso.agendacontato

import android.util.Log
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.emitAll
import kotlinx.coroutines.flow.flow

class ContatoRepository(
    private val dao : ContatoDAO,
    private val api : ContatoAPI
) {

    suspend fun atualizar()  {
        try {
            val contatos = api.getAll()
            dao.clear()
            dao.insertAll(contatos)
        } catch (e : Exception) {
            Log.e("AGENDA_CONTATO", "Erro ao atualizar dados com a API Rest", e)
        }
    }

    fun lerTodos() : Flow<List<Contato>> {
        return flow {
            atualizar()
            Log.i("AGENDA_CONTATO", "Emitindo dados do banco de dados")
            emitAll( dao.findAll() )
        }
    }

    suspend fun adicionar( contato : Contato ){
        api.create( contato )
        atualizar()
    }

}