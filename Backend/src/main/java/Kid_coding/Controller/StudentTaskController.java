package Kid_coding.Controller;

import Kid_coding.dto.DailyProgressDTO;
import Kid_coding.dto.TaskRequest; 
import Kid_coding.entity.Student;
import Kid_coding.entity.StudentTask;
import Kid_coding.repository.StudentRepository;
import Kid_coding.repository.StudentTaskRepository;
import Kid_coding.service.StudentTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Map; // 👈 Ye import zaroori hai!

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class StudentTaskController {

    @Autowired
    private StudentTaskService studentTaskService;

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private StudentTaskRepository taskRepo;

    @PostMapping("/complete")
    public ResponseEntity<?> completeTask(@RequestBody TaskRequest request) {
        try {
            Student updatedStudent = studentTaskService.completeTask(
                request.getStudentId(), 
                request.getTaskId(), 
                request.getPoints()
            );
            return ResponseEntity.ok(updatedStudent);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/progress/{studentId}")
    public List<StudentTask> getProgress(@PathVariable String studentId) {
        try {
            UUID uuid = UUID.fromString(studentId);
            Student student = studentRepo.findById(uuid).orElseThrow();
            return taskRepo.findByStudent(student);
        } catch (Exception e) {
            return List.of();
        }
    }
   
    @GetMapping("/students/{studentId}/daily-progress")
    public ResponseEntity<?> getDailyProgress(@PathVariable UUID studentId) {
        // Check if student exists
        if (!studentRepo.existsById(studentId)) {
            return ResponseEntity.notFound().build();
        }

        // Get raw results from repository
        List<Object[]> rawResults = taskRepo.findDailyProgressByStudentId(studentId);

        // Map to DTOs with proper type handling
        List<DailyProgressDTO> dailyProgress = rawResults.stream()
            .map(result -> {
                LocalDate date = (LocalDate) result[0];
                Long count;
                if (result[1] instanceof Long) {
                    count = (Long) result[1];
                } else if (result[1] instanceof Integer) {
                    count = ((Integer) result[1]).longValue();
                } else {
                    count = ((Number) result[1]).longValue();
                }
                return new DailyProgressDTO(date, count);
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(dailyProgress);
    }
}