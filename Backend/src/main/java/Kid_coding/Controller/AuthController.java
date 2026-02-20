package Kid_coding.Controller;

import Kid_coding.dto.LoginRequest;
import Kid_coding.dto.SignUpRequest;
import Kid_coding.entity.Student;
import Kid_coding.repository.StudentRepository;
import Kid_coding.service.AuthService;
import Kid_coding.service.MailService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})

public class AuthController {

//	@Autowired
//	private BCryptPasswordEncoder passwordEncoder;
    private final AuthService service;
    private final MailService mailService;
    private final StudentRepository studentRepository; // Inject repository
   
    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    public AuthController(AuthService service, MailService mailService, StudentRepository studentRepository) {
        this.service = service;
        this.mailService = mailService;
        this.studentRepository = studentRepository;
    }


    // ----------------- Update Student Name -----------------
    @PutMapping("/student/{id}/update-name")
    public ResponseEntity<?> updateName(@PathVariable UUID id,
                                        @RequestBody Map<String, String> payload) {

        if (payload == null || !payload.containsKey("name")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Name is required"));
        }

        String newName = payload.get("name").trim();

        if (newName.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Name cannot be empty"));
        }

        try {
            service.updateStudentName(id, newName);
            return ResponseEntity.ok(
                    Map.of("message", "Name updated successfully")
            );
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Server error"));
        }
    }

    // ----------------- Forgot Password -----------------
  
    // ----------------- Reset Password -----------------
  
    // ----------------- Login -----------------
    @PostMapping("/login")
    public Student login(@RequestBody LoginRequest request) {
        try {
            return service.login(request.getEmail());
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found");
        }
    }

    // ----------------- Get Student By ID -----------------
    @GetMapping("/student/{id}")
    public Student getStudent(@PathVariable("id") UUID id) {
        return service.getStudentById(id);
    }

    // ----------------- Signup -----------------
    @PostMapping("/signup")
    public Student signup(@RequestBody SignUpRequest request) {
        return service.signup(request.getName(), request.getEmail(), request.getPassword());
    }

    // ----------------- Change Password -----------------
    @PutMapping("/student/{email}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable String email, @RequestBody Map<String, String> payload) {
        String currentPassword = payload.get("currentPassword");
        String newPassword = payload.get("newPassword");

        try {
            boolean isMatched = service.verifyAndChangePassword(email, currentPassword, newPassword);
            if (isMatched) {
                // Optionally, send email notification for password change
                mailService.sendPasswordChangedNotification(email, newPassword); // safer than sending password
                return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Current password does not match!"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Server error"));
        }
    }
    // ----------------- Forgot Password -----------------
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email not found"));

        String resetToken = UUID.randomUUID().toString();
        student.setResetToken(resetToken);
        student.setTokenExpiry(LocalDateTime.now().plusMinutes(15));
        studentRepository.save(student);

        String resetLink = frontendUrl + "/reset-password?token=" + resetToken;
        mailService.sendResetEmail(student.getEmail(), student.getName(), resetLink);

        return ResponseEntity.ok(Map.of(
                "message", "If this email exists, a reset link has been sent."
        ));
    }

    // ----------------- Reset Password -----------------
    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestParam(required = false) String token, 
            @RequestBody Map<String, String> request) {

        String finalToken = (token != null) ? token : request.get("token");
        String newPassword = request.get("newPassword");

        if (finalToken == null || newPassword == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Token/Password missing"));
        }

        boolean success = service.resetPassword(finalToken, newPassword);

        if (success) {
            return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(Map.of("error", "Invalid or expired token"));
        }
    } // No more return null!
}