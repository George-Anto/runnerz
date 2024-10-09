package gantoniadis.runnerz.user.controller;

import gantoniadis.runnerz.user.dto.AddUserRequestDTO;
import gantoniadis.runnerz.user.dto.AddUserResponseDTO;
import gantoniadis.runnerz.user.dto.UserDTO;
import gantoniadis.runnerz.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AddUserResponseDTO> createNewUser(@RequestBody AddUserRequestDTO request) {
        log.debug("Trying to create user with username: " + request.getUsername());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.createNewUser(request, false));
    }

    @PostMapping("/register")
    public ResponseEntity<AddUserResponseDTO> registerUser(@RequestBody AddUserRequestDTO request) {
        log.debug("Trying to register user with username: " + request.getUsername());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.createNewUser(request, true));
    }
}
