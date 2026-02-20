package Kid_coding.dto;

import java.time.LocalDate;

public class DailyProgressDTO {
    private LocalDate date;
    private Long tasksCompleted;

    // Constructor that accepts Object array from JPA query
    public DailyProgressDTO(Object[] result) {
        this.date = (LocalDate) result[0];
        // Handle both Integer and Long types from count()
        if (result[1] instanceof Long) {
            this.tasksCompleted = (Long) result[1];
        } else if (result[1] instanceof Integer) {
            this.tasksCompleted = ((Integer) result[1]).longValue();
        } else {
            this.tasksCompleted = ((Number) result[1]).longValue();
        }
    }

    // Constructor with direct parameters
    public DailyProgressDTO(LocalDate date, Long tasksCompleted) {
        this.date = date;
        this.tasksCompleted = tasksCompleted;
    }

    // Getters and Setters
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getTasksCompleted() {
        return tasksCompleted;
    }

    public void setTasksCompleted(Long tasksCompleted) {
        this.tasksCompleted = tasksCompleted;
    }
}