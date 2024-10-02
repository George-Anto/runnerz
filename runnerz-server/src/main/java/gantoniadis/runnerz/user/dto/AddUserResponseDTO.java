package gantoniadis.runnerz.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddUserResponseDTO {

    private String username;
    private Set<RoleDTO> roles;
}
