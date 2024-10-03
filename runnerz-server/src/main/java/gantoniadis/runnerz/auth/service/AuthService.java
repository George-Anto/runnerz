package gantoniadis.runnerz.auth.service;

import gantoniadis.runnerz.auth.dto.AuthenticationRequestDTO;
import gantoniadis.runnerz.auth.dto.AuthenticationResponseDTO;
import gantoniadis.runnerz.auth.exception.CustomAuthenticationException;
import gantoniadis.runnerz.user.mapper.UserMapper;
import gantoniadis.runnerz.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    public AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request) throws CustomAuthenticationException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new CustomAuthenticationException("User '" + request.getUsername() + "' could not be authenticated");
        }

        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(
                () -> new CustomAuthenticationException("User " + request.getUsername() + " not found in the database")
        );
        var userDTO = userMapper.userToUserDTO(user);
        log.info("Successful authentication of user '{}' with roles: {}", userDTO.getUsername(), userDTO.getRolesNames());

        var jwt = jwtService.generateToken(Collections.singletonMap("roles", userDTO.getRoles()), userDTO);
        return AuthenticationResponseDTO.builder()
                .jwt(jwt)
                .username(userDTO.getUsername())
                .roles(userDTO.getRoles())
                .build();
    }
}
