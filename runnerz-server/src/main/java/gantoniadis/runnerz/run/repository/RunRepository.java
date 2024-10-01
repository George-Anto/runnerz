package gantoniadis.runnerz.run.repository;

import gantoniadis.runnerz.run.model.Run;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RunRepository extends JpaRepository<Run, Integer> {
}
