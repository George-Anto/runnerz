package dev.danvega.runnerz.run.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RunDoesNotExistException extends RuntimeException {

    public RunDoesNotExistException() {
        super("Run does not exist in the database");
    }
}
