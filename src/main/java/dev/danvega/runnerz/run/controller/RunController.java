package dev.danvega.runnerz.run.controller;

import dev.danvega.runnerz.run.dto.RunDTO;
import dev.danvega.runnerz.run.service.RunService;
import dev.danvega.runnerz.run.validationGroup.CreateRun;
import dev.danvega.runnerz.run.validationGroup.UpdateRun;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/runs")
public class RunController {

    private final RunService runService;

    public RunController(RunService runService) {
        this.runService = runService;
    }

    @GetMapping("")
    List<RunDTO> getAllRuns() {
        return runService.findAll();
    }

    @GetMapping("/{id}")
    RunDTO getRunById(@PathVariable Integer id) {
        return runService.getRunById(id);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    void createRun(@Validated(CreateRun.class) @RequestBody RunDTO runDTO) {
        runService.createRun(runDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    RunDTO updateRun(@Validated(UpdateRun.class) @RequestBody RunDTO updatedRunDTO, @PathVariable Integer id) {
        return runService.updateRun(updatedRunDTO, id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteRun(@PathVariable Integer id) {
        runService.delete(id);
    }
}
