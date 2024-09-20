package dev.danvega.runnerz.run;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class InMemoryRunRepository {

    private List<Run> runs = new ArrayList<>();

//    @PostConstruct
//    private void init() {
//        runs.add(new Run(1,
//                "First Run",
//                LocalDateTime.now(),
//                LocalDateTime.now().plus(1, ChronoUnit.HOURS),
//                5,
//                Location.OUTDOOR));
//        runs.add(new Run(2,
//                "Second Run",
//                LocalDateTime.now(),
//                LocalDateTime.now().plus(2, ChronoUnit.HOURS),
//                2,
//                Location.INDOOR));
//    }
//
//    List<Run> findAll() {
//        return runs;
//    }
//
//    Optional<Run> findById(Integer id) {
//        return runs.stream().
//                filter(run -> run.id() == id)
//                .findFirst();
//    }
//
//    public void createRun(Run run) {
//        runs.add(run);
//    }
//
//    void updateRun(Run run, Integer id) {
//        Optional<Run> existingRun = findById(id);
//        if (existingRun.isPresent()) {
//            runs.set(runs.indexOf(existingRun.get()), run);
//        }
//    }
//
//    void deleteRun(Integer id) {
//        runs.removeIf(run -> run.id() == id);
//    }
}
