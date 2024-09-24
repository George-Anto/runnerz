package dev.danvega.runnerz.run.repository;

import dev.danvega.runnerz.run.model.Run;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RunRepository extends JpaRepository<Run, Integer> {
}
