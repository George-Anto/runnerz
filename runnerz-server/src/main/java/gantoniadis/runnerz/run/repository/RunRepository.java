package gantoniadis.runnerz.run.repository;

import gantoniadis.runnerz.run.model.Run;
import gantoniadis.runnerz.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RunRepository extends JpaRepository<Run, Integer> {

    List<Run> findAllByUser(User user);

    Optional<Run> findByIdAndUser(Integer id, User user);
}
