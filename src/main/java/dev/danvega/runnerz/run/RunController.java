package dev.danvega.runnerz.run;

import dev.danvega.runnerz.run.exception.RunDoesNotExistException;
import dev.danvega.runnerz.run.exception.RunNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/runs")
public class RunController {

    private final RunRepository runRepository;

    public RunController(RunRepository runRepository) {
        this.runRepository = runRepository;
    }

    @GetMapping("")
    List<Run> getAllRuns() {
        return runRepository.findAll();
    }

    @GetMapping("/{id}")
    Run getRunById(@PathVariable Integer id) {
        Optional<Run> runOptional = runRepository.findById(id);
        if (runOptional.isEmpty()) {
            throw new RunNotFoundException();
        }
        return runOptional.get();
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    void createRun(@Valid @RequestBody Run run) {
        runRepository.save(run);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    Run updateRun(@Valid @RequestBody Run updatedRun, @PathVariable Integer id) {
        // Fetch the existing Run from the database
        return runRepository.findById(id).map(existingRun -> {
            // Manually update only the non-null fields in the updatedRun
            if (updatedRun.getTitle() != null) {
                existingRun.setTitle(updatedRun.getTitle());
            }
            if (updatedRun.getStartedOn() != null) {
                existingRun.setStartedOn(updatedRun.getStartedOn());
            }
            if (updatedRun.getCompletedOn() != null) {
                existingRun.setCompletedOn(updatedRun.getCompletedOn());
            }
            if (updatedRun.getMiles() != null) {
                existingRun.setMiles(updatedRun.getMiles());
            }
            if (updatedRun.getLocation() != null) {
                existingRun.setLocation(updatedRun.getLocation());
            }
            // Save the updated entity
            return runRepository.save(existingRun);
        }).orElseThrow(RunDoesNotExistException::new);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteRun(@PathVariable Integer id) {
        Optional<Run> optionalRun = runRepository.findById(id);
        if (optionalRun.isEmpty()) {
            throw new RunNotFoundException();
        }
        runRepository.delete(optionalRun.get());
    }
}
