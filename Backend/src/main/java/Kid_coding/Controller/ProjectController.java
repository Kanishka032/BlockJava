package Kid_coding.Controller;

import Kid_coding.dto.ProjectSaveRequest;
import Kid_coding.entity.Project;
import Kid_coding.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:8080", allowCredentials = "true")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    // 1️⃣ Get all projects of a student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Project>> getStudentProjects(@PathVariable UUID studentId) {
        List<Project> projects = service.getProjectsByStudent(studentId);
        return ResponseEntity.ok(projects);
    }

    // 2️⃣ Save new project
    @PostMapping("/save")
    public ResponseEntity<Project> saveProject(@RequestBody ProjectSaveRequest request) {

        System.out.println("Received Title: " + request.getTitle());
        System.out.println("Received Data: " + request.getProjectData());

        Project savedProject = service.saveProject(request);
        return ResponseEntity.ok(savedProject);
    }

    // 3️⃣ Load latest project of student
    @GetMapping("/load")
    public ResponseEntity<Project> getLatestProject(@RequestParam UUID studentId) {

        return service.findLatestByStudentId(studentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 4️⃣ Update / Rename project
    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(
            @PathVariable UUID projectId,
            @RequestBody ProjectSaveRequest request) {

        Project updatedProject = service.updateProject(projectId, request);
        return ResponseEntity.ok(updatedProject);
    }

    // 5️⃣ Delete project
    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID projectId) {

        service.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
}