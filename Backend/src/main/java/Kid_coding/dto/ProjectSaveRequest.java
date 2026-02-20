package Kid_coding.dto;

import java.util.UUID;

public class ProjectSaveRequest {
    private String title;       // Frontend 'title' bhej raha hai
    private String projectData; // Frontend 'projectData' bhej raha hai
    private UUID studentId;     // Frontend 'studentId' bhej raha hai

    public ProjectSaveRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getProjectData() { return projectData; }
    public void setProjectData(String projectData) { this.projectData = projectData; }

    public UUID getStudentId() { return studentId; }
    public void setStudentId(UUID studentId) { this.studentId = studentId; }
}