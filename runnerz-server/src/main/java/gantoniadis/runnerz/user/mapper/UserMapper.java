package gantoniadis.runnerz.user.mapper;

import gantoniadis.runnerz.user.dto.UserDTO;
import gantoniadis.runnerz.user.model.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = RoleMapper.class)
public interface UserMapper {

    User userDTOToUser(UserDTO userDTO);

    UserDTO userToUserDTO(User user);

    List<UserDTO> usersListToUserDTOsList(List<User> roles);
}
