package Kid_coding.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String title; // Frontend 'title' use kar raha hai
    
    @Column(columnDefinition = "TEXT")
    private String projectData; // Blockly ka XML ya JSON yahan rahega
    @CreationTimestamp // Isse apne aap current time save ho jayega
    private LocalDateTime createdAt;

    // Getter and Setter
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    private UUID studentId;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getProjectData() {
		return projectData;
	}

	public void setProjectData(String projectData) {
		this.projectData = projectData;
	}

	public UUID getStudentId() {
		return studentId;
	}

	public void setStudentId(UUID studentId) {
		this.studentId = studentId;
	}

	public void setName(String name) {
		// TODO Auto-generated method stub
		
	}

	public void setCode(String code) {
		// TODO Auto-generated method stub
		
	}

    // Getters and Setters
}