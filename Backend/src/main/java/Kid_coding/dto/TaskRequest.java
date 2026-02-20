package Kid_coding.dto;

import java.util.UUID;

public class TaskRequest {
    private UUID studentId;
    private Integer taskId;
    private Integer points;

    public TaskRequest() {}

    public UUID getStudentId() { return studentId; }
    public void setStudentId(UUID studentId) { this.studentId = studentId; }

    public Integer getTaskId() { return taskId; }
    public void setTaskId(Integer taskId) { this.taskId = taskId; }

    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
}