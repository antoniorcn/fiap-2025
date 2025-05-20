package edu.curso.agendacontato

import android.app.Application
import androidx.room.Room

class AgendaApplication : Application() {

    companion object {
        lateinit var db: AgendaDatabase
    }

    override fun onCreate() {
        super.onCreate()
        db = Room.databaseBuilder(
            applicationContext,
            AgendaDatabase::class.java,
            "database-agenda"
        ).build()
    }
}