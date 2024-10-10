package gantoniadis.runnerz.user.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

@Builder
@Data
public class RoleDTO implements GrantedAuthority {

    private Integer id;
    private String name;

    @Override
    public String getAuthority() {
        return "ROLE_" + name;
    }
}
