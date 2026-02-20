package Kid_coding.repository;

import Kid_coding.entity.StudentTask;
import Kid_coding.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentTaskRepository extends JpaRepository<StudentTask, UUID> {
    // 1. Service ke liye ye method zaroori hai
    Optional<StudentTask> findByStudentIdAndTaskId(UUID studentId, Integer taskId);

    // 2. Controller ke progress ke liye ye zaroori hai
    List<StudentTask> findByStudent(Student student);
    @Query("""
    	    SELECT DATE(st.completedAt) as date, COUNT(st) as total
    	    FROM StudentTask st
    	    WHERE st.student.id = :studentId
    	      AND st.completed = true
    	    GROUP BY DATE(st.completedAt)
    	    ORDER BY DATE(st.completedAt) DESC
    	""")
    	List<Object[]> getDailyProgress(UUID studentId);

    	@Query("SELECT DATE(st.completedAt), COUNT(st) " +
    		       "FROM StudentTask st " +
    		       "WHERE st.student.id = :studentId " +
    		       "GROUP BY DATE(st.completedAt) " +
    		       "ORDER BY DATE(st.completedAt)")
    		List<Object[]> findDailyProgressByStudentId(@Param("studentId") UUID studentId);
}