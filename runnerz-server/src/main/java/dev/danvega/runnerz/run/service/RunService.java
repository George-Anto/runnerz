package dev.danvega.runnerz.run.service;

import dev.danvega.runnerz.run.dto.RunDTO;
import dev.danvega.runnerz.run.exception.RunNotFoundException;
import dev.danvega.runnerz.run.mapper.RunMapper;
import dev.danvega.runnerz.run.model.Run;
import dev.danvega.runnerz.run.repository.RunRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class RunService {

    private final RunRepository runRepository;
    private final RunMapper runMapper;

    public RunService(RunRepository runRepository, RunMapper runMapper) {
        this.runRepository = runRepository;
        this.runMapper = runMapper;
    }

    public List<RunDTO> findAll() {
        log.info("Trying to retrieve all Runs.");
        return runMapper.runListToRunDTOList(runRepository.findAll());
    }

    public RunDTO findById(Integer id) throws RunNotFoundException {
        log.info("Trying to retrieve Run with Id: {}.", id);
        Optional<Run> runOptional = runRepository.findById(id);
        if (runOptional.isEmpty()) {
            throw new RunNotFoundException();
        }
        return runMapper.runToRunDTO(runOptional.get());
    }

    public RunDTO create(RunDTO runDTO) {
        log.info("Trying to create a new Run: {}.", runDTO);
        return runMapper
                .runToRunDTO(runRepository
                        .save(runMapper.runDTOToRun(runDTO)));
    }

    public RunDTO update(RunDTO updatedRunDTO, Integer id) throws RunNotFoundException {
        log.info("Trying to update Run with Id: {}.", id);
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
        log.info("Trying to delete Run with Id: {}.", id);
        Optional<Run> optionalRun = runRepository.findById(id);
        if (optionalRun.isEmpty()) {
            throw new RunNotFoundException();
        }
        runRepository.delete(optionalRun.get());
    }
}
