package dev.danvega.runnerz.run;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "run")
@NoArgsConstructor
@AllArgsConstructor
@Data
public final class Run {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private @NotEmpty String title;
    private LocalDateTime startedOn;
    private LocalDateTime completedOn;
    private @Positive Integer miles;
    @Enumerated(EnumType.STRING)
    private Location location;

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (Run) obj;
        return Objects.equals(this.id, that.id) &&
                Objects.equals(this.title, that.title) &&
                Objects.equals(this.startedOn, that.startedOn) &&
                Objects.equals(this.completedOn, that.completedOn) &&
                Objects.equals(this.miles, that.miles) &&
                Objects.equals(this.location, that.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, startedOn, completedOn, miles, location);
    }

    @Override
    public String toString() {
        return "Run[" +
                "id=" + id + ", " +
                "title=" + title + ", " +
                "startedOn=" + startedOn + ", " +
                "completedOn=" + completedOn + ", " +
                "miles=" + miles + ", " +
                "location=" + location + ']';
    }

//    public Run {
//        if (startedOn.isAfter(completedOn)) {
//            throw new IllegalArgumentException("Completed On must be after Started On");
//        }
//    }
}
