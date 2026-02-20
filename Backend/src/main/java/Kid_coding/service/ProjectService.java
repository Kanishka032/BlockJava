package Kid_coding.service;

import Kid_coding.dto.ProjectSaveRequest;
import Kid_coding.entity.Project;
import Kid_coding.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    // ✅ Get latest project
    public Optional<Project> findLatestByStudentId(UUID studentId) {
        return repository.findTopByStudentIdOrderByCreatedAtDesc(studentId);
    }

    // ✅ Save new project
    public Project saveProject(ProjectSaveRequest request) {
        Project project = new Project();

        project.setTitle(request.getTitle());
        project.setProjectData(request.getProjectData());
        project.setStudentId(request.getStudentId());

        return repository.save(project);
    }

    // ✅ Get all projects of student
    public List<Project> getProjectsByStudent(UUID studentId) {
        return repository.findByStudentIdOrderByCreatedAtDesc(studentId);
    }

    // ✅ Update / Rename project
    public Project updateProject(UUID projectId, ProjectSaveRequest request) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setTitle(request.getTitle());
        project.setProjectData(request.getProjectData());

        return repository.save(project);
    }

    // ✅ Delete project
    public void deleteProject(UUID projectId) {
        if (!repository.existsById(projectId)) {
            throw new RuntimeException("Project not found");
        }

        repository.deleteById(projectId);
    }
}