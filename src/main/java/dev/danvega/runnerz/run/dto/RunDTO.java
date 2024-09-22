package dev.danvega.runnerz.run.dto;

import dev.danvega.runnerz.run.model.Location;
import dev.danvega.runnerz.run.validationGroup.CreateRun;
import dev.danvega.runnerz.run.validationGroup.UpdateRun;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RunDTO {
    private Integer id;
    @Pattern(regexp = "^(?!\\s*$).+", message = "Title must not be empty.",
            groups = {CreateRun.class, UpdateRun.class}) // Ensures non-empty string
    @NotNull(groups = CreateRun.class)
    private String title;
    @NotNull(groups = CreateRun.class)
    private LocalDateTime startedOn;
    @NotNull(groups = CreateRun.class)
    private LocalDateTime completedOn;
    @Positive(groups = {CreateRun.class, UpdateRun.class})
    @NotNull(groups = CreateRun.class)
    private Integer miles;
    @Enumerated(EnumType.STRING)
    @NotNull(groups = CreateRun.class)
    private Location location;
}
