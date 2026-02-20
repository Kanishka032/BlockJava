package Kid_coding.repository;
import java.util.Optional;
import Kid_coding.entity.StudentPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StudentPointRepository extends JpaRepository<StudentPoint, UUID> {
	  Optional<StudentPoint> findByStudent_Id(UUID studentId);

    List<StudentPoint> findAllByOrderByPointsDesc();
}