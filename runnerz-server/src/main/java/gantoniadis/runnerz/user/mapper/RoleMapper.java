package gantoniadis.runnerz.user.mapper;

import gantoniadis.runnerz.user.dto.RoleDTO;
import gantoniadis.runnerz.user.model.Role;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    Role roleDTOToRole(RoleDTO roleDTO);

    RoleDTO roleToRoleDTO(Role role);

    Set<Role> roleDTOsSetToRolesSet(Set<RoleDTO> roleDTOs);

    Set<RoleDTO> rolesSetToRoleDTOsSet(Set<Role> roles);

    List<RoleDTO> rolesListToRoleDTOsList(List<Role> roles);
}
