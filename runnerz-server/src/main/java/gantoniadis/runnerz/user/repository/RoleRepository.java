package gantoniadis.runnerz.user.repository;

import gantoniadis.runnerz.user.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
