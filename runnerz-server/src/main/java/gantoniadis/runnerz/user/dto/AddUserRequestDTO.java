package gantoniadis.runnerz.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddUserRequestDTO {

    private String username;
    private String password;
    private List<String> roles;
}
