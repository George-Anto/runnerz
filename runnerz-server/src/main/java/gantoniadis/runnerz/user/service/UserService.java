package gantoniadis.runnerz.user.service;

import gantoniadis.runnerz.exceptionHandling.RequestDataException;
import gantoniadis.runnerz.user.dto.AddUserRequestDTO;
import gantoniadis.runnerz.user.dto.AddUserResponseDTO;
import gantoniadis.runnerz.user.dto.RoleDTO;
import gantoniadis.runnerz.user.dto.UserDTO;
import gantoniadis.runnerz.user.mapper.RoleMapper;
import gantoniadis.runnerz.user.mapper.UserMapper;
import gantoniadis.runnerz.user.model.Role;
import gantoniadis.runnerz.user.repository.RoleRepository;
import gantoniadis.runnerz.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;
    private final PasswordEncoder passwordEncoder;

    public List<UserDTO> getAllUsers() {
        List<UserDTO> allUsersDTO = userMapper.usersListToUserDTOsList(userRepository.findAll());
        log.info("Retrieving all Users: {}", allUsersDTO.stream().map(UserDTO::getUsername).toList());

        return allUsersDTO;
    }

    public AddUserResponseDTO createNewUser(AddUserRequestDTO request) {

        UserDTO newUserDTO;
        try {
            newUserDTO = UserDTO.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .roles(addRoles(request.getRoles()))
                    .build();
        } catch (Exception e) {
            throw new RequestDataException("User data in request body are not properly set. " + e.getLocalizedMessage());
        }

        UserDTO savedUserDTO = userMapper.userToUserDTO(userRepository.save(userMapper.userDTOToUser(newUserDTO)));
        log.info("New User created: {}", savedUserDTO);

        return AddUserResponseDTO.builder()
                .username(savedUserDTO.getUsername())
                .roles(savedUserDTO.getRoles())
                .build();
    }

    public long getUserRepositoryCount() {
        return userRepository.count();
    }

    public void saveAllRoles(Set<RoleDTO> roleDTOList) {
        roleRepository.saveAll(roleMapper.roleDTOsSetToRolesSet(roleDTOList));
    }

    private Set<RoleDTO> addRoles(List<String> requestRoles) throws RequestDataException {

        Set<RoleDTO> rolesToAdd = new HashSet<>();

        List<Role> allRoles = roleRepository.findAll();
        List<RoleDTO> allRolesDTO = roleMapper.rolesListToRoleDTOsList(allRoles);

        for (RoleDTO roleDTO: allRolesDTO) {
            if (requestRoles.contains(roleDTO.getName())) {
                rolesToAdd.add(roleDTO);
            }
        }
        if (rolesToAdd.isEmpty()) {
            throw new RequestDataException("Select at least one valid role for the new User.");
        }
        return rolesToAdd;
    }
}
