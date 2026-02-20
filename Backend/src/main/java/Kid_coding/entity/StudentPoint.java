package Kid_coding.entity;

import jakarta.persistence.*;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "student_points")
public class StudentPoint {

    @Id
    private UUID studentId;

    @OneToOne
    @JoinColumn(name="student_id")
    @JsonBackReference
    private Student student;

    @Column(nullable = false)
    private Integer points = 0;

    public StudentPoint() {}

    public StudentPoint(Student student, Integer points) {
        this.student = student;
        this.studentId = student.getId();
        this.points = points;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}