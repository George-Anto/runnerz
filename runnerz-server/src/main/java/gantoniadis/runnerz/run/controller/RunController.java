package gantoniadis.runnerz.run.controller;

import gantoniadis.runnerz.run.dto.RunDTO;
import gantoniadis.runnerz.run.service.RunService;
import gantoniadis.runnerz.run.validationGroup.CreateRun;
import gantoniadis.runnerz.run.validationGroup.UpdateRun;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/run")
public class RunController {

    private final RunService runService;

    public RunController(RunService runService) {
        this.runService = runService;
    }

    @GetMapping("")
    ResponseEntity<List<RunDTO>> getAllRuns() {
        var allRuns = runService.findAll();
        log.info("Retrieved all {} Runs.", allRuns.size());
        return ResponseEntity.ok(allRuns);
    }

    @GetMapping("/{id}")
    ResponseEntity<RunDTO> getRunById(@PathVariable Integer id) {
        var run = runService.findById(id);
        log.info("Retrieved Run: {}", run);
        return ResponseEntity.ok(run);
    }

    @PostMapping("")
    ResponseEntity<RunDTO> createRun(@Validated(CreateRun.class) @RequestBody RunDTO runDTO) {
        var createdRun = runService.create(runDTO);
        log.info("Created Run: {}", createdRun);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdRun);
    }

    @PutMapping("/{id}")
    ResponseEntity<RunDTO> updateRun(@Validated(UpdateRun.class) @RequestBody RunDTO updatedRunDTO, @PathVariable Integer id) {
        var updatedRun = runService.update(updatedRunDTO, id);
        log.info("Updated Run: {}", updatedRun);
        return ResponseEntity.ok(updatedRun);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteRun(@PathVariable Integer id) {
        runService.delete(id);
        log.info("Deleted Run with Id: {}", id);
        return ResponseEntity.noContent().build();
    }
}
