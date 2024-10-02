package gantoniadis.runnerz.user.model;

import gantoniadis.runnerz.user.dto.AddUserRequestDTO;
import gantoniadis.runnerz.user.dto.RoleDTO;

import java.util.List;
import java.util.Set;

public record UsersAndRoles(List<AddUserRequestDTO> users, Set<RoleDTO> roles) {
}