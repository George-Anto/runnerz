package dev.danvega.runnerz.userFromAPI;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;

import java.util.List;

public interface UserFromAPIHttpClient {

    @GetExchange("/users")
    List<UserFromAPI> findAll();

    @GetExchange("/users/{id}")
    UserFromAPI findById(@PathVariable Integer id);

}