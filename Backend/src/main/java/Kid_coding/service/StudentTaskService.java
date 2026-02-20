package Kid_coding.service;

import Kid_coding.dto.DailyProgressDTO;
import Kid_coding.entity.Student;
import Kid_coding.entity.StudentPoint;
import Kid_coding.entity.StudentTask;
import Kid_coding.repository.StudentPointRepository;
import Kid_coding.repository.StudentRepository;
import Kid_coding.repository.StudentTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class StudentTaskService {

    @Autowired
    private StudentPointRepository studentPointRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentTaskRepository studentTaskRepository;

    @Transactional
    public Student completeTask(UUID studentId, Integer taskId, int pointsToAdd) {
        // Task dhoondein ya naya banayein
        StudentTask task = studentTaskRepository.findByStudentIdAndTaskId(studentId, taskId)
            .orElseGet(() -> {
                Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new RuntimeException("Student not found"));
                StudentTask newTask = new StudentTask();
                newTask.setStudent(student);
                newTask.setTaskId(taskId);
                return newTask;
            });

        if (Boolean.TRUE.equals(task.isCompleted())) { // 'isCompleted' check karein aapki entity ke hisab se
            throw new RuntimeException("Task already completed!");
        }

        task.setCompleted(true);
        task.setCompletedAt(LocalDateTime.now());
        studentTaskRepository.save(task);

        // Points update
        StudentPoint studentPoint = studentPointRepository.findById(studentId)
            .orElseGet(() -> {
                Student student = studentRepository.findById(studentId).orElseThrow();
                StudentPoint newPoint = new StudentPoint();
                newPoint.setStudent(student);
                newPoint.setPoints(0);
                return newPoint;
            });

        studentPoint.setPoints(studentPoint.getPoints() + pointsToAdd);
        studentPointRepository.save(studentPoint);

        return studentRepository.findById(studentId).orElseThrow();
    }
    public List<Object[]> getDailyProgress(UUID studentId) {

        if (!studentRepository.existsById(studentId)) {
            return List.of(); // empty list instead of crash
        }

        return studentTaskRepository.getDailyProgress(studentId);
    }
}