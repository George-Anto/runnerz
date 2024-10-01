package gantoniadis.runnerz.userFromAPI;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
class UserFromAPIController {

    private final UserFromAPIHttpClient client;

    UserFromAPIController(UserFromAPIHttpClient client) {
        this.client = client;
    }

    @GetMapping("")
    List<UserFromAPI> findAll() {
        return client.findAll();
    }

    @GetMapping("/{id}")
    UserFromAPI findById(@PathVariable Integer id) {
        return client.findById(id);
    }

}
