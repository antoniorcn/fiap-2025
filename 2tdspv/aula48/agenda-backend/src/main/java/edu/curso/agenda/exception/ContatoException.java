package edu.curso.agenda.exception;

public class ContatoException extends Exception {
    public ContatoException( String msg ) {
        super(msg);
    }

    public ContatoException(String msg, Throwable th) {
        super(msg, th);
    }
}
