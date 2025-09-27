package edu.curso.agenda.dto;

import lombok.Data;

@Data
public class SigninDTO {
    final private String status;
    final private String message;
    private String token;
}
