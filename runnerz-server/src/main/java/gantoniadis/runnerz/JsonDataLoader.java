package gantoniadis.runnerz;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import gantoniadis.runnerz.run.model.Runs;
import gantoniadis.runnerz.run.repository.RunRepository;
import gantoniadis.runnerz.user.dto.AddUserRequestDTO;
import gantoniadis.runnerz.user.model.UsersAndRoles;
import gantoniadis.runnerz.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Slf4j
@Component
public class JsonDataLoader implements CommandLineRunner {

    private final ObjectMapper objectMapper;
    private final RunRepository runRepository;
    private final UserService userService;

    public JsonDataLoader(ObjectMapper objectMapper,
                          RunRepository runRepository,
                          UserService userService) {
        this.objectMapper = objectMapper;
        this.runRepository = runRepository;
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        loadRuns();
        loadUsersAndRoles();
    }

    private void loadRuns() {
        if(runRepository.count() == 0) {
            try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/runs.json")) {
                Runs allRuns = objectMapper.readValue(inputStream, Runs.class);
                log.info("Reading {} runs from JSON data and saving to in-memory collection.", allRuns.runs().size());
                runRepository.saveAll(allRuns.runs());
            } catch (IOException e) {
                throw new RuntimeException("Failed to read Runs JSON data", e);
            }
        } else {
            log.info("Not loading Runs from JSON data because the collection contains data.");
        }
    }

    private void loadUsersAndRoles() {
        if (userService.getUserRepositoryCount() == 0) {
            try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/users.json")) {
                UsersAndRoles data = objectMapper.readValue(inputStream, UsersAndRoles.class);
                log.info("Reading {} users and {} roles from JSON data.", data.users().size(), data.roles().size());

                //Save roles to the database
                userService.saveAllRoles(data.roles());

                //Save users to the database
                for (AddUserRequestDTO newUser : data.users()) {
                    userService.createNewUser(newUser, false);
                }
            } catch (IOException e) {
                throw new RuntimeException("Failed to read Users and / or Roles from JSON data", e);
            }
        } else {
            log.info("Not loading Users and Roles from JSON data because the User collection contains data.");
        }
    }

}
