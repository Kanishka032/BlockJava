package Kid_coding.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import Kid_coding.entity.Project;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findByStudentId(UUID studentId);

    Optional<Project> findTopByStudentIdOrderByCreatedAtDesc(UUID studentId);

	List<Project> findByStudentIdOrderByCreatedAtDesc(UUID studentId);
}