package gantoniadis.runnerz.run.service;

import gantoniadis.runnerz.auth.service.AuthService;
import gantoniadis.runnerz.run.dto.RunDTO;
import gantoniadis.runnerz.run.exception.RunNotFoundException;
import gantoniadis.runnerz.run.mapper.RunMapper;
import gantoniadis.runnerz.run.model.Run;
import gantoniadis.runnerz.run.repository.RunRepository;
import gantoniadis.runnerz.user.dto.UserDTO;
import gantoniadis.runnerz.user.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class RunService {

    private final AuthService authService;
    private final UserMapper userMapper;
    private final RunRepository runRepository;
    private final RunMapper runMapper;

    public RunService(AuthService authService, UserMapper userMapper,
                      RunRepository runRepository, RunMapper runMapper) {
        this.authService = authService;
        this.userMapper = userMapper;
        this.runRepository = runRepository;
        this.runMapper = runMapper;
    }

    public List<RunDTO> findAll() {
        UserDTO loggedInUser = authService.getAuthenticatedUser();
        log.info("Trying to retrieve all Runs for User: {}.", loggedInUser.getUsername());

        return runMapper.runListToRunDTOList(runRepository.findAllByUser(userMapper.userDTOToUser(loggedInUser)));
    }

    public RunDTO findById(Integer id) throws RunNotFoundException {
        UserDTO loggedInUser = authService.getAuthenticatedUser();
        log.info("Trying to retrieve Run with Id: {} for User: {}.", id, loggedInUser.getUsername());

        Optional<Run> runOptional = runRepository.findByIdAndUser(id, userMapper.userDTOToUser(loggedInUser));
        if (runOptional.isEmpty()) {
            throw new RunNotFoundException();
        }
        return runMapper.runToRunDTO(runOptional.get());
    }

    public RunDTO create(RunDTO runDTO) {
        UserDTO loggedInUser = authService.getAuthenticatedUser();
        log.info("Trying to create a new Run: {} for User: {}.", runDTO, loggedInUser.getUsername());

        runDTO.setUser(loggedInUser);
        return runMapper
                .runToRunDTO(runRepository
                        .save(runMapper.runDTOToRun(runDTO)));
    }

    public RunDTO update(RunDTO updatedRunDTO, Integer id) throws RunNotFoundException {
        UserDTO loggedInUser = authService.getAuthenticatedUser();
        log.info("Trying to update Run with Id: {} of User: {}.", id, loggedInUser.getUsername());

        // Fetch the existing RunDTO from the database
        RunDTO existingRunDTO = findById(id);
        // Manually update only the non-null fields in the updatedRunDTO
        if (updatedRunDTO.getTitle() != null) {
            existingRunDTO.setTitle(updatedRunDTO.getTitle());
        }
        if (updatedRunDTO.getStartedOn() != null) {
            existingRunDTO.setStartedOn(updatedRunDTO.getStartedOn());
        }
        if (updatedRunDTO.getCompletedOn() != null) {
            existingRunDTO.setCompletedOn(updatedRunDTO.getCompletedOn());
        }
        if (updatedRunDTO.getMiles() != null) {
            existingRunDTO.setMiles(updatedRunDTO.getMiles());
        }
        if (updatedRunDTO.getLocation() != null) {
            existingRunDTO.setLocation(updatedRunDTO.getLocation());
        }
        return runMapper.runToRunDTO(runRepository.save(runMapper.runDTOToRun(existingRunDTO)));
    }

    public void delete(Integer id) throws RunNotFoundException {
        UserDTO loggedInUser = authService.getAuthenticatedUser();
        log.info("Trying to delete Run with Id: {} of User: {}.", id, loggedInUser.getUsername());

        Optional<Run> optionalRun = runRepository.findByIdAndUser(id, userMapper.userDTOToUser(loggedInUser));
        if (optionalRun.isEmpty()) {
            throw new RunNotFoundException();
        }
        runRepository.delete(optionalRun.get());
    }
}
