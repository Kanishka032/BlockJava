package Kid_coding.service;

import Kid_coding.dto.GoogleLoginRequest;
import Kid_coding.entity.Student;
import Kid_coding.repository.StudentPointRepository;
import Kid_coding.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

     @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private StudentPointRepository studentPointRepository;

    @Autowired
    private  BCryptPasswordEncoder passwordEncoder;

    // ===================== LOGIN =====================
    public Student login(String email) {
        return studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    // ===================== SIGNUP =====================
    public Student signup(String name, String email, String password) {
        if (studentRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Student student = new Student();
        student.setName(name);
        student.setEmail(email);
        student.setPassword(passwordEncoder.encode(password));
        return studentRepository.save(student);
    }

    // ===================== GET STUDENT =====================
    public Student getStudentById(UUID id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        student.setPoints(student.getStudentPoint() != null ? student.getStudentPoint().getPoints() : 0);
        return student;
    }

    // ===================== UPDATE NAME =====================
    public void updateStudentName(UUID id, String newName) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        student.setName(newName);
        studentRepository.save(student);
    }

    // ===================== CHANGE PASSWORD =====================
    public boolean verifyAndChangePassword(String email, String currentPassword, String newPassword) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (passwordEncoder.matches(currentPassword, student.getPassword())) {
            student.setPassword(passwordEncoder.encode(newPassword));
            studentRepository.save(student);
            return true;
        }
        return false;
    }

    // ===================== FORGOT PASSWORD =====================
    public void sendResetEmail(String email, String name, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText(
                "Hi " + name + ",\n\n" +
                "We received a request to reset your password.\n" +
                "Click the link below to reset your password:\n" +
                resetLink + "\n\n" +
                "This link will expire in 15 minutes.\n\n" +
                "— Kid Coding Team"
        );
        mailSender.send(message);
    }

    // ===================== RESET PASSWORD =====================
 // instance method, not static
  
    public boolean resetPassword(String token, String newPassword) {
        if (token == null || token.isEmpty()) {
            return false;
        }

        // Use .trim() to prevent invisible space errors
        Optional<Student> optStudent = studentRepository.findByResetToken(token.trim());

        if (optStudent.isEmpty()) {
            return false; 
        }

        Student student = optStudent.get();

        // Check expiry logic
        if (student.getTokenExpiry() != null && student.getTokenExpiry().isBefore(LocalDateTime.now())) {
            return false;
        }

        student.setPassword(passwordEncoder.encode(newPassword));
        student.setResetToken(null);
        student.setTokenExpiry(null);
        studentRepository.save(student);

        return true;
    }
    // ===================== GOOGLE LOGIN =====================
    public Student processGoogleLogin(GoogleLoginRequest request) {
        return studentRepository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    Student newStudent = new Student();
                    newStudent.setName(request.getName());
                    newStudent.setEmail(request.getEmail());
                    newStudent.setPassword(null);
                    return studentRepository.save(newStudent);
                });
    }
}