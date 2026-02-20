package Kid_coding.Controller;

import Kid_coding.dto.GoogleLoginRequest;
import Kid_coding.entity.Student;
import Kid_coding.repository.StudentRepository;
import Kid_coding.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth") // Combined base path
@CrossOrigin(origins = "http://localhost:5173") 
public class StudentsController {

    private final StudentRepository studentRepo;
    private final AuthService authService;

    public StudentsController(StudentRepository studentRepo, AuthService authService) {
        this.studentRepo = studentRepo;
        this.authService = authService;
    }

    // Maps to: POST http://localhost:8082/api/auth/google
    @PostMapping("/google") 
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest request) {
        Student student = authService.processGoogleLogin(request);
        return ResponseEntity.ok(student);
    }

    // Maps to: POST http://localhost:8082/api/auth/update-password
 

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
}