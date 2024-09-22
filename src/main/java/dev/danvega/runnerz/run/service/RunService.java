package dev.danvega.runnerz.run.service;

import dev.danvega.runnerz.run.dto.RunDTO;
import dev.danvega.runnerz.run.exception.RunNotFoundException;
import dev.danvega.runnerz.run.mapper.RunMapper;
import dev.danvega.runnerz.run.model.Run;
import dev.danvega.runnerz.run.repository.RunRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RunService {

    private final RunRepository runRepository;
    private final RunMapper runMapper;

    public RunService(RunRepository runRepository, RunMapper runMapper) {
        this.runRepository = runRepository;
        this.runMapper = runMapper;
    }

    public List<RunDTO> findAll() {
        return runMapper.runListToRunDTOList(runRepository.findAll());
    }

    public RunDTO getRunById(Integer id) throws RunNotFoundException {
        Optional<Run> runOptional = runRepository.findById(id);
        if (runOptional.isEmpty()) {
            throw new RunNotFoundException();
        }
        return runMapper.runToRunDTO(runOptional.get());
    }

    public void createRun(RunDTO runDTO) {
        runRepository.save(runMapper.runDTOToRun(runDTO));
    }

    public RunDTO updateRun(RunDTO updatedRunDTO, Integer id) throws RunNotFoundException {
        // Fetch the existing RunDTO from the database
        RunDTO existingRunDTO = getRunById(id);
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
        Optional<Run> optionalRun = runRepository.findById(id);
        if (optionalRun.isEmpty()) {
            throw new RunNotFoundException();
        }
        runRepository.delete(optionalRun.get());
    }
}
