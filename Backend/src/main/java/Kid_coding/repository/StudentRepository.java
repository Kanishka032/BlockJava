package Kid_coding.repository;

import Kid_coding.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    Optional<Student> findByEmail(String email);

    // Fetch all students with their points, ordered descending
    @Query("SELECT s FROM Student s LEFT JOIN FETCH s.studentPoint sp ORDER BY sp.points DESC NULLS LAST")
    List<Student> findAllWithPoints();
//    Optional<Student> findByEmail(String email);
    Optional<Student> findByResetToken(String resetToken);
    // Fetch a single student with points by ID
    @Query("SELECT s FROM Student s LEFT JOIN FETCH s.studentPoint sp WHERE s.id = :id")
    Optional<Student> findByIdWithPoints(UUID id);

//	Optional<Student> findByResetToken(String token);
}