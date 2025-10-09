package edu.curso.agenda.exception;

public class ImageInfoException extends Exception {
    public ImageInfoException(String msg ) {
        super(msg);
    }

    public ImageInfoException(String msg, Throwable th) {
        super(msg, th);
    }
}
