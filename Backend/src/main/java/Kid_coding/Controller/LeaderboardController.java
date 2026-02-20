package Kid_coding.Controller;

import Kid_coding.entity.Student;
import Kid_coding.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = "http://localhost:8080")
public class LeaderboardController {

    private final StudentRepository studentRepo;

    public LeaderboardController(StudentRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    @GetMapping("/students")
    public List<StudentWithRank> getLeaderboard() {
        // Fetch all students with their StudentPoint in one query
        List<Student> students = studentRepo.findAllWithPoints();

        // Map transient points from StudentPoint
        students.forEach(s -> s.setPoints(s.getStudentPoint() != null ? s.getStudentPoint().getPoints() : 0));

        // Sort descending by points and assign rank
        List<StudentWithRank> ranked = students.stream()
                .sorted((a, b) -> Integer.compare(b.getPoints(), a.getPoints()))
                .map(StudentWithRank::new)
                .collect(Collectors.toList());

        for (int i = 0; i < ranked.size(); i++) {
            ranked.get(i).setRank(i + 1);
        }

        return ranked;
    }

    // DTO to send to frontend
    public static class StudentWithRank {
        private String id;
        private String name;
        private int points;
        private int completedTasks;
        private int rank;

        public StudentWithRank(Student student) {
            this.id = student.getId().toString();
            this.name = student.getName();
            this.points = student.getPoints() != null ? student.getPoints() : 0;
            this.completedTasks = student.getCompletedTasks() != null ? student.getCompletedTasks().size() : 0;
        }

        // Getters and setters
        public String getId() { return id; }
        public String getName() { return name; }
        public int getPoints() { return points; }
        public int getCompletedTasks() { return completedTasks; }
        public int getRank() { return rank; }
        public void setRank(int rank) { this.rank = rank; }
    }
}